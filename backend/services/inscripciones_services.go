package services

import (
	"backend/db"
	"fmt"
)

func DeleteInscripcionesByCursoID(cursoID string) error {
	return db.DeleteInscripcionesByCursoID(cursoID)
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
