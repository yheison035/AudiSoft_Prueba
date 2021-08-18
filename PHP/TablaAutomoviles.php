
<?php

include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "select u.nombre as nombrePiloto, mar.id_usuario, mar.nombre as nombreMarca, modl.nombre as nombreModelo from marcas as mar
    left join modelos as modl ON modl.id_marcas = mar.id
    inner join usuario as u ON u.id = mar.id_usuario";
    $resultado = metodoGet($query);
    echo json_encode($resultado->fetchAll());
    header("HTTP/1.1 200 OK");
    exit();
}

?>