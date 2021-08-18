<?php
include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_POST['METHOD'] == 'POST') {
    unset($_POST['METHOD']);
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $query = "select * from usuario where correo=" . $correo . " and contrasena=" . $contrasena . "";
    $queryAutoIncrement = "select MAX(id) as id from usuario";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
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
