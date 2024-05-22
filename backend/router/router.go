/*package router

import "github.com/gin-gonic/gin"
import "ProyectoArquiCompu1/controllers/users"

func MapUrls(engine *gin.Engine) {
	engine.POST("/users/login", users.Login)
}*/

package router

import (
	"backend/controllers/users"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/users/login", users.Login)

	return r
}
