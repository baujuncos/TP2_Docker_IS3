package dao

import (
	"time"
)

type Curso struct {
	IdCurso     int       `gorm:"primary_key;column:Id_curso;autoIncrement"`
	Titulo      string    `gorm:"column:Titulo"`
	FechaInicio time.Time `gorm:"column:Fecha_inicio"`
	Categoria   string    `gorm:"column:Categoria"`
	Archivo     string    `gorm:"column:Archivo"`
	Descripcion string    `gorm:"column:Descripcion"`
	Usuarios    []User    `gorm:"many2many:inscripciones;foreignKey:IdCurso;joinForeignKey:IdCurso;References:IdUsuario;joinReferences:IdUsuario"`
}
