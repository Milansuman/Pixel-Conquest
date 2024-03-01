const canvas = document.getElementById("canvas");
const container = document.querySelector(".container")
const ctx = canvas.getContext("2d");
canvas.width=container.clientWidth-10;
canvas.height=container.clientHeight-10;

const pixelSize = 10;

async function getCanvas(){
    return await get("/api/canvas");
}

async function writePixel(color, x, y){
    const data = new FormData();
    data.append("x", x);
    data.append("y", y);
    data.append("color", color)
    await post("/api/canvas", data);
}

function display(){
    getCanvas().then(pixels => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let pixel of pixels){
            console.log(pixel)
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.row*pixelSize, pixel.col*pixelSize, pixelSize, pixelSize);
        }
    });
    requestAnimationFrame(display)
}

display()