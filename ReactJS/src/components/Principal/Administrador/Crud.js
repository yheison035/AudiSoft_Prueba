import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';

function Crud() {
    const [modalEditar, setModalEditar] = useState(false);
    const [Data, setData] = useState({
        nombre: 'Yeison Suarez',
        correo: 'yheison0035@gmail.com',
        contrasena: '123456'
    });

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const seleccionarUsuario = (seleccionado, caso) => {
        console.log(seleccionado);
        caso === "Editar" && abrirCerrarModalEditar();
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
                        <tr>
                            <td className="text-center">1</td>
                            <td className="text-center">Yeison Suarez</td>
                            <td className="text-center">yheison0035@gmail.com</td>
                            <td className="text-center">123456</td>
                            <td className="text-center">
                                <button className="btn btn-success" onClick={() => { seleccionarUsuario("Carro", "Editar") }}>Editar</button>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Usuario</td>
                            <td className="text-center">
                                <MDBInput type="text" name="Nombre" label="Nombre" outline />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="Correo" label="Correo Electrónico" outline />
                            </td>
                            <td className="text-center">
                                <MDBInput type="text" name="Contraseña" label="Contraseña" outline />
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
                        <input type="text" className="form-control" name="nombre" value={Data.nombre} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Correo Electrónico</label>
                        <input type="text" className="form-control" name="correo" value={Data.correo} />
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Contraseña</label>
                        <input type="text" className="form-control" name="contrasena" value={Data.contrasena} />
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
