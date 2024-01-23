const Base_IMG_URL = "https://media.themoviedb.org/t/p/w235_and_h235_face";
const movielist = document.getElementById("movie-list");

getpeople();
function getpeople() {
  movielist.innerHTML = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmFjYzYzYWI1MDZhNzNkODZmNjVjOTgwYTA5ZjcwZSIsInN1YiI6IjY1Nzk4MDAyNTY0ZWM3MDExYjIwZjExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFlX0iH45_bsf-_aJNgkQNylDcBSL1Nd3xPOSO_wT9I",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      showpopularpeople(data.results);
    });
}
function showpopularpeople(data) {
  data.forEach((p) => {
    const people = document.createElement("div");
    people.classList.add("peoplecards");
    people.innerHTML = `<img id="cardposter" src="${
      Base_IMG_URL + p.profile_path
    }" height="235px"width="235px">
      
    <h4 id="movie-title">${p.name}</h4>
    `;
    movielist.appendChild(people);
  });
}
