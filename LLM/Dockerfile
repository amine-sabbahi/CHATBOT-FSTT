# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir flask langchain_ai21

# Expose the Flask port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
