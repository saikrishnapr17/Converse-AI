import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from services.LlamaAPI import LlamaAPI
from services.GeminiAPI import GeminiAPI
from services.UserManager import UserManager

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    success, message = UserManager.create_user(data.get("email"), data.get("password"))
    return jsonify({"message": message}), 201 if success else 400

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    success, message = UserManager.authenticate_user(data.get("email"), data.get("password"))
    return jsonify({"message": message}), 200 if success else 401

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        query = data.get("query")
        model_choice = data.get("model", "gemini")
        
        if model_choice == "llama":
            generated_text, duration = LlamaAPI.generate_content(query)
        else:
            generated_text, duration = GeminiAPI.generate_content(query)
        
        return jsonify({"result": generated_text, "duration": duration}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
