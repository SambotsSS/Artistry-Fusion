// Function to load and display checkout items
async function loadCheckout() {
    const userEmail = localStorage.getItem("userEmail"); // Get logged-in user's email
    const checkoutItemsContainer = document.getElementById("checkoutItems");
    const totalPriceElement = document.getElementById("totalPrice");

    // Ensure the user is logged in
    if (!userEmail) {
        alert("Please log in to proceed to checkout.");
        window.location.href = "login.html"; // Redirect to login page if not logged in
        return;
    }

    try {
        console.log("Fetching cart for user:", userEmail); // Debugging log

        // Fetch cart data from MongoDB
        const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
        if (!response.ok) {
            console.error("Failed to fetch cart:", await response.text());
            checkoutItemsContainer.innerHTML = "<p>Failed to load checkout. Please try again later.</p>";
            return;
        }

        const data = await response.json();
        const cartItems = data.cart || []; // Get cart items from response
        console.log("Fetched cart items:", cartItems); // Debugging log

        checkoutItemsContainer.innerHTML = ""; // Clear existing items
        let totalPrice = 0;

        if (cartItems.length === 0) {
            checkoutItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "Total Price: $0.00";
            return;
        }

        // Render cart items
        cartItems.forEach((item) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("checkout-item");

            const imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.alt = "Art Image";
            imgElement.classList.add("checkout-image");
            itemContainer.appendChild(imgElement);

            const infoContainer = document.createElement("div");
            infoContainer.classList.add("checkout-info");
            infoContainer.innerHTML = `
                <div class="checkout-title">${item.title}</div>
                <div class="checkout-artist">Artist: ${item.artist}</div>
                <div class="checkout-category">Category: ${item.category}</div>
                <div class="checkout-price">Price: ${item.price}</div>
            `;
            itemContainer.appendChild(infoContainer);

            checkoutItemsContainer.appendChild(itemContainer);

            const priceValue = parseFloat(item.price.replace(/[$,]/g, ""));
            if (!isNaN(priceValue)) {
                totalPrice += priceValue;
            }
        });

        // Update total price
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    } catch (err) {
        console.error("Error loading checkout:", err);
        checkoutItemsContainer.innerHTML = "<p>Unable to load checkout. Please try again later.</p>";
    }
}

// Function to handle checkout
async function handleCheckout() {
    const userEmail = localStorage.getItem("userEmail"); // Get logged-in user's email

    if (!userEmail) {
        alert("Please log in to complete your purchase.");
        window.location.href = "login.html"; // Redirect to login page if not logged in
        return;
    }

    try {
        // Fetch cart items from MongoDB
        const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
        if (!response.ok) {
            console.error("Failed to fetch cart for checkout:", await response.text());
            alert("Unable to complete purchase. Please try again.");
            return;
        }

        const data = await response.json();
        const cartItems = data.cart || []; // Get cart items

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Send cart items to orders in MongoDB
        const orderResponse = await fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, items: cartItems }), // Send order data
        });

        if (orderResponse.ok) {
            console.log("Order placed successfully!");

            // Clear the cart in MongoDB after placing the order
            await fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, cart: [] }), // Clear the cart
            });

            alert("Thank you for your purchase!");
            window.location.href = "myorders.html"; // Redirect to orders page
        } else {
            const errorText = await orderResponse.text();
            console.error("Failed to place order:", errorText);
            alert("Failed to place order. Please try again.");
        }
    } catch (err) {
        console.error("Error during checkout:", err);
        alert("An error occurred during checkout. Please try again.");
    }
}

// Load checkout items on page load
window.onload = function () {
    loadCheckout();

    // Add event listener for the Complete Purchase button
    const checkoutButton = document.getElementById("checkoutButton");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", handleCheckout);
    } else {
        console.error("Checkout button not found!");
    }
};

