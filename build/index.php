<?php
require_once("Smarty/libs/Smarty.class.php");
$smarty = new Smarty();

$smarty->template_dir = "./templates/";
$smarty->compile_dir = "./Smarty/templates_c/";

$smarty->assign("time", "00:59");
$smarty->assign("point", "334");

$smarty->display("index.html");
