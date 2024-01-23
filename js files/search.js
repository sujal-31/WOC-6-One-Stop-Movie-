const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const search_value = new URLSearchParams(window.location.search).get("search");
const movielist = document.getElementById("movie-list");
getsearchmovies();
function getsearchmovies() {
  movielist.innerHTML = "";
  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      search_value +
      "&include_adult=false&include_video=false&language=en-US&page=1",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I",
        accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showsearchmovies(data.results);
    });
}

function showsearchmovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("cards");
    movieEl.innerHTML = ` <img id="cardposter" src="${
      IMG_URL + movie.poster_path
    }" onclick= showMsg(${movie.id}) height="230px"width="150px">
    </a>
    <div class="rating"> 
    <i class="fa-sharp fa-solid fa-star"></i>
    <div class="green">${movie.vote_average}</div>
    </div>
    <h4 id="movie-title" onclick= showMsg(${movie.id})>${movie.title}</h4>
    <p id="release-date">${movie.release_date}</p>`;

    movielist.appendChild(movieEl);
  });
}
function showMsg(id) {
  console.log(id);
  document.location = "info.html" + "?id=" + id;

}
