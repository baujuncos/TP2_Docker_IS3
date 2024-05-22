package cursos

import (
	"backend/db"
	"backend/domain/cursos"
)

func DeleteCurso(cursoID string) error {
	// Aquí llamas a la función del paquete db que elimina el curso
	return db.DeleteCursoByID(cursoID)
}

func UpdateCurso(cursoID int, updatedCurso cursos.Curso) error {
	var curso cursos.Curso
	if err := db.DB.First(&curso, cursoID).Error; err != nil {
		return err
	}
	// Actualiza los campos necesarios
	curso.Titulo = updatedCurso.Titulo
	curso.FechaInicio = updatedCurso.FechaInicio
	curso.Categoria = updatedCurso.Categoria
	curso.Archivo = updatedCurso.Archivo
	curso.Descripcion = updatedCurso.Descripcion
	curso.Inscripciones = updatedCurso.Inscripciones

	return db.DB.Save(&curso).Error
}
