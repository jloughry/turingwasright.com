var ctx = document.getElementById('high_side_canvas').getContext('2d');
var img = new Image();

function setSize(canvas_name) {
    var canvas = document.getElementById(canvas_name);

    canvas.width = window.innerWidth / 2 - 10;
    canvas.height = window.innerHeight / 2 - 10;
}

function label(canvas_name, label) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");

    context.font = "bold 20px sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(label, canvas.width / 2, canvas.height / 2);
}

function xOut(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");

    context.moveTo(0,0);
    context.lineTo(canvas.width,canvas.height);
    context.moveTo(canvas.width,0);
    context.lineTo(0,canvas.height);
    context.strokeStyle = "#000000";
    context.stroke();
}

setSize("high_side_canvas");
setSize("low_side_canvas");
setSize("monitoring_canvas");
setSize("control_canvas");

label("high_side_canvas", "High Side")
label("low_side_canvas", "Low Side")
label("monitoring_canvas", "Monitor")
label("control_canvas", "Control")

xOut("high_side_canvas")

