let canvas = document.getElementById('canvas');
let video = document.getElementById('video');
let ctx = canvas.getContext('2d');
let timer;

video.addEventListener('play', () => {
    drawCanvas();
}, false);

function drawCanvas() {
    if (video.paused || video.ended) {
        clearTimeout(timer);
        return;
    }

    convertTransparentFrame();

    timer = setTimeout(() => {
        drawCanvas();
    }, 0);
}

function convertTransparentFrame() {
    ctx.drawImage(video, 0, 0, 500, 312);
    let frame = ctx.getImageData(0, 0, 500, 312);
    let length = frame.data.length / 4;
    for (let i = 0; i < length; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g < 20 && r < 20 && b < 20) {
            frame.data[i * 4 + 3] = 0;
        }
    }
    ctx.putImageData(frame, 0, 0);
}