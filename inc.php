<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; charset=UTF-8');
include("../KD2021/kd2021.php");

/**
 * www.elevenpartes.com
 * Archivo de inclusión princial del portal
 */

const DIRECTORIO_IMAGENES = "img/";

$servername = "127.0.0.1";
$username = "elevetes_tienda";
$password = "xtoxto";
$database = "elevetes_tienda";


try {
  $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  //$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
  // echo "Connected successfully"; 
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}


function alert($m)
{
  echo ";alert(\"$m\");";
}

function fromBase64($bin)
{
  return urldecode(base64_decode($bin));
}

function toBase64($str)
{
  return base64_encode(urlencode($str));
}
