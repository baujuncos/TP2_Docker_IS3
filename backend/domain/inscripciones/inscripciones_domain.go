package inscripciones

import (
	"backend/domain/cursos"
	"backend/domain/users"
	"time"
)

type Inscripcion struct {
	IdUsuario        int          `gorm:"column:Id_usuario"` // Clave foránea a User
	Usuario          users.User   `gorm:"foreignKey:IdUsuario;references:IdUsuario"`
	IdCurso          int          `gorm:"column:Id_curso"` // Clave foránea a Curso
	Curso            cursos.Curso `gorm:"foreignKey:IdCurso;references:IdCurso"`
	FechaInscripcion time.Time    `gorm:"column:fecha_inscripcion"`
	Estado           string       `gorm:"column:estado"`
}
