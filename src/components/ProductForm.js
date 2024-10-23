import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProductForm = ({ title, formValues, setFormValues, validar, modalOpen, cerrarModal }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <Dialog open={modalOpen} onClose={cerrarModal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="nombre"
                    label="Nombre del Producto"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValues.nombre}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="descripcion"
                    label="Descripción"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValues.descripcion}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="precio"
                    label="Precio"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formValues.precio}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={cerrarModal} color="secondary">
                    Cerrar
                </Button>
                <Button onClick={validar} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;
