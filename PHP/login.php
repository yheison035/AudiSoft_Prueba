<?php
include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "select * from usuario where correo=" . $_GET['correo'] . " and contrasena=" . $_GET['contrasena'] . "";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    header("HTTP/1.1 200 OK");
    exit();
}

// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
// header("Content-Type: text/html; charset=utf-8");

// require_once './Conexion/Conexion.php';
// $conn = conectaDb();

// $datos = $conn->prepare("SELECT * FROM usuario WHERE correo = :email AND contrasena = :contra");
// $correo = ($_REQUEST['correo']);
// $contra = ($_REQUEST['contrasena']);
// $datos->bindParam(':email', $correo);
// $datos->bindParam(':contra', $contra);
// $datos->execute();
// if ($datos->rowCount() > 0) {
//     echo 1;
// } else {
//     echo 2;
// }
