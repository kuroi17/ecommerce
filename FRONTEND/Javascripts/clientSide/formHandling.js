const logButton = document.querySelector(".logButton");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// You can add form validation or other logic here if needed0
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

    const response = await fetch("../../BACKEND/formHandling.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password }) // ✅ Added username
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();

  console.log("Server response:", result);

  if (result.success) {
    alert("Login successful!");
    // Redirect to admin dashboard or another page
    window.location.href = "../../htmlFolder/adminSide/AdminPanel.html";
  }
  else{
    alert("Login failed: " + (result.message || "Unknown error"));
    logButton.disabled = false; // ✅ Re-enable button
  }
} catch (error){
  console.error("Error during login:", error);
  alert("An error occurred during login. Please try again later.");
  logButton.disabled = false; // ✅ Re-enable button
}; 
});