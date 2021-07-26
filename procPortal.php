<?php
include("inc.php");

$p = new KDPDO($conn, "data");


//Tomamos el comando que viene desde el portal
$c = $p->getParameter("c");


//Actuamos seg'un el par'ametro
switch ($c) {

        //Cargar las categorias
    case "c":

        $categorias = [];
        $sql = "SELECT categorias FROM productos";
        $data = $p->query($sql);


        foreach ((array) $data as $fila) {
            $palabras = explode(",", $fila["categorias"]);
            foreach ($palabras as $categoria) {
                // print_r($categorias);
                //die();
                if (!in_array($categoria, $categorias)) {
                    $categorias[] = $categoria;
                }
            }
        }
        sort($categorias);

        $categorias2 = [];
        foreach ($categorias as $c) {
            $categorias2[] = ["categoria" => ["label" => $c, "href" => $c]];
        }

        $p->send($categorias2);

        break;

    case "p": //Cargar los productos en orden de ventas (m'as vendidos primeros)
        //$sql = "SELECT productos.*, imagenes.nombre as nombreImagen  FROM productos left join imagenes on productos.id = imagenes.idProducto ORDER BY vendidos";
        $sql = "SELECT *  FROM productos  ORDER BY vendidos";
        $productos = $p->query($sql);
        $datos = [];
        foreach ($productos as $producto) {
            $idProducto = $producto["id"];
            $sql = "SELECT nombre  FROM imagenes WHERE idProducto = $idProducto";
            $imagenes = $p->query($sql);
            $producto["imagenes"] = $imagenes;
            $datos[] = $producto;
        }
        $p->send($datos);
        break;


    case "k": //Cargar los productos en orden de ventas (m'as vendidos primeros)
        //$sql = "SELECT productos.*, imagenes.nombre as nombreImagen  FROM productos left join imagenes on productos.id = imagenes.idProducto ORDER BY vendidos";
        $categoria = "%" . $p->getParameter("k") . "%";

        $sql = "SELECT *  FROM productos WHERE categorias LIKE '$categoria' ORDER BY vendidos";
        $productos = $p->query($sql);
        $datos = [];
        foreach ($productos as $producto) {
            $idProducto = $producto["id"];
            $sql = "SELECT nombre  FROM imagenes WHERE idProducto = $idProducto";
            $imagenes = $p->query($sql);
            $producto["imagenes"] = $imagenes;
            $datos[] = $producto;
        }
        $p->send($datos);
        break;

    case "b": //B'usqueda
        $palabras = "%" . $p->getParameter("q") . "%";
        $sql = "SELECT *  FROM productos WHERE nombre LIKE '$palabras' OR descripcion LIKE '$palabras' ORDER BY vendidos";
        $productos = $p->query($sql);
        $datos = [];
        foreach ($productos as $producto) {
            $idProducto = $producto["id"];
            $sql = "SELECT nombre  FROM imagenes WHERE idProducto = $idProducto";
            $imagenes = $p->query($sql);
            $producto["imagenes"] = $imagenes;
            $datos[] = $producto;
        }
        $p->send($datos);
        break;
}
