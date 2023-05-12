import {db, getCookie} from "./firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

export async function getFav() {
  let x = getCookie("username");
  const q = query(collection(db, "users"), where("username", "==", x));
  if (!q.empty) {
    const querySnapshot = await getDocs(q);
    const snapshot = querySnapshot.docs[0];
    // console.log(snapshot.data().fav);
    return snapshot.data().fav;
  }
}

let fav_list = await getFav();
let font = document.getElementById("grey-font");

fav_list.forEach(async(movie) => {
  console.log("id");
  let id = movie.id.toString();
  console.log("id=", id);
  function setFilm() {
    localStorage.setItem("film_page", id);
    console.log("chosen item");
  }

  const docRef = doc(db, "films", id);
  const docSnap = await getDoc(docRef);
  let tmp = docSnap.data();
  console.log(tmp.toString());
  let li = document.createElement('li');
  li.className = "film-description";

  let figure = document.createElement("figure");
  figure.className = "small-image-border";
  li.append(figure);

  let img = document.createElement("img");
  img.className = "fav_img";
  img.src = tmp.src.toString();
  figure.append(img);

  let over = document.createElement("div");
  over.className = "film-block";
  li.append(over);

  let ha = document.createElement("a");
  ha.className = "header23 inter-bold-white-32px";
  ha.textContent = tmp.name.toString();
  ha.addEventListener("click",  setFilm);

  ha.href = "index.html";
  over.append(ha);

  let ul = document.createElement("ul");
  ul.className = "list-small inter-normal-white-14px";
  over.append(ul);

  let li1 = document.createElement("li");
  li1.className = "datetime";
  li1.textContent = tmp.year.toString();
  ul.append(li1);

  let li2 = document.createElement("li");
  li2.className = "datetime";
  li2.textContent = tmp.duration.toString();
  ul.append(li2);

  let li3 = document.createElement("li");
  li3.className = "datetime";
  li3.textContent = tmp.genre.genre1.toString();
  ul.append(li3);

  let div_star = document.createElement("div");
  div_star.className = "item_star";
  over.append(div_star);

  let star_fav = document.createElement("figure");
  star_fav.className = "star";
  div_star.append(star_fav);
  //
  let star_img = document.createElement("img");
  star_img.className = "vector";
  star_img.src = "img/Vector-2.svg";
  div_star.append(star_img);
  //
  let div2 = document.createElement("div");
  div_star.append(div2);

  let text = document.createElement("p");
  text.className = "text inter-normal-white-20px";
  text.textContent = movie.rate.toString();
  div2.append(text);

  let ul2 = document.createElement("ul");
  ul2.className = "list-small inter-normal-white-14px";
  over.append(ul2);

  let li4 = document.createElement("li");
  li4.className = "datetime";
  li4.textContent = movie.director;
  ul2.append(li4);

  let article = document.createElement("article");
  article.className = "article inter-normal-white-14px";
  article.textContent = tmp.description;
  over.append(article);
  if (font !== null) {
    font.append(li);
  }
})
