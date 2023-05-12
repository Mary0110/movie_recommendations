import {db, getCookie} from "./firebase.js";
import {collection, getDocs, query, where} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

await AddElems();
async function Count() {
  let x = getCookie("username");

  const q = query(collection(db, "users"), where("username", "==", x));
  if (!q.empty) {
    const querySnapshot = await getDocs(q);
    const snapshot = querySnapshot.docs[0] ;
    return snapshot.data().fav.length;
  }
  else{
    console.log("empty");
  }
}

async function AddElems(){

  let count = await Count();
  document.getElementById('sign_out').onclick = function(e) {
    document.cookie = "uid" + "=" + "";
    document.cookie="username"+"="+"";
  };

  let user_info = document.getElementById("user_info");
  let username = document.createElement('p');
  username.className = "label-for-input inter-bold-black-20px";
  username.textContent = "User: " + getCookie("username");
  user_info.append(username);

  let num_of_fav = document.createElement('p');
  num_of_fav.className = "label-for-input inter-bold-black-20px";


  num_of_fav.textContent ="Number of rated movies: "+count.toString();
  user_info.append(num_of_fav);

}
