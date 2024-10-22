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
                    name="name"
                    label="Nombre del Producto"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Descripción"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formValues.description}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Precio"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formValues.price}
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
