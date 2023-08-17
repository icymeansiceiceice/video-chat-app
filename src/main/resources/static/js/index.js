
window.addEventListener("load",loadAndDisplayUser);
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click',handleLogout);


function loadAndDisplayUser(){
	
	const connectedUser=localStorage.getItem('connectedUser');
	if(!connectedUser){
		window.location.href = "login.html";
		return;
	}
	
	const userListElement = document.getElementById("userList");
	userListElement.innerHTML = "loading....";
	fetch('http://localhost:8080/api/v1/users')
	.then(res=>{
		return res.json();
	})
	.then(res => {
		 displayUsers(res,userListElement);
	})
	.catch(err=>{
		console.log(err);
	});
		
};


function displayUsers(userList,userListElement){
	userListElement.innerHTML = "";
	userList.forEach(user => {
		const listItem = document.createElement("li");
		listItem.innerHTML = `
				<div>
                    <i class="fa fa-user-circle"></i>
                    ${user.userName} <i class="user-email">(${user.email})</i>
                </div>
                <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
		`;
		userListElement.appendChild(listItem);
		
	});
};


function handleLogout(){
	
	fetch('http://localhost:8080/api/v1/users/logout',{
		method:'POST',
		headers:{
			'Content-Type': 'application/json'
		},
		body:localStorage.getItem('connectedUser')
	})
	.then(res=>{
		return res;
	})
	.then(res=>{
		localStorage.removeItem('connectedUser');
		window.location.href = "login.html";
	})
	.catch(err=>{
		console.log(err)
	});

};


