import streamlit as st
import pandas as pd
import joblib
import json
import os
import psutil
from custom_transformers import FeatureEngineer, DropColumnsTransformer

data = st.file_uploader("Upload a CSV file", type=["csv"])

def exitapp():
    exit_app = st.button("Done")
    if exit_app:
        pid = os.getpid()
        p = psutil.Process(pid)
        p.terminate()

if data is not None:
    df = pd.read_csv(data)

    model_choice = st.radio("Select a model to run:", ("None", "Recall Model", "Precision Model"))

    if model_choice == "Recall Model":
        try:
            loaded_pipeline = joblib.load('telco_churn_pipeline.joblib')
            st.write("✅ Pipeline loaded successfully!")

            with open('optimal_threshold.json', 'r') as f:
                threshold_data = json.load(f)

            optimal_threshold = threshold_data.get('optimal_threshold', 0.5)
            st.write(f"🔹 Optimal threshold: {optimal_threshold}")

            predicted_probabilities = loaded_pipeline.predict_proba(df)[:, 1]
            df['Churn Probability'] = predicted_probabilities

            df.to_csv("../modified_data.csv", index=False)

            st.success("🎯 Recall Model Run Successfully!")
            st.write(df.head())
        except Exception as e:
            st.error(f"❌ Error running Recall Model: {e}")
        exitapp()

    elif model_choice == "Precision Model":
        try:
            loaded_pipeline = joblib.load('telco_churn_pipeline2.joblib')
            st.write("✅ Pipeline loaded successfully!")

            with open('optimal_threshold.json', 'r') as f:
                threshold_data = json.load(f)

            optimal_threshold = threshold_data.get('optimal_threshold2', 0.5)
            st.write(f"🔹 Optimal threshold: {optimal_threshold}")

            predicted_probabilities = loaded_pipeline.predict_proba(df)[:, 1]
            df['Churn Probability'] = predicted_probabilities

            df.to_csv("../modified_data.csv", index=False)

            st.success("🎯 Precision Model Run Successfully!")
            st.write(df.head())
        except Exception as e:
            st.error(f"❌ Error running Precision Model: {e}")
        exitapp()


else:
    st.info("📂 Please upload a CSV file to proceed.")
