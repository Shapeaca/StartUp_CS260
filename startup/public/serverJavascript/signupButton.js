document.getElementById("signupButton").addEventListener("click", signUp);

async function signUp() {
    //fixme make signUp button only be able to be clicked once? - Lock the button?
    let username = document.getElementById("usernameSignup").value;
    let password = document.getElementById("passwordSignup").value;
    let email = document.getElementById("emailSignup").value;

    if((username.length > 0) && (password.length > 0) && (email.length > 0)) {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username: username, password: password, email: email}),
            });

            const responseObject = await response.json();
            if(response.status === 200) {
                console.log(response.status + ":" + responseObject.msg);
                //Now Update Account Display on webpage
                localStorage.setItem("username", responseObject.username)
                document.getElementById("accountDisplay").innerHTML = `User: ${responseObject.username}`;
                //todo here remove the signup values from the input boxes
            } else {
                console.log(response.status + ":" + responseObject.msg);
            }

        } catch (error) {
            console.log(error);
        }

    }
}