package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/api/creators", getTopCreators).Methods("GET")
    log.Println("Starting server on :8080...")
    log.Fatal(http.ListenAndServe(":8080", r))
}