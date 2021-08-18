import { MDBInput } from 'mdbreact';
import React, { useState, useEffect } from 'react';

function CrudModelos() {
    const [stateSelect, setstateSelect] = useState(1);

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
                                <button className="btn btn-success">Editar</button>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center pt-5 font-weight-bold">Nuevo Usuario</td>
                            <td className="text-center">
                                <MDBInput name="Nombre" label="Nombre" outline />
                            </td>
                            <td className="text-center">
                                <MDBInput name="Correo" label="Correo Electrónico" outline />
                            </td>
                            <td className="text-center">
                                <MDBInput name="Contraseña" label="Contraseña" outline />
                            </td>
                            <td className="text-center">
                                <button className="btn btn-primary">Crear Nuevo</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default CrudModelos;


