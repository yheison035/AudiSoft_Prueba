import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import axios from 'axios';

function Crud() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/usuarios.php');
    const [Data, setData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
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


    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">USUARIOS</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">ID</th>
                            <th className="text-center font-weight-bold">Nombre</th>
                            <th className="text-center font-weight-bold">Correo</th>
                            <th className="text-center font-weight-bold">Contraseña</th>
                            <th className="text-center font-weight-bold">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map(e => (
                            <tr key={e.id}>
                                <td className="text-center">{e.id}</td>
                                <td className="text-center">{e.nombre}</td>
                                <td className="text-center">{e.correo}</td>
                                <td className="text-center">{e.contrasena}</td>
                                <td className="text-center">
                                    <button className="btn btn-success" onClick={() => { seleccionarUsuario(e, "Editar") }}>Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Usuario</td>
                            <td className="text-center">
                                <MDBInput type="text" name="nombreInsertar" value={Data.nombreInsertar} label="Nombre" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="correoInsertar" value={Data.correoInsertar} label="Correo Electrónico" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="contrasenaInsertar" value={Data.contrasenaInsertar} label="Contraseña" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary">Crear Nuevo</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={modalEditar}>
                <ModalHeader><b className="font-weight-bold">Editar Usuario</b></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={Data && Data.nombre} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Correo Electrónico</label>
                        <input type="text" className="form-control" name="correo" value={Data && Data.correo} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Contraseña</label>
                        <input type="text" className="form-control" name="contrasena" value={Data && Data.contrasena} onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary">Actualizar</button>
                    <button className="btn btn-danger" onClick={() => { abrirCerrarModalEditar() }}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default Crud;
