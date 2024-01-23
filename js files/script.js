// JSON is an open standard file format and data interchange
//  format that uses human-readable text to store and transmit data objects
//   consisting of attribute–value pairs and arrays. It is a common data format
//   with diverse uses in electronic data interchange, including that of web applications
//   with servers.

const API_KEY = "api_key=c2acc63ab506a73d86f65c980a09f70e";
const Base_URL = "https://www.themoviedb.org";
const API_URL = Base_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const background_url="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"
const main = document.getElementById("main");
const form = document.getElementsByClassName("search-form");
const search = document.getElementById("searchtext");
const searchURL = Base_URL + "/search/movie?" + API_KEY;
const tagsEl = document.getElementById("tags");
const searchTerm = search.value;

// const urlParams = new URLSearchParams(window.location.search);

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
// // setGenre();
// getmovies(API_URL + '&with_genres='+encodeURI(selectedGenre))
// function setGenre(){
//     // tagsEl.innerHTML='';
//     genres.forEach(genre=>{
//         const t = document.createElement('div');
//         t.classList.add('tag');
//         t.id=genre.id;
//         t.innerText=genre.name;
//         t.addEventListener('click',()=>{
//             if(selectedGenre.length == 0){
//                 selectedGenre.push(genre.id);
//             }else{
//                 if(selectedGenre.includes(genre.id)){
//                 selectedGenre.forEach((id,idx)=>{
//                     if(id==genre.id){
//                         selectedGenre.splice(idx,1);
//                     }
//             })
//         }else{
//                 selectedGenre.push(genre.id);
//             }
//         }
//         console.log(selectedGenre)
//         getmovies(API_URL + '&with_genres='+encodeURI(selectedGenre))

//     })
//     //  tagsEl.append(t);
// })

// }

getmovies();

function getmovies() {
  main.innerHTML = "";
  fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=" +
      selectedGenre.join(","),
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
      showmovies(data.results);
    });
}

function showmovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `<img src="${
      IMG_URL + movie.poster_path
    }" height="300px"width="300px">
            <div class="movieinfo">
               <h3 onclick= showMsg(${movie.id})>${movie.title}</h3>
                <span class="green">${movie.vote_average}</span>
        
            </div>
            

        </div>`;
 const movieId=console.log(movie.id)
    main.appendChild(movieEl);
  });
}

getsearchmovies();

function getsearchmovies() {
  main.innerHTML = "";
  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      search.value +
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

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  // setGenre();
  if (searchTerm) {
    getsearchmovies();
  } else {
    getmovies();
  }
});

function showsearchmovies(data) {
  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = ` <img src="${
      IMG_URL + movie.poster_path
    }" height="300px"width="300px">
                <div class="movieinfo">
                    <h3 onclick= showMsg(${movie.id})>${movie.title}</h3>
                    <span class="green">${movie.vote_average}</span>
            
                </div>
                
    
            </div>`;
    console.log(movie.id)
    main.appendChild(movieEl);
  });
  
}

// document.getElementById("login-redirect").addEventListener("click",function(){
//     window.location.assign=("www.google.com")
// })
function showMsg(id){
  console.log("hello",id)
  document.location="info.html"+"?id="+id;

  const searchParams = (window.location.search);
  console.log(searchParams.get())

  for (const p of searchParams) {
    console.log(p);
  }

  console.log(searchParams.get(id))
}





