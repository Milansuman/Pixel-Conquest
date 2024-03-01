const canvas = document.getElementById("canvas");
const container = document.querySelector(".container")
const ctx = canvas.getContext("2d");
canvas.width=container.clientWidth;
canvas.height=container.clientHeight;

const pixelSize = 10;

function Pixel(){
    
    return  ctx.fillStyle = "green",ctx.fillRect(100, 10, pixelSize,pixelSize);
}

Pixel()

// ctx.fillStyle = "green";
// ctx.fillRect(100, 10, 20, 20);
