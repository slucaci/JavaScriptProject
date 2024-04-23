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
