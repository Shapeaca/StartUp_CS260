document.getElementById("signupButton").addEventListener("click", signUp);

function signUp() {
    //fixme make signUp button only be able to be clicked once.
    console.log("signUp Button Clicked");
    //todo get input from input
    let username = document.getElementById("usernameSignup").value;
    // console.log(username);
    if(username.length > 0) {
        console.log("Checkpoint 1");
        sessionStorage.setItem("username", `${username}`)
        //Now Update Account Display on webpage
        document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
    }
}


