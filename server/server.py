from flask import Flask, jsonify, send_from_directory
from flask_socketio import SocketIO
import pandas as pd
import os
import time

app = Flask(__name__, static_folder="../frontend", template_folder="../frontend")
socketio = SocketIO(app, cors_allowed_origins="*")

# Load data from CSV
def load_data():
    file_path = "data.csv"
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
        return df.to_dict(orient="records")
    return []

# Send notifications dynamically
def send_notification(message):
    """Emit notification to all connected clients."""
    socketio.emit("notification", {"message": message})

# Route for the main dashboard
@app.route("/")
def serve_dashboard():
    return send_from_directory("../frontend", "dashboard.html")

# Route to serve landing.html
@app.route("/landing")
def serve_landing():
    return send_from_directory("../frontend", "landing.html")
    send_notification("Welcome to the internet")

# Serve static files (CSS, JS)
@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory("../frontend", filename)

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory("../frontend/assets", filename)

@app.route("/data")
def get_data():
    return jsonify(load_data())

# Simulate sending notifications every 10 seconds
def notification_loop():
    messages = [
        "New episode of 'Stranger Things' is out!",
        "Your favorite movie 'Inception' is now available in 4K!",
        "Limited-time offer: Get 20% off on Premium subscription!",
    ]
    while True:
        for msg in messages:
            socketio.sleep(10)  # Wait 10 seconds before sending the next notification
            send_notification(msg)

if __name__ == "__main__":
    socketio.start_background_task(notification_loop)  # Run notification loop in background
    socketio.run(app, debug=True)
