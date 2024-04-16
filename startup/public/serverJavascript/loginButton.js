document.getElementById("loginButton").addEventListener("click", login);

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log("Username: " + username);
    console.log("Password: " + password);

    if((username.length > 0) && (password.length > 0)) {
        try {
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

        // Promise.all( [httpLoginPost(username, password)] ).then((response) => {
        //     console.log(response + " - Promise Resolved");
        // });
        // //Now Update Account Display on webpage
        // sessionStorage.setItem("username", `${username}`)
        // document.getElementById("accountDisplay").innerHTML = `User: ${username}`;
}

async function httpLoginPost(username, password) {
    return new Promise(async (resolve, reject) => {
        let objectToSend = ({username: username, password: password});

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(objectToSend),
            });

            const responseStr = await response.json();
            console.log(responseStr);
            // let attemptNumStr = responseStr;
            // resolve(attemptNumStr.toString());
            resolve();
        } catch {
            console.log("HTTP Post /api/login Failed");
            reject("HTTP Post /api/login Failed");
        }
    });
}
