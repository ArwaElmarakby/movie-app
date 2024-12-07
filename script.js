

document.addEventListener("DOMContentLoaded", function () {
    const apikey = "da3baaa";
    const movieInput = document.getElementById("movie");
    const searchButton = document.getElementById("searchButton");
    const movieList = document.getElementById("movieList");
    const genres = document.getElementById("genres");
    const reviewInput = document.getElementById("reviewInput");
    const submitReview = document.getElementById("submitReview");
    const reviewList = document.getElementById("reviewList");
    const yearInput = document.getElementById("yearInput");

    const defaultMovies = ["Inception", "Missing in Action 2: The Beginning", "Avatar", "The Dark Knight", "Interstellar", "Spider man", "King of Comedy", "Azumanga Daioh: The Animation", "Looney Tunes: Back in Action", "The Original Kings of Comedy", "Kim Possible: So the Drama", "The Amityville Horror"];
    fetchMovies(defaultMovies);

   
    searchButton.addEventListener("click", function () {
        const movie = movieInput.value.trim();
        const year = yearInput.value.trim();  
        
        if (movie) {
            fetchMovies([movie]);
            history.pushState({ title: movie }, movie, `?search=${movie}`);
        } else if (year) {
            fetchMoviesByYear(year); 
            history.pushState({ year: year }, `Movies from ${year}`, `?year=${year}`);
        } else {
            fetchMovies(defaultMovies); 
        }
    });

 
    genres.addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON") {
            const genre = e.target.dataset.genre;
            document.getElementById("genreLabel").innerText = genre;
            fetchMoviesByGenre(genre);
            history.pushState({ genre: genre }, genre, `?genre=${genre}`);
        }
    });

   
    window.addEventListener("popstate", function (event) {
        if (event.state) {
            if (event.state.title) {
                fetchMovies([event.state.title]);
            } else if (event.state.year) {
                fetchMoviesByYear(event.state.year);
            } else if (event.state.genre) {
                fetchMoviesByGenre(event.state.genre);
            }
        } else {
            fetchMovies(defaultMovies);
        }
    });

   
    submitReview.addEventListener("click", function () {
        const review = reviewInput.value.trim();
        if (review) {
            const div = document.createElement("div");
            div.textContent = review;
            reviewList.appendChild(div);
            reviewInput.value = "";
        }
    });



    function fetchMovies(titles) {
        movieList.innerHTML = "";
        titles.forEach((title) => {
            const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.Response === "True") {
                        createMovieCard(data);
                    }
                });
        });
    }


    function fetchMoviesByYear(year) {
        const url = `http://www.omdbapi.com/?apikey=${apikey}&s=movie&y=${year}&type=movie`;
        movieList.innerHTML = ""; 
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    const titles = data.Search.map((movie) => movie.Title);
                    fetchMovies(titles); 
                } else {
                    movieList.innerHTML = `<p>No movies found for the year ${year}</p>`;
                }
            })
            .catch((error) => console.error("Error fetching movies by year:", error));
    }

   
    function createMovieCard(movie) {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <a href="movie-details.html?title=${encodeURIComponent(movie.Title)}">
                <img src="${movie.Poster}" alt="${movie.Title}">
            </a>
            <h3>${movie.Title}</h3>
            <p>${movie.Genre}</p>
            <div class="card-footer">
                <button onclick="window.open('https://www.youtube.com/results?search_query=${movie.Title} trailer')">Watch Trailer</button>
            </div>
        `;
        movieList.appendChild(card);
    }

  
    function fetchMoviesByGenre(genre) {
        const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${genre}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    const titles = data.Search.map((movie) => movie.Title);
                    fetchMovies(titles);
                }
            });
    }
});



document.getElementById('profileIcon').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});

document.getElementById('homeLink').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});