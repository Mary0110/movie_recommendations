// const db = getFirestore(app);
//
//
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
