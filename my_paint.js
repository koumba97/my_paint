let canvas = $("#canvas")[0];
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);

canvas.addEventListener('mousemove',
    function(e){
        let mousePos= getMousePos(canvas, e);
        let posX = mousePos.x;
        let posY = mousePos.y;
        draw(canvas, posX, posY);
    }
);

let size = 5;
let drawing = false;
let line = false;
let eraser = false;
let brush = true;
let pencil = false;
let circle = false;
let square = false;
let chooseColor=false;
let colorVal;
let dragging = false;

let allTools={
    "brush" : brush, 
    "pencil" : pencil,
    "eraser" : eraser,
    "line" : line, 
    "circle" : circle, 
    "square" : square,
}

function down(){
    drawing = true
}
function toggledraw(){
    drawing=false
}

$('.undo').on("click", function(){
    //document.execCommand('undo')
    if(drawing){
        let context = canvas.getContext('2d');
        context.clearRect()
    }
});

function getMousePos(canvas, e){
    let rect = canvas.getBoundingClientRect();
    return{
        x:e.clientX - rect.left,
        y:e.clientY - rect.top
    };
}

CanvasRenderingContext2D.prototype.roundRect = function (posX, posY, w, h, r) {
    let x=posX;
    let y=posY;
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}




// COLORS
let color="black";
$('.first_color').css('backgroundColor', color);

$('.color').on("click", function(){
    chooseColor=false;
    color = $(this).css('backgroundColor');
    $('.first_color').css('backgroundColor', color);
});




// TOOLS
$('.tool').on("click", function(){
    brush = false;
    eraser = false;
    pencil = false;
    line = false;
    circle = false;
    square = false;
});
$('.brush').on("click", function(){
    brush = true;
});
$('.pencil').on("click", function(){
    pencil = true;
});
$('.eraser').on("click", function(){
    eraser = true;
});
$('.line').on("click", function(){
    line=true;
});
$('.square').on("click", function(){
    line= false;
    square=true;
});
$('.cercle').on("click", function(){
    circle=true;
});
$('.selectColors').change(function() { 
    colorVal=$('.selectColors').val();
    chooseColor=true; 
});
$('.save').on('click', function(){
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href=image;
})

function loadImage() {
    var input, file, fr, img;

    input = document.getElementById('file');
   
    file = input.files[0];
    fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);

    function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
    }

    function imageLoaded() {
        context.drawImage(img,0,0, 600, 500);
    }
}

let countLine = 0;
let beginLineX = 0; let beginLineY = 0;
let endLineX = 0; let endLineY = 0;
let context = canvas.getContext('2d');
function draw(canvas, posX, posY){
    
    if(drawing){

        // ERASER
        if(eraser == true){
            color='white';
            context.fillStyle=color;
            context.roundRect(posX, posY, size-1, size-1, 40).fill();
        }
        else if (chooseColor == true){
            color=colorVal;
            //alert(color)
        }
        else{
            color=$('.first_color').css('backgroundColor');
        }

        // BRUSH
        if(brush == true){  
            context.fillStyle=color;
            context.roundRect(posX, posY, size-1, size-1, 40).fill();
            return;
        }

        // PENCIL
        else if(pencil == true){
            context.fillStyle=color;
            context.fillRect(posX, posY, size, size).fill();
            return;
        }

        // LINE
        else if(line == true){
            context.strokeStyle = color;
            context.lineWidth = size;
            context.lineCap = 'round';
        
            canvas.addEventListener('mousedown', dragStart, false);
            canvas.addEventListener('mousemove', drag, false);
            canvas.addEventListener('mouseup', dragStop, false);
            
            return;
        }

        // SQUARE
        else if(square == true){
            context.stroke();
            context.lineWidth = size;
            context.strokeStyle = color;
            context.strokeRect(posX, posY, posX, posY);
            return;
        }
    }
}



function getCanvasCoordinates(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function drawSquare(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
}

function drag(event) {
    let position;
    if (dragging === true) {
        position = getCanvasCoordinates(event);
    }
}

function dragStop(event) {
    dragging = false;
    let position = getCanvasCoordinates(event);
    drawLine(position);
}




// SIZE
$('#tool_size').change(function() { 
    size = $(this).val();
    console.log(size)
});


$('#save').on("click", function(){
    localStorage.setItem("canvasName", canvas.toDataURL());
});