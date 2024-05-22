package db

import (
	"backend/domain/cursos"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var DB *gorm.DB

func InitDB() {
	dsn := "user:password@tcp(127.0.0.1:3306)/pbbv?charset=utf8mb3&parseTime=True&loc=Local"
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}
}

func DeleteCursoByID(cursoID string) error {
	// Utiliza la estructura Curso del paquete domain
	result := DB.Delete(&cursos.Curso{}, "id = ?", cursoID)
	return result.Error
}
