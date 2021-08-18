<?php

include 'Conexion/Conexion.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from usuario where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from usuario";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $id_tipo_usuario=$_POST['id_tipo_usuario'];
    $nombre=$_POST['nombre'];
    $correo=$_POST['correo'];
    $contrasena=$_POST['contrasena'];
    $query="insert into usuario(id_tipo_usuario, nombre, correo, contrasena) values ('$id_tipo_usuario', '$nombre', '$correo', '$contrasena')";
    $queryAutoIncrement="select MAX(id) as id from usuario";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $nombre=$_POST['nombre'];
    $correo=$_POST['correo'];
    $contrasena=$_POST['contrasena'];
    $query="UPDATE usuario SET nombre='$nombre', correo='$correo', contrasena='$contrasena' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM usuario WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
