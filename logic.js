"use strict";

import { randomwords } from "./randomwords.js";
import { audiofile } from "./keyboardsound.js";

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
var minutes = 0;
var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");
var appendMinutes = document.getElementById("minutes");

var Interval;

function startTimer() {
  clearInterval(Interval);
  Interval = setInterval(Timerstart, 10);
}

function stopTimer() {
  clearInterval(Interval);
}

function resetTimer() {
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
  minutetocomplete = 0,
  errorword = 0,
  errorchar = 0,
  typingon = true,
  audiotrack = 0,
  error = 0,
  wordlenset = 30;
var typingtext = document.getElementById("typingtext");
var wordcount = document.getElementById("wordcount");
var theme = document.getElementById("themechange");
var next = document.getElementById("nextbtn");
var footer = document.getElementsByClassName("footer");
var displayresult = document.getElementById("displayresult");
var speeddisplay = document.getElementById("speed");
var errorworddisplay = document.getElementById("errorword");
var recorddisplay = document.getElementById("highestrecord");
var changewordlength = document.getElementById("wordlength");
var cursor = document.createElement("SPAN");
var typecontent = document.querySelector(".typecontent");

cursor.classList.add("cursorstyle");
typingtext.innerHTML = String(textcontent);
typecontent.appendChild(cursor);

document.addEventListener("keydown", function (e) {
  if (typingon == true) {
    keyboardsound();
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

    typecontent.appendChild(cursor);
    i++;
    typedlength++;

    if (length == i) {
      stopTimer();
      watchon = false;
      typingon = false;
      completed = true;
      timer.style.color = "black";
      timer.style.fontSize = "50px";
      timer.style.backgroundColor = "white";
      resultdisplay();
    }
  }
});

next.addEventListener("click", newsentence);

function newsentence() {
  (textcontent = ""),
    (result = ""),
    (typed = ""),
    (typedlength = 0),
    (i = 0),
    (j = 0);
  words = 0;
  error = 0;
  errorchar = 0;
  errorword = 0;
  sentencegeneration();
  wordcount.innerHTML = 0;
  (length = textcontent.length), (typingtext.innerHTML = String(textcontent));
  resetTimer();
  completed = false;
  timer.style.color = "white";
  if (daytheme == true) timer.style.backgroundColor = "#493323";
  else timer.style.backgroundColor = "#041C32";
  watchon = true;
  typingon = true;
  displayresult.classList.add("hidden");
  typecontent.replaceChildren();
  next.blur();
}

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
    "#493323";
  document.getElementsByClassName("title")[0].style.color = "#F4F6FF";
  document.getElementsByClassName("timer")[0].style.color = "#F4F6FF";
  document.getElementsByClassName("typingsection")[0].style.backgroundColor =
    "#493323";
  document.getElementsByClassName("eyes")[0].style.backgroundColor = "#493323";
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.style.backgroundColor = "#F4F6FF";
    btn.style.color = "black";
  });

  document.getElementsByClassName("btn")[1].innerHTML = "Day";
  document.getElementsByClassName("btn")[1].blur();
  typingtext.style.color = "#D1D1D1";
  footer[0].style.backgroundColor = "#915B4A";
  timer.style.backgroundColor = "#493323";

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
  typingtext.style.color = "#C8C6C6";
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

function resultdisplay() {
  minutetocomplete = Number((minutes * 60 + seconds) / 60);
  displayresult.classList.remove("hidden");
  currentrecord = Math.floor((sentencesize - errorword) / minutetocomplete);
  currentrecord < 0 ? (currentrecord = 0) : "";
  speeddisplay.innerHTML = "Your Net Speed was " + currentrecord;

  errorworddisplay.innerHTML = "Error word " + errorword;

  if (currentrecord > highestrecord) {
    highestrecord = currentrecord;
    localStorage.setItem("highest", highestrecord);
  }

  recorddisplay.innerHTML = "Highest Record is " + highestrecord;
}

function keyboardsound() {
  audiofile[audiotrack++].play();
  if (audiotrack == audiofile.length) audiotrack = 0;
}

changewordlength.onchange = function () {
  setwordlength();
  changewordlength.blur();
};

function setwordlength() {
  wordlenset = changewordlength.options[changewordlength.selectedIndex].text;
  sentencesize = wordlenset;
  newsentence();
}
