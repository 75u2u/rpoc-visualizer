<?php
/* Smarty version 3.1.34-dev-7, created on 2020-11-10 15:46:02
  from 'C:\Users\75u2u\Documents\rpoc-visualizer\build\templates\index.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_5faab5ba3a9c97_39854634',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8835f60dbad0f064b0616e3ea6684d4037b81d1d' => 
    array (
      0 => 'C:\\Users\\75u2u\\Documents\\rpoc-visualizer\\build\\templates\\index.html',
      1 => 1605022610,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5faab5ba3a9c97_39854634 (Smarty_Internal_Template $_smarty_tpl) {
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
		<?php echo '<script'; ?>
 src="countdown.js"><?php echo '</script'; ?>
>
		<!--<?php echo '<script'; ?>
 src="./index.js"><?php echo '</script'; ?>
>-->
		<div id="info"><a href="https://www.ipa.go.jp/jinzai/camp/2020/zenkoku2020_program_list.html#list_a8" target="_blank" rel="noopener">Robust Protocol Open Challenge</a> Visualizer</div>
		<div id="time"></div>
		<div id="log"><?php echo $_smarty_tpl->tpl_vars['log']->value[0];?>
</div>
		<div id="point"><?php echo $_smarty_tpl->tpl_vars['point']->value;?>
 pts.</div>
		<iframe src="https://raw.githubusercontent.com/anars/blank-audio/master/500-milliseconds-of-silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
		<audio autoplay id="audio">
			<source src="music/DECISIVEBATTLE.mp3" type="audio/mp3">
		</audio>
	</body>
</html>
<?php }
}
