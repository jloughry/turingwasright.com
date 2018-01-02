border_thickness = 8; // border around canvases
inter_canvas_gap = 6; // space between canvases

function size_and_position(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    var context = canvas.getContext("2d");

    var center_x = window.innerWidth / 2;
    var center_y = window.innerHeight / 2;
    var center_x_with_gap = center_x + inter_canvas_gap / 2;
    var center_y_with_gap = center_y + inter_canvas_gap / 2;

    // Size the canvas to fit.
    canvas.width = center_x - (inter_canvas_gap / 2);
    canvas.height = center_y - (inter_canvas_gap / 2);

    // Position the canvas in the window.
    center_x += "px";
    center_y += "px";
    center_x_with_gap += "px";
    center_y_with_gap += "px";

    // These are not defined inside switch block because needed in this scope.
    var position_left; // undefined
    var position_top; // undefined
    var adjustment = 2 * (border_thickness - 1);

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
            canvas.width -= adjustment;
            canvas.height -= adjustment;
            canvas.style.zIndex = 99; // always on top
            classify("high_side_classification_banner_canvas", "TS");
            break;
        case "low_side_canvas":
            position_left = center_x_with_gap;
            position_top = center_y_with_gap;
            context.fillStyle = "lightgrey";
            context.fillRect(0, 0, canvas.width, canvas.height);
            canvas.style.zIndex = 1;
            break;
        case "low_side_classification_banner_canvas":
            position_left = center_x_with_gap;
            position_top = center_y_with_gap;
            canvas.width -= adjustment;
            canvas.height -= adjustment;
            canvas.style.zIndex = 99; // always on top
            classify("low_side_classification_banner_canvas", "unclas");
            break;
        case "monitoring_canvas":
            position_left = "0px";
            position_top = center_y_with_gap;
            context.fillStyle = "navy";
            context.fillRect(0, 0, canvas.width, canvas.height);
            canvas.style.zIndex = 1;
            break;
        case "monitoring_classification_banner_canvas":
            position_left = "0px";
            position_top = center_y_with_gap;
            canvas.width -= adjustment;
            canvas.height -= adjustment;
            canvas.style.zIndex = 99; // always on top
            classify("monitoring_classification_banner_canvas", "SYSTEM HIGH");
            break;
        case "control_canvas":
            position_left = center_x_with_gap;
            position_top = "0px"
            context.fillStyle = "darkgreen";
            context.fillRect(0, 0, canvas.width, canvas.height);
            canvas.style.zIndex = 1;
            break;
        case "control_classification_banner_canvas":
            position_left = center_x_with_gap;
            position_top = "0px"
            canvas.width -= adjustment;
            canvas.height -= adjustment;
            canvas.style.zIndex = 99; // always on top
            classify("control_classification_banner_canvas", "SYSTEM HIGH");
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
    var label_size = 15;
    var banner_height = label_size;

    context.font = "bold " + label_size + "px sans-serif";
    context.textBaseline = "hanging";
    context.textAlign = "center";

    switch(security_label) {
        case "unclas":
            color = "lime";
            canvas.style.border = border_thickness + "px solid " + color;
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "black";
            context.fillText("UNCLASSIFIED", canvas.width / 2, 0);
            break;
        case "TS":
            color = "orange";
            canvas.style.border = border_thickness + "px solid " + color;
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "black";
            context.fillText("TOP SECRET//SI TK", canvas.width / 2, 0);
            break;
        case "SYSTEM HIGH":
            color = "red";
            canvas.style.border = border_thickness + "px solid " + color;
            context.fillStyle = color;
            context.fillRect(0, 0, canvas.width, banner_height);
            context.fillStyle = "white";
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
    size_and_position("low_side_canvas");
    size_and_position("low_side_classification_banner_canvas");
    size_and_position("monitoring_canvas");
    size_and_position("monitoring_classification_banner_canvas");
    size_and_position("control_canvas");
    size_and_position("control_classification_banner_canvas");
    classify("control_classification_banner_canvas", "SYSTEM HIGH");
    label_all();
}

window.onload = function() {
    initialise();
}

window.addEventListener("resize",initialise)

