# Use the official Python image as a parent image
FROM ubuntu:22.04

# Set the working directory to /app
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get -y install libzbar0 && apt-get -y ffmpeg

RUN apt -y install python3 && apt install -y python3-pip
# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Command to run your application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
