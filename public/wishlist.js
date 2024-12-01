// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const wishlistContainer = document.getElementById('wishlist-container');

// Function to display wishlist items
function displayWishlist() {
    wishlistContainer.innerHTML = ''; // Clear container

    wishlist.forEach(item => {
        // Create a container for each wishlist item
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('wishlist-item');

        // Create the image element
        const img = document.createElement('img');
        img.src = item;
        img.alt = "Art Image";
        img.classList.add('wishlist-art');

        // Create the heart icon element
        const heartIcon = document.createElement('span');
        heartIcon.classList.add('like-button', 'liked'); // Red heart icon
        heartIcon.innerHTML = '❤️';

        // Add click event to remove item from wishlist
        heartIcon.addEventListener('click', () => {
            wishlist = wishlist.filter(id => id !== item); // Remove from wishlist
            localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage
            displayWishlist(); // Refresh wishlist display
        });

        // Append the heart icon and image to the item container
        itemContainer.appendChild(img);
        itemContainer.appendChild(heartIcon);
        wishlistContainer.appendChild(itemContainer);
    });
}

// Initial display of wishlist items
displayWishlist();