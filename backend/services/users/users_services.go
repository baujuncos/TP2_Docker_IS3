package users

/*import "ProyectoArquiCompu1/domain/users"

func Login(request users.LoginRequest) users.LoginResponse {

	//Validar contra la base de datos
	return users.LoginResponse{
		Token: "abcdef123456",
	}
}*/

import (
	"backend/db"
	"backend/domain"
	"errors"
	"golang.org/x/crypto/bcrypt"
	"time"
)

var jwtKey = []byte("my_secret_key")

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func Authenticate(creds Credentials) (string, error) {
	var user domain.User
	if err := db.DB.Where("nombre_usuario = ?", creds.Username).First(&user).Error; err != nil {
		return "", errors.New("invalid credentials")
	}

	if !CheckPasswordHash(creds.Password, user.Contrasena) {
		return "", errors.New("invalid credentials")
	}

	token, err := GenerateJWT(creds.Username)
	if err != nil {
		return "", err
	}

	return token, nil
}
