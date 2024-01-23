const IMG_URL = "https://www.themoviedb.org/t/p/w500";
const movieListDiv = document.getElementById('movie-list');


const background_url =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";

function showMsg(id){

    document.location="info.html"+"?id="+id;

}

let arr = JSON.parse(localStorage.getItem('watchList'));
function createCardPoster(imageSrc, movieId, movieTitle, releaseDate) {
    const onMovieClick = () => {
        document.location="info.html"+"?id="+id;

    }
    const cardPosterDiv = document.createElement('div');
    cardPosterDiv.className='cards';
    const movieImg = document.createElement('img');
    movieImg.class = 'cardposter';
    movieImg.src = imageSrc;
    movieImg.width = 200;
    movieImg.height = 300;
    movieImg.addEventListener('click', onMovieClick);
    cardPosterDiv.appendChild(movieImg);
    const movieTitleElement = document.createElement('h4');
    movieTitleElement.id = 'movie-title';
    movieTitleElement.textContent = movieTitle;
    movieTitleElement.addEventListener('click', onMovieClick);
    cardPosterDiv.appendChild(movieTitleElement);
    const releaseDateElement = document.createElement('p');
    releaseDateElement.id = 'release-date';
    releaseDateElement.textContent = releaseDate;
    cardPosterDiv.appendChild(releaseDateElement);
    return cardPosterDiv;
}

arr.forEach(movieId =>{
    fetch (
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US` +
          "&api_key=c2acc63ab506a73d86f65c980a09f70e",
        {
          headers: {
            Authorization: "Bearer c2acc63ab506a73d86f65c980a09f70e",
            accept: "application/json",
          },
        }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        movieListDiv.appendChild(createCardPoster(
            "https://www.themoviedb.org/t/p/w500" + data.poster_path,
            movieId,
            data.title,
            data.release_date
        ))
    });
})
let arr2 = JSON.parse(localStorage.getItem('tvwatchList'));
function createtvCardPoster(tvimageSrc, tvId, tvTitle, tvreleaseDate) {
    const onMovieClick = () => {
        document.location="info.html"+"?id="+id;

    }
    const cardPosterDiv = document.createElement('div');
    cardPosterDiv.className='cards';
    const tvImg = document.createElement('img');
    tvImg.class = 'cardposter';
    tvImg.src = tvimageSrc;
    tvImg.width = 200;
    tvImg.height = 300;
    tvImg.addEventListener('click', onMovieClick);
    cardPosterDiv.appendChild(tvImg);
    const tvTitleElement = document.createElement('h4');
    tvTitleElement.id = 'movie-title';
    tvTitleElement.textContent = tvTitle;
    tvTitleElement.addEventListener('click', onMovieClick);
    cardPosterDiv.appendChild(tvTitleElement);
    const releaseDateElement = document.createElement('p');
    releaseDateElement.id = 'release-date';
    releaseDateElement.textContent = tvreleaseDate;
    cardPosterDiv.appendChild(releaseDateElement);
    return cardPosterDiv;
}

arr2.forEach(tvId =>{
    fetch (
        `https://api.themoviedb.org/3/tv/${tvId}?language=en-US` +
          "&api_key=c2acc63ab506a73d86f65c980a09f70e",
        {
          headers: {
            Authorization: "Bearer c2acc63ab506a73d86f65c980a09f70e",
            accept: "application/json",
          },
        }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        movieListDiv.appendChild(createtvCardPoster(
            "https://www.themoviedb.org/t/p/w500" + data.poster_path,
            tvId,
            data.name,
            data.first_air_date
        ))
    });
})









