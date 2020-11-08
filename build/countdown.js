var count = 6000; // 初期値
var timerID = setInterval('countdown()',10); // 1000 = 1sec
function countdown() {
    if(count > 0) {
        count--;
        var count_ms = count / 100;
        if(count_ms < 10) count_ms = "0" + count_ms; // 桁合わせ
        document.getElementById('time').innerHTML = "00:" + count_ms;
    }
    if(count <= 1000) {
        document.getElementById('time').style.color = 'red';
    }
    else {
        
    }
}