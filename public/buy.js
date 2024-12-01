function goBack() {
    window.history.back(); // Navigate to the previous page
}


// Function to fetch JSON data from artData.json
async function fetchData() {
    const response = await fetch('./artData.json'); // Path for same folder
    if (!response.ok) {
        throw new Error("Failed to load art data.");
    }
    return await response.json();
}

// Function to load and display artwork details
(async function loadArtData() {
    try {
        const artData = await fetchData();

        // Get artId from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const artId = parseInt(urlParams.get('artId'), 10);

        // Find the artwork details by matching the artId
        const artwork = Object.values(artData).flat().find(item => item.artId === artId);

        if (artwork) {
            // Display artwork details
            document.getElementById('artImage').src = artwork.src;
            document.getElementById('artTitle').textContent = artwork.title;
            document.getElementById('artistName').textContent = `Artist Name: ${artwork.artist}`;
            document.getElementById('category').textContent = `Category: ${artwork.category}`;
            document.getElementById('artPrice').textContent = `Price: ${artwork.artPrice}`;
        } else {
            console.log("Artwork not found");
        }
    } catch (error) {
        console.error("Error loading art data:", error);
    }
})();

// Function to add item to cart
async function addToCart() {
    console.log("Add to Cart button clicked"); // Debugging line

    // Get item details from the DOM
    const title = document.getElementById('artTitle').textContent;
    const artist = document.getElementById('artistName').textContent.replace('Artist Name: ', '');
    const category = document.getElementById('category').textContent.replace('Category: ', '');
    const image = document.getElementById('artImage').src;
    const price = document.getElementById('artPrice').textContent.replace('Price: ', '');
    console.log("Extracted price:", price);

    const cartItem = {
        title: title,
        artist: artist,
        category: category,
        image: image,
        price: price
    };

    const userEmail = localStorage.getItem("userEmail");  // Get the logged-in user's email
    if (!userEmail) {
        alert("Please log in to add items to your cart.");
        window.location.href = "login.html";  // Redirect to login if not logged in
        return;
    }

    try {
        // Fetch the current cart from MongoDB for the logged-in user
        const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
        if (!response.ok) {
            console.error("Failed to fetch cart for addition:", await response.text());
            return;
        }

        const data = await response.json();
        let cartItems = data.cart || [];  // Get current cart items from the database

        // Add the new item to the cart
        cartItems.push(cartItem);

        // Send the updated cart to MongoDB
        const updateResponse = await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, cart: cartItems }),  // Send the updated cart to MongoDB
        });

        if (updateResponse.ok) {
            console.log("Item added to cart successfully!");
            alert("Item added to cart!");  // Optionally notify the user
        } else {
            console.error("Failed to update cart:", await updateResponse.text());
        }
    } catch (err) {
        console.error("Error adding item to cart:", err);
    }
}

// Function to buy the item now (add to cart and proceed to checkout)
function buyNow() {
    const title = document.getElementById('artTitle').textContent;
    const artist = document.getElementById('artistName').textContent.replace('Artist Name: ', '');
    const category = document.getElementById('category').textContent.replace('Category: ', '');
    const image = document.getElementById('artImage').src;
    const price = document.getElementById('artPrice').textContent.replace('Price: ', ''); // Extracting price from display

    const buyNowItem = [{
        title: title,
        artist: artist,
        category: category,
        image: image,
        price: price // Including price in the buy now item
    }];

    localStorage.setItem("cart", JSON.stringify(buyNowItem));
    window.location.href = "checkout.html"; // Redirect to checkout page
}

// Function to display an alert message
function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert';
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000); // Alert will disappear after 3 seconds
}
