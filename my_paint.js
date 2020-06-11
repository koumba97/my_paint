let canvas = $("#canvas")[0];
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);
canvas.addEventListener('mousemove',
function(e){
    let mousePos= getMousePos(canvas, e);
    let posX = mousePos.x;
    let posY = mousePos.y;
    draw(canvas, posX, posY);
});
let size = 5;
let drawing = false;
let line = false;
let eraser = false;
let brush = true;
let pencil = false;
let circle = false;
let square = false;

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

    color = $(this).css('backgroundColor');
    $('.first_color').css('backgroundColor', color);
});



// TOOLS
$('.tool').on("click", function(){
    brush = false;
    eraser = false;
    pencil = false;
    line = false;
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
    line=true
});
$('.square').on("click", function(){
    square=true
});

let countLine = 0;
let beginLineX = 0; let beginLineY = 0;
let endLineX = 0; let endLineY = 0;

function draw(canvas, posX, posY){
    let context = canvas.getContext('2d');
    if(drawing){

        // ERASER
        if(eraser == true){
            color='white';
            context.fillStyle=color;
            context.roundRect(posX, posY, size-1, size-1, 40).fill();
        }
        else{
            color=$('.first_color').css('backgroundColor');
        }

        // BRUSH
        if(brush == true){  
            context.fillStyle=color;
            context.roundRect(posX, posY, size-1, size-1, 40).fill();
        }

        // PENCIL
        else if(pencil == true){
            context.fillStyle=color;
            context.fillRect(posX, posY, size, size).fill();
        }

        // LINE
        else if(line == true){
            console.log(countLine)

            if (countLine==0){
                beginLineX = posX;
                beginLineY = posY;
                countLine++;
                return;
            }
            if (countLine == 1){
                endLineX = posX 
                endLineY = posY;

                context.moveTo(beginLineX, beginLineY);
                context.lineTo(endLineX, endLineY);

                context.strokeStyle = color;
                context.stroke();
                countLine=0;
                return;
            }

        }

        // SQUARE
        else if(square == true){
            // if (countLine==0){
            //     beginLineX = posX;
            //     beginLineY = posY;
            //     countLine++;
            //     return;
            // }
            // if (countLine == 1){
            //     endLineX = posX 
            //     endLineY = posY;
            //     context.strokeStyle = color;
            //     context.rect(beginLineX,beginLineY,endLineX,endLineY);
            //     context.stroke();
            // }

            var ctx = canvas.getContext('2d');
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.strokeRect(posX, posY, posX, posY);
            
        }
    }
}

// SIZE
$('#tool_size').change(function() { 
    size = $(this).val();
    console.log(size)
});


$('#save').on("click", function(){
    localStorage.setItem("canvasName", canvas.toDataURL());
});