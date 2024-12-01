document.addEventListener("DOMContentLoaded", function () {
    const lines = [
        { element: document.getElementById("welcome-header"), text: "Welcome to" },
        { element: document.getElementById("artistry-fusion"), text: "ARTISTRY FUSION!!" },
        { element: document.getElementById("subheading"), text: "Where Art Unfolds" }
    ];

    const taglines = [
        "Where Art Unfolds",
        "Where Creativity Breathes Life",
        "Discover Art Beyond Borders",
        "Unleashing the Power of Colors",
        "Connecting Minds through Art",
        "Bringing Imagination to Life"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100; // Adjust typing speed here

    function typeLine() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            if (charIndex < currentLine.text.length) {
                currentLine.element.innerHTML += currentLine.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeLine, typingSpeed);
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeLine, 500); // Pause before starting next line
            }
        } else {
            // After typing completes, start tagline rotation
            setInterval(displayRandomTagline, 5000);
            displayRandomTagline(); // Show the first tagline immediately
        }
    }

    function displayRandomTagline() {
        const taglineElement = document.getElementById("subheading");
        const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
        
        // Apply the tagline and add fade-in class for animation
        taglineElement.textContent = randomTagline;
        taglineElement.classList.add("fade-in");

        // Remove the fade-in class after the animation completes
        setTimeout(() => taglineElement.classList.remove("fade-in"), 3000);
    }

    typeLine(); // Start typing effect
});






