package services

import "final"

func GetResult(input string) domain.Response {
	return domain.Response{
		Message: "Recibi este mensaje: " + input,
	}
}
