package users

import (
	"backend/domain"
	"backend/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Login(c *gin.Context) {
	var creds domain.Credentials //Recordar: credenciales son solo username y password

	if err := c.BindJSON(&creds); err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{Message: fmt.Sprintf("Invalid request: %s", err.Error())})
		return
	}

	token, err := services.Login(creds.Username, creds.Password)

	if err != nil {
		c.JSON(http.StatusUnauthorized, domain.Response{
			Message: fmt.Sprintf("Unauthorized login: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, domain.LoginResponse{
		Token: token,
	})
}
