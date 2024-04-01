let username = sessionStorage.getItem("username");

if(username != null) {
    document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
}