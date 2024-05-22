package inscripciones

import "backend/domain/cursos"
import "backend/domain/users"

type Inscripcion struct {
	IdUsuario   int    `gorm:"column:Id_usuario"`
	IdCurso     int    `gorm:"column:Id_curso"`
	FechaInicio string `gorm:"column:Fecha_inicio"`
	Comentario  string `gorm:"column:Comentario"`

	// Relaciones
	Curso cursos.Curso `gorm:"foreignkey:IdCurso"`
	User  users.User   `gorm:"foreignkey:IdUsuario"`
}
