package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/creators", getCreators).Methods("GET")
	r.HandleFunc("/api/creators/{creatorId}", getCreatorDetails).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Starting server on :8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
