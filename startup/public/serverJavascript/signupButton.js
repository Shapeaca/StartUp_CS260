document.getElementById("signupButton").addEventListener("click", signUp);

function signUp() {
    //fixme make signUp button only be able to be clicked once? - Lock the button?
    let username = document.getElementById("usernameSignup").value;
    let password = document.getElementById("passwordSignup").value;
    let email = document.getElementById("emailSignup").value;

    if((username.length > 0) && (password.length > 0) && (email.length > 0)) {
        sessionStorage.setItem("username", `${username}`)
        console.log(username + " " + password + " " + email);
        httpSignupPost(username, password, email).then(response => {
            console.log("Signup Promise resolved: " + response);
        })

        //Now Update Account Display on webpage
        document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
    }
}

async function httpSignupPost(username, password, email) {
    return new Promise(async (resolve, reject) => {
        let objectToSend = ({username: username, password: password, email: email});
        console.log(objectToSend);
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objectToSend),
            });

            const responseStr = await response.json();
            console.log(responseStr);

            resolve();
        } catch (error){
            console.log("HTTP Post /api/signup Failed");
            reject(error);
        }
    });
}
