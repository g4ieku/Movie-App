const API_KEY = "6552015b4f58b0b86885b4e05058ab04";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  const { results } = data;
  displayMovies(results);
  return results;
}

function displayMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    div.innerHTML = `
     <img
          src="${
            movie?.backdrop_path
              ? IMG_URL + movie.backdrop_path
              : "././new-years-eve-1085072_1280.jpg"
          }"
          alt="movie image"
          class="shadow-image"
        />
        <div class="movie-info">
          <h3>${movie.original_title}</h3>
          <span class="good">${movie.vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${
            movie.overview.length > 270
              ? movie.overview.slice(0, 270) + "..."
              : movie.overview
          }
        </div>
    `;

    main.appendChild(div);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = search.value.trim();
  if (searchTerm) {
    console.log(SEARCH_URL + searchTerm);
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

document.addEventListener("DOMContentLoaded", getMovies(API_URL));
