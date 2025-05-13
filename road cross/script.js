let currentSignal = "green";
let mc = document.getElementById("mc");
let signal = document.getElementById("signal");
let message = document.getElementById("message");
let interval;

function updateTrafficSignal() {
  currentSignal = currentSignal === "green" ? "red" : "green";
  signal.textContent =
    currentSignal.charAt(0).toUpperCase() + currentSignal.slice(1);
}

function moveCharacter() {
  if (currentSignal === "green") {
    let position = 10; // Start position
    const interval = setInterval(() => {
      if (position < 370) {
        // End position
        position += 2; // Move speed
        mc.style.left = position + "px";
      } else {
        clearInterval(interval);
        displayMessage("Road has been crossed!");
      }
    }, 20);
  }
}

function displayMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = "";
  }, 3000); // Message visible for 3 seconds
}

// Start the traffic signal changing every 3 seconds
setInterval(updateTrafficSignal, 3000);

// Add event listener for key press to move the character
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Press Enter to cross
    moveCharacter();
  }
});
