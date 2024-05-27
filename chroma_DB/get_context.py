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

# Define the prompt template
PROMPT_TEMPLATE = """
Répondez à la question en vous basant uniquement sur le contexte suivant :

{context}

---

Répondez à la question en fonction du contexte ci-dessus : {question}

Si vous ne trouvez pas de réponse dans le contexte, répondez selon vos connaissances générales.
"""


def query_rag(query_text: str):
    # Prepare the DB.
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=HuggingFaceEmbeddings(model_name=local_model_path))

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    
    model = Ollama(model="gemma:2b-instruct", base_url="http://ollama:11434")
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    #print(formatted_response)
    return response_text

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query')
    
    if not query_text:
        return jsonify({"error": "Query text is required"}), 400
    
    context_text = query_rag(query_text)
    print(context_text)
    return jsonify({
        "ai": context_text,
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
