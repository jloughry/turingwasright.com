function size_and_position(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");
    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;

    // Size the canvas to fit.
    canvas.width = center_x;
    canvas.height = center_y;

    // Position the canvas in the window.
    center_x += "px";
    center_y += "px";

    // Not defined inside the switch block because needed in this scope.
    var position_left; // undefined
    var position_top; // undefined

    switch(canvas_name) {
        case "high_side_canvas":
            position_left = "0px";
            position_top = "0px";
            context.fillStyle = "lightgrey";
            context.fillRect(0, 0, canvas.width, canvas.height);
            canvas.style.zIndex = 1;
            break;
        case "high_side_classification_banner_canvas":
            position_left = "0px";
            position_top = "0px";
            canvas.style.zIndex = 99;
            break;
        case "low_side_canvas":
            position_left = center_x;
            position_top = center_y;
            break;
        case "low_side_classification_banner_canvas":
            position_left = center_x;
            position_top = center_y;
            canvas.style.zIndex = 99;
            break;
        case "monitoring_canvas":
            position_left = "0px";
            position_top = center_y;
            break;
        case "monitoring_classification_banner_canvas":
            position_left = "0px";
            position_top = center_y;
            break;
        case "control_canvas":
            position_left = center_x;
            position_top = "0px"
            break;
        case "control_classification_banner_canvas":
            position_left = center_x;
            position_top = "0px"
            break;
        default:
            alert("incipient wombat yellow");
            break;
    }
    canvas.style.top = position_top;
    canvas.style.left = position_left;
}

function label(canvas_name, label) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");

    context.font = "bold 20px sans-serif";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(label, canvas.width / 2, canvas.height / 2);
}

function classify(canvas_name, security_label) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");
    var banner_height = 17;

    switch(security_label) {
        case "UNCLASSIFIED":
            context.fillStyle = "lime";
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "black";
            context.font = "bold 15px sans-serif";
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillText("UNCLASSIFIED", canvas.width / 2, 0);
            break;
        case "TOP SECRET":
            context.fillStyle = "orange";
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "black";
            context.font = "bold 15px sans-serif";
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillText("TOP SECRET", canvas.width / 2, 0);
            break;
        case "SYSTEM HIGH":
            context.fillStyle = "red";
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "white";
            context.font = "bold 15px sans-serif";
            context.textBaseline = "top";
            context.textAlign = "center";
            context.fillText("SYSTEM HIGH", canvas.width / 2, 0);
            break;
        default:
            alert("green spider maiden");
            break;
    }
}

function label_all() {
    label("high_side_canvas", "High Side")
    label("low_side_canvas", "Low Side")
    label("monitoring_canvas", "Monitor")
    label("control_canvas", "Control")
}

function initialise() {
    size_and_position("high_side_canvas");
    size_and_position("high_side_classification_banner_canvas");
    classify("high_side_classification_banner_canvas", "TOP SECRET");
    size_and_position("low_side_canvas");
    size_and_position("low_side_classification_banner_canvas");
    classify("low_side_classification_banner_canvas", "UNCLASSIFIED");
    size_and_position("monitoring_canvas");
    size_and_position("monitoring_classification_banner_canvas");
    classify("monitoring_classification_banner_canvas", "SYSTEM HIGH");
    size_and_position("control_canvas");
    size_and_position("control_classification_banner_canvas");
    classify("control_classification_banner_canvas", "SYSTEM HIGH");
    label_all();
}

window.onload = function() {
    initialise();
}

window.addEventListener("resize",initialise)

