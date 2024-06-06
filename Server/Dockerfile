
FROM gcc:latest

RUN apt-get update && \
    apt-get install -y python3 python3-pip

RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app
# docker build -t cpp-python-sandbox .