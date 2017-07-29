// grab each element
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.play');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');
const progressContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipBackward = document.querySelector('.backward');
const skipForward = document.querySelector('.forward');

/*
Features required:
1. clicking on video pauses and plays, changes playButton icon
2. clicking playButton plays and pauses video, changes icon
3. volume slider sets video volume property to volume value
4. playbackRate slider sets video playbackRate property to playbackRate value
5. progress bar matches proportion of video played - percent played links to width
6. clicking progressBar sets video time to percent offset
7. skipBackward reassigns current time to data-skip
8. skipForward reassigns current time to data-skip
*/

// 1
video.addEventListener('click', function (e) {
  if (this.paused) {
    this.play();
    playButton.innerHTML = "&#9616;&#9616;";
  } else {
    this.pause();
    playButton.innerHTML = "►";
  }
});

// 2
playButton.addEventListener('click', function (e) {
  if (video.paused) {
    video.play();
    this.innerHTML = "&#9616;&#9616;";
  } else {
    video.pause();
    this.innerHTML = "►";
  }
});

// 3
volume.addEventListener('input', function (e) {
  video.volume = this.value;
});

// 4
playbackRate.addEventListener('input', function (e) {
  video.playbackRate = this.value;
});

// 5
video.addEventListener('timeupdate', function (e) {
  const percent = 100 * this.currentTime / this.duration;
  progressBar.style['flex-basis'] = `${percent}%`;
});

//6
progressContainer.addEventListener('click', function (e) {
  video.currentTime = e.offsetX / this.offsetWidth * video.duration;
});

// 7 & 8
function skip(e) {
  video.currentTime += Number(this.dataset.skip);
}

skipBackward.addEventListener('click', skip);
skipForward.addEventListener('click', skip);
