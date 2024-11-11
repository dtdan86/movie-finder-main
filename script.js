/*
 * JavaScript Boilerplate for Movie Finder Project
 * 
 * This JavaScript file is part of the Web APIs assignment.
 * Your task is to complete the functions with appropriate fetch, localStorage, and update the DOM with the fetched data.
 * 
 * Follow the TODO prompts and complete each section to ensure the
 * Movie Finder App works as expected.
 */

const apiKey = 'f64b4ec8'; // Replace with your OMDb API key

// Create event listener for search submit
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Capture user input for search query
    const query = document.getElementById('searchInput').value;
    // TODO: Call the function to search for movies using the query
    // Hint: Use the searchMovies function, passing the user's search input (query) as the argument.
    searchMovies(query);
});

function searchMovies(query) {
    // Implement the Fetch API to retrieve movie data from the OMDb API
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // TODO: Call the function to display the search results
            // Hint: Check if data.Search exists before passing it to the displaySearchResults function.
            if ('Search' in data) {
                const movies = data['Search'];
                displaySearchResults(movies);
            } else {
                const searchResults = document.getElementById('results');
                searchResults.innerHTML = 'Movies was not found';

            }
        })
        // Error handling
        .catch(error => console.error('Error fetching movies:', error));
}

// Create results display
function displaySearchResults(movies) {
    const searchResults = document.getElementById('results');
    searchResults.innerHTML = ''; // Clear previous results

    if (movies) {
        movies.forEach(movie => {
            // Create the movie card and append it to the results section
            const movieCard = document.createElement('div');
            movieCard.className = 'col';
            // Create a movie card for search results
            movieCard.innerHTML = `
                <div class="card h-100">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-success" onclick="saveToFavorites('${movie.imdbID}')">Save to Favorites</button>
                    </div>
                </div>
            `;
            searchResults.appendChild(movieCard);
        });
    } else {
        // TODO: Display a message when no movies are found
        // Hint: You can update the innerHTML of the searchResults to display a "No movies found" message.
        searchResults.innerHTML = 'Movies was not found';
    }
}

// Save to favorites
function saveToFavorites(imdbID) {
    // Fetch the selected movie's data and save it to localStorage
    // Hint: After fetching the movie data, store it in the favorites array and update localStorage.
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(movie => {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (localStorage.getItem('favorites') !== null) {
                favorites = JSON.parse(localStorage.getItem('favorites'));
            }
            // TODO: Store the saved movie in the favorites array
            favorites.push(movie);

            // TODO: Store the saved movie in the favorites localStorage
            // Hint: Use setItem on the localStorage object
            localStorage.setItem('favorites', favorites);
            // TODO: Update the UI favorites section after saving a new movie
            // Hint: Call the displayFavorites function to refresh the favorites list.
            displayFavorites();
        })
        .catch(error => console.error('Error saving favorite:', error));
}

function displayFavorites() {
    // Remove the movies from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites');
    favoritesContainer.innerHTML = ''; // Clear previous favorites

    favorites.forEach(movie => {
        // TODO: Create the favorite movie card and append it to the favorites section
        // Hint: Use a similar card template as in displaySearchResults to maintain consistency in the UI.
        const movieCard = document.createElement('div');
        movieCard.className = 'col';
        // TODO: Create the favorite movie card with 'Remove from Favorites' button
        // Hint: Review the movie card from the search results
        movieCard.innerHTML = `
            <button class="btn btn-danger" onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
        `;
        favoritesContainer.appendChild(movieCard);
    });
}

function removeFromFavorites(imdbID) {
    // Remove the selected movie from localStorage and update the favorites section
    // Hint: Filter out the movie by its imdbID, then update localStorage and call displayFavorites.
    // TODO: Remove the movies from localStorage

    // Filter for specific movie
    favorites = favorites.filter(movie => movie.imdbID !== imdbID);
    // TODO: Update localStorage

    // TODO: Update the favorites list

}

// Display favorites on page load
displayFavorites();
