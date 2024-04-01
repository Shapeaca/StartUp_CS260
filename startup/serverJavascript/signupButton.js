document.getElementById("signupButton").addEventListener("click", signUp);

function signUp() {
    //fixme make signUp button only be able to be clicked once.
    let username = document.getElementById("usernameSignup").value;
    if(username.length > 0) {
        sessionStorage.setItem("username", `${username}`)
        //Now Update Account Display on webpage
        document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
    }
}


