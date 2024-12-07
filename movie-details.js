
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const apikey = "da3baaa";

    if (title) {
        fetchMovieDetails(title);
    }

    function fetchMovieDetails(title) {
        const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    displayMovieDetails(data);
                } else {
                    document.getElementById("movieDetail").innerText = "Movie not found.";
                }
            });
    }

    function displayMovieDetails(movie) {
        const detailDiv = document.getElementById("movieDetail");
        detailDiv.innerHTML = `
            <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Rating:</strong> ${movie.imdbRating}</p>
            <p><strong>Year:</strong> ${movie.Year}</p>
        `;
    }
});
