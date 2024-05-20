package users

import (
	usersModels "ProyectoArquiCompu1/domain/users"
	usersServices "ProyectoArquiCompu1/services/users"
	"github.com/gin-gonic/gin"
)

func Login(context *gin.Context) {
	var loginRequest usersModels.LoginRequest
	context.BindJSON(&loginRequest)
	response := usersServices.Login(loginRequest)
	context.JSON(200, response)
}