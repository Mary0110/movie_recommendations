import {db, getCookie} from "./firebase.js";
import {getFav} from "./fav.js";
import {doc, getDoc, updateDoc, where, query, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js"
class StarRating extends HTMLElement {
  get value() {
    return this.getAttribute('value') || 0;
  }

  set value(val) {
    this.setAttribute('value', val);
  }


  highlight(index) {
    this.stars.forEach((star, i) => {
      if (i <= index) {
        star.style.fontWeight = 900;
      }
      else{
        star.style.fontWeight = 400;
      }
    });
  }

  constructor() {
    super();
    this.stars = [];
    for (let i = 0; i < 10; i++) {
      let s = document.createElement('div');
      s.className = 'image-border-star';
      this.appendChild(s);
      let star = document.createElement('i');
      star.className = 'mystar fa-regular fa-star fa-2xl';

      s.appendChild(star);

      this.stars.push(star);
    }

    this.addEventListener('mousemove', e => {
      let box = this.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);
      // console.log("star",starIndex);
      this.highlight(starIndex);
      this.value = starIndex + 1;
    });
  }
}

async function blur_body() {
  font.classList.toggle("cont");
}

async function pop_up() {
  await blur_body();
  font.insertAdjacentHTML('afterend',`
    <div class="rating-screen" id="rating">
      <figure class="image-border-star-1">
        <img class="star-2" src="img/Vector-3.svg" alt="star" />
      </figure>
      <form class="star-line" id="star_form">
        <div class="header2 inter-medium-white-32px">Rate this movie</div>
        <x-star-rating class = "x-star-rating" value="1" id="starline">
        </x-star-rating>
        <button class="yellow-button inter-bold-black-48px" id="btn" type="submit">Rate</button>
      </form>
    </div>`
    )

  window.customElements.define('x-star-rating', StarRating);
  let rating_screen = document.getElementById("rating");
  let btn = document.getElementById("star_form");
  let starrating = document.getElementById("starline");

  async function WriteRating() {
    console.log("start");

    let value = starrating.value;
    console.log(value);

    let fav = await getFav();
    console.log("fv",fav);
    let cur_movie_id = localStorage.getItem("film_page");

    const docRef =  doc(db, "films", cur_movie_id);
    const docSnap = await getDoc(docRef);
    let voters_num = docSnap.data().voters_num;

    let exists = false;
    for(const elem of fav) {
      // fav.forEach((elem) => {
        if (elem.id === cur_movie_id) {
          let prev_rate = elem.rate;
          console.log("prev r",prev_rate);

          elem.rate = value;
          console.log("elem r",elem.rate);

          exists = true;
          let prev_rating = docSnap.data().rating;
          let new_rating = (prev_rating * voters_num - prev_rate + value) / voters_num;
          console.log("new r", new_rating);

          await updateDoc(docRef, {
            "rating": new_rating
          });
          nums.textContent = new_rating.toString();

        }
      }
    // );
    if (exists === false) {
      fav.push({id: cur_movie_id, rate: value});
      let new_voters_num = docSnap.data().voters_num + 1;
      let prev_rating = docSnap.data().rating;
      let new_rating = (prev_rating*voters_num + value) / new_voters_num ;
      await updateDoc(docRef, {
        "rating": new_rating,
        "voters_num":new_voters_num
      });
      nums.textContent = new_rating.toString();

    }
    console.log("after loop", fav);

    let x = getCookie("username");

    const q = query(collection(db, "users"), where("username", "==", x));
    let userDocId;
    if (!q.empty) {
      const querySnapshot = await getDocs(q);
      const snapshot = querySnapshot.docs[0];
      userDocId = snapshot.id;

    }
    else{
      alert("user not found");
    }
    const userDocRef = doc(db, "users", userDocId.toString());

    await updateDoc(userDocRef, {
      "fav": fav
    });
  }

  btn.addEventListener("submit",  async (e) => {
    e.preventDefault();
    await WriteRating();
    await destroyPopup(rating_screen);
  });
}
async function destroyPopup(popup) {
  popup.parentNode.removeChild(popup);
  await blur_body();
}

// console.log(localStorage.getItem("film_page"));

const docRef =  doc(db, "films", localStorage.getItem("film_page"));

// console.log(docRef);
const docSnap = await getDoc(docRef);
let cur_film = docSnap.data();
// console.log(cur_film.toString());

  let font = document.getElementById("film_main_body");

  let div=document.createElement('div');
  div.className = "film-header";
  font.append(div);

  let title = document.createElement("h1");
  title.className = "title" ;
  title.textContent = cur_film.name.toString();
  div.append(title);

  let corner= document.createElement("div");
  corner.className = "rating_corner" ;
  div.append(corner);

  let star_img1 = document.createElement("img");
  star_img1.className ="yellow_star";
  star_img1.src = "img/Vector-2.svg";
  corner.append(star_img1) ;

  let nums = document.createElement("div");
  nums.className = "rating_num inter-medium-white-32px";
  nums.textContent = cur_film.rating.toString();
  corner.append(nums);

  let star_img2 = document.createElement("img");
  star_img2.className ="blue_star";
  star_img2.src = "img/Vector-3.svg";
  corner.append(star_img2);

  let star_rate = document.createElement("button");
  star_rate.className ="rate";
  star_rate.textContent = "Rate";

  star_rate.addEventListener("click", await pop_up);
  corner.append(star_rate);

  let datetime = document.createElement("ul");
  datetime.className = "num-list";
  font.append(datetime);

  let li1 = document.createElement("li");
  li1.className ="datetime";
  li1.textContent = cur_film.year.toString();
  datetime.append(li1);

  let li2 = document.createElement("li");
  li2.className ="datetime";
  li2.textContent = cur_film.duration.toString();
  datetime.append(li2);

  let poster_video = document.createElement("div");
  poster_video.className ="poster_video";
  font.append(poster_video);

  let image_border = document.createElement("figure");
  image_border.className ="image_border";
  poster_video.append(image_border);

  let poster_img = document.createElement("img");
  poster_img.className ="poster";
  poster_img.src = cur_film.src.toString();
  image_border.append(poster_img);

  let video = document.createElement("iframe");
  video.className ="video";
  video.src = cur_film.v_src.toString();
  poster_video.append(video);

  let genres = document.createElement("div");
  div.className ="genre_cont";
  font.append(genres);
  //
  let genre_o = document.createElement("div");
  genre_o.className ="genre_oval";
  genres.append(genre_o) ;
  //
  let genre = document.createElement("p");
  genre.className ="genre inter-normal-cultured-pearl-24px";
  genre.textContent = cur_film.genre.genre1.toString();
  genre_o.append(genre);


  let ppl_list = document.createElement("ul");
  ppl_list.className ="list-small inter-normal-white-14px";
  font.append(ppl_list);

  let line = document.createElement("li");
  line.className ="people_line";
  ppl_list.append(line);

  let line_h = document.createElement("p");
  line_h.className ="director  inter-medium-white-32px";
  line_h.textContent = "Director";
  line.append(line_h);

  let dir_list = document.createElement("ul");
  line.append(dir_list);

  let dir = document.createElement("li");
  dir.className ="director-1 inter-bold-cornflower-blue-24px";
  dir.textContent = cur_film.director.toString();
  dir_list.append(dir);


let line2 = document.createElement("li");
line2.className ="people_line";
ppl_list.append(line2);

let line_h2 = document.createElement("p");
line_h2.className ="director  inter-medium-white-32px";
line_h2.textContent = "Writer";
line2.append(line_h2);

let dir_list2 = document.createElement("ul");
line2.append(dir_list2);

let dir2 = document.createElement("li");
dir2.className ="director-1 inter-bold-cornflower-blue-24px";
dir2.textContent = cur_film.writer.toString();
dir_list2.append(dir2);


let line3 = document.createElement("li");
line3.className ="people_line";
ppl_list.append(line3);

let line_h3 = document.createElement("p");
line_h3.className ="director  inter-medium-white-32px";
line_h3.textContent = "Stars";
line3.append(line_h3);

let dir_list3 = document.createElement("ul");
line3.append(dir_list3);

let dir3 = document.createElement("li");
dir3.className ="director-1 inter-bold-cornflower-blue-24px";
dir3.textContent = cur_film.stars.star1.toString();
dir_list3.append(dir3);



