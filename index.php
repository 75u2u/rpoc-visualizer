<?php
require_once("build/Smarty/libs/Smarty.class.php");
$smarty = new Smarty();

$smarty->template_dir = "build/templates/";
$smarty->compile_dir = "build/Smarty/templates_c/";

$smarty->assign("time", "00:59");
$smarty->assign("point", "334");

$smarty->display("build/index.html");
