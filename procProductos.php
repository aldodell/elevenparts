<?php
include("inc.php");
//include("../../KD2021/kd2021.php");

$p = new KDPDO($conn, "data");

//processing:
switch ($p->getParameter("c")) {
    case "i":
        $p->execute("INSERT INTO productos (nombre) VALUES ('')");
        break;

    case "l": //listado
        $p->send($p->query("SELECT id, nombre FROM productos order by id"));
        break;


    case "e": //modo edicion de un producto
        $p->data = ["id" => $p->getParameter("id")];
        $p->send($p->query("SELECT * FROM productos where id = :id"));
        break;

    case "s": //Guarda s'olo el nombre del producto y su id
        $id = $p->getParameter("id");
        $p->execute("UPDATE productos SET nombre = :nombre WHERE id = :id");
        break;


    case "a":
        $sql = "UPDATE productos SET nombre = :nombre, descripcion = :descripcion, marca = :marca, modelo = :modelo, codigo = :codigo, categorias = :categorias, precio = :precio, cantidad = :cantidad, vendidos = :vendidos WHERE id = :id";
        $p->execute($sql);
        break;

    case "d":
        $id = $p->getParameter("id");
        $p->execute("DELETE FROM productos WHERE id = $id");
        break;
}
