import { MDBInput } from 'mdbreact';
import React, { useState, useEffect } from 'react';

function Listado() {
    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">AUTOMOVILES</p>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">Marca</th>
                            <th className="text-center font-weight-bold">Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
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
