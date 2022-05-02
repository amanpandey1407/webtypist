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
  "wealth",
  "best",
];

let daytheme;
var x = localStorage.getItem("theme");
if (x == "day") daytheme = true;
else daytheme = false;

let textcontent = "",
  sentencesize = 40;

function sentencegeneration() {
  for (let i = 0; i < sentencesize - 1; i++) {
    let tempword = randomwords[Math.floor(Math.random() * randomwords.length)];
    textcontent = textcontent.concat(String(tempword + " "));
  }

  textcontent = textcontent.concat(
    String(randomwords[Math.floor(Math.random() * randomwords.length)])
  );
}

sentencegeneration();

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
var theme = document.getElementById("themechange");
var next = document.getElementById("nextbtn");
var footer = document.getElementsByClassName("footer");

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

    if (daytheme == true) {
      timer.style.color = "white";
      timer.style.fontSize = "50px";
      timer.style.backgroundColor = "#8e3200";
    } else {
      timer.style.color = "black";
      timer.style.fontSize = "50px";
      timer.style.backgroundColor = "white";
    }
  }
});

next.addEventListener("click", function () {
  (textcontent = ""),
    (result = ""),
    (typed = ""),
    (typedlength = 0),
    (i = 0),
    (j = 0);
  words = 0;
  typedtext.innerHTML = "";
  sentencegeneration();
  wordcount.innerHTML = 0;
  typingtext.innerHTML = String(textcontent);
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

function theme_day() {
  document.getElementsByClassName("title")[0].style.color = "#F4F6FF";
  document.getElementsByClassName("timer")[0].style.color = "#F4F6FF";
  document.getElementsByClassName("typingsection")[0].style.backgroundColor =
    "#4F8A8B";
  document.getElementsByClassName("eyes")[0].style.backgroundColor = "#4F8A8B";
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "#F4F6FF";
    btn.style.color = "black";
  });

  document.getElementsByClassName("btn")[1].innerHTML = "Day";

  typedtext.style.color = "#FBD46D";
  typingtext.style.color = "#FDEFF4";
  footer[0].style.backgroundColor = "#07031A";
}

function theme_night() {
  document.getElementsByClassName("title")[0].style.color = "white";
  document.getElementsByClassName("timer")[0].style.color = "white";
  document.getElementsByClassName("typingsection")[0].style.backgroundColor =
    "#041C32";
  document.getElementsByClassName("eyes")[0].style.backgroundColor = "#041C32";

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  });

  document.getElementsByClassName("btn")[1].innerHTML = "Night";

  typedtext.style.color = "#ECB365";
  typingtext.style.color = "white";
  footer[0].style.backgroundColor = "#04293A";
}

theme.addEventListener("click", function () {
  if (daytheme == false) {
    theme_day();
    daytheme = true;
    localStorage.setItem("theme", "day");
  } else {
    theme_night();
    daytheme = false;
    localStorage.setItem("theme", "night");
  }
});

if (daytheme == true) theme_day();
else theme_night();
