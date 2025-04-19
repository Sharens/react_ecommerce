package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Available   bool    `json:"available"`
}

var products = []Product{
	{1, "Koszulka T-shirt", "Bawełniana koszulka", 29.99, true},
	{2, "Jeansy", "Dżinsowe spodnie", 99.99, true},
	{3, "Bluza z kapturem", "Komfortowa bluza z kapturem", 119.99, false},
	{4, "Kurtka zimowa", "Ciepła kurtka na zimę", 249.99, true},
}

func productsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func paymentsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	// Można tu walidować dane płatności
	response := map[string]interface{}{ "success": true, "message": "Płatność przetworzona poprawnie" }
	json.NewEncoder(w).Encode(response)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/products", productsHandler)
	mux.HandleFunc("/api/payments", paymentsHandler)

	handler := cors.AllowAll().Handler(mux)
	log.Println("Serwer uruchomiony na porcie 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
