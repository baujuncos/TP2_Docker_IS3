package router

import "github.com/gin-gonic/gin"
import "ProyectoArquiCompu1/controllers/users"

func MapUrls(engine *gin.Engine) {
	engine.POST("/users/login", users.Login)
}
