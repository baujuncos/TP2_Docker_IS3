package dao

import (
	"time"
)

type Inscripcion struct {
	IdUsuario        int       `gorm:"column:Id_usuario"`
	IdCurso          int       `gorm:"column:Id_curso"`
	FechaInscripcion time.Time `gorm:"column:fecha_inscripcion"`

	Usuario User  `gorm:"foreignKey:IdUsuario;references:IdUsuario"`
	Curso   Curso `gorm:"foreignKey:IdCurso;references:IdCurso"`
}
