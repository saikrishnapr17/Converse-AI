import json
import os
from werkzeug.security import generate_password_hash, check_password_hash

USER_FILE = 'users.json'

def load_users():
    if os.path.exists(USER_FILE):
        with open(USER_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USER_FILE, 'w') as f:
        json.dump(users, f)

users = load_users()

class UserManager:
    @staticmethod
    def create_user(email, password):
        if email in users:
            return False, "User already exists"
        users[email] = generate_password_hash(password)
        save_users(users)
        return True, "User created successfully"

    @staticmethod
    def authenticate_user(email, password):
        if email not in users or not check_password_hash(users[email], password):
            return False, "Invalid email or password"
        return True, "Login successful!"
