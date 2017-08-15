const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('[name="customForm"]');
const input = form.querySelector('[name="minutes"]');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// Global timer in seconds. Used for button clicks and form submit.
let countDown = 0;

// Track setInterval to clear for new timers
let timeInterval;

function clickButtonTimers() {
  countDown = Number(this.dataset.time);
}

function enterInputMinutes(e) {
  // prevent page refresh on form submit
  e.preventDefault();

  // convert user input to seconds
  countDown = input.value * 60;

  // clear input field for future submissions
  input.value = "";
}

function setCountDown() {
  const minutes = Math.floor(countDown / 60);
  let seconds = Math.floor(countDown % 60);
  if (seconds < 10) { seconds = `0${seconds}`; }

  const timer = minutes + ":" + seconds;
  document.title = timer;
  timeLeft.innerHTML = timer;

  // If the countdown is finished...
  if (countDown < 0) {
    clearInterval(timeInterval);
    timeLeft.innerHTML = "Time is up!";
    document.title = "Time is up!";
    endTime.innerHTML = "";
  }

  countDown--;
}

function updateEndTime() {
  const currentSeconds = Math.floor(new Date() / 1000);
  const endTimeMilliseconds = (currentSeconds + countDown) * 1000;
  const endDate = new Date(endTimeMilliseconds);
  let hours = endDate.getHours();
  let minutes = endDate.getMinutes();

  if (hours > 12) { hours -= 12; }
  if (hours === 0) { hours = 12; }
  if (minutes < 10) { minutes = `0${minutes}`; }

  endTime.innerHTML = `End time is ${hours}:${minutes}`
}

function setTimeInterval() {
  // handle case where new timer is activated during previous timer
  clearInterval(timeInterval);
  
  // call before interval to activate timer immediately
  setCountDown();

  // update countdown every second
  timeInterval = setInterval(setCountDown, 1000);

  updateEndTime();
}

buttons.forEach(button => button.addEventListener('click', clickButtonTimers));
buttons.forEach(button => button.addEventListener('click', setTimeInterval));
form.addEventListener('submit', enterInputMinutes);
form.addEventListener('submit', setTimeInterval);
