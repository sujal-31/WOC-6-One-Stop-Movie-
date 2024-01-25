const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const API_KEY = "api_key=c2acc63ab506a73d86f65c980a09f70e";
const Base_URL = "https://www.themoviedb.org";
const ol = document.getElementById("movie-list");
const ol2 = document.getElementById("movie-list2");
const ol3 = document.getElementById("tv-list");
const ol4 = document.getElementById("rated-tv-list");
const form = document.getElementsByClassName("search-form");
const search = document.getElementById("searchtext");
const searchURL = Base_URL + "/search/movie?" + API_KEY;
const tagsEl = document.getElementById("tags");
const main = document.getElementById("main");
const mainpage = document.getElementById("mainpage");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I",
  },
};

gettrendingmovies();
getplayingmovies();
gettrendingtvshoes();
getTopratedTvshoes();

function gettrendingmovies() {
  document.querySelector("#trending").innerHTML = "Trending Movies";
  ol.innerHTML = "";
  fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showtrendingmovies(data.results);
    });
}
function showtrendingmovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("card");
    movieEl.innerHTML = `
      <img id="cardposter" src="${
        IMG_URL + movie.poster_path
      }" onclick= showMsg(${movie.id}) height="230px"width="150px">
      </a>
      <div class="rating"> 
      <i class="fa-sharp fa-solid fa-star"></i>
      <div class="green">${movie.vote_average}</div>
      </div>
      <h4 id="movie-title" onclick= showMsg(${movie.id})>${movie.title}</h4>
      <p id="release-date">${movie.release_date}</p>
     `;

    ol.appendChild(movieEl);
  });
}

function getplayingmovies() {
  document.querySelector("#playing").innerHTML = "Now Playing Movies";
  ol2.innerHTML = "";
 fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showplayingmovies(data.results);
    });
}
function showplayingmovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("card2");
    movieEl.innerHTML = `
      
      <img id="cardposter" src="${
        IMG_URL + movie.poster_path
      }" height="230px"width="150px" onclick= showMsg(${movie.id})>
      <div class="rating"> 
      <i class="fa-sharp fa-solid fa-star"></i>
      <div class="green">${movie.vote_average}</div>
      
      </div> 
      <h4 id="movie-title" onclick= showMsg(${movie.id})>${movie.title}</h4>
      <p id="release-date">${movie.release_date}</p> 
        
  `;

    ol2.appendChild(movieEl);
  });
}
function gettrendingtvshoes() {
  document.querySelector("#trendingtv").innerHTML = "Trending Tv shows";
  ol3.innerHTML = "";
  fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showtrendingtvshoes(data.results);
    });
}
function showtrendingtvshoes(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("card2");
    movieEl.innerHTML = `
        
        <img id="cardposter" src="${
          IMG_URL + movie.poster_path
        }" onclick= showMsgtv(${movie.id}) height="230px"width="150px">
        </a>
        <div class="rating"> 
        <i class="fa-sharp fa-solid fa-star"></i>
        <div class="green">${movie.vote_average}</div>
        </div>
        <h4 id="movie-title" onclick= showMsgtv(${movie.id})>${movie.name}</h4>
        <p id="release-date">${movie.first_air_date}</p>
       
       `;

    ol3.appendChild(movieEl);
  });
}

function getTopratedTvshoes() {
  document.querySelector("#topratedtv").innerHTML = "Top Rated Tv shows";
  ol4.innerHTML = "";
  fetch("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showtopratedtvshoes(data.results);
    });
}
function showtopratedtvshoes(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("card3");
    movieEl.innerHTML = `
          
          <img id="cardposter" src="${
            IMG_URL + movie.poster_path
          }" onclick= showMsgtv(${movie.id}) height="230px"width="150px">
          </a>
          <div class="rating"> 
          <i class="fa-sharp fa-solid fa-star"></i>
          <div class="green">${movie.vote_average}</div>
          </div>
          <h4 id="movie-title" onclick= showMsgtv(${movie.id})>${
      movie.name
    }</h4>
          <p id="release-date">${movie.first_air_date}</p>
         
         `;

    ol4.appendChild(movieEl);
  });
}
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    document.location = "search.html" + "?search=" + search.value;
  } else {
    gettrendingmovies();
    getplayingmovies();
    gettrendingtvshoes();
    getTopratedTvshoes();
  }
});

function showMsg(id) {
  console.log(id);
  document.location = "info.html" + "?id=" + id;

  const searchParams = window.location.search;
  console.log(searchParams.get());

  for (const p of searchParams) {
    console.log(p);
  }

  console.log(searchParams.get(id));
}
function showMsgtv(id) {
  console.log(id);
  document.location = "tv-series-info.html" + "?tvid=" + id;

  const searchParams = window.location.search;
  console.log(searchParams.get());

  for (const p of searchParams) {
    console.log(p);
  }

  console.log(searchParams.get(id));
}
