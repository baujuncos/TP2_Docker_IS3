package services

import (
	"backend/dao"
	"backend/db"
	"fmt"
	"gorm.io/gorm"
)

func DeleteInscripcionesByCursoID(cursoID string) error {
	return db.DeleteInscripcionesByCursoID(cursoID)
}

func IsSubscribed(id_usuario int, id_curso int) (bool, error) {
	var inscripcion dao.Inscripciones
	result := db.DB.Where("Id_usuario = ? AND Id_curso = ?", id_usuario, id_curso).First(&inscripcion)
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return false, result.Error
	}
	if result.RowsAffected > 0 {
		return true, nil
	}
	return false, nil
}

func Subscribe(id_usuario int, id_curso int) error {
	// Verificar que el usuario exista
	if _, err := db.SelectUserByID(id_usuario); err != nil {
		return fmt.Errorf("No se encontró el usuario en la BD: %w", err)
	}

	// Verificar que el curso exista
	if _, err := db.FindCourseByID(id_curso); err != nil {
		return fmt.Errorf("No se encontró el curso en la BD: %w", err)
	}

	// Crear la inscripción
	if err := db.SubscribeUserToCourse(id_usuario, id_curso); err != nil {
		return fmt.Errorf("No se pudo realizar la inscripción: %w", err)
	}

	return nil
}
