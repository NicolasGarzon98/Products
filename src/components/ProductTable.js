import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, openModal, deleteProduct }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{product.nombre}</TableCell>
                            <TableCell>{product.descripcion}</TableCell>
                            <TableCell align="right">${new Intl.NumberFormat('es-MX').format(product.precio)}</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => openModal(2, product.id, product.nombre, product.descripcion, product.precio)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => deleteProduct(product.id, product.nombre)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;
