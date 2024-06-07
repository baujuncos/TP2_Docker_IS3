package inscripciones

import (
	"backend/domain"
	"backend/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Subscribe(c *gin.Context) {
	var request domain.SubscribeRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{
			Message: fmt.Sprintf("Invalid request: %s", err.Error()),
		})
		return
	}

	// Verificar si el usuario ya está suscrito al curso
	subscribed, err := services.IsSubscribed(request.IdUsuario, request.IdCurso)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{
			Message: fmt.Sprintf("Error checking subscription: %s", err.Error()),
		})
		return
	}

	if subscribed {
		c.JSON(http.StatusConflict, domain.Response{
			Message: fmt.Sprintf("Usuario %d ya está suscrito al curso %d", request.IdUsuario, request.IdCurso),
		})
		return
	}

	if err := services.Subscribe(request.IdUsuario, request.IdCurso); err != nil {
		c.JSON(http.StatusConflict, domain.Response{
			Message: fmt.Sprintf("Error al subscribirse; %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusCreated, domain.Response{
		Message: fmt.Sprintf("Usuario %d inscripto exitosamente al curso %d", request.IdUsuario, request.IdCurso),
	})
}
