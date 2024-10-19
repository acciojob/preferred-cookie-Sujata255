// Function to set a cookie with a specified name, value, and expiration days
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration days
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get the value of a cookie by name
function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie); // Get all cookies
  const cookies = decodedCookie.split(';'); // Split cookies into array
  name = name + "=";
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim(); // Trim whitespace
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length); // Return cookie value if found
    }
  }
  return ""; // Return empty string if cookie not found
}

// Function to apply the preferences stored in cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  // If a font size cookie exists, apply it
  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
    document.getElementById('fontsize').value = savedFontSize; // Pre-populate the form field
  }

  // If a font color cookie exists, apply it
  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    document.getElementById('fontcolor').value = savedFontColor; // Pre-populate the form field
  }
}

// Function to handle form submission and save preferences in cookies
document.getElementById('preferencesForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get font size and color from form
  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Save the preferences in cookies
  setCookie('fontsize', fontSize, 365); // Save font size for 365 days
  setCookie('fontcolor', fontColor, 365); // Save font color for 365 days

  // Apply the preferences immediately after saving
  applyPreferences();
});

// Apply preferences when the page loads
window.onload = applyPreferences;

