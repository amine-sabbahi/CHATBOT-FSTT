import os
from flask import Flask, request, jsonify
from langchain_ai21 import AI21ContextualAnswers

# Set the AI21 API key from environment variable
os.environ["AI21_API_KEY"] = "goybNk7ZOtZk7thPKPVFYkE68vYd4oti"

# Create a Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.json

    # Check if both context and question are provided
    if 'context' not in data or 'question' not in data:
        return jsonify({'error': 'Context and question are required.'}), 400

    # Instantiate the model
    model = AI21ContextualAnswers()

    # Invoke the model with the provided context and question
    response = model.invoke(input=data)

    # Return the result as JSON
    return jsonify({'response': response}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
