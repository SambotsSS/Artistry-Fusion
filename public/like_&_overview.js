class ArtInteraction {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.init();
    }

    init() {
        const images = document.querySelectorAll('.gallery img');
        images.forEach(image => this.setupArtItem(image));
    }

    setupArtItem(image) {
        const wrapper = this.createWrapper(image);
        const likeButton = this.createLikeButton(image);
        const overview = this.createOverview();

        wrapper.append(image, overview, likeButton);
    }

    createWrapper(image) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('art-item');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        image.parentNode.insertBefore(wrapper, image);
        return wrapper;
    }

    createLikeButton(image) {
        const likeButtonContainer = document.createElement('div');
        likeButtonContainer.classList.add('like-button-container');

        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.dataset.id = image.src;
        this.updateHeartIcon(likeButton, this.wishlist.includes(image.src));

        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.toggleWishlist(likeButton, image.src);
        });

        likeButtonContainer.appendChild(likeButton);
        return likeButtonContainer;
    }

    updateHeartIcon(button, isLiked) {
        button.innerHTML = isLiked ? '❤️' : '♡';
        button.classList.toggle('liked', isLiked);
    }

    toggleWishlist(button, itemId) {
        if (this.wishlist.includes(itemId)) {
            this.wishlist = this.wishlist.filter(id => id !== itemId);
            this.updateHeartIcon(button, false);
            alert('Item removed from wishlist');
        } else {
            this.wishlist.push(itemId);
            this.updateHeartIcon(button, true);
            alert('Item added to wishlist');
        }
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    createOverview() {
        const overview = document.createElement('div');
        overview.classList.add('overview');
        overview.innerHTML = `<h3>Overview</h3><p>Details about the artwork will be shown here when hovered.</p>`;
        return overview;
    }
}

document.addEventListener('DOMContentLoaded', () => new ArtInteraction());
