package domain

import "time"

type Curso struct {
	IdCurso     int       `json:"id_curso"`
	Titulo      string    `json:"titulo"`
	FechaInicio time.Time `json:"fecha_inicio"`
	Categoria   string    `json:"categoria"`
	Archivo     string    `json:"archivo"`
	Descripcion string    `json:"descripcion"`
	Usuarios    []User    `json:"usuarios"`
}

type SearchResponse struct {
	Results []Curso `json:"results"`
}

type SubscribeRequest struct {
	IdUsuario int `json:"id_usuario"`
	IdCurso   int `json:"id_curso"`
}
