package users

import (
	"backend/db"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func ListarCursosUsuario(c *gin.Context) {
	// Obtener el ID del usuario de la URL
	userIdStr := c.Param("id_usuario")
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de usuario no válido"})
		return
	}

	// Consultar la base de datos para obtener los cursos del usuario
	cursosUsuario, err := db.GetCursosUsuario(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener los cursos del usuario"})
		return
	}

	// Devolver los cursos encontrados como respuesta
	c.JSON(http.StatusOK, cursosUsuario)
}

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
