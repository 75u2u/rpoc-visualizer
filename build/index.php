<?php
require_once("Smarty/libs/Smarty.class.php");
$smarty = new Smarty();

$smarty->template_dir = "templates/";
$smarty->compile_dir = "Smarty/templates_c/";

$time = time();

$smarty->assign("time", $time);
$smarty->assign("point", "334");

$smarty->display("index.html");
