package main

import (
	"final/db"
	"log"
	"net/http"
)

func main() {
	db.GetDB()

	log.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
