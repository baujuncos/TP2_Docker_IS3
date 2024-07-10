import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(comment);
        setComment(''); // Reset comment field after submission
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Ingresar Comentario</DialogTitle>
            <DialogContent>
                <TextField
                    label="Comentario"
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">Enviar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentModal;
