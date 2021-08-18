import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { MDBInput } from 'mdbreact';
import axios from 'axios';

function CrudMarcas() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/marcas.php');
    const [modalEditar, setModalEditar] = useState(false);
    const [Data, setData] = useState({
        nombre: ''
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
        await axios.get(baseUrl)
            .then(response => {
                setDataTable(response.data);
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
                        {dataTable.map(e => (
                            <tr key={e.id}>
                                <td className="text-center">{e.id}</td>
                                <td className="text-center">{e.nombre}</td>
                                <td className="text-center">
                                    <button className="btn btn-success" onClick={() => { seleccionarMarca(e, "Editar") }}>Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nueva Marca</td>
                            <td className="text-center">
                                <MDBInput type="text" name="nombre" label="Nombre" outline onChange={handleChange} />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary">Crear Nuevo</button>
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
                        <input type="text" className="form-control" name="nombre" value={Data && Data.nombre} onChange={handleChange} />
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

export default CrudMarcas;

