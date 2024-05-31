package services

import (
	"backend/db"
)

func DeleteInscripcionesByCursoID(cursoID string) error {
	return db.DeleteInscripcionesByCursoID(cursoID)
}
