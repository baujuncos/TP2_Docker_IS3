package cursos

import "backend/db"

func DeleteCurso(cursoID string) error {
	// Aquí llamas a la función del paquete db que elimina el curso
	return db.DeleteCursoByID(cursoID)
}
