import {register} from './firebase.js'

const authForm = document.getElementById('authForm');
authForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  const password2 = document.getElementById('repeatpass').value;
  if (password.value !== password2.value) {
    alert("Passwords don't match");
    password.value = "";
    password2.value = "";
    return;
  }
  register(email,password, password2);

});
