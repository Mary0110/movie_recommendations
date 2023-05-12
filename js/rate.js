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
      this.value = starIndex;
    });
}
}

// await window.customElements.define('x-star-rating', StarRating);

