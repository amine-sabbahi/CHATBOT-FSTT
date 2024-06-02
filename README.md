# ChatBot with Next.js, Ollama, Flask, and Docker

This repository contains a chatbot application with two model options: Retrieval-Augmented Generation (RAG) and a fine-tuned model. The application is built using Next.js, Ollama, Flask, and Docker.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
  - [RAG (Retrieval-Augmented Generation)](#rag-retrieval-augmented-generation)
  - [Fine-Tuned Model](#fine-tuned-model)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project demonstrates the implementation of a chatbot with two model options: Retrieval-Augmented Generation (RAG) and a fine-tuned model. The frontend is developed with Next.js, and the backend services are handled using Flask. Docker is used to containerize the application for easy deployment and scalability.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Ollama**: A library for natural language processing.
- **Flask**: A lightweight WSGI web application framework in Python.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **CHromaDB** : A vector database for context retreving.

## Architecture

### RAG (Retrieval-Augmented Generation)

Retrieval-Augmented Generation (RAG) is a hybrid model architecture that combines the strengths of retrieval-based and generative models. It retrieves relevant documents or passages from a knowledge base and then generates a response based on the retrieved information. This approach enhances the chatbot's ability to provide accurate and contextually relevant answers.

1. **Retrieval Module**: This module searches a knowledge base to find the most relevant documents or passages related to the user's query. In our implementation, we use **ChromaDB** for efficient retrieval and management of large text datasets.
2. **Generator Module**: After retrieving the relevant information, the generator module, powered by **Ollama**, uses it to produce a coherent and contextually appropriate response.

#### How RAG Works

1. **User Query**: The process begins when a user submits a query to the chatbot.
2. **Document Retrieval**: The retrieval module queries ChromaDB to find the most relevant documents or passages that match the user's query.
3. **Information Processing**: The retrieved information is then passed to the generator module.
4. **Response Generation**: The generator module (Ollama) processes the information and generates a response based on the retrieved documents.
5. **Response Delivery**: The generated response is sent back to the user.

### Fine-Tuned Model

The fine-tuned model approach involves taking a pre-trained language model and further training it on a specific dataset to adapt it to the chatbot's domain. This customization allows the model to understand and respond to queries more accurately within the specific context.

1. **Pre-trained Model**: Start with a pre-trained language model such as gemma.
2. **Fine-Tuning**: Train the model further on a dataset specific to the chatbot's use case, enabling it to learn domain-specific language and responses.

