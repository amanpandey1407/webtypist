"use strict";

let textcontent = [
  `Curiosity about life in all of its aspects I think is still the secret of great creative people`,
  `Life is not a problem to be solved but a reality to be experienced`,
  `Don't settle for what life gives you make life better and build something`,
  `You never really learn much from hearing yourself speak`,
  `Keep smiling because life is a beautiful thing and there's so much to smile about`,
  `Health is the greatest gift contentment the greatest wealth faithfulness the best relationship`,
  `The best way to predict your future is to create it`,
  `There may be people who have more talent than you but there's no excuse for anyone to work harder than you do`,
  `Be nice to people on the way up, because you may meet them on the way down`,
  `All our dreams can come true, if we have the courage to pursue them`,
  `Live as if you were to die tomorrow. Learn as if you were to live forever`,
  `The more you praise and celebrate your life, the more there is in life to celebrate`,
  `Our greatest glory consists not in never falling, but in rising every time we fall`,
  `A successful man is one who can lay a firm foundation with the bricks others have thrown at him`,
];

const timer = document.getElementById("stopwatch");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;
}

let i = 0,
  j = 0,
  word = 0;

let rannum = Math.floor(Math.random() * textcontent.length);

var dataText = textcontent[rannum];

let length = dataText.length;

let result = "",
  typed = "",
  typedlength = 0;

var typingtext = document.getElementById("typingtext");
var typedtext = document.getElementById("typedtext");
var wordcount = document.getElementById("wordcount");
var reset = document.getElementById("resetbtn");
var next = document.getElementById("nextbtn");

typingtext.innerHTML = String(dataText);

document.addEventListener("keydown", function (e) {
  startTimer();

  if (e.key == dataText[i]) {
    wordcount.innerHTML = i + 1 + "/" + length;
    typedlength++;
    i++;

    while (j < typedlength) {
      typed = typed.concat(String(dataText[j]));
      result = result.concat(String(typed));
      typed = "";
      typedtext.innerHTML = result;
      j++;
    }
  }

  if (length == i) {
    stopTimer();
    timer.style.color = "white";
    timer.style.fontSize = "50px";
    timer.style.backgroundColor = "#8e3200";
  }
});

next.addEventListener("click", function () {
  location.reload();
  location.reload();
});

var balls = document.getElementsByClassName("ball");
document.onmousemove = function () {
  var x = (event.clientX * 100) / window.innerWidth + "%";
  var y = (event.clientY * 100) / window.innerHeight + "%";

  for (var q = 0; q < 2; q++) {
    balls[q].style.left = x;
    balls[q].style.top = y;
    balls[q].style.transform = "translate(-" + x + ",-" + y + ")";
  }
};
