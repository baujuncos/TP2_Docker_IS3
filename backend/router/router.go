package router

import (
	"backend/controllers/cursos"
	"backend/controllers/users"
	"backend/db"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.POST("/login", users.Login)
	r.DELETE("/cursos/:id", cursos.DeleteCurso)                      //Eliminar Cursos
	r.PUT("/cursos/:id", cursos.UpdateCurso)                         //Editar Curso
	r.POST("/cursos", cursos.CreateCurso)                            //Crear Curso
	r.GET("/usuarios/:id_usuario/cursos", users.ListarCursosUsuario) //Listar Cursos por usuario
	r.GET("/courses/search", cursos.Search)                          //Buscar Curso por parametros
	r.GET("/courses/:id", cursos.Get)                                //Buscar curso por Id
	r.POST("/subscriptions", cursos.Subscribe)                       //Inscribirse a Curso

	return r
}

func main() {
	db.InitDB() // Inicializar la base de datos antes de empezar el servidor
	r := SetupRouter()
	r.Run(":8080") // Por defecto corre en :8080
}
