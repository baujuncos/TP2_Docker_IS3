package cursos

import (
	"backend/db"
	cursosDomain "backend/domain/cursos"
	cursosServices "backend/services/cursos"
	"net/http"
	"strconv"

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

func UpdateCurso(c *gin.Context) {
	cursoID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	var updatedCurso cursosDomain.Curso
	if err := c.ShouldBindJSON(&updatedCurso); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := cursosServices.UpdateCurso(cursoID, updatedCurso); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Course updated successfully"})
}
