package db

import (
	"backend/domain/cursos"
	"backend/domain/users"
	"database/sql"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB
var sqlDB *sql.DB

func InitDB() {
	dsn := "root:RaTa8855@tcp(127.0.0.1:3306)/pbbv?charset=utf8mb3&parseTime=True&loc=Local"
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}

	// Obtener la conexión SQL nativa de gorm
	sqlDB, err = DB.DB()
	if err != nil {
		log.Fatal("failed to get sql.DB from gorm: ", err)
	}
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func UpdateUserPasswords() error {
	var userList []users.User
	DB.Find(&userList)

	for _, user := range userList { // Cambio de nombre de variable de user a user
		hashedPassword, err := HashPassword(user.Contrasena)
		if err != nil {
			return err
		}
		DB.Model(&user).Update("Contrasena", hashedPassword)
	}

	return nil
}

func DeleteCursoByID(IdCurso string) error {
	result := DB.Delete(&cursos.Curso{}, "Id_curso = ?", IdCurso)
	return result.Error
}

func DeleteInscripcionesByCursoID(cursoID string) error {
	query := `DELETE FROM inscripciones WHERE Id_curso = ?`
	_, err := sqlDB.Exec(query, cursoID)
	return err
}

type Database struct {
	*gorm.DB
}

func GetCursosUsuario(userId int) ([]cursos.Curso, error) {
	// Obtener los IDs de los cursos del usuario desde la tabla de inscripciones
	var inscripciones []struct {
		IdCurso int
	}
	if err := DB.Table("inscripciones").
		Where("id_usuario = ?", userId).
		Pluck("id_curso", &inscripciones).
		Error; err != nil {
		return nil, err
	}

	// Extraer los IDs de los cursos de la lista de inscripciones
	var cursoIDs []int
	for _, inscripcion := range inscripciones {
		cursoIDs = append(cursoIDs, inscripcion.IdCurso)
	}

	// Buscar los cursos correspondientes a los IDs obtenidos
	var cursos []cursos.Curso
	if err := DB.Where("id_curso IN ?", cursoIDs).Find(&cursos).Error; err != nil {
		return nil, err
	}

	// Cargar explícitamente los usuarios asociados a cada curso
	for i, curso := range cursos {
		if err := DB.Model(&curso).Association("Usuarios").Find(&cursos[i].Usuarios); err != nil {
			return nil, err
		}
	}

	return cursos, nil
}
