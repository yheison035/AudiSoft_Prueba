import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import Swal from 'sweetalert2';
import axios from 'axios';

function CrudModelos() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/modelos.php');
    const baseUrlMarcas = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/marcas.php');

    const [modalEditar, setModalEditar] = useState(false);
    const [data, setData] = useState({
        id: null,
        id_marcas: 'DEFAULT',
        nombre: '',
        id_marcasInsertar: 'DEFAULT',
        nombreInsertar: ''
    });
    const [dataTable, setDataTable] = useState([]);
    const [marcas, setDataMarcas] = useState([]);

    useEffect(() => {
        cargarModelos();
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

    const seleccionarModelo = (seleccionado, caso) => {
        setData(seleccionado);
        caso === "Editar" && abrirCerrarModalEditar();
    }

    const cargarModelos = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setDataTable(response.data);
            })
    }

    const cargarMarcas = async () => {
        await axios.get(baseUrlMarcas)
            .then(response => {
                setDataMarcas(response.data);
            })
    }

    const insertarModelos = async () => {
        var f = new FormData();
        f.append("id_marcas", data.id_marcasInsertar);
        f.append("nombre", data.nombreInsertar);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
            .then(response => {
                setData({
                    id_marcasInsertar: 'DEFAULT',
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

    const actualizarModelos = async () => {
        var f = new FormData();
        f.append("id_marcas", data.id_marcas);
        f.append("nombre", data.nombre);
        f.append("METHOD", "PUT");
        await axios.post(baseUrl, f, { params: { id: data.id } })
            .then(response => {
                var dataNueva = dataTable;
                dataNueva.map(e => {
                    if (e.id === data.id) {
                        e.id_marcas = data.id_marcas;
                        e.nombre = data.nombre;
                    }
                    return[];
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

    const eliminarModelos = async (seleccionado) => {
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
                <p className="pt-3 font-weight-bold">MODELOS</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">ID</th>
                            <th className="text-center font-weight-bold">Marca</th>
                            <th className="text-center font-weight-bold">Modelo</th>
                            <th className="text-center font-weight-bold">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td className="text-center">{e.id}</td>
                                    <td className="text-center">{e.id_marcas}</td>
                                    <td className="text-center">{e.nombre}</td>
                                    <td className="text-center">
                                        <button className="btn btn-success" onClick={() => { seleccionarModelo(e, "Editar") }}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => { eliminarModelos(e) }}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Modelo</td>
                            <td>
                                <label className="font-weight-bold mb-0 pb-1">Marcas agregadas</label>
                                <select name="id_marcasInsertar" value={data.id_marcasInsertar} className="form-control" onChange={handleChange}>
                                    <option value={"DEFAULT"} disabled>Seleccione...</option>
                                    {marcas.map(e => (
                                        <option value={e.id}>{e.nombre}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="text-center mt-2">
                                <MDBInput type="text" name="nombreInsertar" value={data.nombreInsertar} label="Modelo" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary" onClick={() => { insertarModelos() }}>Crear Nuevo</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader><b className="font-weight-bold">Editar Modelo</b></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Marca</label>
                        <select name="id_marcas" value={data && data.id_marcas} className="form-control" onChange={handleChange}>
                            <option value={"DEFAULT"} disabled>Seleccione...</option>
                            {marcas.map(e => (
                                <option value={e.id}>{e.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={data && data.nombre} onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => { actualizarModelos() }}>Actualizar</button>
                    <button className="btn btn-danger" onClick={() => { abrirCerrarModalEditar() }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default CrudModelos;


