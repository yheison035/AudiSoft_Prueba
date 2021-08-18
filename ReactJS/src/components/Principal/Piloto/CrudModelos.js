import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';

function CrudModelos() {
    const [modalEditar, setModalEditar] = useState(false);
    const [Data, setData] = useState({
        marca: 'DEFAULT',
        nombre: 'Modelo',
    });

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const seleccionarModelo = (seleccionado, caso) => {
        console.log(seleccionado);
        caso === "Editar" && abrirCerrarModalEditar();
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
                        <tr>
                            <td className="text-center">1</td>
                            <td className="text-center">Renault</td>
                            <td className="text-center">Logan</td>
                            <td className="text-center">
                                <button className="btn btn-success" onClick={() => { seleccionarModelo("Carro", "Editar") }}>Editar</button>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Modelo</td>
                            <td>
                                <label className="font-weight-bold mb-0 pb-1">Marcas agregadas</label>
                                <select name="marca" value={Data.marca} className="form-control">
                                    <option value={"DEFAULT"} disabled>Seleccione...</option>
                                    <option value="1">Renault</option>
                                    <option value="2">Chevrolet</option>
                                </select>
                            </td>
                            <td className="text-center mt-2">
                                <MDBInput type="text" name="nombre" label="Modelo" outline />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary">Crear Nuevo</button>
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
                        <select name="marca" value={Data.marca} className="form-control">
                            <option value={"DEFAULT"} disabled>Seleccione...</option>
                            <option value="1">Renault</option>
                            <option value="2">Chevrolet</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold mb-0 pb-1">Nombre</label>
                        <input type="text" className="form-control" name="nombre" value={Data.nombre} />
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

export default CrudModelos;


