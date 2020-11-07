<?php
/* Smarty version 3.1.34-dev-7, created on 2020-11-07 13:22:25
  from 'C:\Users\75u2u\Documents\rpoc-visualizer\build\templates\index.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_5fa69f910ba2e8_66166288',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8835f60dbad0f064b0616e3ea6684d4037b81d1d' => 
    array (
      0 => 'C:\\Users\\75u2u\\Documents\\rpoc-visualizer\\build\\templates\\index.html',
      1 => 1604755337,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5fa69f910ba2e8_66166288 (Smarty_Internal_Template $_smarty_tpl) {
?><html>
	<head>
		<title>RPOC-Visualizer [ver.α]</title>
		<link type="text/css" rel="stylesheet" href="main.css">
	</head>
	<body>
		<?php echo '<script'; ?>
 src="assets/js/Three.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="assets/js/OrbitControls.js"><?php echo '</script'; ?>
>
		<?php echo '<script'; ?>
 src="entry.js"><?php echo '</script'; ?>
>
		<!--<?php echo '<script'; ?>
 src="./index.js"><?php echo '</script'; ?>
>-->
		<div id="info"><a href="https://www.ipa.go.jp/jinzai/camp/2020/zenkoku2020_program_list.html#list_a8" target="_blank" rel="noopener">Robust Protocol Open Challenge</a> Visualizer</div>
		<div id="time"><?php echo '<script'; ?>
>
			var count = 6000; // 初期値
			var timerID = setInterval('countdown()',10); // 1000 = 1sec
			function countdown() {
				if(count > 0) {
					count--;
					var count_ms = count / 100;
					if(count_ms < 10) count_ms = "0" + count_ms; // 桁合わせ
					document.getElementById('time').innerHTML = "00:" + count_ms;
				}
			}<?php echo '</script'; ?>
></div>
		<div id="log">hh:mm:ss  [udp] taro -> hanako<br>hh:mm:ss  [udp] taro -> hanako<br>hh:mm:ss  [udp] taro -> hanako</div>
		<div id="point"><?php echo $_smarty_tpl->tpl_vars['point']->value;?>
 pts.</div>
		<iframe src="https://raw.githubusercontent.com/anars/blank-audio/master/500-milliseconds-of-silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
		<audio autoplay id="audio">
			<source src="./music/se_maoudamashii_magical01.mp3" type="audio/mp3">
		</audio>
		<audio autoplay id="audio">
			<source src="./music/Rico Puestel - Hacknet OST - 05 Roja Drifts By (Timo Jahns Strings Remix).mp3" type="audio/mp3">
		</audio>
	</body>
</html>
<?php }
}
