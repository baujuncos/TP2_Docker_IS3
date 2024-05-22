package cursos

import (
	"backend/db"
	"net/http"

	"github.com/gin-gonic/gin"
)

func DeleteCurso(c *gin.Context) {
	cursoID := c.Param("id")

	err := db.DeleteCursoByID(cursoID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Curso eliminado correctamente"})
}
