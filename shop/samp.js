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
  const ba2 = document.getElementById("ba2"); // For displaying total bills

  // Add event listeners to all images
  images.forEach((image) => {
    image.addEventListener("click", function () {
      const itemValue = parseInt(this.getAttribute("data-text").trim());
      bills += itemValue;

      // Update bill text based on click count
      const billElement = clickCounter % 2 === 0 ? "b1" : "b2";
      document.getElementById(billElement).textContent =
        this.getAttribute("data-text");
      clickCounter++;
    });
  });

  // Verify total bill when the button is clicked
  verifyTotalButton.addEventListener("click", function () {
    const enteredTotal = parseInt(totalInput.value.trim());
    if (enteredTotal === bills) {
      billDiv.style.backgroundColor = "lightgreen";
      ba2.textContent = `Total Bills: ${bills}`;
    } else {
      billDiv.style.backgroundColor = "red";
      ba2.textContent = `Total Bills: 0`;
    }
  });

  // Verify balance when the button is clicked
  verifyBalanceButton.addEventListener("click", function () {
    const enteredBalance = parseInt(balanceInput.value.trim());

    if (isNaN(enteredBalance)) {
      alert("Please enter a valid number for balance.");
      return;
    }

    const remainingBalance = availableAmount - bills; // Calculate the remaining balance
    if (enteredBalance === remainingBalance) {
      balanceDiv.style.backgroundColor = "lightgreen";
      showModal(); // Show the modal on success
    } else {
      balanceDiv.style.backgroundColor = "red";
    }
  });

  // Modal handling
  const successModal = document.getElementById("successModal");
  const closeButton = document.querySelector(".close-button");
  const nextButton = document.getElementById("nextButton");

  // Function to show the modal
  function showModal() {
    document.getElementById("modal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  function nextLevel() {
    window.location.href = "./shop/index.html"; // Adjust as necessary
  }
});
