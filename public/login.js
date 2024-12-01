document.getElementById("login-button").addEventListener("click", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        console.log("Attempting login with email:", email);

        // Login API call
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.status === 200) {
            console.log("Login successful:", result);

            // Save the current user's email in localStorage for session management
            localStorage.setItem("userEmail", result.email);

            // Redirect to the home page
            window.location.href = "home.html"; // Orders will be fetched on home page load
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
    }
});
