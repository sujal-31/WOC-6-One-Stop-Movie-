const main = document.getElementById("main");
const API_KEY = "api_key=c2acc63ab506a73d86f65c980a09f70e";
const Base_URL = "https://www.themoviedb.org";
const API_URL = Base_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const movieId = new URLSearchParams(window.location.search).get("id");
const background_url =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";


getmovies();

function getmovies() {
  main.innerHTML = "";
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US` +
      "&api_key=c2acc63ab506a73d86f65c980a09f70e",
    {
      headers: {
        Authorization: "Bearer c2acc63ab506a73d86f65c980a09f70e",
        accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showmovies(data);
    });
}

showmovies = (data) => {
  const movieEl = document.createElement("div");
  movieEl.classList.add("movie");
  movieEl.innerHTML = `
<div id="main" style= "background-image:linear-gradient(
    to right,
    rgba(5, 218, 151, 0.925)0%,
    rgba(242, 246, 250, 0)100%
    
), url('${background_url + data.backdrop_path}');">

    <div class="movie"
        <section id="box-content">
            <div id="img">
            <img src="${
              IMG_URL + data.poster_path
            }" height="510px" width="300px">
            <div id="overviewbox">
                <div id="heading">
                    <h1>${data.original_title}</h1>
                    
                    <h5>Release Date-${data.release_date}</h5>
                    <div id="x">
                    <div id="watchlist">
                    <i class="fa-regular fa-bookmark" onclick="watchlist(this)"></i></div>
                  <div class="ratingbox">
                    <div class="stars">
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                      <i class="fa-sharp fa-solid fa-star"></i>
                    </div>
                  </div>
                  
                  <i class="fa-solid fa-play"></i>
                  <h3 id="trailerheading" onclick="openNav()">Watch Trailer</h3>
                    </div>
                    <h4>${data.tagline}</h4>
                    <h2>Overview</h2>
                    <h3>${data.overview}</h3>
                </div>    
                    
            </div>
            </div>
        </section>
    </div>    
        
</div>    
 `;

  main.appendChild(movieEl);

  const watchListedMovies = localStorage.getItem("watchList");
  if (watchListedMovies != null && watchListedMovies.includes(movieId)) {
    document
      .querySelector("#watchlist > i")
      .classList.replace("fa-regular", "fa-solid");
  }

  let stars = document.querySelectorAll(".stars > i");
  const movieRatings = JSON.parse(localStorage.getItem("ratingMap")) || {};
  const currentRating = movieRatings[movieId];
  for (let i = 0; i < currentRating; ++i)
    stars[i].style.color = "yellow";
  stars.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      let i = 0;
      while (i <= index) {
        stars[i].style.color = "yellow";
        ++i;
        console.log(index);
      }
      while (i < stars.length) {
        stars[i].style.color = "white";
        ++i;
      }
      movieRatings[movieId] = index + 1;
      localStorage.setItem("ratingMap", JSON.stringify(movieRatings));
    });
  });
};

function watchlist(elem) {
  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
  const movieIndex = watchList.indexOf(movieId);
  if (movieIndex != -1) {
    watchList.splice(movieIndex, 1);
    elem.classList.replace("fa-solid", "fa-regular");
  } else {
    watchList.push(movieId);
    elem.classList.replace("fa-regular", "fa-solid");
  }
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

function rating(elem) {
  let watchList = JSON.parse(localStorage.getItem("watchList"));
  if (watchList == null) watchList = [];
  const movieIndex = watchList.indexOf(movieId);
  if (movieIndex != -1) {
    watchList.splice(movieIndex, 1);
    elem.classList.replace("fa-solid", "fa-regular");
  } else {
    watchList.push(movieId);
    elem.classList.replace("fa-regular", "fa-solid");
  }
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const videosarray = data.results;
      const lastVideo = videosarray[videosarray.length - 1];
      console.log(lastVideo);
      showvideo(lastVideo);
    });
}

showvideo = (video) => {
  const overlay = document.getElementById("myNav");
  const overlayEl = document.createElement("div");
  overlayEl.classList.add("video");
  overlayEl.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.key}"
      //  title="${video.name}" frameborder="0" 
      //  allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
      //  gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  overlay.appendChild(overlayEl);
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    overlay.innerHTML = "";
  }
};

// /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
