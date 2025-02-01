import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score, 
                             roc_auc_score, classification_report, precision_recall_curve)
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import make_pipeline as make_imb_pipeline
from sklearn.ensemble import RandomForestClassifier
import optuna
from optuna.samplers import TPESampler

df = pd.read_csv('Telco-Customer-Churn.csv')
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(0)

def feature_engineering(df):
    service_cols = ['PhoneService', 'MultipleLines', 'OnlineSecurity', 
                   'OnlineBackup', 'DeviceProtection', 'TechSupport',
                   'StreamingTV', 'StreamingMovies']

    for col in service_cols:
        df[col] = df[col].replace({'No internet service': 0, 'No phone service': 0, 'Yes': 1, 'No': 0})

    df['num_services'] = df[service_cols].sum(axis=1)
    df['tenure_ratio'] = df['tenure'] / df['tenure'].max()
    df['tenure_monthly_ratio'] = df['MonthlyCharges'] * df['tenure']
    df['charge_tenure_interaction'] = df['MonthlyCharges'] * df['tenure']
    df['charge_diff'] = df['MonthlyCharges'] - df['TotalCharges']/df['tenure'].replace(0, 1)
    df['family_size'] = df['Partner'].map({'Yes': 1, 'No': 0}) + df['Dependents'].map({'Yes': 1, 'No': 0})
    df['contract_value'] = df['Contract'].map({'Month-to-month': 1, 'One year': 12, 'Two year': 24})

    return df

df = feature_engineering(df)

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
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(drop='first'), categorical_features)
    ])

pipeline = make_imb_pipeline(
    preprocessor,
    SMOTE(sampling_strategy=0.75, random_state=42),
    RandomForestClassifier(random_state=42)
)

X = df.drop(['customerID', 'Churn'], axis=1)
y = df['Churn'].map({'Yes': 1, 'No': 0})
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, 
                                                    stratify=y, random_state=42)

kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

def objective(trial):
    params = {
        'randomforestclassifier__n_estimators': trial.suggest_int('n_estimators', 100, 1000),
        'randomforestclassifier__max_depth': trial.suggest_int('max_depth', 5, 50),
        'randomforestclassifier__min_samples_split': trial.suggest_int('min_samples_split', 2, 10),
        'randomforestclassifier__min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 10),
        'randomforestclassifier__max_features': trial.suggest_categorical('max_features', ['sqrt', 'log2', None])
    }

    pipeline.set_params(**params)
    scores = cross_val_score(pipeline, X_train, y_train, cv=kfold, scoring='f1', n_jobs=-1)
    return scores.mean()

study = optuna.create_study(direction='maximize', sampler=TPESampler())
study.optimize(objective, n_trials=100, n_jobs=-1)

print("Best Trial:", study.best_trial)

best_params = study.best_params
pipeline.set_params(**best_params)
pipeline.fit(X_train, y_train)

y_pred_prob = pipeline.predict_proba(X_test)[:, 1]

precisions, recalls, thresholds = precision_recall_curve(y_test, y_pred_prob)
optimal_idx = np.argmax(2 * (precisions * recalls) / (precisions + recalls + 1e-8))
optimal_threshold = thresholds[optimal_idx]
print(f"Optimal threshold for precision-recall tradeoff: {optimal_threshold:.4f}")

y_pred = (y_pred_prob >= optimal_threshold).astype(int)

print("\nOptimized Metrics:")
print("Accuracy: ", accuracy_score(y_test, y_pred))
print("Precision: ", precision_score(y_test, y_pred))
print("Recall: ", recall_score(y_test, y_pred))
print("F1 Score: ", f1_score(y_test, y_pred))
print("ROC-AUC Score: ", roc_auc_score(y_test, y_pred_prob))
print("\nClassification Report:\n", classification_report(y_test, y_pred))