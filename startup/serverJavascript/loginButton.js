document.getElementById("loginButton").addEventListener("click", login);

function login() {
    //fixme make signUp button only be able to be clicked once? - Lock the button?
    let username = document.getElementById("username").value;
    if(username.length > 0) {
        sessionStorage.setItem("username", `${username}`)
        //Now Update Account Display on webpage
        document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
    }
}
