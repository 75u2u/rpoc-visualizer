<?php
$time = "00:59";
$point = "334";
?>

<html>
	<head>
		<title>RPOC-Visualizer [ver.beta]</title>
		<link type="text/css" rel="stylesheet" href="main.css">
	</head>
	<body>
		<script src="assets/js/Three.js"></script>
		<script src="assets/js/OrbitControls.js"></script>
		<script src="./entry.js"></script>
		<!--<script src="./index.js"></script>-->
		<div id="info"><a href="https://www.ipa.go.jp/jinzai/camp/2020/zenkoku2020_program_list.html#list_a8" target="_blank" rel="noopener">Robust Protocol Open Challenge</a> Visualizer</div>
        <script src="countdown.js"></script>
		<div id="time"><?php echo htmlspecialchars($time, ENT_QUOTES, 'UTF-8');?></div>
		<div id="log">hh:mm:ss  [udp] taro -> hanako<br>hh:mm:ss  [udp] taro -> hanako<br>hh:mm:ss  [udp] taro -> hanako</div>
		<div id="point"><?php echo htmlspecialchars($point, ENT_QUOTES, 'UTF-8');?> pts.</div>
		<iframe src="https://raw.githubusercontent.com/anars/blank-audio/master/500-milliseconds-of-silence.mp3" allow="autoplay" id="audio" style="display:none"></iframe>
		<audio autoplay id="audio">
			<source src="./music/se_maoudamashii_magical01.mp3" type="audio/mp3">
		</audio>
		<audio autoplay id="audio">
			<source src="./music/Rico Puestel - Hacknet OST - 05 Roja Drifts By (Timo Jahns Strings Remix).mp3" type="audio/mp3">
		</audio>
	</body>
</html>
