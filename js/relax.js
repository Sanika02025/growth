const circle = document.getElementById("circle");
const text = document.getElementById("breathing-text");
const startBtn = document.getElementById("start-breathing-btn");
let breathingInterval;

function breatheCycle() {
  text.innerText = "Inhale...";
  circle.style.transform = "scale(1.5)";

  setTimeout(() => {
    text.innerText = "Hold...";

    setTimeout(() => {
      text.innerText = "Exhale...";
      circle.style.transform = "scale(1)";
    }, 2000);
  }, 3000);
}

function startBreathing() {
  if (!breathingInterval) {
    breatheCycle(); // Run once immediately
    breathingInterval = setInterval(breatheCycle, 8000);
    startBtn.style.display = "none"; // Hide the button once started
  }
}

startBtn.addEventListener("click", startBreathing);
