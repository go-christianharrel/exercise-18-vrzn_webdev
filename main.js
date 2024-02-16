// Function to show floating message
function showFloatingMessage(message) {
  const floatingMessage = document.querySelector(".floating-message");
  floatingMessage.textContent = message;
  floatingMessage.style.display = "block";
  setTimeout(() => {
    floatingMessage.style.display = "none";
  }, 2000); // Hide after 2 seconds (2000 milliseconds)
}

// Function to copy text to clipboard
function copyPhoneToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => showFloatingMessage("Phone number copied to clipboard!"))
    .catch((err) => console.error("Error copying text: ", err));
}

// Function to copy email address to clipboard
function copyEmailToClipboard(email) {
  navigator.clipboard
    .writeText(email)
    .then(() => showFloatingMessage("Email copied to clipboard!"))
    .catch((err) => console.error("Error copying email: ", err));
}
