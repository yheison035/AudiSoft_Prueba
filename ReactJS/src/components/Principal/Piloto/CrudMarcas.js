import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import Swal from 'sweetalert2';
import axios from 'axios';

function CrudMarcas() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/marcas.php');
    const [modalEditar, setModalEditar] = useState(false);
    const [data, setData] = useState({
        id: null,
        nombre: '',
        nombreInsertar: ''
    });
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        cargarMarcas();
    }, [])

    const handleChange = e => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const seleccionarMarca = (seleccionado, caso) => {
        setData(seleccionado);
        caso === "Editar" && abrirCerrarModalEditar();
    }

    const cargarMarcas = async () => {
        await axios.get(baseUrl, { params: { id_usuario: parseInt(sessionStorage.getItem('id_usuario')) } })
            .then(response => {
                setDataTable(response.data);
            })
    }

    const insertarMarcas = async () => {
        var f = new FormData();
        f.append("id_usuario", parseInt(sessionStorage.getItem('id_usuario')));
        f.append("nombre", data.nombreInsertar);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
            .then(response => {
                setData({
                    nombreInsertar: ''
                })
                setDataTable(dataTable.concat(response.data))
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se inserto correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const actualizarMarcas = async () => {
        var f = new FormData();
        f.append("nombre", data.nombre);
        f.append("METHOD", "PUT");
        await axios.post(baseUrl, f, { params: { id: data.id } })
            .then(response => {
                var dataNueva = dataTable;
                dataNueva.map(e => {
                    if (e.id === data.id) {
                        e.nombre = data.nombre;
                    }
                    return []
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se actualizo correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                })
                setDataTable(dataNueva);
                abrirCerrarModalEditar();
            })
    }

    const eliminarMarcas = async (seleccionado) => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, { params: { id: seleccionado.id } })
            .then(response => {
                setDataTable(dataTable.filter(marcas => marcas.id !== seleccionado.id));
            })
    }

    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">MARCAS</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">ID</th>
                            <th className="text-center font-weight-bold">Nombre</th>
                            <th className="text-center font-weight-bold">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td className="text-center">{e.id}</td>
                                    <td className="text-center">{e.nombre}</td>
                                    <td className="text-center">
                                        <button className="btn btn-success" onClick={() => { seleccionarMarca(e, "Editar") }}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => { eliminarMarcas(e) }}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nueva Marca</td>
                            <td className="text-center">
                                <MDBInput type="text" name="nombreInsertar" value={data.nombreInsertar} label="Nombre" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary" onClick={() => { insertarMarcas() }}>Crear Nuevo</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader><b className="font-weight-bold">Editar Marca</b></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={data && data.nombre} onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => { actualizarMarcas() }}>Actualizar</button>
                    <button className="btn btn-danger" onClick={() => { abrirCerrarModalEditar() }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default CrudMarcas;

