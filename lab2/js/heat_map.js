let ctx, canvas, img, mainWidth, mainHeight;

let heat_map = {
    init: function init() {
        img = new Image();
        img.src = "img/cordylidae.jpg";
        img.addEventListener('load', onImage,false);
    }
};

function onImage () {
    mainWidth = img.width;
    mainHeight = img.height;
    setCanvas ();
    draw();
}

function reload() {
    location.reload();
}

function setCanvas(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
    canvas.style.border = "1px solid black";
    let block = document.getElementById('block');
    let parent = document.getElementById('parent');
    parent.style.height = parent.clientHeight + "px";
    let centerOfHeight = parent.clientHeight/2-mainHeight/2;
    let centerOfWidth = parent.clientWidth/2-mainWidth/2;
    block.style.left = centerOfWidth + "px";
    block.style.top = centerOfHeight + "px";
    if (mainWidth > parent.clientWidth || mainHeight > parent.clientHeight-56) {
        document.getElementById('sorryImageShouldBeSmaller').setAttribute('class', 'alert alert-info');
        document.getElementById('sorryImageShouldBeSmaller').innerText = 'Прости, но изображение дожно быть меньше, попробуй другую картинку';
        document.getElementById('parent').hidden = true;
        setTimeout(reload,3000);
    }
}

function draw() {
    ctx.drawImage(img, 0, 0, mainWidth, mainHeight, 0, 0, mainWidth, mainHeight);
    img.style.display = 'none';
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let return_the_original = function () {
        ctx.drawImage(img, 0, 0, mainWidth, mainHeight, 0, 0, mainWidth, mainHeight);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = imageData.data;
    }

    let invert = function() {
        for (let i = 0; i < data.length; i += 4) {
            data[i]     = 255 - data[i];     // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    let grayscale = function() {
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    let heat_vision = function() {
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            if(r < 32 && g < 32 && b < 32){
                data[i]     = 0.1*data[i];     // red
                data[i + 1] = 0.1*data[i + 1]; // green
                data[i + 2] = 7*data[i + 2]; // blue
                // console.log(data[i], data[i + 1], data[i + 2]);
            }else if(r < 64 && g < 64 && b < 64){
                data[i]     = 0.8*data[i];     // red
                data[i + 1] = 0.8*data[i + 1]; // green
                data[i + 2] = 3*data[i + 2]; // blue
            }else if(r < 96 && g < 96 && b < 96){
                data[i]     = 0.9*data[i];     // red
                data[i + 1] = 0.9*data[i + 1]; // green
                data[i + 2] = data[i + 2]; // blue
            }else if(r < 128 && g < 128 && b < 128){
                data[i]     = 0.8*data[i];     // red
                data[i + 1] = data[i + 1]; // green
                data[i + 2] = 0.8*data[i + 2]; // blue
            }else if(r < 160 && g < 160 && b < 160){
                data[i]     = data[i];     // red
                data[i + 1] = 0.9*data[i + 1]; // green
                data[i + 2] = 0.9*data[i + 2]; // blue
            }else if(r < 192 && g < 192 && b < 192){
                data[i]     = data[i];     // red
                data[i + 1] = 0.8*data[i + 1]; // green
                data[i + 2] = 0.8*data[i + 2]; // blue
            }else if(r < 224 && g < 224 && b < 224){
                data[i]     = 32 + data[i];     // red
                data[i + 1] = 0.6*data[i + 1]; // green
                data[i + 2] = 0.6*data[i + 2]; // blue
            }else if(r < 256 && g < 256 && b < 256){
                data[i]     = 16 + data[i];     // red
                data[i + 1] = 0.2*data[i + 1]; // green
                data[i + 2] = 0.2*data[i + 2]; // blue
            }
        }
        invert();
    };

    let return_the_original_btn = document.getElementById('return_the_original_btn');
    return_the_original_btn.addEventListener('click', return_the_original);
    let invert_btn = document.getElementById('invert_btn');
    invert_btn.addEventListener('click', invert);
    let grayscale_btn = document.getElementById('grayscale_btn');
    grayscale_btn.addEventListener('click', grayscale);
    let heat_vision_btn = document.getElementById('heat_vision_btn');
    heat_vision_btn.addEventListener('click', heat_vision);
}

