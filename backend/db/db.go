package db

import (
	"backend/dao"
	"database/sql"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB
var sqlDB *sql.DB

func InitDB() {
	dsn := "root:ladrillo753@tcp(127.0.0.1:3306)/pbbv?charset=utf8mb3&parseTime=True&loc=Local"
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

func DeleteCursoByID(IdCurso string) error {
	result := DB.Delete(&dao.Curso{}, "Id_curso = ?", IdCurso)
	return result.Error
}

func DeleteInscripcionesByCursoID(cursoID string) error {
	query := `DELETE FROM inscripciones WHERE Id_curso = ?`
	_, err := sqlDB.Exec(query, cursoID)
	return err
}

func GetCursosUsuario(userId int) ([]dao.Curso, error) {
	// Obtener los IDs de los cursos del usuario desde la tabla de inscripciones
	var inscripciones []struct {
		IdCurso int `gorm:"column:Id_curso"`
	}
	if err := DB.Table("inscripciones").
		Where("Id_usuario = ?", userId).
		Pluck("Id_curso", &inscripciones).
		Error; err != nil {
		log.Printf("Error al obtener inscripciones del usuario: %v\n", err)
		return nil, err
	}

	// Extraer los IDs de los cursos de la lista de inscripciones
	var cursoIDs []int
	for _, inscripcion := range inscripciones {
		log.Printf("Inscripción encontrada: %+v\n", inscripcion)
		cursoIDs = append(cursoIDs, inscripcion.IdCurso)
	}

	if len(cursoIDs) == 0 {
		log.Println("El usuario no está inscrito en ningún curso")
		return []dao.Curso{}, nil
	}

	// Buscar los cursos correspondientes a los IDs obtenidos
	var cursos []dao.Curso
	if err := DB.Where("Id_curso IN ?", cursoIDs).Find(&cursos).Error; err != nil {
		log.Printf("Error al obtener los cursos: %v\n", err)
		return nil, err
	}

	// Verificar que los datos se han obtenido correctamente
	for _, curso := range cursos {
		log.Printf("Curso obtenido: %+v\n", curso)
	}

	return cursos, nil
}

func GetUsuarioByUsername(username string) (dao.User, error) {
	var usuario dao.User

	result := DB.Where("NombreUsuario = ?", username).First(&usuario)

	if result.Error != nil {
		return dao.User{}, fmt.Errorf("not found user with username: %s", username)
	}

	return usuario, nil
}
