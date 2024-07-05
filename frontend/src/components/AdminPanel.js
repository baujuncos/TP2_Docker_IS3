import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, IconButton, Divider, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPanel({ onCourseCreated, onCourseUpdated, onCourseDeleted }) {
    const [newCourse, setNewCourse] = useState({
        Titulo: '',
        Fecha_inicio: '',
        Categoria: '',
        Archivo: '',
        Descripcion: ''
    });

    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [currentSection, setCurrentSection] = useState('create');  // Añadido para gestionar la sección activa

    useEffect(() => {
        fetch('http://localhost:8080/cursos')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const handleCreateCourse = () => {
        fetch('http://localhost:8080/admin/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error creating course');
                }
                return response.json();
            })
            .then(() => {
                alert('Curso creado con éxito');
                onCourseCreated();
                setNewCourse({
                    Titulo: '',
                    Fecha_inicio: '',
                    Categoria: '',
                    Archivo: '',
                    Descripcion: ''
                });
                setEditingCourse(null);
            })
            .catch(error => {
                console.error('Error creating course:', error);
                alert(error.message);
            });
    };

    const handleUpdateCourse = () => {
        if (!editingCourse) return;

        fetch(`http://localhost:8080/admin/cursos/${editingCourse.id_curso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating course');
                }
                return response.json();
            })
            .then(() => {
                alert('Curso actualizado con éxito');
                onCourseUpdated();
                setNewCourse({
                    Titulo: '',
                    Fecha_inicio: '',
                    Categoria: '',
                    Archivo: '',
                    Descripcion: ''
                });
                setEditingCourse(null);
                setCurrentSection('create');
            })
            .catch(error => {
                console.error('Error updating course:', error);
                alert(error.message);
            });
    };

    const handleDeleteCourse = (courseId) => {
        fetch(`http://localhost:8080/admin/cursos/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error deleting course');
                }
                return response.json();
            })
            .then(() => {
                alert('Curso eliminado con éxito');
                onCourseDeleted();
            })
            .catch(error => {
                console.error('Error deleting course:', error);
                alert(error.message);
            });
    };

    const handleEditClick = (course) => {
        setEditingCourse(course);
        setNewCourse({
            Titulo: course.Titulo,
            Fecha_inicio: course.Fecha_inicio,
            Categoria: course.Categoria,
            Archivo: course.Archivo,
            Descripcion: course.Descripcion
        });
        setCurrentSection('edit');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: 250,
                    bgcolor: 'background.paper',
                    padding: 2,
                    boxShadow: 1
                }}
            >
                <Typography variant="h6" gutterBottom>Panel de Administración</Typography>
                <Divider />
                <List>
                    <ListItem button onClick={() => setCurrentSection('create')}>
                        <ListItemText primary="Crear Curso" />
                    </ListItem>
                    <ListItem button onClick={() => setCurrentSection('edit')}>
                        <ListItemText primary="Editar Curso" />
                    </ListItem>
                    <ListItem button onClick={() => setCurrentSection('delete')}>
                        <ListItemText primary="Eliminar Curso" />
                    </ListItem>
                </List>
            </Box>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {currentSection === 'create' && (
                    <div>
                        <Typography variant="h6" gutterBottom>Crear Curso</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Título"
                                    value={newCourse.Titulo}
                                    onChange={(e) => setNewCourse({ ...newCourse, Titulo: e.target.value })}
                                />
                                <TextField
                                    label="Fecha de Inicio"
                                    type="date"
                                    value={newCourse.Fecha_inicio}
                                    onChange={(e) => setNewCourse({ ...newCourse, Fecha_inicio: e.target.value })}
                                />
                                <TextField
                                    label="Categoría"
                                    value={newCourse.Categoria}
                                    onChange={(e) => setNewCourse({ ...newCourse, Categoria: e.target.value })}
                                />
                                <TextField
                                    label="Archivo"
                                    value={newCourse.Archivo}
                                    onChange={(e) => setNewCourse({ ...newCourse, Archivo: e.target.value })}
                                />
                                <TextField
                                    label="Descripción"
                                    value={newCourse.Descripcion}
                                    onChange={(e) => setNewCourse({ ...newCourse, Descripcion: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleCreateCourse}>Crear Curso</Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
                {currentSection === 'edit' && (
                    <div>
                        <Typography variant="h6" gutterBottom>Editar Curso</Typography>
                        <div>
                            {courses.map(course => (
                                <div key={course.id_curso}>
                                    <h3>{course.Titulo}</h3>
                                    <p>{course.Descripcion}</p>
                                    <IconButton onClick={() => handleEditClick(course)}>
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                        {editingCourse && (
                            <div>
                                <TextField
                                    label="Título"
                                    value={newCourse.Titulo}
                                    onChange={(e) => setNewCourse({ ...newCourse, Titulo: e.target.value })}
                                />
                                <TextField
                                    label="Fecha de Inicio"
                                    type="date"
                                    value={newCourse.Fecha_inicio}
                                    onChange={(e) => setNewCourse({ ...newCourse, Fecha_inicio: e.target.value })}
                                />
                                <TextField
                                    label="Categoría"
                                    value={newCourse.Categoria}
                                    onChange={(e) => setNewCourse({ ...newCourse, Categoria: e.target.value })}
                                />
                                <TextField
                                    label="Archivo"
                                    value={newCourse.Archivo}
                                    onChange={(e) => setNewCourse({ ...newCourse, Archivo: e.target.value })}
                                />
                                <TextField
                                    label="Descripción"
                                    value={newCourse.Descripcion}
                                    onChange={(e) => setNewCourse({ ...newCourse, Descripcion: e.target.value })}
                                />
                                <Button onClick={handleUpdateCourse}>Actualizar Curso</Button>
                            </div>
                        )}
                    </div>
                )}
                {currentSection === 'delete' && (
                    <div>
                        <Typography variant="h6" gutterBottom>Eliminar Curso</Typography>
                        <div>
                            {courses.map(course => (
                                <div key={course.id_curso}>
                                    <h3>{course.Titulo}</h3>
                                    <p>{course.Descripcion}</p>
                                    <IconButton onClick={() => handleDeleteCourse(course.id_curso)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Box>
        </Box>
    );
}

export default AdminPanel;
