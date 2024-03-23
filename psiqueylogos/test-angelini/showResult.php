<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin título</title>
</head>

<body>
<table width="100%" border="0" cellspacing="2" cellpadding="2">
  <tr bgcolor="#999999">
    <td width="18%">Campo</td>
    <td width="82%">Valor</td>
  </tr>
  <tr>
    <td>Aire libre</td>
    <td id="v1">&nbsp;</td>
  </tr>
  <tr>
    <td>Ciencias Físicas</td>
    <td id="v2">&nbsp;</td>
  </tr>
  <tr>
    <td>Ciencias Biológicas</td>
    <td id="v3">&nbsp;</td>
  </tr>
  <tr>
    <td>Comercio   economía</td>
    <td id="v4">&nbsp;</td>
  </tr>
  <tr>
    <td>Periodismo</td>
    <td id="v5">&nbsp;</td>
  </tr>
  <tr>
    <td>Organización empresarial</td>
    <td id="v6">&nbsp;</td>
  </tr>
  <tr>
    <td>Ser vicio social</td>
    <td id="v7">&nbsp;</td>
  </tr>
  <tr>
    <td>Literatura</td>
    <td id="v8">&nbsp;</td>
  </tr>
  <tr>
    <td>Artes </td>
    <td id="v9">&nbsp;</td>
  </tr>
  <tr>
    <td>Música </td>
    <td id="v10">&nbsp;</td>
  </tr>
</table>
<script>

<?php

include("include.php");

$id =  $_GET["id"];
$sql = "SELECT answers FROM angelini_answers WHERE id = '$id'";
$result = $mysqli->query($sql);
$row =  $result->fetch_assoc();
$chain = $row["answers"];
$result->free();

echo "\r\nvar chain = \"$chain\"\r\n";
?>



/**
Calcula la suma de los elementos para un aspecto. Los aspectos se enumeran del 1 al 9 y son:
1  CF= Ciencias Físicas
2  CB= Ciencias Biológicas
3  SS=  Ser vicio social
4   C =   Comer cio ,  Economí
5   P=    P eriodismo
6   O=   Org anización empresarial
7   L =   Lit eratur a
8   A=    Art es 
9   M=   Música
*/

function getResult(chain, index) {
	var result = 0
	var k = "";
	var ini = 0;

	for (var i = 0; i<10; i++) {
	
		//VErtical
		ini = (index-1) * 20;
		ini = ini + (2 * i)
		k = chain.substr(ini,1);
		if (k == "A") result++;
		
		
		//hORIZONTAL
		ini = ((index * 2) - 1) + (i * 20)
		k = chain.substr(ini,1);
		if (k == "B") result++;
	}
		
	return result
	
}

for (var i=1; i<11; i++) {
	var id = "v" + i;
	var fila = document.getElementById(id);
	fila.innerText = getResult(chain,i);	
	
}



</script>
</body>
</html>