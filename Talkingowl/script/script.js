const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language");

// Function to populate the dropdowns with available languages
function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}

populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");

    // Move event listener attachment to after dropdown opens
    dropdown.querySelectorAll(".option").forEach((item) => {
      item.addEventListener("click", (e) => {
        // remove active class from current dropdowns
        dropdown.querySelectorAll(".option").forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
        const selected = dropdown.querySelector(".selected");
        selected.innerHTML = item.innerHTML;
        selected.dataset.value = item.dataset.value;
        translate(); // Call translate function
      });
    });
  });
});

document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// Language swapping functionality
const swapBtn = document.querySelector(".swap-position"),
  inputLanguage = inputLanguageDropdown.querySelector(".selected"),
  outputLanguage = outputLanguageDropdown.querySelector(".selected"),
  inputTextElem = document.querySelector("#input-text"),
  outputTextElem = document.querySelector("#output-text");

swapBtn.addEventListener("click", (e) => {
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  // swap text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.value;
  outputTextElem.value = tempInputText;

  translate();
});

// Translation functionality
function translate() {
  const inputText = inputTextElem.value;
  const inputLanguage =
    inputLanguageDropdown.querySelector(".selected").dataset.value;
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
    inputText
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      outputTextElem.value = json[0].map((item) => item[0]).join("");
    })
    .catch((error) => {
      console.error(error);
    });
}

inputTextElem.addEventListener("input", (e) => {
  // limit input to 5000 characters
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }
  translate();
});





// Dark mode toggle
const darkModeCheckbox = document.getElementById("dark-mode-btn");

darkModeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Character count functionality
const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});

// Record button functionality with dynamic language setting
const recordBtn = document.querySelector("#record-btn");

let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // Stop recognizing after a pause
  recognition.interimResults = false; // Only get final results

  // Update language dynamically based on the selected input language
  recordBtn.addEventListener("click", () => {
    const selectedLanguage = inputLanguageDropdown.querySelector(".selected").dataset.value;
    recognition.lang = selectedLanguage; // Set the language for recognition

    if (recordBtn.textContent === "🎤 Record") {
      recognition.start(); // Start speech recognition
    } else {
      recognition.stop(); // Stop speech recognition
    }
  });

  recognition.onstart = () => {
    recordBtn.textContent = "🎤 Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript; // Get the recognized text
    inputTextElem.value = transcript; // Update input text area with recognized text
    translate(); // Call translate function
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    recordBtn.textContent = "🎤 Record";
  };

  recognition.onend = () => {
    recordBtn.textContent = "🎤 Record";
  };
} else {
  console.error("Speech recognition not supported in this browser.");
}

// Speak functionality for output text
const speakBtn = document.querySelector("#speak-btn");

speakBtn.addEventListener("click", () => {
  const translatedText = outputTextElem.value; // Get the translated text
  const outputLanguage = outputLanguageDropdown.querySelector(".selected").dataset.value; // Get the selected output language

  // Create a new utterance with the translated text
  const utterance = new SpeechSynthesisUtterance(translatedText);
  
  // Set the language of the utterance
  utterance.lang = outputLanguage;

  // Dynamically get voices and select appropriate one
  const voices = speechSynthesis.getVoices();
  const selectedVoice = voices.find((voice) => voice.lang === outputLanguage);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Speak the utterance
  speechSynthesis.speak(utterance);
});
