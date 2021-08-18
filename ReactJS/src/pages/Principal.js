import React, { useState, useEffect } from 'react';
import Crud from '../components/Principal/administrador/Crud';
import Listado from '../components/Principal/administrador/Listado';
import Chart from '../components/Principal/piloto/Chart';
import CrudMarcas from '../components/Principal/piloto/CrudMarcas';
import CrudModelos from '../components/Principal/piloto/CrudModelos';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Principal() {
    const history = useHistory();
    const [stateTipoUsuario, setstateTipoUsuario] = useState(1);
    const [stateSelect, setstateSelect] = useState(1);

    useEffect(() => {
        if (sessionStorage.length <= 0) {
            history.push('/')
        }else{
            setstateTipoUsuario(parseInt(sessionStorage.getItem('id_tipo_usuario')));
            if(sessionStorage.getItem('id_tipo_usuario') === "1"){
                setstateSelect(1);
            }else{
                setstateSelect(3);
            }
        }
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid pt-2">
                <span>Tipo Usuario: <b className="font-weight-bold">{sessionStorage.getItem('id_tipo_usuario') === "1" ? "Administrador" : "Piloto"}</b></span>&nbsp;&nbsp;&nbsp;
                <span>Usuario: <b className="font-weight-bold">{sessionStorage.getItem('nombre')}</b></span>
                <Link to="/" className="btn_cerrarSesion">
                    <span>Cerrar Sesión</span>
                </Link>
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
