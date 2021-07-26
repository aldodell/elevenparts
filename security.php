<?
include("inc.php");

$crypto = new KDCrypto();

$c = $crypto->getParameter("c");

switch ($c) {
    case "a":
        echo $crypto->getAWord();
        break;

    case "c":
        $p = $crypto->getParameter("p");
        echo $crypto->checkPhrase($p);
        break;

    default:
        break;
}
