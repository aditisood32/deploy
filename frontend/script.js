const API = "https://deploy-3-bbit.onrender.com/api/auth";

// REGISTER
async function register(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch(API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

});

const data = await res.json();

alert(data.msg);

if(res.ok){
window.location.href="index.html";
}

}


// LOGIN
async function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch(API + "/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data = await res.json();

if(res.ok){

localStorage.setItem("token",data.token);

window.location.href="dashboard.html";

}else{

alert(data.msg);

}

}