package main

import (
	"backend/db"
	"backend/router"
	"log"
)

func main() {
	db.InitDB()

	err := db.UpdateUserPasswords()
	if err != nil {
		log.Fatal("Error al actualizar las contraseñas de los usuarios:", err)
	}

	r := router.SetupRouter()

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
