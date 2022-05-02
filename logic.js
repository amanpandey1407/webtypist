"use strict";

let randomwords = [
  `you`,
  `hear`,
  `great`,
  `answer`,
  `come`,
  `large`,
  `does`,
  `between`,
  `together`,
  `like`,
  `began`,
  `near`,
  `why`,
  `run`,
  `an`,
  `me`,
  `are`,
  `group`,
  `place`,
  `a`,
  `different`,
  `plant`,
  `want`,
  `father`,
  `would`,
  `for`,
  `first`,
  `might`,
  `there`,
  `took`,
  `far`,
  `only`,
  `thought`,
  `good`,
  `below`,
  `under`,
  `put`,
  `old`,
  `live`,
  `often`,
  `food`,
  `left`,
  `year`,
  `way`,
  `paper`,
  `around`,
  `home`,
  `such`,
  `is`,
  `many`,
  `use`,
  `to`,
  `was`,
  `him`,
  `but`,
  `out`,
  `over`,
  `later`,
  `up`,
  `big`,
  `city`,
  `have`,
  `into`,
  `our`,
  `as`,
  `fall`,
  `saw`,
  `sometimes`,
  `family`,
  `hard`,
  `before`,
  `few`,
  `very`,
  `eye`,
  `sun`,
  `little`,
  `some`,
  `our`,
  `high`,
  `face`,
  `next`,
  `as`,
  `set`,
  `same`,
  "here",
  "what",
  "now",
  "health",
  "is",
  "the",
  "greatest",
  "gift",
  "contentment",
  "wealth",
  "faithfulness",
  "best",
];

let textcontent = "",
  sentencesize = 40;

for (let i = 0; i < sentencesize - 1; i++) {
  let tempword = randomwords[Math.floor(Math.random() * randomwords.length)];
  textcontent = textcontent.concat(String(tempword + " "));
}

textcontent = textcontent.concat(
  String(randomwords[Math.floor(Math.random() * randomwords.length)])
);

const timer = document.getElementById("stopwatch");

let watchon = true;

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
  j = 0;

let length = textcontent.length;

let result = "",
  typed = "",
  typedlength = 0,
  words = 0;

var typingtext = document.getElementById("typingtext");
var typedtext = document.getElementById("typedtext");
var wordcount = document.getElementById("wordcount");
var reset = document.getElementById("resetbtn");
var next = document.getElementById("nextbtn");

typingtext.innerHTML = String(textcontent);

document.addEventListener("keydown", function (e) {
  if (watchon == true) {
    startTimer();
  }

  if (e.key == textcontent[i]) {
    wordcount.innerHTML = words + 1 + "/" + sentencesize;

    if (e.key == " ") words++;
    typedlength++;
    i++;

    while (j < typedlength) {
      typed = typed.concat(String(textcontent[j]));
      result = result.concat(String(typed));
      typed = "";
      typedtext.innerHTML = result;
      j++;
    }
  }

  if (length == i) {
    stopTimer();
    watchon = false;
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
