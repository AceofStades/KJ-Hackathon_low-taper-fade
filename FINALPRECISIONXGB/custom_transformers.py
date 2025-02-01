# custom_transformers.py

from sklearn.base import BaseEstimator, TransformerMixin

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
