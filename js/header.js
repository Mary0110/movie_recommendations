import {getCookie} from "./firebase.js"
import {searchMovie} from "./api.js";
// import{searchMovie} from "./api.js";
// <
// div
// className = "logo" >
//   < a
// className = "film-db"
// href = "main_page.html" > FilmDb < /a>
// </div>
// <label>
//   <input className="search" id="search_input" onKeyUp="myFunction()">
// </label>
// <div className="nav_right" id="header-right">
//   <!--    <a class= "your-ratings inter-bold-white-16px" href="fav.html">Your ratings</a>-->
//   <!--    <a class="your-ratings inter-bold-white-16px" href="sign_in.html">Sign in</a>-->
// </div>
let body = document.getElementById('header_body');
let logo=document.createElement('div');
logo.className="logo";
body.append(logo);

let fdb=document.createElement('a');
fdb.className="film-db";
fdb.textContent = "FilmDb";
fdb.href="main_page.html";
logo.append(fdb);

let lbl=document.createElement('label');
body.append(lbl);

// let input=document.createElement('input');
// input.className="search";

// input.addEventListener("keyup", async function(event){
//   event.preventDefault();
//   if (event.code === 'Enter') {
//     console.log("helo");
//     let keyword = input.value;
//     await searchMovie(keyword);
//     console.log(sessionStorage.getItem("searched_movies"));
//   }
// });
// lbl.append(input);

let header_right=document.createElement('div');
header_right.className="nav_right";
body.append(header_right);

if(getCookie("uid")){
  let user=document.createElement('a');
  user.className="your-ratings inter-bold-white-16px";
  user.textContent="profile";
  user.href = "profile.html";
  // console.log(header_right.className);

  header_right.append(user);

  let my_favs=document.createElement('a');
  my_favs.className="your-ratings inter-bold-white-16px";
  my_favs.textContent="My list";
  my_favs.href="fav.html";
  header_right.append(my_favs);

}else{
  // let header_right = document.getElementById('header-right');
  let sign=document.createElement('a');
  sign.className="your-ratings inter-bold-white-16px";
  sign.textContent="sign in";
  sign.href = "sign_in_or_sign_up.html";
  header_right.append(sign);
}


// document.querySelector('.buttons_sign').onclick = function(e) {
//   document.cookie = "uid" + "=" + "";
//   document.cookie="username"+"="+"";
// };
