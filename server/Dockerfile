# Backend Dockerfile
FROM golang:1.20-alpine
WORKDIR /app

# Kopiowanie modułu i kodu
COPY go.mod main.go .
# Pobranie i uporządkowanie zależności
RUN go mod tidy

# Build aplikacji
RUN go build -o server .

EXPOSE 8080
CMD ["./server"]
