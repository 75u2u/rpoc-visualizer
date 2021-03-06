var i = 0;
var j = 0;

var protocol;
var data;

// CSVファイル読み込み
function csvToArray(path) {
	var csvData = new Array();
	var data = new XMLHttpRequest();
	data.open("GET", path, false);
	data.send(null);
	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
}

var count = 6000; // 初期値 60sec
var timerID = setInterval('countdown()',10); // 1000 = 1sec
var s; // パケット秒

function countdown() {
    if(count > 0) {
		count--;
        var count_ms = count / 100;
		
		i = 60 - parseInt(count_ms);
		var d = parseFloat(data[i][1], 10);
		for(j=i; i>d; j++) {
			d = parseFloat(data[j][1], 10);
		}
		i=j;

		s = parseInt(data[j][1], 10);

        if(count_ms < 10) count_ms = "0" + count_ms; // 桁合わせ
		document.getElementById('time').innerHTML = "00:" + count_ms;
		
		protocol = data[s][2].replace("eth:ethertype:", "");


		document.getElementById('log').innerHTML = s + "s " + " [ " + protocol + " ] " + data[s][3] + " → " + data[s][4];

		//document.getElementById('point').innerHTML = "10" + " pts.";

    }
    if(count <= 1000) { // 10sec でレッドランプ
        document.getElementById('time').style.color = 'red';
    }
    else {
// ピーってならす
// 点滅
    }
}

// ページロード時に実行
window.onload=function () {
    data = csvToArray("log/gamelog.csv");
	//alert(parseInt(data[1][1], 10));
};