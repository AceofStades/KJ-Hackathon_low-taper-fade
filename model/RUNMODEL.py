import pandas as pd
import joblib
import json
from custom_transformers import FeatureEngineer, DropColumnsTransformer

loaded_pipeline = joblib.load('telco_churn_pipeline.joblib')
print("Pipeline loaded successfully!")

with open('optimal_threshold.json', 'r') as f:
    threshold_data = json.load(f)
optimal_threshold = threshold_data.get('optimal_threshold', 0.5)
print("Optimal threshold loaded:", optimal_threshold)

sample_data = {
'customerID': ['5299-RULOA'],
    'gender': ['Female'],
    'SeniorCitizen': [0],
    'Partner': ['Yes'],
    'Dependents': ['Yes'],
    'tenure': [10],
    'PhoneService': ['Yes'],
    'MultipleLines': ['Yes'],
    'InternetService': ['Fiber optic'],
    'OnlineSecurity': ['Yes'],
    'OnlineBackup': ['No'],
    'DeviceProtection': ['No'],
    'TechSupport': ['No'],
    'StreamingTV': ['Yes'],
    'StreamingMovies': ['Yes'],
    'Contract': ['Month-to-month'],
    'PaperlessBilling': ['Yes'],
    'PaymentMethod': ['Electronic check'],
    'MonthlyCharges': [100.25],
    'TotalCharges': [1064.65],
}
# sample_df = pd.DataFrame(sample_data)
sample_df = pd.read_csv("../data.csv")

predicted_probabilities = loaded_pipeline.predict_proba(sample_df)[:, 1]
print("Predicted churn probability:", predicted_probabilities[0])

binary_prediction = int(predicted_probabilities[0] >= optimal_threshold)
print("Predicted churn (binary):", binary_prediction)
