from flask import Flask, request, jsonify
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

app = Flask(__name__)

CHROMA_PATH = "./chroma"

def query_rag(query_text: str):
    # Prepare the DB.
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2"))

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    sources = [doc.metadata.get("id", None) for doc, _score in results]
    
    return context_text, sources

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    query_text = data.get('query')
    
    if not query_text:
        return jsonify({"error": "Query text is required"}), 400
    
    context_text, sources = query_rag(query_text)
    
    return jsonify({
        "context": context_text,
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
