package services

import (
	"backend/db"
	"crypto/sha1"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"strings"
	"time"
)

var jwtKey = []byte("my_secret_key")

func generateJWT(username string) (string, error) {
	// Create the claims
	claims := jwt.MapClaims{
		"usuario": username,
		"exp":     time.Now().Add(time.Hour * 72).Unix(), // Token expiry time (72 hours)
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with the secret key
	return token.SignedString(jwtKey)
}

func Login(username string, password string) (string, error) {
	if strings.TrimSpace(username) == "" {
		return "", errors.New("username is required")
	}

	if strings.TrimSpace(password) == "" {
		return "", errors.New("password is required")
	}

	hash := fmt.Sprintf("%x", sha1.Sum([]byte(password)))

	userDAO, err := db.GetUsuarioByUsername(username)
	if err != nil {
		return "", fmt.Errorf("error getting user from DB: %w", err)
	}

	if hash != userDAO.Contrasena {
		return "", fmt.Errorf("invalid credentials")
	}

	// Generate JWT token
	token, err := generateJWT(username)
	if err != nil {
		return "", fmt.Errorf("error generating JWT token: %w", err)
	}

	return token, nil
}
