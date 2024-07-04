package cursos

import (
	cursosDomain "backend/dao"
	"backend/domain"
	"backend/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"strings"
)

func DeleteCurso(c *gin.Context) {
	cursoID := c.Param("id")

	err := services.DeleteCurso(cursoID)
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

	if err := services.UpdateCurso(cursoID, updatedCurso); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Curso editado correctamente"})
}

func CreateCurso(c *gin.Context) {
	var curso cursosDomain.Curso
	if err := c.ShouldBindJSON(&curso); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := services.CreateCurso(curso); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Curso creado correctamente"})
}

func Search(c *gin.Context) {
	query := strings.TrimSpace(c.Query("query"))
	results, err := services.Search(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.Response{
			Message: fmt.Sprintf("Error in search: %s", err.Error()),
		})
		return
	}

	/*if len(results) == 0 {
		c.JSON(http.StatusNotFound, domain.Response{
			Message: "No results found",
		})
		return
	}*/

	c.JSON(http.StatusOK, domain.SearchResponse{
		Results: results,
	})
}

func Get(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.Response{
			Message: fmt.Sprintf("Invalid ID: %s", err.Error()),
		})
		return
	}

	course, err := services.Get(int(id))
	if err != nil {
		c.JSON(http.StatusNotFound, domain.Response{
			Message: fmt.Sprintf("Error in get: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, course)
}

func GetAllCursos(c *gin.Context) {
	cursos, err := services.GetAllCursos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cursos)
}
