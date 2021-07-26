<?php
include("inc.php");
//include("../../KD2021/kd2021.php");

$p = new KDPDO($conn, "data");
$c = $p->getParameter("c");
$idProducto = $p->getParameter("idProducto");

switch ($c) {
    case "s": // Guardar la imagen

        //Obtenemos el nombre de la imagen
        $archivo = $_FILES['file']['name'];

        //obtenemos al extensi'on:
        $ext = explode(".", $archivo)[1];

        //Creamos un nuevo elemento en la base de datos y obtenemos el identificador
        $p->execute("INSERT INTO imagenes (idProducto) values ($idProducto)");
        $id = $p->lastInsertId;

        //creamos el nuevo nombre de la imagen
        $archivo2 = $id . "." . $ext;

        //Movemos el archivo desde el dep'osito temporal al definitvo
        if (move_uploaded_file($_FILES['file']['tmp_name'], DIRECTORIO_IMAGENES . $archivo2)) {
            //
        } else {
            die("ERROR UPLOADING FILE");
        }

        //Actualizamos la base de datos, con el nombre actual de la im'agen
        $p->data = array(array(":nombre" => $archivo2, ":id" => $id));
        $p->execute("UPDATE imagenes SET nombre = :nombre WHERE id = :id");

        break;


    case "l": //Listado de imagenes por producto
        $p->data["idProducto"] = $idProducto;
        $p->send($p->query("SELECT * FROM imagenes WHERE idProducto = :idProducto"));
        break;

    case "d": //Elimina una imagen, tanto el archivo como la referencia a la base de datos
        $nombre = $p->getParameter("nombre");
        $sql = "DELETE FROM imagenes WHERE nombre = :nombre";
        $p->data = array(array("nombre" => $nombre));
        $p->execute($sql);
        break;
}
