<?php
require_once("Smarty/libs/Smarty.class.php");
$smarty = new Smarty();

$smarty->template_dir = "templates/";
$smarty->compile_dir = "Smarty/templates_c/";

//$smarty->assign("point", "334");

/*
$filer = fopen('log/Test1.csv', 'r');
$newAry = array();
$i = 0; // データ数
$j = 0;
// 1行ずつCSVを配列に変換して $newAry に格納。
while ($line = fgetcsv($filer)) {
    $newAry[] = $line;
    $newAry[$i][1] = (int)$newAry[$i][1];
    $i++;
}
fclose($filer);
//var_dump($newAry);
//echo $i;
*/

$smarty->display("index.html");
