package services

import (
	"backend/dao"
	"backend/db"
	"log"
)

func DeleteCurso(cursoID string) error {
	// Primero eliminamos las inscripciones asociadas al curso
	err := DeleteInscripcionesByCursoID(cursoID)
	if err != nil {
		return err
	}

	// Luego eliminamos el curso
	return db.DeleteCursoByID(cursoID)
}

func UpdateCurso(cursoID int, updatedCurso dao.Curso) error {
	var curso dao.Curso
	if err := db.DB.First(&curso, cursoID).Error; err != nil {
		log.Printf("Error finding course: %v", err)
		return err
	}

	log.Printf("Found course: %v", curso)

	// Actualiza los campos necesarios
	curso.Titulo = updatedCurso.Titulo
	curso.FechaInicio = updatedCurso.FechaInicio
	curso.Categoria = updatedCurso.Categoria
	curso.Archivo = updatedCurso.Archivo
	curso.Descripcion = updatedCurso.Descripcion

	log.Printf("Updated course: %v", curso)

	return db.DB.Save(&curso).Error
}
func CreateCurso(curso dao.Curso) error {
	// Aquí puedes agregar validaciones adicionales si es necesario
	result := db.DB.Create(&curso)
	return result.Error
}
