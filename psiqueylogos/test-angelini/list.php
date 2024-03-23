<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Listado de clientes por nombres</title>
</head>

<body>
<h1>Test inventario de Angelini</h1>
<hr />
<h2>Listado de clientes:</h2>
<ul id="list">

</ul>
<script>
	
function buildList() {

	var theList = document.getElementById("list");
	
	function buildElement(value) {
		var element = document.createElement("LI");
		var linkk = document.createElement("a");
		linkk.href = "showResult.php?id=" + value.id;
		var text = document.createTextNode(value.person);
		linkk.appendChild(text);
		element.appendChild(linkk);
		theList.appendChild(element);
	}
	
	q.forEach(buildElement);
}


<?php

//Include database handlers
 include("include.php");

//query
$sql = "select person, id from angelini_answers order by person";
printf(getDataByJson($sql));	
?>
buildList();
    </script>
</body>
</html>