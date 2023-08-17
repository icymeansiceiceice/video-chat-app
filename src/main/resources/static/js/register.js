const registerForm = document.getElementById('registrationForm');
registerForm.addEventListener('submit',handleRegister);

function handleRegister(event){
		event.preventDefault();
		const userName = document.getElementById("username").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const status = 'online';
	
	
	const user ={
		userName,
		email,
		password,
		status
	};
	
	
	fetch('http://localhost:8080/api/v1/users',{
	method:'POST',
	headers:{
		'Content-Type': 'application/json'
	},
	body:JSON.stringify(user)
}).then(res=>{
	if(!res.ok){
		throw new Error('network response was not ok!!!!');
	};
	return res;
}).then(res=>{
	localStorage.setItem('connectedUser',JSON.stringify(res));
	window.location.href = "index.html";
}).catch(err=>{
	console.log('post req err',err);
});
	
	
};