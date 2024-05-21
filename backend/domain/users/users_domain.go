package users

import "final/domain/inscripciones"

type User struct {
	IdUsuario     int                         `gorm:"primary_key;column:Id_usuario"`
	NombreUsuario string                      `gorm:"column:Nombre_Usuario"`
	Nombre        string                      `gorm:"column:Nombre"`
	Apellido      string                      `gorm:"column:Apellido"`
	Email         string                      `gorm:"column:Email"`
	Contrasena    string                      `gorm:"column:Contraseña"`
	Tipo          string                      `gorm:"column:Tipo"`
	Inscripciones []inscripciones.Inscripcion `gorm:"foreignkey:IdUsuario"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}
