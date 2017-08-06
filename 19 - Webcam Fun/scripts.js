const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

navigator.getUserMedia = navigator.getUserMedia
  || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia
  || navigator.msGetUserMedia
  || navigator.oGetUserMedia;
  
function linkSource(stream) {
  video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
  console.error(`Your browser does not support your webcam :( Error: ${e}`);
}

function redShift(data) {
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
  }

  return data;
}

function draw(video, ctx, width, height) {
  if (video.paused || video.ended) { return false; }
  
  ctx.drawImage(video, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  // Grab uint8ClampedArray
  const data = imageData.data;

  // Mutate every 4th value to affect red in pixels (rgba repeats every 4 values)
  const bloody = redShift(data);

  // Tell canvas to use mutated data as image data object
  ctx.putImageData(imageData, 0, 0);

  // Set frame rate to roughly 60 fps
  setTimeout(draw, 16, video, ctx, width, height);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = `<a href=${data} download="George"><img src=${data} alt="Put a shirt on!" /></a>`;
  strip.insertAdjacentHTML('beforeend', link);
}

document.addEventListener('DOMContentLoaded', function () {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: true }, linkSource, videoError);
  }

  video.addEventListener('play', function () {
    videoWidth = video.videoWidth;
    videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    
    draw(this, ctx, videoWidth, videoHeight);
  }, false);
}, false);
