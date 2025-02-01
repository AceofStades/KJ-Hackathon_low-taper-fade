import shap
import joblib
import pandas as pd
import json
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from custom_transformers import FeatureEngineer, DropColumnsTransformer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
from sklearn.model_selection import cross_val_score
from sklearn.calibration import calibration_curve
from sklearn.model_selection import learning_curve

pipeline = joblib.load('telco_churn_pipeline.joblib')

df = pd.read_csv("Telco-Customer-Churn.csv")
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce').fillna(0)

X = df.drop(['Churn'], axis=1)
y = df['Churn'].map({'Yes': 1, 'No': 0})

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

feature_engineer = FeatureEngineer()
drop_columns = DropColumnsTransformer(columns=['customerID'])

X_train_transformed = feature_engineer.fit_transform(X_train)
X_train_transformed = drop_columns.fit_transform(X_train_transformed)

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

X_train_transformed = preprocessor.fit_transform(X_train_transformed)

numeric_feature_names = numeric_features
categorical_feature_names = preprocessor.transformers_[1][1].get_feature_names_out(categorical_features)
all_feature_names = numeric_feature_names + list(categorical_feature_names)

explainer = shap.Explainer(pipeline.named_steps['classifier'], X_train_transformed)
shap_values = explainer(X_train_transformed)

shap_values.feature_names = all_feature_names



train_sizes, train_scores, val_scores = learning_curve(pipeline, X_train, y_train, cv=5, train_sizes=np.linspace(0.1, 1.0, 5))
plt.plot(train_sizes, np.mean(train_scores, axis=1), label='Training Score')
plt.plot(train_sizes, np.mean(val_scores, axis=1), label='Validation Score')
plt.title("Learning Curve )")
plt.xlabel('Training Size')
plt.ylabel('Score')
plt.legend()
plt.show()
fpr, tpr, thresholds = roc_curve(y_test, pipeline.predict_proba(X_test)[:, 1])
roc_auc = auc(fpr, tpr)

plt.figure()
plt.plot(fpr, tpr, color='darkorange', lw=2, label='ROC curve (area = %0.2f)' % roc_auc)
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.show()
shap.summary_plot(shap_values)
plt.savefig("shap_summary_plot.png")

shap.summary_plot(shap_values, plot_type="bar")
plt.savefig("shap_bar_plot.png")

