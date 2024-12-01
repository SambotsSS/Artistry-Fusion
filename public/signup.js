document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: `${firstName} ${lastName}`, email, password }),
        });

        const data = await response.json();

        if (response.status === 201) {
            console.log("Email to be stored during signup:", email); // Debugging
            localStorage.setItem("userEmail", email); // Save email to localStorage
            alert(data.message);
            window.location.href = "login.html"; // Redirect to login
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert("Signup error: " + err);
    }
});


