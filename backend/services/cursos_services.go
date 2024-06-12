package services

import (
	"backend/dao"
	"backend/db"
	"backend/domain"
	"fmt"
	"log"
	"strings"
)

// DeleteInscripcionesByCursoID elimina todas las inscripciones asociadas a un curso por su ID
func DeleteInscripcionesByCursoID(cursoID string) error {
	return db.DeleteInscripcionesByCursoID(cursoID)
}

// DeleteCurso elimina un curso y sus inscripciones asociadas
func DeleteCurso(cursoID string) error {
	// Primero eliminamos las inscripciones asociadas al curso
	err := DeleteInscripcionesByCursoID(cursoID)
	if err != nil {
		return err
	}

	// Luego eliminamos el curso
	return db.DeleteCursoByID(cursoID)
}

// UpdateCurso actualiza los detalles de un curso
func UpdateCurso(cursoID int, updatedCurso dao.Curso) error {
	var curso dao.Curso
	if err := db.DB.First(&curso, cursoID).Error; err != nil {
		log.Printf("Error finding course: %v", err)
		return err
	}

	log.Printf("Found course: %v", curso)

	// Actualiza solo los campos presentes en updatedCurso
	if updatedCurso.Titulo != "" {
		curso.Titulo = updatedCurso.Titulo
	}
	if !updatedCurso.FechaInicio.IsZero() {
		curso.FechaInicio = updatedCurso.FechaInicio
	}
	if updatedCurso.Categoria != "" {
		curso.Categoria = updatedCurso.Categoria
	}
	if updatedCurso.Archivo != "" {
		curso.Archivo = updatedCurso.Archivo
	}
	if updatedCurso.Descripcion != "" {
		curso.Descripcion = updatedCurso.Descripcion
	}

	log.Printf("Updated course: %v", curso)

	return db.DB.Save(&curso).Error
}

// CreateCurso crea un nuevo curso
func CreateCurso(curso dao.Curso) error {
	// Aquí puedes agregar validaciones adicionales si es necesario
	result := db.DB.Create(&curso)
	return result.Error
}

// Search busca cursos basados en una consulta
func Search(query string) ([]domain.Curso, error) {
	trimmed := strings.TrimSpace(query)

	courses, err := db.FindCoursesByQuery(trimmed)
	if err != nil {
		return nil, fmt.Errorf("error getting courses from DB: %w", err)
	}

	results := make([]domain.Curso, 0)
	for _, curso := range courses {
		results = append(results, domain.Curso{
			IdCurso:     curso.IdCurso,
			Titulo:      curso.Titulo,
			Descripcion: curso.Descripcion,
			Categoria:   curso.Categoria,
			Archivo:     curso.Archivo,
			FechaInicio: curso.FechaInicio,
		})
	}
	return results, nil
}

// Get obtiene los detalles de un curso por su ID
func Get(id int) (domain.Curso, error) {
	curso, err := db.FindCourseByID(id)
	if err != nil {
		return domain.Curso{}, fmt.Errorf("error getting course from DB: %w", err)
	}

	return domain.Curso{
		IdCurso:     curso.IdCurso,
		Titulo:      curso.Titulo,
		Descripcion: curso.Descripcion,
		Categoria:   curso.Categoria,
		Archivo:     curso.Archivo,
		FechaInicio: curso.FechaInicio,
	}, nil
}

// GetAllCursos obtiene todos los cursos
func GetAllCursos() ([]dao.Curso, error) {
	return db.GetAllCursos()
}
