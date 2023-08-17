

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit",handleLogin);



function handleLogin(event){
		event.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

const user={
	email,
	password
};

fetch('http://localhost:8080/api/v1/users/login',{
	method:'POST',
	headers:{
		'Content-Type': 'application/json'
	},
	body:JSON.stringify(user)
}).then(res=>{
	if(!res.ok){
		alert('Something is wrong!!');
	};
	return res.json();
}).then(res=>{
	
	localStorage.setItem('connectedUser',JSON.stringify(res));
	window.location.href = "index.html";
}).catch(err=>{
	console.log('post req err',err);
});
};










