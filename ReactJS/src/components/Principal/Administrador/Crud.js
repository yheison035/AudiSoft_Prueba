import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import Swal from 'sweetalert2';
import axios from 'axios';

function Crud() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/usuarios.php');
    const [data, setData] = useState({
        id: null,
        id_tipo_usuario: 'DEFAULT',
        nombre: '',
        correo: '',
        contrasena: '',
        id_tipo_usuarioInsertar: 'DEFAULT',
        nombreInsertar: '',
        correoInsertar: '',
        contrasenaInsertar: ''
    });
    const [modalEditar, setModalEditar] = useState(false);
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        cargarUsuarios();
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

    const seleccionarUsuario = (seleccionado, caso) => {
        setData(seleccionado);
        caso === "Editar" && abrirCerrarModalEditar();
    }

    const cargarUsuarios = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setDataTable(response.data);
            })
    }

    const insertarUsuarios = async () => {
        var f = new FormData();
        f.append("id_tipo_usuario", data.id_tipo_usuarioInsertar);
        f.append("nombre", data.nombreInsertar);
        f.append("correo", data.correoInsertar);
        f.append("contrasena", data.contrasenaInsertar);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
            .then(response => {
                setData({
                    id_tipo_usuarioInsertar: 'DEFAULT',
                    nombreInsertar: '',
                    correoInsertar: '',
                    contrasenaInsertar: ''
                })
                setDataTable(dataTable.concat(response.data));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se inserto correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const actualizarUsuario = async () => {
        var f = new FormData();
        f.append("id_tipo_usuario", data.id_tipo_usuario);
        f.append("nombre", data.nombre);
        f.append("correo", data.correo);
        f.append("contrasena", data.contrasena);
        f.append("METHOD", "PUT");
        await axios.post(baseUrl, f, { params: { id: data.id } })
            .then(response => {
                var dataNueva = dataTable;
                dataNueva.map(e => {
                    if (e.id === data.id) {
                        e.id_tipo_usuario = data.id_tipo_usuario;
                        e.nombre = data.nombre;
                        e.correo = data.correo;
                        e.contrasena = data.contrasena;
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

    const eliminarUsuario = async (seleccionado) => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, { params: { id: seleccionado.id } })
            .then(response => {
                setDataTable(dataTable.filter(usuario => usuario.id !== seleccionado.id));
            })
    }

    return (
        <React.Fragment>
            <div className="container-fluid py-5 pt-4">
                <p className="pt-3 font-weight-bold">USUARIOS</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">ID</th>
                            <th className="text-center font-weight-bold">Tipo Usuario</th>
                            <th className="text-center font-weight-bold">Nombre</th>
                            <th className="text-center font-weight-bold">Correo</th>
                            <th className="text-center font-weight-bold">Contrase??a</th>
                            <th className="text-center font-weight-bold">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td className="text-center">{e.id}</td>
                                    <td className="text-center">{e.id_tipo_usuario === "1" ? "Administrador" : "Piloto"}</td>
                                    <td className="text-center">{e.nombre}</td>
                                    <td className="text-center">{e.correo}</td>
                                    <td className="text-center">{e.contrasena}</td>
                                    <td className="text-center">
                                        <button className="btn btn-success" onClick={() => { seleccionarUsuario(e, "Editar") }}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => { eliminarUsuario(e) }}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Usuario</td>
                            <td>
                                <label className="font-weight-bold mb-0 pb-1">Tipo de Usuario</label>
                                <select name="id_tipo_usuarioInsertar" value={data.id_tipo_usuarioInsertar} className="form-control" onChange={handleChange}>
                                    <option value={"DEFAULT"} disabled>Seleccione...</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Piloto</option>
                                </select>
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="nombreInsertar" value={data.nombreInsertar} label="Nombre" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="correoInsertar" value={data.correoInsertar} label="Correo Electr??nico" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="contrasenaInsertar" value={data.contrasenaInsertar} label="Contrase??a" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary" onClick={() => { insertarUsuarios() }}>Crear Nuevo</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader><b className="font-weight-bold">Editar Usuario</b></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <select name="id_tipo_usuario" value={data.id_tipo_usuario} className="form-control" onChange={handleChange}>
                            <option value={"DEFAULT"} disabled>Seleccione...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Piloto</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={data && data.nombre} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Correo Electr??nico</label>
                        <input type="text" className="form-control" name="correo" value={data && data.correo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Contrase??a</label>
                        <input type="text" className="form-control" name="contrasena" value={data && data.contrasena} onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => { actualizarUsuario() }}>Actualizar</button>
                    <button className="btn btn-danger" onClick={() => { abrirCerrarModalEditar() }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default Crud;
