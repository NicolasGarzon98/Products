import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid

const ShowProducts = () => {
    const url = 'https://0q0ifjejyc.execute-api.us-east-1.amazonaws.com/dev/Products';
    const [products, setProducts] = useState([]);
    const [formValues, setFormValues] = useState({ id: '', nombre: '', descripcion: '', precio: 0 });
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('Registrar Producto');
    const [modalOpen, setModalOpen] = useState(false); 

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(url);
            //setProducts(response.data);
            const data = JSON.parse(response.data.body); // Extraer y parsear el body
            console.log('Try1: Productos actualizados:', response.data);
            setProducts(Array.isArray(data) ? data : [])
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const openModal = (op, id = '', nombre = '', descripcion = '', precio = '') => {
        setFormValues({ id, nombre, descripcion, precio });
        setOperation(op);
        setTitle(op === 1 ? 'Registrar Producto' : 'Editar Producto');
        setModalOpen(true);
    };

    const validar = () => {
        const { nombre, descripcion, precio } = formValues;
        if (nombre.trim() === '') {
            show_alerta('Escribe el nombre del producto', 'warning');
        } else if (descripcion.trim() === '') {
            show_alerta('Escribe la descripción del producto', 'warning');
        } else if (precio === '') {
            show_alerta('Escribe el precio del producto', 'warning');
        } else {
            const parametros = { 
                id: uuidv4(), // Generar un nuevo ID
                nombre: nombre.trim(), 
                descripcion: descripcion.trim(), 
                precio: parseFloat(precio) // Asegúrate de convertir a número
            };
            const parametrosPut = { 
                nombre: nombre.trim(), 
                descripcion: descripcion.trim(), 
                precio: parseFloat(precio) // Asegúrate de convertir a número
            };

            if (operation === 1) {
                enviarSolicitud('POST', parametros);
            } else {
                enviarSolicitud('PUT', parametrosPut, formValues.id);
            }
        }
    };
    

    const enviarSolicitud = async (metodo, parametros, productId = null) => {
        const requestUrl = productId ? `${url}?id=${productId}` : url;
        try {
            const response = await axios({ method: metodo, url: requestUrl, data: parametros });

            const { status, statusText } = response

            show_alerta(statusText || 'Operación exitosa', 'success');

            //if (status == 200) {
            //    getProducts();
            //    cerrarModal();  
            if (status === 200 || status === 201) {
                await getProducts(); // Asegúrate de que se actualicen los productos
                cerrarModal(); 
            }
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.error(error);
        }
    };

    const deleteProduct = (id, nombre) => {
        Swal.fire({
            title: `¿Seguro de eliminar el producto ${nombre}?`,
            icon: 'question',
            text: 'No se podrá dar marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("id eliminar: ",result, id);
                enviarSolicitud('DELETE', {}, id);
            } else {
                show_alerta('El producto NO fue eliminado', 'info');
            }
        });
    };

    const cerrarModal = () => {
        setModalOpen(false); 
        setFormValues({ id: '', nombre: '', descripcion: '', precio: 0 });
    };

    const show_alerta = (mensaje, icon) => {
        Swal.fire({
            title: mensaje,
            icon: icon,
            confirmButtonText: 'OK'
        });
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Laboratorio de productos - BBVA
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => openModal(1)}>
                        Añadir Producto
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Contenido principal */}
            <Container sx={{ mt: 4 }}>
                <ProductTable 
                    products={products} 
                    openModal={openModal} 
                    deleteProduct={deleteProduct} 
                />
            </Container>

            {/* Modal para crear/editar producto */}
            <ProductForm
                title={title}
                formValues={formValues}
                setFormValues={setFormValues}
                validar={validar}
                modalOpen={modalOpen}
                cerrarModal={cerrarModal}
            />
        </>
    );
};

export default ShowProducts;
