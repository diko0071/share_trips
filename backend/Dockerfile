FROM python:3.12.3-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    curl

COPY requirements.txt .

RUN pip install --upgrade pip && pip install --default-timeout=100 -r requirements.txt

COPY . .
