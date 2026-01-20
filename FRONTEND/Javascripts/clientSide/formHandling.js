import { API_ENDPOINTS } from "../CONFIGJS.js";
const logButton = document.querySelector(".logButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Disable login button initially
logButton.disabled = true;

// Validate input fields dynamically
[usernameInput, emailInput, passwordInput].forEach(input => {
  input.addEventListener("input", () => {
    logButton.disabled = !usernameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim();
  });
});

// Email format regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

logButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    return;
  }

  // Disable button to prevent multiple clicks
  logButton.disabled = true;

  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // ✅ FIXED: Use relative path from HTML file location
    // HTML is at: FRONTEND/htmlFolder/clientSide/form.html
    // PHP is at: BACKEND/formHandling.php
    const response = await fetch(API_ENDPOINTS.formHandling, {
      method: "POST",
      body: formData
    });

    // ✅ Read response as text first to debug
    const text = await response.text();
    console.log("Raw response:", text);

    // ✅ Check if response is empty
    if (!text) {
      throw new Error("Empty response from server");
    }

    // ✅ Try to parse JSON
    const result = JSON.parse(text);
    console.log("Server response:", result);

    if (result.success) {
      alert("Registration successful!");
      window.location.href = "../adminSide/AdminPanel.html";
    } else {
      alert("Registration failed: " + (result.error || "Unknown error"));
      logButton.disabled = false;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred. Please try again later.");
    logButton.disabled = false;
  }
});