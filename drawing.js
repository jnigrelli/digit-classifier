let canvas;
let ctx;
let x, y;
let lastX, lastY;
let drawingMode = false;
let dim;
let lineThickness = 10;

let smallCanvas;
let smallContext;
let smallDim;

let scale;

let slider;

function init() {
    canvas = document.getElementById("drawing-canvas");
    ctx = canvas.getContext("2d");

    smallCanvas = document.getElementById("eval-canvas");
    smallContext = smallCanvas.getContext("2d");

    dim = canvas.height;

    smallDim = smallCanvas.height;

    scale = 1;

    slider = document.getElementById("thickness-slider");
    slider.oninput = function () {
        lineThickness = this.value;
        document.getElementById("current-thickness").innerHTML = this.value;
    }

    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";

    canvas.addEventListener("mousemove", function(e) {
        draw(canvas, e);
    });

    canvas.addEventListener("mousedown", function(e) {
        enableDraw(canvas, e);
    });

    canvas.addEventListener("mouseup", function(e) {
        disableDraw(canvas, e);
    });

    canvas.addEventListener("mouseout", function(e) {
        disableDraw(canvas, e);
    });

    //mobile event listeners
    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        mousePos = getTouchCoords(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchend", function(e) {
        e.preventDefault();
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener("touchmove", function(e) {
        e.preventDefault();
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });
}

function getCursorCoords(c, event) {
    const rect = c.getBoundingClientRect();
    let cursorX = event.clientX - rect.left;
    let cursorY = event.clientY - rect.top;

    return [cursorX, cursorY];
}

function getTouchCoords(c, event) {
    const rect = c.getBoundingClientRect();
    return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
    };
}


function draw(c, event) {
    if (!drawingMode) {return;}
    [lastX, lastY] = [x,y];
    [x, y] = getCursorCoords(c, event);
    ctx.beginPath();
    ctx.lineWidth = lineThickness.toString();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function enableDraw(c, event) {
    [x, y] = getCursorCoords(c, event);
    drawingMode = true;
    draw(c,event);
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.closePath();
}
function disableDraw(c, event) {
    [x, y] = getCursorCoords(c, event);
    drawingMode = false;
}

function clearCanvas() {
    ctx.clearRect(0,0,dim,dim);
}

function downscale() {
    smallContext.clearRect(0,0,smallDim,smallDim);
    smallContext.scale(scale, scale);
    smallContext.drawImage(canvas, 0, 0, smallDim, smallDim);
}