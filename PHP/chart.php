

<?php
include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "
    SELECT mar.*, COUNT(mo.nombre) as cantidadModelos FROM marcas as mar 
    left join modelos as mo ON mo.id_marcas = mar.id 
    where mar.id_usuario = " . $_GET['id_usuario'] . " 
    GROUP BY mar.nombre";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
}
