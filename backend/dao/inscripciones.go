package dao

import (
	"time"
)

type Inscripciones struct {
	IdUsuario        int       `gorm:"column:Id_usuario; not null"`
	IdCurso          int       `gorm:"column:Id_curso; not null"`
	FechaInscripcion time.Time `gorm:"column:fecha_inscripcion; not null"`
	Comentario       string    `gorm:"column:comentario"`

	Usuario User  `gorm:"foreignKey:IdUsuario;references:IdUsuario"`
	Curso   Curso `gorm:"foreignKey:IdCurso;references:IdCurso"`
}
