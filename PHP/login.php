<?php
include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $correo = $_GET['correo'];
    $contrasena = $_GET['contrasena'];
    $query = "select * from usuario where correo='" . $correo . "' and contrasena='" . $contrasena . "'";
    $resultado=metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    header("HTTP/1.1 200 OK");
    exit();
}
