package dao

import (
	"time"
)

type Inscripcion struct {
	IdUsuario        int       `gorm:"column:Id_usuario"` // Clave foránea a User
	Usuario          User      `gorm:"foreignKey:IdUsuario;references:IdUsuario"`
	IdCurso          int       `gorm:"column:Id_curso"` // Clave foránea a Curso
	Curso            Curso     `gorm:"foreignKey:IdCurso;references:IdCurso"`
	FechaInscripcion time.Time `gorm:"column:fecha_inscripcion"`
	Estado           string    `gorm:"column:estado"`
}
