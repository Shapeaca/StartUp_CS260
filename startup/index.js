const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);



//Memory on the server
let numAttemptsMemory = 0;
let highestScore = 0; //a number in milliseconds



/*let scoreArr = []; //{user: "Shapeaca", score: "53,065} - Example storage object //fixme code for the future
const max = data.reduce(function(prev, current) { //example for finding highest value in an array
    return (prev && prev.y > current.y) ? prev : current
}) //returns object*/



//score endpoint
apiRouter.post('/score', (req, res) => {
    let sendObject = addToScoresArray(req.body);
    res.send(sendObject);
});

//attempt endpoint
apiRouter.put('/attempt', (req, res) => {
    let nwObject = updateAndGetNumAttempts(req.body);
    res.send(JSON.stringify(nwObject));
});

apiRouter.post(`/login`, (req, res) => {
    let nwObject = loginFunction(req.body);
    res.send(JSON.stringify("Server ping back to client"));
});



// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



//misc functions
function addToScoresArray(scoreObject) {
    let nwObject = {user: scoreObject.user, score: scoreObject.score}
    if(nwObject.score > highestScore) {
        highestScore = nwObject.score;
    }
    return ({highScore: highestScore});
}

function updateAndGetNumAttempts(userAttemptObject) {
    //  fixme - IN the future, add a attempt counter to each user, and this function adds to that user
    numAttemptsMemory++;
    let nwObject = ({attempts: numAttemptsMemory});
    return nwObject;
}

async function loginFunction(loginObject) {
    const encryptedPassword = await bcrypt.hash(loginObject.password, 10);
    let nwObject = {username: loginObject.username, password: encryptedPassword, token: uuid.v4()};
    // console.log(nwObject);
    return nwObject;
}

function checkCredentialsDatabase() {

}