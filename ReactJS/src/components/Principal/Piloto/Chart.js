import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

var cantidad = [];
var nombresMarcas = [];

function Chart() {
    const baseUrl = ('http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/chart.php');
    const [dataGraph, setdataGraph] = useState([]);
    const [optionsGraph, setoptionsGraph] = useState([]);

    useEffect(() => {
        cargarAutomoviles();
        cantidad = [];
        nombresMarcas = [];
    }, [])

    const cargarAutomoviles = async () => {
        await axios.get(baseUrl, { params: { id_usuario: parseInt(sessionStorage.getItem('id_usuario')) } })
            .then(response => {
                response.data.map((e) => {
                    if (e.nombre) {
                        nombresMarcas.push(e.nombre);
                    }
                    if (e.cantidadModelos) {
                        cantidad.push(e.cantidadModelos);
                    }
                    return []
                });
            })
        configure_graph();
    }

    const configure_graph = () => {
        const dataC = {
            labels: nombresMarcas,
            datasets: [{
                label: "Automoviles",
                data: cantidad,
                backgroundColor: [
                    'rgb(0, 0, 10)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 120, 10)'
                ],
                hoverOffset: 4,
            }]
        };
        const options = {
            maintainAspectRatio: false,
            responsive: true
        }
        setdataGraph(dataC);
        setoptionsGraph(options);
    }

    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">REPORTE GRÁFICO</p>
                <hr />
                <Doughnut data={dataGraph} options={optionsGraph} />
            </div>
        </React.Fragment>
    );
}

export default Chart;
