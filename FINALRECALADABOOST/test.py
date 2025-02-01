import pandas as pd
import joblib
from custom_preprocessor import CustomPreprocessor  

pipeline = joblib.load('churn_model.pkl')

new_data = pd.DataFrame({
    'customerID': ['9560-BBZXK'],
    'gender': ['Female'],
    'SeniorCitizen': [0],
    'Partner': ['No'],
    'Dependents': ['No'],
    'tenure': [36],
    'PhoneService': ['No'],
    'MultipleLines': ['No phone service'],
    'InternetService': ['DSL'],
    'OnlineSecurity': ['Yes'],
    'OnlineBackup': ['No'],
    'DeviceProtection': ['No'],
    'TechSupport': ['No'],
    'StreamingTV': ['No'],
    'StreamingMovies': ['No'],
    'Contract': ['Two year'],
    'PaperlessBilling': ['No'],
    'PaymentMethod': ['Bank transfer (automatic)'],
    'MonthlyCharges': [31.05],
    'TotalCharges': [1126.35],
})


y_pred = pipeline.predict(new_data)
y_pred_prob = pipeline.predict_proba(new_data)[:, 1]
print("Predicted Churn (0 = No, 1 = Yes):", y_pred[0])

print("Probability of Churn:", y_pred_prob[0])
