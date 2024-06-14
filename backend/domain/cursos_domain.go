package domain

import "time"

type Curso struct {
	IdCurso     int       `json:"id_curso"`
	Titulo      string    `json:"Titulo"`
	FechaInicio time.Time `json:"FechaInicio"`
	Categoria   string    `json:"Categoria"`
	Archivo     string    `json:"Archivo"`
	Descripcion string    `json:"Descripcion"`
	Usuarios    []User    `json:"-"`
}

type SearchResponse struct {
	Results []Curso `json:"results"`
}

type SubscribeRequest struct {
	IdUsuario int `json:"id_usuario"`
	IdCurso   int `json:"id_curso"`
}
