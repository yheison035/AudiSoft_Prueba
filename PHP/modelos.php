<?php

include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from modelos where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from modelos";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $id_marcas=$_POST['id_marcas'];
    $nombre=$_POST['nombre'];
    $query="insert into modelos(id_marcas, nombre) values ('$id_marcas', '$nombre')";
    $queryAutoIncrement="select MAX(id) as id from modelos";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id_marcas=$_POST['id_marcas'];
    $nombre=$_POST['nombre'];
    $query="UPDATE modelos SET id_marcas='$id_marcas', nombre='$nombre' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM modelos WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>