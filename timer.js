export var minutes = 0;
export var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var appendMinutes = document.getElementById("minutes");

var Interval;

export function startTimer() {
  clearInterval(Interval);
  Interval = setInterval(Timerstart, 10);
}

export function stopTimer() {
  clearInterval(Interval);
}

export function resetTimer() {
  clearInterval(Interval);
  tens = "00";
  seconds = "00";
  minutes = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
  appendMinutes.innerHTML = minutes;
}

function Timerstart() {
  tens++;

  if (tens <= 9) {
    appendTens.innerHTML = "0" + tens;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    appendMinutes.innerHTML = "0" + minutes;
    seconds = 0;
    tens = 0;
    appendSeconds.innerHTML = "0" + seconds;
    appendTens.innerHTML = "0" + 0;
  }
}
