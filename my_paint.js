let canvas = $("#canvas")[0];
canvas.addEventListener('mousedown', down);
canvas.addEventListener('mouseup', toggledraw);


canvas.addEventListener('mousemove',
function(e){
    let mousePos= getMousePos(canvas, e);
    let posX = mousePos.x;
    let posY = mousePos.y;
    draw(canvas, posX, posY);
    console.log(posX)
});
let size = 10;
let drawing = false;

function down(){
    drawing = true
}

function toggledraw(){
    drawing=false
}

function getMousePos(canvas, e){
    let rect = canvas.getBoundingClientRect();
    return{
        x:e.clientX - rect.left,
        y:e.clientY - rect.top
    };
}

function draw(canvas, posX, posY){
    let context = canvas.getContext('2d');
    if(drawing){
        context.fillStyle='pink';
        context.fillRect(posX, posY, 4, size)
    }
}