import pandas as pd
import numpy as np
import joblib
import json

from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
import xgboost as xgb
from sklearn.model_selection import train_test_split

class FeatureEngineer(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X = X.copy()
        service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 
                        'OnlineBackup', 'DeviceProtection', 'TechSupport',
                        'StreamingTV', 'StreamingMovies']

        for col in service_cols:
            X[col] = X[col].replace({'No internet service': 0, 'No phone service': 0, 
                                     'Yes': 1, 'No': 0})

        X['num_services'] = X[service_cols].sum(axis=1)
        X['tenure_ratio'] = X['tenure'] / X['tenure'].max()
        X['tenure_monthly_ratio'] = X['MonthlyCharges'] * X['tenure']
        X['charge_tenure_interaction'] = X['MonthlyCharges'] * X['tenure']
        X['charge_diff'] = X['MonthlyCharges'] - X['TotalCharges'] / X['tenure'].replace(0, 1)
        X['family_size'] = X['Partner'].map({'Yes': 1, 'No': 0}) + X['Dependents'].map({'Yes': 1, 'No': 0})
        X['contract_value'] = X['Contract'].map({'Month-to-month': 1, 'One year': 12, 'Two year': 24})
        return X

class DropColumnsTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, columns=None):
        self.columns = columns

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        if self.columns:
            return X.drop(columns=self.columns, errors='ignore')
        return X

numeric_features = ['tenure', 'MonthlyCharges', 'TotalCharges', 'num_services',
                    'tenure_ratio', 'tenure_monthly_ratio', 'charge_tenure_interaction',
                    'charge_diff', 'family_size', 'contract_value']
categorical_features = ['gender', 'SeniorCitizen', 'Partner', 'Dependents',
                        'PhoneService', 'MultipleLines', 'InternetService',
                        'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
                        'TechSupport', 'StreamingTV', 'StreamingMovies',
                        'Contract', 'PaperlessBilling', 'PaymentMethod']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', MinMaxScaler(), numeric_features),
        ('cat', OneHotEncoder(drop='first'), categorical_features)
    ]
)

best_params = {
    'classifier__learning_rate': 0.08781006194271507,
    'classifier__max_depth': 3,
    'classifier__n_estimators': 488,
    'classifier__subsample': 0.7980531866901829,
    'classifier__colsample_bytree': 0.9840763531046006,
    'classifier__gamma': 0.21823897158850444,
    'classifier__scale_pos_weight': 1.002686070314216,
    'classifier__min_child_weight': 3,
    'classifier__reg_alpha': 8.231517240941422,
    'classifier__reg_lambda': 3.0437233993630732
}

pipeline = ImbPipeline([
    ('feature_engineering', FeatureEngineer()),
    ('drop_columns', DropColumnsTransformer(columns=['customerID'])),  
    ('preprocessor', preprocessor),
    ('smote', SMOTE(sampling_strategy=0.75, random_state=42)),
    ('classifier', xgb.XGBClassifier(
        objective='binary:logistic',
        eval_metric='logloss',
        random_state=42,
        tree_method='hist'
    ))
])

pipeline.set_params(**best_params)

df = pd.read_csv('Telco-Customer-Churn.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(0)

y = df['Churn'].map({'Yes': 1, 'No': 0})
X = df.copy()

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

pipeline.fit(X_train, y_train)
print("Pipeline trained successfully!")

joblib.dump(pipeline, 'telco_churn_pipeline.joblib')
print("Pipeline saved successfully!")

optimal_threshold = 0.6448094844818115
with open('optimal_threshold.json', 'w') as f:
    json.dump({'optimal_threshold': optimal_threshold}, f)
print("Optimal threshold saved successfully!")
