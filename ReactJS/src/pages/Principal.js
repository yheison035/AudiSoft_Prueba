import React, { useState } from 'react';
import Crud from '../components/Principal/Administrador/Crud';
import Listado from '../components/Principal/Administrador/Listado';
import Chart from '../components/Principal/Piloto/Chart';
import CrudMarcas from '../components/Principal/Piloto/CrudMarcas';
import CrudModelos from '../components/Principal/Piloto/CrudModelos';

function Principal() {
    const [stateTipoUsuario, setstateTipoUsuario] = useState(1);
    const [stateSelect, setstateSelect] = useState(1);

    return (
        <React.Fragment>
            <div className="container-fluid">
                <span>Tipo Usuario: <b>Administrador</b></span>&nbsp;&nbsp;&nbsp;
                <span>Usuario: <b>YEISON SUAREZ</b></span>
            </div>
            <div className="principal_opciones">
                <div className="container">
                    <ul>
                        {stateTipoUsuario === 1 ? (
                            <React.Fragment>
                                <li onClick={() => { setstateSelect(1) }} style={stateSelect === 1 ? { background: '#fff', color: 'gray' } : {}}><p>Usuarios</p></li>
                                <li onClick={() => { setstateSelect(2) }} style={stateSelect === 2 ? { background: '#fff', color: 'gray' } : {}}><p>Automoviles</p></li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li onClick={() => { setstateSelect(3) }} style={stateSelect === 3 ? { background: '#fff', color: 'gray' } : {}}><p>Marcas</p></li>
                                <li onClick={() => { setstateSelect(4) }} style={stateSelect === 4 ? { background: '#fff', color: 'gray' } : {}}><p>Modelos</p></li>
                                <li onClick={() => { setstateSelect(5) }} style={stateSelect === 5 ? { background: '#fff', color: 'gray' } : {}}><p>Reporte Gráfico</p></li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
                {stateSelect === 1 ? <Crud /> : <React.Fragment></React.Fragment>}
                {stateSelect === 2 ? <Listado /> : <React.Fragment></React.Fragment>}
                {stateSelect === 3 ? <CrudMarcas /> : <React.Fragment></React.Fragment>}
                {stateSelect === 4 ? <CrudModelos /> : <React.Fragment></React.Fragment>}
                {stateSelect === 5 ? <Chart /> : <React.Fragment></React.Fragment>}
            </div>
        </React.Fragment>
    );
}

export default Principal;
