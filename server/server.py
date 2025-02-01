from flask import Flask, jsonify, send_from_directory
import pandas as pd
import os

app = Flask(__name__)

# Load data from CSV
def load_data():
    file_path = "data.csv"
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
        return df.to_dict(orient="records")
    return []

@app.route("/")
def serve_dashboard():
    return send_from_directory(".", "../frontend/dashboard.html")

@app.route("/data")
def get_data():
    return jsonify(load_data())

@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    app.run(debug=True)
