async function loadOrders() {
    const ordersList = document.getElementById("ordersList");
    const userEmail = localStorage.getItem("userEmail");

    // Ensure the user is logged in
    if (!userEmail) {
        console.error("User email is not set. Redirecting to login.");
        window.location.href = "login.html"; // Redirect if user is not logged in
        return;
    }

    console.log("Fetching orders for email:", userEmail); // Debugging log

    try {
        // Fetch orders from MongoDB
        const response = await fetch(`http://localhost:5000/orders?email=${userEmail}`);
        console.log("Fetch response status:", response.status);

        if (response.ok) {
            const data = await response.json();
            console.log("Fetched orders data:", data); // Debugging log

            // Ensure data.orders exists and is an array
            if (!data.orders || data.orders.length === 0) {
                console.warn("No orders found or incorrect data structure:", data);
                ordersList.innerHTML = "<p>No orders yet!</p>";
                return;
            }

            // Clear any existing orders
            ordersList.innerHTML = "";

            // Render orders
            data.orders.forEach((order, index) => {
                console.log("Rendering order:", order); // Debugging log

                const orderContainer = document.createElement("div");
                orderContainer.classList.add("order-item");

                // Render order details
                let orderDetails = `<h3 class="order-number">Order ${index + 1}</h3>`;
                let totalOrderPrice = 0;

                orderDetails += '<div class="order-items">';

                // Validate order.items
                if (!order.items || order.items.length === 0) {
                    console.warn("Order has no items:", order);
                    orderDetails += "<p>No items in this order.</p>";
                } else {
                    order.items.forEach((item) => {
                        console.log("Order item:", item); // Debugging log
                        const priceValue = parseFloat(item.price.replace(/[$,]/g, "")) || 0; // Ensure valid price
                        totalOrderPrice += priceValue;

                        orderDetails += `
                            <div class="order-details">
                                <div class="image-box">
                                    <img src="${item.image}" alt="${item.title}" class="order-image">
                                </div>
                                <div class="order-info">
                                    <div class="order-title">${item.title}</div>
                                    <div class="order-artist">Artist: ${item.artist}</div>
                                    <div class="order-price">Price: $${priceValue.toFixed(2)}</div>
                                </div>
                            </div>
                        `;
                    });
                }

                orderDetails += "</div>";
                orderDetails += `<div class="order-total">Total Price: $${totalOrderPrice.toFixed(2)}</div>`;
                orderContainer.innerHTML = orderDetails;
                ordersList.appendChild(orderContainer);
            });
        } else {
            console.error("Failed to fetch orders:", await response.text());
            ordersList.innerHTML = "<p>Failed to load orders. Please try again later.</p>";
        }
    } catch (err) {
        console.error("Error during fetch:", err);
        ordersList.innerHTML = "<p>Unable to load orders. Please try again later.</p>";
    }
}

// Trigger loadOrders on page load
window.onload = loadOrders;
