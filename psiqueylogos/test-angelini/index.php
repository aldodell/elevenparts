<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Documento sin título</title>
<style type="text/css">
preguntas {
	background-color: #FC0;
	border-top-style: double;
	border-right-style: double;
	border-bottom-style: double;
	border-left-style: double;
	border-top-color: #FF3;
	border-right-color: #FF3;
	border-bottom-color: #FF3;
	border-left-color: #FF3;
}
.botonAvanzar {
	height: 100px;
	width: 100px;
}
</style>
</head>

<body>
<br />
<script>



var index = 0
var answers = [];
var user = "";
while(user == "" || user == undefined) { user = window.prompt("Por favor indique su nombre", ""); }

user = user.toUpperCase();
alert("Bienvenido " + user + ". por favor sigue las instrucciones que te indicaremos a continuación");
var sigma = 1;



function loadQuestion() {
  numberQuestion.innerText = sigma;
  checka.checked = false;
  checkb.checked = false;
  person.value = user; // + sigma;
  var qa = q[index]['question'];
  var qb = q[index + 1]['question'];
  layerQa.innerText = qa; 
  layerQb.innerText = qb;
  index = index + 2;
  sigma++;
	
}

//This function is call by press button "Answer"
function saveAnswer() {
 answers.value = answers.value + (checka.checked ? "A" : "X") + (checkb.checked ? "B" : "X"); 
  if(index==200) {
	  alert("Gracias por contestar este cuestionario. Se enviarán los datos al servior");
  	form1.submit();
		} else {
	 loadQuestion();
	}
}
</script>
<form action="read.php" method="post" enctype="multipart/form-data" name="form1" id="form1">
  <table width="100%" border="0" cellspacing="2" cellpadding="2">
    <tr>
      <td colspan="3"><p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p></td>
    </tr>
    <tr>
      <td colspan="2" bgcolor="#FFFFCC"><strong>Lee cada enunciado y marca el que prefieras. Si te gustan los dos marca los dos aspectos.O si prefieres no marques ninguno. Luego que selecciones pulsa el botón de avance.<span id="nq" /></strong></td>
      <td bgcolor="#FFFFCC">&nbsp;</td>
    </tr>
    <tr>
      <td colspan="2">&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td width="10%"><label>
          <input type="checkbox" name="optionA" value="" id="CA" />
          A </label></td>
      <td width="36%"><div id="QA"></div></td>
      <td width="54%">&nbsp;</td>
    </tr>
    <tr>
      <td><label>
          <input type="checkbox" name="optionB" value="" id="CB"  />
          B </label></td>
      <td><div id="QB"></div></td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td colspan="3">&nbsp;</td>
    </tr>
    <tr>
      <td colspan="3"><input name="btn_next" type="button" class="botonAvanzar" id="btn_next" onclick = "saveAnswer()" value="AVANZAR -&gt;"/>
        <input type="hidden" name="answers" id="answers" />
        <input type="hidden" name="person" id="person" /></td>
    </tr>
  </table>
</form>
<script>
<?php

include("include.php");
//Download data
$sql = "select id,question,section from angelini_questions order by id";
$res =  $mysqli->query($sql);
$rows = array();
while ($r = $res->fetch_assoc()) {
  $rows[] = $r;
}
printf ("var q = " . json_encode($rows) . ";\r\n");
$res->close();
?>
layerQa = document.getElementById("QA");
layerQb = document.getElementById("QB");
checka = document.getElementById("CA");
checkb = document.getElementById("CB");
person = document.getElementById("person");
answers = document.getElementById("answers");
form1 = document.getElementById("form1");
numberQuestion = document.getElementById("nq");


answers.value = ""
person.value = user;

loadQuestion();
</script>
</body>
</html>
