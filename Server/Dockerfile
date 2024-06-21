FROM gcc:latest

RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    default-jdk

WORKDIR /usr/src/app

SHELL ["/bin/bash", "-c"]

# docker build -t cpp-java-python-sandbox .
