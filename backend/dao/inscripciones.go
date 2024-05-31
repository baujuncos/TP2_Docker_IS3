package dao

import (
	"time"
)

type Inscripcion struct {
	IdUsuario        int
	Usuario          User
	IdCurso          int
	Curso            Curso
	FechaInscripcion time.Time
	Estado           string
}
