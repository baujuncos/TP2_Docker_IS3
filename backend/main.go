package main

import (
	"final/router"
	"github.com/gin-gonic/gin"
)

func main() {
	// ej. http://localhost:8080/users/login

	engine := gin.New()
	router.MapUrls(engine)
	engine.Run(":8080")
}