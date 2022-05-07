"use strict";

let randomwords = [
  `you`,
  `hear`,
  `great`,
  `answer`,
  `come`,
  `large`,
  `does`,
  `write`,
  `child`,
  `like`,
  `began`,
  `near`,
  `why`,
  `run`,
  `know`,
  `what`,
  `are`,
  `group`,
  `place`,
  `work`,
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
  `many`,
  `use`,
  `was`,
  `him`,
  `but`,
  `out`,
  `over`,
  `later`,
  `big`,
  `city`,
  `have`,
  `into`,
  `our`,
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
  `set`,
  `same`,
  "here",
  "what",
  "now",
  "health",
  "the",
  "leave",
  "gift",
  "wealth",
  "best",
];

if (localStorage.getItem("highest") === null) {
  localStorage.setItem("highest", 0);
}

let daytheme,
  highestrecord = parseInt(localStorage.getItem("highest"));
var x = localStorage.getItem("theme");
if (x == "day") daytheme = true;
else daytheme = false;

let textcontent = "",
  sentencesize = 30;

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
  words = 0,
  completed = false,
  speed = 0,
  currentrecord = 0,
  correctword = 0,
  errorword = 0,
  errorchar = 0,
  error = 0;
var typingtext = document.getElementById("typingtext");
var wordcount = document.getElementById("wordcount");
var theme = document.getElementById("themechange");
var next = document.getElementById("nextbtn");
var footer = document.getElementsByClassName("footer");
var displayresult = document.getElementById("displayresult");
var speeddisplay = document.getElementById("speed");
var recorddisplay = document.getElementById("highestrecord");
var cursor = document.createElement("SPAN");
var typecontent = document.querySelector(".typecontent");
cursor.classList.add("cursorstyle");
typingtext.innerHTML = String(textcontent);

document.addEventListener("keydown", function (e) {
  if (watchon == true) {
    startTimer();
  }

  if (textcontent[i] == " ") {
    words++;
    if (error == 0) correctword++;
    else errorword++;
    error = 0;
  }

  wordcount.innerHTML = words + 1 + "/" + sentencesize;

  if (e.key == textcontent[i]) {
    let x = document.createElement("p");
    var t = document.createTextNode(e.key);
    x.appendChild(t);
    x.classList.add("correctletter");
    typecontent.appendChild(x);
    j++;
  } else {
    error++, errorchar++;
    let x = document.createElement("p");
    var t = document.createTextNode(textcontent[i]);
    x.appendChild(t);
    x.classList.add("wrongletter");
    typecontent.appendChild(x);
    j++;
  }

  i++;
  typedlength++;

  if (length == i) {
    stopTimer();
    watchon = false;
    completed = true;
    timer.style.color = "black";
    timer.style.fontSize = "50px";
    timer.style.backgroundColor = "white";
    displayresult.classList.remove("hidden");
    currentrecord = Math.floor(i / 5 / Number((min * 60 + sec) / 60));
    currentrecord < 0 ? (currentrecord = 0) : "";
    speeddisplay.innerHTML = "Your Net Speed was " + currentrecord;

    if (currentrecord > highestrecord) {
      highestrecord = currentrecord;
      localStorage.setItem("highest", highestrecord);
    }

    recorddisplay.innerHTML = "Highest Record is " + highestrecord;
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
  error = 0;
  errorchar = 0;
  sentencegeneration();
  wordcount.innerHTML = 0;
  (length = textcontent.length), (typingtext.innerHTML = String(textcontent));
  resetTimer();
  completed = false;
  timer.style.color = "white";
  if (daytheme == true) timer.style.backgroundColor = "#4F8A8B";
  else timer.style.backgroundColor = "#041C32";
  watchon = true;
  displayresult.classList.add("hidden");
  typecontent.replaceChildren();
  next.blur();
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
  document.getElementsByClassName("header")[0].style.backgroundColor =
    "#4F8A8B";
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
  document.getElementsByClassName("btn")[1].blur();
  typingtext.style.color = "#FDEFF4";
  footer[0].style.backgroundColor = "#07031A";
  timer.style.backgroundColor = "#4F8A8B";

  if (completed == true) {
    timer.style.color = "black";
    timer.style.backgroundColor = "white";
  }
}

function theme_night() {
  document.getElementsByClassName("header")[0].style.backgroundColor =
    "#041C32";
  document.getElementsByClassName("title")[0].style.color = "white";
  document.getElementsByClassName("timer")[0].style.color = "white";
  document.getElementsByClassName("typingsection")[0].style.backgroundColor =
    "#041C32";
  document.getElementsByClassName("eyes")[0].style.backgroundColor = "#041c32";

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  });

  document.getElementsByClassName("btn")[1].innerHTML = "Night";
  document.getElementsByClassName("btn")[1].blur();
  typingtext.style.color = "white";
  footer[0].style.backgroundColor = "#04293A";
  timer.style.backgroundColor = "#041C32";

  if (completed == true) {
    timer.style.color = "black";
    timer.style.backgroundColor = "white";
  }
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
