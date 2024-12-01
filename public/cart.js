async function loadCart() {
    const userEmail = localStorage.getItem("userEmail");
    const cartItemsContainer = document.getElementById("cartItems");

    if (!userEmail) {
        alert("Please log in to view your cart.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.error("Cart not found for this user.");
                cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            } else {
                console.error("Failed to fetch cart:", await response.text());
                cartItemsContainer.innerHTML = "<p>Failed to load cart. Please try again later.</p>";
            }
            return;
        }

        const data = await response.json();
        const cartItems = data.cart || [];

        cartItemsContainer.innerHTML = ""; // Clear existing items
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartItems.forEach((item, index) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cart-item");

            const imgElement = document.createElement("img");
            imgElement.src = item.image;
            imgElement.alt = "Art Image";
            imgElement.classList.add("cart-image");
            itemContainer.appendChild(imgElement);

            const infoContainer = document.createElement("div");
            infoContainer.classList.add("cart-info");
            infoContainer.innerHTML = `
                <div class="cart-title">${item.title}</div>
                <div class="cart-artist">Artist: ${item.artist}</div>
                <div class="cart-price">Price: ${item.price}</div>
            `;
            itemContainer.appendChild(infoContainer);

            // Create a "Remove" button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-button");
            removeButton.onclick = () => removeFromCart(index); // Call remove function
            itemContainer.appendChild(removeButton);

            cartItemsContainer.appendChild(itemContainer);
        });
    } catch (err) {
        console.error("Error loading cart:", err);
        cartItemsContainer.innerHTML = "<p>Unable to load cart. Please try again later.</p>";
    }
}



async function removeFromCart(index) {
    const userEmail = localStorage.getItem("userEmail"); // Get the logged-in user's email
    if (!userEmail) {
        alert("Please log in to manage your cart.");
        window.location.href = "login.html"; // Redirect to login page
        return;
    }

    try {
        // Fetch the current cart from MongoDB
        const response = await fetch(`http://localhost:5000/cart?email=${userEmail}`);
        if (!response.ok) {
            console.error("Failed to fetch cart for removal:", await response.text());
            return;
        }

        const data = await response.json();
        let cartItems = data.cart || []; // Get the cart items

        // Remove the item at the specified index
        cartItems.splice(index, 1);

        // Update the cart in MongoDB
        const updateResponse = await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, cart: cartItems }),
        });

        if (updateResponse.ok) {
            console.log("Cart updated successfully!");
            loadCart(); // Reload the cart display
        } else {
            console.error("Failed to update cart:", await updateResponse.text());
        }
    } catch (err) {
        console.error("Error updating cart:", err);
    }
}

// Load cart items on page load
window.onload = loadCart;
