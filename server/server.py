from flask import Flask, jsonify, send_from_directory, request
from flask_socketio import SocketIO, emit
import pandas as pd
import os
import time

app = Flask(__name__, static_folder="../frontend", template_folder="../frontend")
socketio = SocketIO(app, cors_allowed_origins="*")

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Upload CSV and rename it to data.csv
UPLOAD_FOLDER = "../"
ALLOWED_EXTENSIONS = {"csv"}

# Load data from CSV
def load_data():
    file_path = "../data.csv"
    if os.path.exists(file_path):
        df = pd.read_csv(file_path)
        return df.to_dict(orient="records")
    return []

# Route for the main dashboard
@app.route("/")
def serve_dashboard():
    return send_from_directory("../frontend", "dashboard.html")

# Route to serve landing.html
@app.route("/landing")
def serve_landing():
    send_notification("Welcome to the internet")
    return send_from_directory("../frontend", "landing.html")

# Serve static files (CSS, JS)
@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory("../frontend", filename)

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory("../frontend/assets", filename)

app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"status": "error", "message": "No file part"})

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"status": "error", "message": "No selected file"})

    if file and allowed_file(file.filename):
        file_path = os.path.join(UPLOAD_FOLDER, "data.csv")
        file.save(file_path)
        return jsonify({"status": "success", "message": "File uploaded successfully!"})

    return jsonify({"status": "error", "message": "Invalid file format. Only CSV allowed."})

@app.route("/upload_page")
def serve_upload_page():
    return send_from_directory("../frontend", "upload.html")

@app.route("/data")
def get_data():
    return jsonify(load_data())

# Handle WebSocket connection
@socketio.on("connect")
def handle_connect():
    print("Client connected!")
    emit("new_notification", {"message": "Connected to notification service!"})

# Send notifications dynamically
def send_notification(message):
    """Emit notification to all connected clients."""
    socketio.emit("new_notification", {"message": message}, to=None)

# Background notification loop
def notification_loop():
    messages = [
        "New episode of 'Stranger Things' is out!",
        "Your favorite movie 'Inception' is now available in 4K!",
        "Limited-time offer: Get 20% off on Premium subscription!",
    ]
    for msg in messages:
        socketio.sleep(3)
        send_notification(msg)
    socketio.sleep(3)
    send_notification("Sigma")

if __name__ == "__main__":
    socketio.start_background_task(notification_loop)
    socketio.run(app, debug=True, use_reloader=False)
