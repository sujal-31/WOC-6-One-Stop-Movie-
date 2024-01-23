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

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
var selectedGenre = [];
setGenre();
getmoviesAccordingtoGenres();

function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("genretag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
        t.style.backgroundColor="#6cd591"
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
              t.style.backgroundColor="white"
            }
          });
        } else {
          selectedGenre.push(genre.id);
          t.style.backgroundColor="#6cd591"
        }
      }
      console.log(selectedGenre);
      getmoviesAccordingtoGenres();
    
     
    });
    tagsEl.append(t);
  });
}

function getmoviesAccordingtoGenres(){
    movielist.innerHTML=""
       fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres='+
       selectedGenre.join(","), options)
        .then(response => response.json())
        .then(response => {console.log(response.results),
            showmoviesAccordingtoGenres(response.results)})
     
        
}
function showmoviesAccordingtoGenres(data){
data.forEach((movie)=>{
    
    const movieEl=document.createElement('div')
    movieEl.classList.add('cards')
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
})
}


function showMsg(id) {
  console.log("hello", id);
  document.location = "info.html" + "?id=" + id;
}
