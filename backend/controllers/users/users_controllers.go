package users

/*import (
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

package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login(c *gin.Context) {
	var creds services.Credentials
	if err := c.BindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	token, err := services.Authenticate(creds)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}*/
