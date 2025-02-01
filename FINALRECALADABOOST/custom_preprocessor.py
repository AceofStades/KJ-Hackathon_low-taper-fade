import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import StandardScaler, OneHotEncoder

class CustomPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.scaler = StandardScaler()
        self.encoder = OneHotEncoder(sparse_output=False, drop='first')
        self.num_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'AvgChargePerMonth', 'num_services']
        self.categorical_features = ['gender', 'Partner', 'Dependents', 'tenure_bucket',
                                     'Contract', 'PaperlessBilling', 'PaymentMethod', 'Contract_Payment']

    def _tenure_bucket(self, tenure):
        if tenure <= 12:
            return '0-12'
        elif tenure <= 24:
            return '13-24'
        elif tenure <= 48:
            return '25-48'
        elif tenure <= 60:
            return '49-60'
        else:
            return '60+'

    def _preprocess(self, X):
        X = X.copy()
        X['TotalCharges'] = X['TotalCharges'].astype(str).str.strip()  
        X['TotalCharges'] = pd.to_numeric(X['TotalCharges'], errors='coerce')
        X['TotalCharges'] = X['TotalCharges'].fillna(X['TotalCharges'].median())
        X['MonthlyCharges'] = X['MonthlyCharges'].fillna(X['MonthlyCharges'].median())
        service_cols = [
            'PhoneService', 'MultipleLines', 'OnlineSecurity', 'OnlineBackup', 
            'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies'
        ]
        for col in service_cols:
            X[col] = X[col].map({'Yes': 1, 'No': 0, 'No internet service': 0, 'No phone service': 0})
        X['num_services'] = X[service_cols].sum(axis=1)
        X['tenure_bucket'] = X['tenure'].apply(self._tenure_bucket)
        X['AvgChargePerMonth'] = np.where(X['tenure'] > 0, X['TotalCharges'] / X['tenure'], X['MonthlyCharges'])
        X['Contract_Payment'] = X['Contract'] + '_' + X['PaymentMethod']
        X['has_internet'] = X['InternetService'].apply(lambda x: 0 if x == 'No' else 1)
        return X

    def fit(self, X, y=None):
        X_processed = self._preprocess(X)
        X_processed = pd.get_dummies(X_processed, columns=self.categorical_features, drop_first=True)

        self.encoder.fit(X[['InternetService']])

        X_processed = X_processed.drop(['InternetService'], axis=1)

        self.scaler.fit(X_processed[self.num_cols])

        self.dummy_columns_ = X_processed.columns.tolist()
        self.encoder_columns_ = list(self.encoder.get_feature_names_out(['InternetService']))
        self.feature_names_ = self.dummy_columns_ + self.encoder_columns_
        return self

    def transform(self, X, y=None):
        X = X.copy()
        X_processed = self._preprocess(X)
        X_processed = pd.get_dummies(X_processed, columns=self.categorical_features, drop_first=True)

        X_processed = X_processed.drop(['InternetService'], axis=1)
        encoded = pd.DataFrame(self.encoder.transform(X[['InternetService']]),
                               columns=self.encoder.get_feature_names_out(['InternetService']),
                               index=X.index)

        X_processed = pd.concat([X_processed, encoded], axis=1)

        X_processed[self.num_cols] = self.scaler.transform(X_processed[self.num_cols])

        X_processed = X_processed.reindex(columns=self.feature_names_, fill_value=0)
        return X_processed