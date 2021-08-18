import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listado() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/TablaAutomoviles.php');
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, [])

    const cargarUsuarios = async () => {
        await axios.get(baseUrl)
            .then(response => {
                debugger
                setDataTable(response.data);
            })
    }

    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">AUTOMOVILES</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">ID usuario</th>
                            <th className="text-center font-weight-bold">Modelo</th>
                            <th className="text-center font-weight-bold">Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((e, i) => (
                            <tr key={i}>
                                <td className="text-center">{e.id_usuario}</td>
                                <td className="text-center">{e.nombreMarca}</td>
                                <td className="text-center">{e.nombreModelo}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="text-center">Renault</td>
                            <td className="text-center">Logan</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default Listado;
