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
let size = 1;
let drawing = false;
let line = false;
let eraser = false;
let brush = true;
let pencil = false;

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
function draw(canvas, posX, posY){
    let context = canvas.getContext('2d');
    if(drawing){
        if(eraser == true){
            color='white';
        }
        else{
            color=$('.first_color').css('backgroundColor');
        }

        if(brush == true){  
            context.fillStyle=color;
            context.roundRect(posX, posY, size-1, size-1, 40).fill();
        }
        else if(pencil == true){
            context.fillStyle=color;
            context.fillRect(posX, posY, size, size).fill();
        }
    }
}



// COLORS
let color="black";
$('.first_color').css('backgroundColor', color);

$('.color').on("click", function(){

    color = $(this).css('backgroundColor');
    $('.first_color').css('backgroundColor', color);
});



// TOOLS
$('.brush').on("click", function(){
    brush = true;
    eraser = false;
    pencil = false
});
$('.pencil').on("click", function(){
    pencil = true;
    eraser = false;
    brush = false;
});
$('.eraser').on("click", function(){
    eraser = true;
    brush = false;
    pencil = false;
});
$('.line').on("click", function(){
    line=true
    color = 'white';
});


// SIZE
$('#tool_size').change(function() { 
    size = $(this).val();
    console.log(size)
});