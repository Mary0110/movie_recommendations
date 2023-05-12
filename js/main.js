import { doc, getDocs, getDoc, collection } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {db, getCookie} from "./firebase.js";
import {getRecomends, image_url} from "./api.js";
import {getFav} from "./fav.js";


let carousel = document.getElementById("k");

// if(getCookie("uid")) {
//   const querySnapshot = await getDocs(collection(db, "films"));
//
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data().name.toString());
//
//     function setFilm() {
//       localStorage.setItem("film_page", doc.id);
//       console.log("chosen item");
//     }
//
//     let tmp = doc.data();
//
//     let li = document.createElement('li');
//     li.className = "main-li";
//
//     let a = document.createElement("a");
//     a.className = "carousel_item";
//     a.href = "index.html";
//     a.addEventListener("click", setFilm);
//     li.append(a);
//
//     let figure = document.createElement("figure");
//     figure.className = "image_border";
//     a.append(figure);
//
//     let img = document.createElement("img");
//     img.className = "image-4";
//     img.src = tmp.src.toString();
//     figure.append(img);
//
//     let over = document.createElement("div");
//     over.className = "overlap-group";
//     a.append(over);
//
//     let p = document.createElement("p");
//     p.className = "top-pics inter-bold-white-20px";
//     p.textContent = tmp.name.toString();
//     over.append(p);
//
//     let item = document.createElement("div");
//     item.className = "item_star";
//     over.append(item);
//
//     let star = document.createElement("figure");
//     star.className = "star";
//     item.append(star);
//     //
//     let vector = document.createElement("img");
//     vector.className = "vector";
//     vector.src = "img/Vector-2.svg";
//     star.append(vector);
//     //
//     let div2 = document.createElement("div");
//     item.append(div2);
//
//     let text = document.createElement("p");
//     text.className = "text inter-normal-white-20px";
//     text.textContent = tmp.rating.toString();
//     div2.append(text);
//     //
//
//     // carousel.className = "overlap-group-container";
//     carousel.append(li);
//
//   });
// }
// else{
//   let arr = sessionStorage.getItem("searched_movies");
//
//
//   for(let tmp of arr) {
//     let li = document.createElement('li');
//     li.className = "main-li";
//
//     let a = document.createElement("div");
//     a.className = "carousel_item";
//     li.append(a);
//
//     let figure = document.createElement("figure");
//     figure.className = "image_border";
//     a.append(figure);
//
//     let img = document.createElement("img");
//     img.className = "image-4";
//     img.src = image_url+tmp.poster_path;
//     figure.append(img);
//
//     let over = document.createElement("div");
//     over.className = "overlap-group";
//     a.append(over);
//
//     let p = document.createElement("p");
//     p.className = "top-pics inter-bold-white-20px";
//     p.textContent = tmp.title.toString();
//     over.append(p);
//
//     let item = document.createElement("div");
//     item.className = "item_star";
//     over.append(item);
//
//     let star = document.createElement("figure");
//     star.className = "star";
//     item.append(star);
//     //
//     let vector = document.createElement("img");
//     vector.className = "vector";
//     vector.src = "img/Vector-2.svg";
//     star.append(vector);
//     //
//     let div2 = document.createElement("div");
//     item.append(div2);
//
//     let text = document.createElement("p");
//     text.className = "text inter-normal-white-20px";
//     text.textContent = tmp.popularity.toString();
//     div2.append(text);
//     //
//
//     // carousel.className = "overlap-group-container";
//     carousel.append(li);
//   }
// }

if(getCookie("uid")) {
  let fav_list = await getFav();

  function selectMovie() {
    let fav;
    let rate = 0;
    fav_list.forEach((movie) => {
      if (+movie.rate > rate) {
        fav = movie;
        rate = +movie.rate;
      }
    });
    return fav;
  }

  let best = selectMovie();
  console.log("best", best.rate.toString());
  console.log("best", best.id.toString());

  const docRef = doc(db, "films", best.id);
  const docSnap = await getDoc(docRef);
  let best_mo = docSnap.data();
  console.log("besttitle", best_mo.name.toString());
  await getRecomends(best_mo.name.toString());

  let mov = JSON.parse(sessionStorage.getItem("recommends"));
  mov.forEach((tmp) => {
    let li = document.createElement('li');
    li.className = "main-li";

    let a = document.createElement("div");
    a.className = "carousel_item";
    li.append(a);

    let figure = document.createElement("figure");
    figure.className = "image_border";
    a.append(figure);

    let img = document.createElement("img");
    img.className = "image-4";
    img.src = image_url + tmp.poster_path.toString();
    figure.append(img);

    let over = document.createElement("div");
    over.className = "overlap-group";
    a.append(over);

    let p = document.createElement("p");
    p.className = "top-pics inter-bold-white-20px";
    p.textContent = tmp.title.toString();
    over.append(p);

    let item = document.createElement("div");
    item.className = "item_star";
    over.append(item);

    let star = document.createElement("figure");
    star.className = "star";
    item.append(star);
    //
    let vector = document.createElement("img");
    vector.className = "vector";
    vector.src = "img/Vector-2.svg";
    star.append(vector);
    //
    let div2 = document.createElement("div");
    item.append(div2);

    let text = document.createElement("p");
    text.className = "text inter-normal-white-20px";
    text.textContent = tmp.vote_average.toString();
    div2.append(text);
    //

    // carousel.className = "overlap-group-container";
    carousel.append(li);

  });
}
else{
  const querySnapshot = await getDocs(collection(db, "films"));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data().name.toString());

    function setFilm() {
      localStorage.setItem("film_page", doc.id);
      console.log("chosen item");
    }

    let tmp = doc.data();

    let li = document.createElement('li');
    li.className = "main-li";

    let a = document.createElement("a");
    a.className = "carousel_item";
    a.href = "index.html";
    a.addEventListener("click", setFilm);
    li.append(a);

    let figure = document.createElement("figure");
    figure.className = "image_border";
    a.append(figure);

    let img = document.createElement("img");
    img.className = "image-4";
    img.src = tmp.src.toString();
    figure.append(img);

    let over = document.createElement("div");
    over.className = "overlap-group";
    a.append(over);

    let p = document.createElement("p");
    p.className = "top-pics inter-bold-white-20px";
    p.textContent = tmp.name.toString();
    over.append(p);

    let item = document.createElement("div");
    item.className = "item_star";
    over.append(item);

    let star = document.createElement("figure");
    star.className = "star";
    item.append(star);
    //
    let vector = document.createElement("img");
    vector.className = "vector";
    vector.src = "img/Vector-2.svg";
    star.append(vector);
    //
    let div2 = document.createElement("div");
    item.append(div2);

    let text = document.createElement("p");
    text.className = "text inter-normal-white-20px";
    text.textContent = tmp.rating.toString();
    div2.append(text);
    carousel.append(li);

  });
}

