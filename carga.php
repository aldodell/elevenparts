<?php
include("inc.php");

$directorio = scandir("img/");
$p = new KDPDO($conn, "data");

$p->execute("TRUNCATE productos;");
$p->execute("TRUNCATE imagenes;");


foreach ($directorio as $archivo) {
    if (substr($archivo, 0, 1) != ".") {
        echo "$archivo<br>";
        $p->execute("INSERT INTO productos (nombre,codigo,categorias,cantidad) values ('$archivo','$archivo','repuestos',1)");
        $id = $p->lastInsertId;
        $p->execute("INSERT INTO imagenes (idProducto, nombre) values ('$id', '$archivo')");
    }
}
