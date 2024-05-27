package cursos

import (
	"backend/domain/users"
	"time"
)

type Curso struct {
	IdCurso     int          `gorm:"primary_key;column:Id_curso;autoIncrement" json:"-"`
	Titulo      string       `gorm:"column:Titulo" json:"Titulo"`
	FechaInicio time.Time    `gorm:"column:Fecha_inicio" json:"Fecha_inicio"`
	Categoria   string       `gorm:"column:Categoria" json:"Categoria"`
	Archivo     string       `gorm:"column:Archivo" json:"Archivo"`
	Descripcion string       `gorm:"column:Descripcion" json:"Descripcion"`
	Usuarios    []users.User `gorm:"many2many:inscripciones;foreignKey:IdCurso;joinForeignKey:IdCurso;References:IdUsuario;joinReferences:IdUsuario" json:"-"`
}
