
// const API_KEY = '427f50ef2e4c506de39f04622b6b6f61';
// const API_URL = 'https://api.themoviedb.org/3';
import {db} from "./firebase.js";

export const image_url = "https://image.tmdb.org/t/p/w500";
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1

// fetch(`${API_URL}/movie/{movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
//
// // Initialize the API request
// fetch(`${API_URL}/movie/550?api_key=${API_KEY}`)
//   .then(response => {
//     // Parse the JSON response
//     return response.json();
//   })
//   .then(data => {
//     // Do something with the data
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle any errors that occur during the request
//     console.error(error);
//   });
// https://api.themoviedb.org/3/search/movie?api_key=427f50ef2e4c506de39f04622b6b6f61&language=en-US&query=irishman&page=1&include_adult=false
export async function searchMovie(keyword) {
const API_KEY = '427f50ef2e4c506de39f04622b6b6f61';
  console.log("title",keyword);

const API_URL = 'https://api.themoviedb.org/3';
await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`)
  .then(response => {
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    console.log("data",data.results[0]);
    sessionStorage.setItem("searched_movies", JSON.stringify(data.results));
    sessionStorage.setItem("searched_movie", JSON.stringify(data.results[0]));
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
  });
}

export async function getRecomends(movie_title) {
  alert("inside");


  await searchMovie(movie_title);
  let mov = JSON.parse(sessionStorage.getItem("searched_movie"));
  console.log("searched_mov", mov.id.toString());

  const API_KEY = '427f50ef2e4c506de39f04622b6b6f61';
  const API_URL = 'https://api.themoviedb.org/3';
  // https://api.themoviedb.org/3/movie/1091795/recommendations?api_key=427f50ef2e4c506de39f04622b6b6f61&language=en-US&page=1
  // https://api.themoviedb.org/3/movie/1091795/similar?api_key=427f50ef2e4c506de39f04622b6b6f61&language=en-US&page=1
  await fetch(`${API_URL}/movie/${mov.id.toString()}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
    .then(response => {
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      console.log("data_rec",data.results);
      sessionStorage.setItem("recommends", JSON.stringify(data.results));
    })
    .catch(error => {
      console.error(error);
    });
}
