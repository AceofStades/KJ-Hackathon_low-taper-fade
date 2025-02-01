import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import (accuracy_score, precision_score, recall_score, f1_score, 
                             roc_auc_score, classification_report, confusion_matrix, 
                             precision_recall_curve, PrecisionRecallDisplay)
from imblearn.combine import SMOTETomek
from imblearn.pipeline import make_pipeline as make_imb_pipeline
import xgboost as xgb
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
    df['family_size'] = df['Partner'].map({'Yes':1, 'No':0}) + df['Dependents'].map({'Yes':1, 'No':0})
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
    SMOTETomek(sampling_strategy=0.75, random_state=42),
    xgb.XGBClassifier(
        objective='binary:logistic',
        eval_metric='logloss',
        random_state=42,
        tree_method='hist'
    )
)

X = df.drop(['customerID', 'Churn'], axis=1)
y = df['Churn'].map({'Yes': 1, 'No': 0})
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, 
                                                    stratify=y, random_state=42)

kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

def objective(trial):
    params = {
        'xgbclassifier__learning_rate': trial.suggest_float('xgbclassifier__learning_rate', 0.01, 0.3),
        'xgbclassifier__max_depth': trial.suggest_int('xgbclassifier__max_depth', 3, 12),
        'xgbclassifier__n_estimators': trial.suggest_int('xgbclassifier__n_estimators', 100, 500),
        'xgbclassifier__subsample': trial.suggest_float('xgbclassifier__subsample', 0.5, 1.0),
        'xgbclassifier__colsample_bytree': trial.suggest_float('xgbclassifier__colsample_bytree', 0.5, 1.0),
        'xgbclassifier__gamma': trial.suggest_float('xgbclassifier__gamma', 0, 0.5),
        'xgbclassifier__scale_pos_weight': trial.suggest_float('xgbclassifier__scale_pos_weight', 1, 5),
        'xgbclassifier__min_child_weight': trial.suggest_int('xgbclassifier__min_child_weight', 1, 10),
        'xgbclassifier__reg_alpha': trial.suggest_float('xgbclassifier__reg_alpha', 0, 10),
        'xgbclassifier__reg_lambda': trial.suggest_float('xgbclassifier__reg_lambda', 0, 10),
    }

    pipeline.set_params(**params)
    scores = cross_val_score(pipeline, X_train, y_train, cv=kfold, scoring='precision', n_jobs=-1)
    return scores.mean()

study = optuna.create_study(direction='maximize', sampler=TPESampler())
study.optimize(objective, n_trials=500, n_jobs=-1)

print("Best Trial:", study.best_trial)

best_params = study.best_params
pipeline.set_params(**best_params)
pipeline.fit(X_train, y_train)

y_pred_prob = pipeline.predict_proba(X_test)[:, 1]

precisions, recalls, thresholds = precision_recall_curve(y_test, y_pred_prob)

target_precision = 0.70
target_recall = 0.40

best_threshold = None
best_precision = 0
best_recall = 0

for i, threshold in enumerate(thresholds):
    precision = precisions[i]
    recall = recalls[i]

    if precision >= target_precision and recall >= target_recall:
        best_precision = precision
        best_recall = recall
        best_threshold = threshold
        break

if best_threshold is None:
    best_threshold = thresholds[np.argmax(np.abs(precisions - target_precision) + np.abs(recalls - target_recall))]

print(f"Selected Threshold: {best_threshold}")
print(f"Precision at this threshold: {best_precision}")
print(f"Recall at this threshold: {best_recall}")

y_pred_optimal = (y_pred_prob >= best_threshold).astype(int)

print("Optimized Metrics with Custom Threshold:")
print("Accuracy: ", accuracy_score(y_test, y_pred_optimal))
print("Precision: ", precision_score(y_test, y_pred_optimal))
print("Recall: ", recall_score(y_test, y_pred_optimal))
print("F1 Score: ", f1_score(y_test, y_pred_optimal))
print("ROC-AUC Score: ", roc_auc_score(y_test, y_pred_prob))

print("\nClassification Report:\n", classification_report(y_test, y_pred_optimal))

conf_matrix = confusion_matrix(y_test, y_pred_optimal)
print("\nConfusion Matrix:\n", conf_matrix)

PrecisionRecallDisplay.from_estimator(pipeline, X_test, y_test)
