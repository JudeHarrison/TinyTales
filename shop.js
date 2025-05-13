document.addEventListener("DOMContentLoaded", function () {
  let clickCounter = 0; // Track the number of clicks
  let bills = 0; // Store the total bill
  const availableAmount = 500; // Static available amount

  // Select all the images
  const images = document.querySelectorAll(".items img");

  // Select the inputs, buttons, and divs
  const totalInput = document.getElementById("totalInput");
  const balanceInput = document.getElementById("balanceInput");
  const verifyTotalButton = document.getElementById("verifyButton");
  const verifyBalanceButton = document.getElementById("verifyBalanceButton");
  const billDiv = document.getElementById("billDiv");
  const balanceDiv = document.getElementById("balanceDiv");
  const ba2 = document.getElementById("ba2"); // For displaying total bills (initially showing 0)

  // Add event listeners to all images
  images.forEach((image) => {
    image.addEventListener("click", function () {
      const text = this.getAttribute("data-text"); // Get the text from data-text attribute
      const itemValue = parseInt(text.trim()); // Convert text to an integer (after trimming any spaces)

      // Toggle between b1 and b2 based on the click count
      if (clickCounter % 2 === 0) {
        document.getElementById("b1").textContent = text;
      } else {
        document.getElementById("b2").textContent = text;
      }

      // Add the value of the selected item to the total bill
      bills += itemValue;

      // Increment the click counter
      clickCounter++;
    });
  });

  // Verify total bill when the button is clicked
  verifyTotalButton.addEventListener("click", function () {
    const enteredTotal = parseInt(totalInput.value.trim()); // Get the user's input and convert it to a number

    // Compare the entered total with the calculated bill
    if (enteredTotal === bills) {
      billDiv.style.backgroundColor = "lightgreen"; // Change background to green if correct
      ba2.textContent = `Total Bills: ${bills}`; // Update the total in ba2 only after verification
    } else {
      billDiv.style.backgroundColor = "red"; // Change background to red if incorrect
      ba2.textContent = `Total Bills: 0`; // Keep ba2 as 0 if verification fails
    }
  });

  // Verify balance when the button is clicked
  verifyBalanceButton.addEventListener("click", function () {
    const enteredBalance = parseInt(balanceInput.value.trim()); // Get the user's input and convert it to a number
    const remainingBalance = availableAmount - bills; // Calculate the remaining balance

    // Compare the entered balance with the remaining balance
    if (enteredBalance === remainingBalance) {
      balanceDiv.style.backgroundColor = "lightgreen";
      showModal(); // Change background to green if correct
    } else {
      balanceDiv.style.backgroundColor = "red"; // Change background to red if incorrect
    }
  });

  function showModal() {
    document.getElementById("modal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  function nextLevel() {
    window.location.href = "../maze2.html"; // Adjust as necessary
  }
});
