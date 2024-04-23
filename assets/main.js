import GymTracker from "./GymTracker.js";
// Function to show menu

document.querySelector(".fa-bars").addEventListener("click", showMenu);
document.querySelector(".fa-window-close").addEventListener("click", hideMenu);
function showMenu() {
  var navLinks = document.getElementById("navbar-links");
  navLinks.style.right = "0";
}

// Function to hide menu
function hideMenu() {
  var navLinks = document.getElementById("navbar-links");
  navLinks.style.right = "-400px";
}
//Count timer
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Event listeners for buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
//Function for timer start
function startTimer() {
  if (paused) {
    //Checks if the timer is paused
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 75);
  }
}
const app = document.getElementById("app");

const wt = new GymTracker(app);
window.wt = wt;

//Function to reset the timer
function resetTimer() {
  paused = true;
  clearInterval(intervalId);
  //Reset the display time
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  timeDisplay.textContent = "00:00:00";
}
//Function for timer pause
function pauseTimer() {
  if (!paused) {
    paused = true;
    elapsedTime = Date.now - startTime;
    clearInterval(intervalId);
  }
}
//Function to update timer
function updateTime() {
  elapsedTime = Date.now() - startTime;
  //Calculate seconds,minutes and hours
  seconds = Math.floor((elapsedTime / 1000) % 60);
  minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

  seconds = pad(seconds);
  minutes = pad(minutes);
  hours = pad(hours);
  timeDisplay.textContent = `${hours} : ${minutes} : ${seconds}`;
  //Function to show "00:00:00" instead of "0:0:0"
  function pad(unit) {
    if (("0" + unit).length > 2) {
      return unit;
    } else {
      return "0" + unit;
    }
  }
}
