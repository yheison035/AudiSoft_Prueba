
<?php

include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "select mar.id_usuario, mar.nombre as nombreMarca, modl.nombre as nombreModelo from marcas as mar
    inner join modelos as modl ON modl.id_marcas = mar.id";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
}

?>