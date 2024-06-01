package services

import (
	"backend/dao"
	"backend/db"
	"backend/domain"
	"fmt"
	"log"
	"strings"
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

func Subscribe(id_usuario int, id_curso int) error {
	if _, err := db.SelectUserByID(id_usuario); err != nil {
		return fmt.Errorf("No se encontro el usuario en la BD: %w", err)
	}

	if _, err := db.FindCourseByID(id_curso); err != nil {
		return fmt.Errorf("No se encontro el curso en la BD: %w", err)
	}

	if err := db.SubscribeUserToCourse(id_usuario, id_curso); err != nil {
		return fmt.Errorf("No se pudo realizar la inscripcion: %w", err)
	}

	return nil
}
