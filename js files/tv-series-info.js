const main = document.getElementById("main");
const API_KEY = "api_key=c2acc63ab506a73d86f65c980a09f70e";
const Base_URL = "https://www.themoviedb.org";
const API_URL = Base_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const tvId = new URLSearchParams(window.location.search).get("tvid");

const background_url =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";

// function showMsg(id){

//     document.location="info.html"+"?id="+id;

// }
getmovies();

//https://api.themoviedb.org/3/movie/906126?language=en-US&api_key=c2acc63ab506a73d86f65c980a09f70e

function getmovies() {
  main.innerHTML = "";
  fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?language=en-US` +
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

// .then((res) => res.json())
// .then((data) => {
//   console.log(data.results);
//   showmovies(data.results);

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
                    <h1>${data.name}</h1>
                    <div id="x">
                    <div id="watchlist">
                    <i class="fa-regular fa-bookmark" onclick="tvwatchList(this)"></i></div>
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

  const tvwatchListedMovies = localStorage.getItem('tvwatchList');
    if (tvwatchListedMovies != null && tvwatchListedMovies.includes(tvId)) {
  document.querySelector('#watchlist > i').classList.replace('fa-regular', 'fa-solid');
    }


  
};



function tvwatchList(elem) {
  let tvwatchList = JSON.parse(localStorage.getItem('tvwatchList'));
  if (tvwatchList == null) tvwatchList = [];
  const movieIndex = tvwatchList.indexOf(tvId);
  if (movieIndex != -1) {
    tvwatchList.splice(movieIndex, 1);
    elem.classList.replace('fa-solid', 'fa-regular');
  } else {
    tvwatchList.push(tvId);
    elem.classList.replace('fa-regular', 'fa-solid');
  }
  localStorage.setItem('tvwatchList', JSON.stringify(tvwatchList));
}


function openNav() {
  document.getElementById("myNav").style.width = "100%";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I'
    }
  };

  
  fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(data=>{
      const videosarray=data.results
      const lastVideo = videosarray[videosarray.length - 1];
      console.log(lastVideo);
      showvideo(lastVideo)
     
     
    })
  }

      // videodata.results.forEach(video=>{
      //   // if(video.type=="Trailer"){
      //     var embed=[];
      //     embed.push(`
          
      // <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}"
      //  title="${video.name}" frameborder="0" 
      //  allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
      //  gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      //     `)
      //   }
      // })
    showvideo=(video)=>{
      const overlay =document.getElementById("myNav")
      const overlayEl=document.createElement("div")
      overlayEl.classList.add('video')
      overlayEl.innerHTML=
      `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${video.key}"
      //  title="${video.name}" frameborder="0" 
      //  allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
      //  gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      overlay.appendChild(overlayEl);
      function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        overlay.innerHTML=''
      }
      }
    
    
    
  


// /* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  
}