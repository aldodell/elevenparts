<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin título</title>
</head>

<body>
<script>
<?php

include("include.php");
$person = $_POST["person"];
$answers = $_POST["answers"];

$sql = "insert into angelini_answers (person, answers) values ('$person', '$answers');";
$mysqli->query($sql);

?>
alert("Los datos han sido guardados. Gracias <?php echo $person; ?>");
</script>
</body>
</html>