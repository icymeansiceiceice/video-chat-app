
window.addEventListener("load",loadAndDisplayUser);
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click',handleLogout);

const newMeetingBtn = document.getElementById("newMeetingBtn");
newMeetingBtn.addEventListener("click",handleMeeting);

const joinMeetingBtn = document.getElementById("joinMeetingBtn");
joinMeetingBtn.addEventListener("click",handleJoinMeeting);


function loadAndDisplayUser(){
	
	const connectedUser=sessionStorage.getItem('connectedUser');
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
		body:sessionStorage.getItem('connectedUser')
	})
	.then(res=>{
		return res;
	})
	.then(res=>{
		sessionStorage.removeItem('connectedUser');
		window.location.href = "login.html";
	})
	.catch(err=>{
		console.log(err)
	});

};


function handleMeeting(){
	const connectedUser = JSON.parse(sessionStorage.getItem('connectedUser'));
	console.log(connectedUser);
	window.open(`videocall.html?username=${connectedUser.userName}`,"_blank");
};


function handleJoinMeeting(){
	const roomID = document.getElementById("meetingName").value;
	const connectedUser = JSON.parse(sessionStorage.getItem('connectedUser'));
	console.log(connectedUser);
	const url = `videocall.html?roomID=${roomID}&username=${connectedUser.userName}`;
	window.open(url,"_blank");
};

