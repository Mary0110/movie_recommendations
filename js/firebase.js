// Import the functions you need from the SDKs you need
// import {getDatabase,ref,child, get,set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
// import initializeApp from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// import {initializeApp} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// import { getAuth , onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// import {getDatabase,ref,child, get,set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// import { getFirestore } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyCdOBp9r10_6TvNYIH8rQwBQAOe8HhuIKA",
  authDomain: "filmdb-1c7cc.firebaseapp.com",
  projectId: "filmdb-1c7cc",
  storageBucket: "filmdb-1c7cc.appspot.com",
  messagingSenderId: "808463685852",
  appId: "1:808463685852:web:4085abafcb78d8b951bc19",
  measurementId: "G-7GSF2F2RL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
// export default {
//    db
// }
export function getCookie(name) {
  const cookies = document.cookie.split(';');
  // window.alert(cookies);
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // window.alert(cookie);
    if (cookie.startsWith(name + '=')) {

      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function getCookieContent(name) {
  const cookies = document.cookie.split(';');
  // window.alert(cookies);
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // window.alert(cookie);
    if (cookie.startsWith(name + '=')) {

      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

export function register(email, password){
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      document.cookie = "uid" + "=" + user.uid;
      document.cookie = "username" + "=" + email.split("@")[0];
      try {
        const dbRef = await addDoc(collection(db, "users"), {
          email: email,
          username: email.split("@")[0],
          fav: [
            {id:"z0ap6hKVseFIl9kSPsfw", rate: 3},
            {id:"z0ap6hKVseFIl9kSPsfw", rate: 4}]
        });
        console.log("Document written with ID: ", dbRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      window.location.href = "profile.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage);
    });
}

export function authorize(email,password){
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      document.cookie = "uid" + "=" + user.uid;
      document.cookie="username"+"="+email.split("@")[0];
      window.location.href="profile.html";
    })
    .catch((error) => {
      window.alert("Wrong email or password. Please, try again. ");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
// export const database = getDatabase(app);
// export const dbRef = ref(database);

// try {
//   const dbRef = await addDoc(collection(db, "films"), {
//     name: "The Godfather",
//     rating:10,
//     src:"img/bl.svg",
//     year:1998,
//     duration: "1h29m",
//     genre: {
//       genre1:"Criminal",
//       genre2:"Drama"
//     },
//     director:"Etan Coen",
//     description: "asdfghjkl",
//     v_src: 'https://www.youtube.com/embed/VDvfFIZQIuQ?start=10',
//     writer: "Writer",
//     stars:{
//       star1:"Star1",
//       star2:"Star2"
//     },
//   });
//   console.log("Document written with ID: ", dbRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


// try {
//   const dbRef = await addDoc(collection(db, "films"), {
//     name: "Triangle of sadness",
//     rating:7,
//     src:"img/tr.jpeg",
//     year:2022,
//     duration: "1h30m",
//     genre: {
//       genre1:"Drama"
//     },
//     director:"Director",
//     description: "asdfghjkl",
//     v_src: 'https://www.youtube.com/embed/VDvfFIZQIuQ?start=10',
//     writer: "Writer1",
//     stars:{
//       star1:"Star1",
//       star2:"Star2"
//     },
//   });
//   console.log("Document written with ID: ", dbRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// try {
//   const dbRef = await addDoc(collection(db, "films"), {
//     name: "Forest Gump",
//     rating:9,
//     src:"img/fg.jpg",
//     year:1999,
//     duration: "1h35m",
//     genre: {
//       genre1:"Drama"
//     },
//     director:"Director2",
//     description: "asdfghjklxdcfvgbjkxx vbjkl,jmnbvcxxc vbj",
//     v_src: 'https://www.youtube.com/embed/VDvfFIZQIuQ?start=10',
//     writer: "Writer2",
//     stars:{
//       star1:"Star11",
//       star2:"Star21"
//     },
//   });
//   console.log("Document written with ID: ", dbRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
// try {
//   const dbRef = await addDoc(collection(db, "films"), {
//     name: "Irishman",
//     rating:7.8,
//     src:"img/ir.jpg",
//     year:2018,
//     duration: "2h40m",
//     genre: {
//       genre1:"Drama"
//     },
//     director:"Director2",
//     description: "xcvbnmasdfghjklxdcfvgbjkxx vbjkl,jmnbvcxxc vbj",
//     v_src: 'https://www.youtube.com/embed/VDvfFIZQIuQ?start=10',
//     writer: "Writer23",
//     stars:{
//       star1:"Star113",
//       star2:"Star213"
//     },
//   });
//   console.log("Document written with ID: ", dbRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
