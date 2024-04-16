document.getElementById("loginButton").addEventListener("click", login);

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if((username.length > 0) && (password.length > 0)) {
        try {
            console.log(username + " " + password);
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username: username, password: password}),
            });

            const responseObject = await response.json();
            if(response.status === 200) {
                console.log(response.status + ":" + responseObject.msg);
                //Now Update Account Display on webpage
                sessionStorage.setItem("username", responseObject.username)
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
