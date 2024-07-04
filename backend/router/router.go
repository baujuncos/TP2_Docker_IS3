package router

import (
	"backend/controllers/cursos"
	"backend/controllers/inscripciones"
	"backend/controllers/users"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Middleware para manejar CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	r.POST("/login", users.Login) // Login, REDULARIDAD

	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())
	{
		auth.POST("/subscriptions", inscripciones.Subscribe) // Inscribirse a Curso, REGULARIDAD
		//auth.GET("/usuarios/:id_usuario/cursos", users.ListarCursosUsuario) // Listar Cursos por usuario
	}

	r.DELETE("/cursos/:id", cursos.DeleteCurso) // Eliminar Cursos
	r.PUT("/cursos/:id", cursos.UpdateCurso)    // Editar Curso
	r.POST("/cursos", cursos.CreateCurso)       // Crear Curso
	r.GET("/courses/search", cursos.Search)     // Buscar Curso por parámetros, REGULARIDAD
	r.GET("/courses/:id", cursos.Get)           // Buscar curso por ID
	r.GET("/cursos", cursos.GetAllCursos)       // Obtiene TODOS los cursos, REGULARIDAD
	r.GET("/usuarios/:id_usuario/cursos", users.ListarCursosUsuario)
	return r
}
