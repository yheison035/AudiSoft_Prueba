import React, { useState, useEffect } from 'react';
import { Doughnut  } from 'react-chartjs-2';

function Chart() {
    const [dataGraph, setdataGraph] = useState([]);
    const [optionsGraph, setoptionsGraph] = useState([]);

    useEffect(() => {
        configure_graph();
    }, [])

    const configure_graph = async () => {
        const data = {
            labels: [
                'Nissan',
                'Renault',
                'Mazda'
            ],
            datasets: [{
                label: "Automoviles",
                data: [200, 300, 600],
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
        setdataGraph(data);
        setoptionsGraph(options);
    }

    return (
        <React.Fragment>
            <div className="container py-5 pt-4">
                <p className="pt-3 font-weight-bold">REPORTE GRÁFICO</p>
                <hr />
                <Doughnut  data={dataGraph} options={optionsGraph} />
            </div>
        </React.Fragment>
    );
}

export default Chart;
