import React, { useState } from 'react';
import { MDBInput } from "mdbreact";
import '../styles/styles.css';
import axios from 'axios';
import Swal from "sweetalert2";


function Login() {
    const baseUrl = "http://localhost/Prueba%20React%20PHP/PHP/login.php";
    const [data, setData] = useState({
        correo: '',
        contraseña: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        // console.log(data);
    }

    const sendData = async () => {
        let f = new FormData();
        f.append('correo', data.correo);
        f.append('contrasena', data.contraseña);
        await axios.post(baseUrl, f)
            .then(response => {
                if (response.data === 1) {  
                    sessionStorage.setItem('idusuario', response.data);
                    this.props.history.push('/principal');
                } else {
                    Swal.fire({
                        text: "Datos Invalidos!",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Intentar nuevamente!'
                    })
                }
            })
    }

    return (
        <React.Fragment>
            <div className="login">
                <div className="contenedor">
                    <div className="formulario py-5">
                        <h5 className="font-weight-bold">Iniciar Sesión</h5>
                        <i>Logueo prueba AUDISOFT</i>
                        <hr />
                        <div className="form-group pb-3">
                            <MDBInput type="text" name="correo" label="Correo Electrónico" outline onChange={handleChange} />
                            <MDBInput type="password" name="contraseña" label="Contraseña" outline onChange={handleChange} />
                        </div>
                        <span className="boton-login" onClick={() => { sendData() }}>Iniciar Sesión</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
