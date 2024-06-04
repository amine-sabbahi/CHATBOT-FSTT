# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV CHROMADB_HOST=localhost
ENV CHROMADB_PORT=5432
ENV CHROMADB_USER=chromadb_user
ENV CHROMADB_PASSWORD=chromadb_password
ENV CHROMADB_DB=chromadb

# Install necessary packages
RUN apt-get update && apt-get install -y \
    postgresql-client \
 && rm -rf /var/lib/apt/lists/*

# Create a directory for the application and set it as the working directory
WORKDIR /app

# Install any needed packages specified in requirements.txt
RUN pip install pypdf langchain chromadb pytest unstructured  langchain-community langchain-chroma
RUN pip install sentence-transformers
RUN pip install flask flask_cors
RUN pip install redis
RUN pip install transformers
RUN pip install accelerate

# Copy the current directory contents into the container at /app
COPY ./Back-end(Flask) /app


# Expose the port the app runs on
EXPOSE 5000

# Define environment variable for running the application
ENV PYTHONUNBUFFERED=1
RUN python save_model_embbedding.py
#RUN python populate_database.py

# Command to run the application
CMD ["python", "app.py"]
