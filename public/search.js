class ArtSearch {
    constructor(data) {
        this.data = data; // Art data array
        this.resultsContainer = document.getElementById('results-container');
        this.searchInput = document.getElementById('search-text');
        this.homeContent = document.getElementById('home-content'); // Home content container

        if (!this.resultsContainer || !this.searchInput || !this.homeContent) {
            console.error("Missing required DOM elements: 'results-container', 'search-text', or 'home-content'");
            return;
        }

        this.attachSearchListener();
    }

    // Attach keypress event listener to search input
    attachSearchListener() {
        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') { // Check if the Enter key is pressed
                const query = event.target.value.toLowerCase().trim();
                if (query) {
                    this.performSearch(query);
                } else {
                    this.clearResults(); // Clear results if input is empty
                }
            }
        });
    }

    // Perform the search based on the query
    performSearch(query) {
        const results = this.data.filter((art) =>
            art.title.toLowerCase().includes(query) ||
            art.artist.toLowerCase().includes(query) ||
            art.category.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            this.displayResults(results);
        } else {
            this.displayNoResults("No results found for your query.");
        }
    }

    // Display search results
    displayResults(results) {
        this.homeContent.style.display = 'none'; // Hide home content
        this.resultsContainer.style.display = 'grid'; // Show results container
        this.resultsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        this.resultsContainer.style.gap = '20px';
        this.resultsContainer.innerHTML = ''; // Clear previous results

        results.forEach((art) => this.createResultItem(art));
    }

    // Create an individual result item
    createResultItem(art) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const link = document.createElement('a');
        link.href = `buy.html?src=${encodeURIComponent(art.src)}`;

        const img = document.createElement('img');
        img.src = art.src;
        img.alt = art.title;
        img.style.width = '100%';
        img.style.borderRadius = '10px';

        const info = document.createElement('div');
        info.className = 'result-info';
        info.innerHTML = `<strong>${art.title}</strong><br>Artist: ${art.artist}<br>Category: ${art.category}`;

        link.append(img, info);
        resultItem.appendChild(link);
        this.resultsContainer.appendChild(resultItem);
    }

    // Display a "no results" message
    displayNoResults(message) {
        this.resultsContainer.style.display = 'block'; // Show results container
        this.homeContent.style.display = 'none'; // Hide home content
        this.resultsContainer.innerHTML = `<p style="text-align: center;">${message}</p>`;
    }

    // Clear search results and restore home content
    clearResults() {
        this.resultsContainer.style.display = 'none'; // Hide results container
        this.homeContent.style.display = 'block'; // Show home content
        this.resultsContainer.innerHTML = ''; // Clear results container
    }
}



document.addEventListener('DOMContentLoaded', () => {
const artData = [

    // 3D Art
    { src: "pic47.jpg", title: "Geometric Sculpture - 3D Art", artist: "Ed Ruscha", category: "3D Art", page: "3d-art.html" },
    { src: "pic48.jpg", title: "Surrealistic Human Form - 3D Art", artist: "Jeff Koons", category: "3D Art", page: "3d-art.html" },
    { src: "pic49.jpg", title: "Futuristic Architecture Model - 3D Art", artist: "Tyson Reeder", category: "3D Art", page: "3d-art.html" },
    {src: "pic50.jpg", title: "Abstract Cube Composition - 3D Art", artist: "Alberto Burri", category: "3D Art", page: "3d-art.html" },
    {src: "pic51.jpg", title: "Twisting Metal Sculpture - 3D Art", artist: "Cecily Brown", category: "3D Art", page: "3d-art.html" },
    {src: "pic52.jpg", title: "Organic Flowing Shapes - 3D Art", artist: "Marlene Dumas", category: "3D Art", page: "3d-art.html" },
    {src: "pic53.jpg", title: "Digital Landscape - 3D Art", artist: "Serge Poliakoff", category: "3D Art", page: "3d-art.html" },
    {src: "pic54.jpg", title: "Modern Art Installation - 3D Art", artist: "Elaine de Kooning", category: "3D Art", page: "3d-art.html" },
    {src: "pic55.jpg", title: "Kinetic Sculpture Model - 3D Art", artist: "Ray Johnson", category: "3D Art", page: "3d-art.html" },
    {src: "pic56.jpg", title: "Virtual Space Design - 3D Art", artist: "Ed Ruscha", category: "3D Art", page: "3d-art.html" },
    {src: "pic57.jpg", title: "Layered Glass Shapes - 3D Art", artist: "Jeff Koons", category: "3D Art", page: "3d-art.html" },
    {src: "pic14.jpg", title: "Highlighted Sculpture - 3D Art", artist: "Tyson Reeder", category: "3D Art", page: "3d-art.html" },
    {src: "pic58.jpg", title: "Curved Abstract Form - 3D Art", artist: "Alberto Burri", category: "3D Art", page: "3d-art.html" },
    {src: "pic59.jpg", title: "Digital Reflection Study - 3D Art", artist: "Cecily Brown", category: "3D Art", page: "3d-art.html" },
    {src: "pic60.jpg", title: "Minimalist Block Structure - 3D Art", artist: "Marlene Dumas", category: "3D Art", page: "3d-art.html" },
    {src: "pic15.jpg", title: "Suspended Spheres Composition - 3D Art", artist: "Serge Poliakoff", category: "3D Art", page: "3d-art.html" },
    
    
    // abstract
    {src: "pic11.jpg",  title: "Echoes of Urban Chaos - Abstract Art", artist: "Jeff Koons", category: "Abstract Art", page: "abstract.html" },
    {src: "pic36.jpg",  title: "Dreamlike Shapes in Motion - Abstract Art", artist: "Tyson Reeder", category: "Abstract Art", page: "abstract.html" },
    {src: "pic37.jpg",  title: "Layers of Expression - Abstract Art", artist: "Alberto Burri", category: "Abstract Art", page: "abstract.html" },
    {src: "pic38.jpg",  title: "Organic Fluidity - Abstract Art", artist: "Cecily Brown", category: "Abstract Art", page: "abstract.html" },
    {src: "pic39.jpg",  title: "Subtle Brush Movements - Abstract Art", artist: "Marlene Dumas", category: "Abstract Art", page: "abstract.html" },
    {src: "pic40.jpg",  title: "Dynamic Color Blocks - Abstract Art", artist: "Serge Poliakoff", category: "Abstract Art", page: "abstract.html" },
    {src: "pic8.jpg" ,  title: "Inspired Whimsy - Abstract Art", artist: "Elaine de Kooning", category: "Abstract Art", page: "abstract.html" },
    {src: "pic41.jpg",  title: "Nightfall Reflections - Abstract Art", artist: "Ray Johnson", category: "Abstract Art", page: "abstract.html" },
    {src: "pic42.jpg",  title: "Harmonious Disarray - Abstract Art", artist: "Ed Ruscha", category: "Abstract Art", page: "abstract.html" },
    {src: "pic43.jpg",  title: "Hidden Symbols - Abstract Art", artist: "Jeff Koons", category: "Abstract Art", page: "abstract.html" },
    {src: "pic44.jpg",  title: "Energetic Strokes - Abstract Art", artist: "Tyson Reeder", category: "Abstract Art", page: "abstract.html" },
    {src: "pic45.jpg",  title: "Muted Contrasts - Abstract Art", artist: "Alberto Burri", category: "Abstract Art", page: "abstract.html" },
    {src: "pic46.jpg",  title: "Veiled Hues - Abstract Art", artist: "Cecily Brown", category: "Abstract Art", page: "abstract.html" },
    {src: "pic38.jpg",  title: "Evolving Shapes - Abstract Art", artist: "Marlene Dumas", category: "Abstract Art", page: "abstract.html" },
    {src: "pic34.jpg",  title: "Emotive Swirls - Abstract Art", artist: "Serge Poliakoff", category: "Abstract Art", page: "abstract.html" },


    // Game-art
    {src: "pic78.jpg", title: "Epic Battlefield - Game Art", artist:"Ed Ruscha", category: "Game Art", page: "Game-art.html" },
    {src: "pic79.jpg", title: "Fantasy Castle Scene - Game Art", artist:"Jeff Koons", category: "Game Art", page: "Game-art.html" },
    {src: "pic80.jpg", title: "Futuristic Cityscape - Game Art", artist:"Tyson Reeder", category: "Game Art", page: "Game-art.html" },
    {src: "pic81.jpg", title: "Mystical Forest Adventure - Game Art", artist:"Alberto Burri", category: "Game Art", page: "Game-art.html" },
    {src: "pic82.jpg", title: "Post-Apocalyptic Ruins - Game Art", artist:"Cecily Brown", category: "Game Art", page: "Game-art.html" },
    {src: "pic83.jpg", title: "Heroic Showdown - Game Art", artist:"Marlene Dumas", category: "Game Art", page: "Game-art.html" },
    {src: "pic84.jpg", title: "Underwater Kingdom - Game Art", artist:"Serge Poliakoff", category: "Game Art", page: "Game-art.html" },
    {src: "pic85.jpg", title: "Alien Planet Landscape - Game Art", artist:"Elaine de Kooning", category: "Game Art", page: "Game-art.html" },
    {src: "pic86.jpg", title: "Desert Outpost - Game Art", artist:"Ray Johnson", category: "Game Art", page: "Game-art.html" },
    {src: "pic87.jpg", title: "Medieval Fortress - Game Art", artist:"Ed Ruscha", category: "Game Art", page: "Game-art.html" },
    {src: "pic88.jpg", title: "Sci-Fi Space Battle - Game Art", artist:"Jeff Koons", category: "Game Art", page: "Game-art.html" },
    {src: "pic89.jpg", title: "Enchanted Woods - Game Art", artist:"Tyson Reeder", category: "Game Art", page: "Game-art.html" },
    {src: "pic90.jpg", title: "Dragon's Lair - Game Art", artist:"Alberto Burri", category: "Game Art", page: "Game-art.html" },
    {src: "pic91.jpg", title: "Cyberpunk Streets - Game Art", artist:"Cecily Brown", category: "Game Art", page: "Game-art.html" },
    {src: "pic77.jpg", title: "Highlighted Heroic Scene - Game Art", artist:"Marlene Dumas", category: "Game Art", page: "Game-art.html" },
    {src: "pic84.jpg", title: "Legendary Mountain Range - Game Art", artist:"Serge Poliakoff", category: "Game Art", page: "Game-art.html" },


    //graffiti
    {src: "pic93.jpg" , title: "Urban Dreamscape - Graffiti Art", artist:"Ed Ruscha", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic94.jpg" , title: "Neon Shadows - Graffiti Art", artist:"Jeff Koons", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic95.jpg" , title: "City Pulse - Graffiti Art", artist:"Tyson Reeder", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic96.jpg" , title: "Ephemeral Walls - Graffiti Art", artist:"Alberto Burri", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic97.jpg" , title: "Echoes of the Street - Graffiti Art", artist:"Cecily Brown", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic98.jpg" , title: "The Silent Wall - Graffiti Art", artist:"Marlene Dumas", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic99.jpg" , title: "Color in Motion - Graffiti Art", artist:"Serge Poliakoff", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic100.jpg", title: "Voices of the Wall - Graffiti Art", artist:"Elaine de Kooning", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic101.jpg", title: "Rebel's Path - Graffiti Art", artist:"Ray Johnson", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic102.jpg", title: "Fragmented City - Graffiti Art", artist:"Ed Ruscha", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic103.jpg", title: "Hidden Narratives - Graffiti Art", artist:"Jeff Koons", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic104.jpg", title: "Street Symphony - Graffiti Art", artist:"Tyson Reeder", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic92.jpg" , title: "Lost in Layers - Graffiti Art", artist:"Alberto Burri", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic105.jpg", title: "Urban Echo - Graffiti Art", artist:"Cecily Brown", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic106.jpg", title: "Chromatic Corners - Graffiti Art", artist:"Marlene Dumas", category: "Graffiti Art", page: "graffiti.html" },
    {src: "pic107.jpg", title: "Patterns of the Past - Graffiti Art", artist:"Serge Poliakoff", category: "Graffiti Art", page: "graffiti.html" },


    //modern-art
    {src:"pic62.jpg", title: "Urban Dreamscape - Modern Art", artist:"Ed Ruscha", category: "Modern Art", page: "modern-art.html" },
    {src:"pic63.jpg", title: "Neon Shadows - Modern Art", artist:"Jeff Koons", category: "Modern Art", page: "modern-art.html" },
    {src:"pic64.jpg", title: "City Pulse - Modern Art", artist:"Tyson Reeder", category: "Modern Art", page: "modern-art.html" },
    {src:"pic65.jpg", title: "Ephemeral Walls - Modern Art", artist:"Alberto Burri", category: "Modern Art", page: "modern-art.html" },
    {src:"pic66.jpg", title: "Echoes of the Street - Modern Art", artist:"Cecily Brown", category: "Modern Art", page: "modern-art.html" },
    {src:"pic67.jpg", title: "The Silent Wall - Modern Art", artist:"Marlene Dumas", category: "Modern Art", page: "modern-art.html" },
    {src:"pic68.jpg", title: "Color in Motion - Modern Art", artist:"Serge Poliakoff", category: "Modern Art", page: "modern-art.html" },
    {src:"pic69.jpg", title: "Voices of the Wall - Modern Art", artist:"Elaine de Kooning", category: "Modern Art", page: "modern-art.html" },
    {src:"pic70.jpg", title: "Rebel's Path - Modern Art", artist:"Ray Johnson", category: "Modern Art", page: "modern-art.html" },
    {src:"pic71.jpg", title: "Fragmented City - Modern Art", artist:"Ed Ruscha", category: "Modern Art", page: "modern-art.html" },
    {src:"pic72.jpg", title: "Hidden Narratives - Modern Art", artist:"Jeff Koons", category: "Modern Art", page: "modern-art.html" },
    {src:"pic73.jpg", title: "Street Symphony - Modern Art", artist:"Tyson Reeder", category: "Modern Art", page: "modern-art.html" },
    {src:"pic74.jpg", title: "Lost in Layers - Modern Art", artist:"Alberto Burri", category: "Modern Art", page: "modern-art.html" },
    {src:"pic61.jpg", title: "Urban Echo - Modern Art", artist:"Cecily Brown", category: "Modern Art", page: "modern-art.html" },
    {src:"pic75.jpg", title: "Chromatic Corners - Modern Art", artist:"Marlene Dumas", category: "Modern Art", page: "modern-art.html" },
    {src:"pic76.jpg", title: "Patterns of the Past - Modern Art", artist:"Serge Poliakoff", category: "Modern Art", page: "modern-art.html" },


    // watercolor
    {src:"pic109.jpg", title: "Urban Dreamscape - Watercolor Art", artist:"Ed Ruscha", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic110.jpg", title: "Neon Shadows - Watercolor Art", artist:"Jeff Koons", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic111.jpg", title: "City Pulse - Watercolor Art", artist:"Tyson Reeder", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic112.jpg", title: "Ephemeral Walls - Watercolor Art", artist:"Alberto Burri", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic113.jpg", title: "Echoes of the Street - Watercolor Art", artist:"Cecily Brown", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic114.jpg", title: "The Silent Wall - Watercolor Art", artist:"Marlene Dumas", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic115.jpg", title: "Color in Motion - Watercolor Art", artist:"Serge Poliakoff", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic116.jpg", title: "Voices of the Wall - Watercolor Art", artist:"Elaine de Kooning", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic117.jpg", title: "Rebel's Path - Watercolor Art", artist:"Ray Johnson", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic118.jpg", title: "Fragmented City - Watercolor Art", artist:"Ed Ruscha", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic119.jpg", title: "Hidden Narratives - Watercolor Art", artist:"Jeff Koons", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic120.jpg", title: "Street Symphony - Watercolor Art", artist:"Tyson Reeder", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic108.jpg", title: "Lost in Layers - Watercolor Art", artist:"Alberto Burri", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic121.jpg", title: "Urban Echo - Watercolor Art", artist:"Cecily Brown", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic122.jpg", title: "Chromatic Corners - Watercolor Art", artist:"Marlene Dumas", category: "Watercolor Art", page: "watercolor.html" },
    {src:"pic123.jpg", title: "Patterns of the Past - Watercolor Art", artist:"Serge Poliakoff", category: "Watercolor Art", page: "watercolor.html" },
];

new ArtSearch(artData);
});
