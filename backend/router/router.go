/*package router

import "github.com/gin-gonic/gin"
import "ProyectoArquiCompu1/controllers/users"

func MapUrls(engine *gin.Engine) {
	engine.POST("/users/login", users.Login)
}*/

package router

import (
	"backend/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/api/v1/login", controllers.Login)

	return r
}
