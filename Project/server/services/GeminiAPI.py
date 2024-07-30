import time
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel('gemini-1.5-pro-latest')

class GeminiAPI:
    @staticmethod
    def generate_content(query):
        try:
            start_time = time.time()
            response = model.generate_content(query)
            end_time = time.time()
            duration = end_time - start_time
            print(f"Gemini response generation took {duration:.2f} seconds")
            return response.text, duration
        except Exception as e:
            raise Exception(f"Error generating content: {str(e)}")
