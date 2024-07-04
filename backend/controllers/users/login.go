package users

import (
	"backend/db"
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
	} //Verifica si hay error en la request

	token, err := services.Login(creds.Username, creds.Password)

	if err != nil {
		c.JSON(http.StatusUnauthorized, domain.Response{
			Message: fmt.Sprintf("Unauthorized login: %s", err.Error()),
		})
		return
	} // Va en services

	id, err := db.GetUserIDByUsername(creds.Username)

	c.JSON(http.StatusOK, domain.LoginResponse{
		IdUser: id,
		Token:  token,
	}) //Va en services
}
