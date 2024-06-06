package router

import (
	"backend/controllers/cursos"
	"backend/controllers/users"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Middleware para manejar CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.POST("/login", users.Login)                                    //Login
	r.DELETE("/cursos/:id", cursos.DeleteCurso)                      //Eliminar Cursos
	r.PUT("/cursos/:id", cursos.UpdateCurso)                         //Editar Curso
	r.POST("/cursos", cursos.CreateCurso)                            //Crear Curso
	r.GET("/usuarios/:id_usuario/cursos", users.ListarCursosUsuario) //Listar Cursos por usuario
	r.GET("/courses/search", cursos.Search)                          //Buscar Curso por parametros
	r.GET("/courses/:id", cursos.Get)                                //Buscar curso por Id
	r.POST("/subscriptions", cursos.Subscribe)                       //Inscribirse a Curso
	r.GET("/cursos", cursos.GetAllCursos)                            //Obtiene TODOS los cursos

	return r
}
