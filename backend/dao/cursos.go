package dao

import (
	"time"
)

type Curso struct {
	IdCurso     int
	Titulo      string
	FechaInicio time.Time
	Categoria   string
	Archivo     string
	Descripcion string
	Usuarios    []User
}
