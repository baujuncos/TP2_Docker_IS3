package controllers

import (
	"ProyectoArquiCompu1/services"
	"github.com/gin-gonic/gin"
)

// CONTROLLER
func GetMessage(context *gin.Context) {
	message := context.Query("message")
	result := services.GetResult(message)

	context.JSON(200, result)
}
