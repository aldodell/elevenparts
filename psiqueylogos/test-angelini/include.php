<?php
// Conectarse a y seleccionar una base de datos de MySQL llamada sakila
// Nombre de host: 127.0.0.1, nombre de usuario: tu_usuario, contraseña: tu_contraseña, bd: sakila
$mysqli = new mysqli('127.0.0.1', 'aldo', 'xto', 'psiqueylogos');


// ¡Oh, no! Existe un error 'connect_errno', fallando así el intento de conexión
if ($mysqli->connect_errno) {
    // La conexión falló. ¿Que vamos a hacer? 
    // Se podría contactar con uno mismo (¿email?), registrar el error, mostrar una bonita página, etc.
    // No se debe revelar información delicada

    // Probemos esto:
    echo "Lo sentimos, este sitio web está experimentando problemas.";

    // Algo que no se debería de hacer en un sitio público, aunque este ejemplo lo mostrará
    // de todas formas, es imprimir información relacionada con errores de MySQL -- se podría registrar
    echo "Error: Fallo al conectarse a MySQL debido a: \n";
    echo "Errno: " . $mysqli->connect_errno . "\n";
    echo "Error: " . $mysqli->connect_error . "\n";
    
    // Podría ser conveniente mostrar algo interesante, aunque nosotros simplemente saldremos
    exit;
}

/* cambiar el conjunto de caracteres a utf8 */
if (!$mysqli->set_charset("utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", $mysqli->error);
    exit();
} else {
    printf("\r\n/*Conjunto de caracteres actual: %s */\r\n", $mysqli->character_set_name());
}


function getDataByJson($sql, $var = "q") {
	global $mysqli;
	
	$res =  $mysqli->query($sql);
	$rows = array();
	while ($r = $res->fetch_assoc()) {
	  $rows[] = $r;
	}
	$res->free();
	//$res->close();
	return ("var $var = " . json_encode($rows) . ";\r\n");
		
	
	
}



?>
