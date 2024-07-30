import time
from llama_cpp import Llama

llama_model = Llama(model_path="./models/llama-2-7b-chat.Q4_K_M.gguf")

class LlamaAPI:
    @staticmethod
    def generate_content(query):
        try:
            start_time = time.time()
            output = llama_model(
                f"Human: {query}\n\nAssistant:",
                max_tokens=256,
                stop=["Human:", "\n\nHuman:"],
                echo=False
            )
            end_time = time.time()
            response = output['choices'][0]['text'].strip()
            duration = end_time - start_time
            print(f"Llama response generation took {duration:.2f} seconds")
            if response:
                return response, duration
            else:
                return "I'm sorry, I don't have a response for that.", duration
        except Exception as e:
            raise Exception(f"Error generating content: {str(e)}")
