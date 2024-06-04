from uuid import uuid4
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import redis
import json
from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CHROMA_PATH = "./chroma"
local_model_path = "/root/all-mpnet-base-v2"

# Initialize Redis client
redis_client = redis.StrictRedis(host='redis', port=6379, decode_responses=True)

# Initialize the embedding model and Chroma DB once
embedding_model = HuggingFaceEmbeddings(model_name=local_model_path)
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_model)
model = Ollama(model="gemma:2b-instruct", base_url="http://ollama:11434")

# Define the prompt template
PROMPT_TEMPLATE = """
Répondez à la question en vous basant sur le contexte suivant:

{context}

---

Répondez à la question en fonction du contexte ci-dessus : {question}

Si vous ne trouvez pas de réponse dans le contexte, répondez selon vos connaissances générales.
"""


def query_rag(query_text: str):
    # Search the DB
    results = db.similarity_search_with_score(query_text, k=15)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

    # Format the prompt
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # Print the prompt for debugging
    print("Prompt to the model:")
    print(prompt)

    # Invoke the model with the formatted prompt
    response_text = model.invoke(prompt)

    return response_text

# Importing the fine tuned model
# Load the model and tokenizer
model_path = "./FSTT Fine Tuned Model/B11-Confusion-V1"
model2 = AutoModelForCausalLM.from_pretrained(model_path, local_files_only=True)
tokenizer2 = AutoTokenizer.from_pretrained(model_path, local_files_only=True)

def query_fine_tuned_model(question, model, tokenizer, max_length=200):
    prompt_template = f""" Please answer  the following question directly and concisely, providing only the most 
    relevant information.Answer in french language. 
        Question: {question}
        Answer: 
    """

    inputs = tokenizer.encode(prompt_template, return_tensors="pt")
    outputs = model.generate(inputs, max_length=max_length, num_return_sequences=1, eos_token_id=tokenizer.eos_token_id)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)

    print(response)
    # Extract the answer part from the template
    answer_start = response.find("Answer:") + len("Answer: ")
    answer = response[answer_start:].strip()
    return answer

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query')
    session_id = data.get('sessionId')
    conversation_id = data.get('conversationId')
    id_m = data.get('id')
    model_name = data.get('model_name')  # Read the model name from the request data
    print(model_name)
    if not query_text:
        return jsonify({"error": "Query text is required"}), 400
    if not session_id:
        return jsonify({"error": "Session ID is required"}), 400
    if not conversation_id:
        return jsonify({"error": "Conversation ID is required"}), 400

    # Store user message in Redis with a unique ID
    redis_client.rpush(f"session:{session_id}:conversation:{conversation_id}:messages",
                       json.dumps({"id": id_m, "role": "user", "content": query_text}))

    # Get the AI's response based on the selected model
    if model_name == 'gemma (RAG)':
        response_text = query_rag(query_text)
    elif model_name == 'gemma (Fine Tuned)':  # Default to fine-tuned model
        response_text = query_fine_tuned_model(query_text, model2, tokenizer2)

    # Generate a unique ID for the AI's response message
    ai_message_id = str(uuid4())

    # Store AI message in Redis with a unique ID
    redis_client.rpush(f"session:{session_id}:conversation:{conversation_id}:messages",
                       json.dumps({"id": ai_message_id, "role": "ai", "content": response_text}))

    return jsonify({
        "ai": response_text,
        "messageId": ai_message_id  # Return the AI message ID for reference if needed
    })


@app.route('/api/history/<string:session_id>/<string:conversation_id>', methods=['GET'])
def get_history(session_id, conversation_id):
    # Retrieve the messages from Redis
    messages = redis_client.lrange(f"session:{session_id}:conversation:{conversation_id}:messages", 0, -1)
    messages = [json.loads(message) for message in messages]

    return jsonify(messages)


@app.route('/api/conversations/<string:session_id>', methods=['POST'])
def get_conversation_ids(session_id):
    # Retrieve all conversation IDs for the given session ID from Redis
    conversation_ids = redis_client.keys(f"session:{session_id}:conversation:*")
    print(conversation_ids)
    # Extract conversation IDs from Redis keys
    conversation_ids = [key.split(":")[3] for key in conversation_ids]
    print(conversation_ids)

    return jsonify({
        "conversation_ids": conversation_ids
    })


@app.route('/api/deleteConversation/<string:session_id>/<string:conversation_id>', methods=['DELETE'])
def delete_conversation(session_id, conversation_id):
    # Delete all keys related to the conversation
    keys_to_delete = redis_client.keys(f"session:{session_id}:conversation:{conversation_id}:*")
    if keys_to_delete:
        redis_client.delete(*keys_to_delete)
    return jsonify({"message": "Conversation deleted successfully"})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
