import React, { useState } from 'react';
import { MDBInput } from "mdbreact";
import '../styles/styles.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


function Login() {
    const history = useHistory();
    const baseUrl = "http://localhost:8080/PROYECTO_REACTJS_PHP/AudiSoft_Prueba/PHP/login.php";
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
        await axios.get(baseUrl, { params: { correo: data.correo, contrasena: data.contraseña } })
            .then(response => {
                if (response.data !== false) {  
                    sessionStorage.setItem('id_usuario', parseInt(response.data.id));
                    sessionStorage.setItem('id_tipo_usuario', parseInt(response.data.id_tipo_usuario));
                    sessionStorage.setItem('nombre', response.data.nombre);
                    history.push('/principal');
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
                        {/* <Link to="/principal"><span className="boton-login">Iniciar Sesión</span></Link> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
