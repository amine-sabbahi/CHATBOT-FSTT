from transformers import AutoModel, AutoTokenizer

# Specify the model name
model_name = "sentence-transformers/all-mpnet-base-v2"

# Download and save the model locally
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

# Save the model to a local directory
model.save_pretrained("/root/all-mpnet-base-v2")
tokenizer.save_pretrained("/root/all-mpnet-base-v2")