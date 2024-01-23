const mainpage = document.getElementById("mainpage");
const movielist = document.getElementById("movie-list");
const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const background_url =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
const tagsEl = document.getElementById("tags");
const API_KEY = "api_key=c2acc63ab506a73d86f65c980a09f70e";
const Base_URL = "https://www.themoviedb.org";
const API_URL = Base_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I",
  },
};
      const movieCategory = new URLSearchParams(window.location.search).get(
        "cat"
      );
      switch (movieCategory) {
        case "toprated":
          getTopratedmovies();
          
          break;
        case "nowplaying":
          getnowplayingmovies();
          break;
        case "popular-tvshows":
        getpopulartvshows();
          break;
        case "toprated-tvshows":
          getTopratedtvshows();
          break;
          case "onair-tvshows":
          getonairtvshows();
          break;
          case "airing-today-tvshows":
          getAiringTodayTvshows();
          break;
        default:
          getpopularmovies();
      }
   

function getpopularmovies() {
  movielist.innerHTML = "";
  document.querySelector("#categoryheading").innerHTML = `Popular Movies`;
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showpopularmovies(data.results);
    });
}

function showpopularmovies(data) {

  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("cards");
    movieEl.innerHTML = `<img id="cardposter" src="${
      IMG_URL + movie.poster_path
    }" height="230px"width="150px" onclick= showMsg(${movie.id})>
      
      <h4 id="movie-title" onclick= showMsg(${movie.id})>${movie.name}</h4>
      <p id="release-date">${movie.first_air_date}</p> 
      <div class="rating"> 
      <i class="fa-sharp fa-solid fa-star"></i>
      <div class="green">${movie.vote_average}</div>
      
      </div>  
      `;

    movielist.appendChild(movieEl);
  });
}

function getTopratedmovies() {
  movielist.innerHTML = "";
  document.querySelector("#categoryheading").innerHTML = `Top Rated Movies`;
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1" 
      ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showpopularmovies(data.results);
    });
}

function getnowplayingmovies() {
  movielist.innerHTML = "";
  document.querySelector("#categoryheading").innerHTML = `Now Playing Movies`;
  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1" 
     ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showpopularmovies(data.results);
    });
}

function getpopulartvshows(){
  movielist.innerHTML=""
  document.querySelector("#categoryheading").innerHTML = `Popular Tv-Shows`;
  fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1" 
      ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showonairtvshows(data.results);
    });
}

function getTopratedtvshows(){
  movielist.innerHTML=""
  document.querySelector("#categoryheading").innerHTML = `Top Rated Tv-Shows`;
  fetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1" 
      ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showonairtvshows(data.results);
    });
}

function getonairtvshows(){
  movielist.innerHTML=""
  document.querySelector("#categoryheading").innerHTML = `Tv-Shows On Air`;
  fetch(
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1" 
      ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showonairtvshows(data.results);
    });
}
function showonairtvshows(data){
  data.forEach((movie) => {
   
    const movieEl = document.createElement("div");
    movieEl.classList.add("cards");
    movieEl.innerHTML = `<img id="cardposter" src="${
      IMG_URL + movie.poster_path
    }" height="230px"width="150px" onclick= showMsgtv(${movie.id})>
      
      <h4 id="movie-title" onclick= showMsgtv(${movie.id})>${movie.name}</h4>
      <p id="release-date">${movie.first_air_date}</p>
      <div class="rating"> 
        <i class="fa-sharp fa-solid fa-star"></i>
        <div class="green">${movie.vote_average}</div>
      </div> `;

    movielist.appendChild(movieEl);
  });
}
function getAiringTodayTvshows(){
  document.querySelector("#categoryheading").innerHTML = `Tv-Shows Airing Today`;
  movielist.innerHTML=""
  fetch(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1" 
      ,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showonairtvshows(data.results);
    });
}

function showMsg(id) {
  console.log(id);
  document.location = "info.html" + "?id=" + id;
}
function showMsgtv(id) {
  console.log(id);
  document.location = "tv-series-info.html" + "?tvid=" + id;

}
