<?php
require_once("Smarty/libs/Smarty.class.php");
$smarty = new Smarty();

$smarty->template_dir = "templates/";
$smarty->compile_dir = "Smarty/templates_c/";

$smarty->assign("point", "334");

//$log = var_dump(file("log/" . 'test.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES));
//$smarty->assign("log", $log);

$smarty->display("index.html");
