function resize_to_fit(canvas_name) {
    var canvas = document.getElementById(canvas_name);

    canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth / 2 - 2;
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

function resize_all() {
    resize_to_fit("high_side_canvas");
    resize_to_fit("low_side_canvas");
    resize_to_fit("monitoring_canvas");
    resize_to_fit("control_canvas");
}

function label_all() {
    label("high_side_canvas", "High Side")
    label("low_side_canvas", "Low Side")
    label("monitoring_canvas", "Monitor")
    label("control_canvas", "Control")
}

function initialise() {
    resize_all();
    label_all();
    xOut("high_side_canvas")
}

window.onload = function() {
    initialise();
}

window.addEventListener("resize",initialise)

