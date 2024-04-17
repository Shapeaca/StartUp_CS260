let username = localStorage.getItem("username");

if(username != null) {
    document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
}