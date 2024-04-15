const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

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

//cookie stuff
app.use(cookieParser());



//connect to the database cluster
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const collectionUser = db.collection('user');



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
    // let nwObject;
    loginFunction(req.body).then(result => {
        // nwObject = result;
        console.log(result);
        console.log(result.token + " = the auth cookie");
        setAuthCookie(res, result.token);
        res.send(JSON.stringify("Server ping back to client"));
    }).catch(error => {
        console.log(error);
        res.send("500 server error: " + error);
    });
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
    return new Promise(async (resolve, reject) => {
        try {
            const encryptedPassword = await bcrypt.hash(loginObject.password, 10);
            let lowerUsername = loginObject.username.toLowerCase();
            let nwObject = {username: lowerUsername, password: encryptedPassword, token: uuid.v4()};
            await insertUserToDatabase(nwObject.username, nwObject.password, "TestEmail@gmail.com", nwObject.token);
            await updateUserAuthToken(nwObject.username, "FakeAuthToken");
            resolve(nwObject);
        } catch (error) {
            console.log(reject);
            reject(error);
        }
    });
}

//Cookie
function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}



//database functions
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Database connected");
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function insertUserToDatabase(username, hashPassword, email, curAuthToken) {
    return new Promise(async (resolve, reject) => {
        try {
            userObject = {
                username: username,
                password: hashPassword,
                email: email,
                authtoken: curAuthToken
            }
            await collectionUser.createIndex({ username: 1 }, { unique: true });
            await collectionUser.insertOne(userObject);
            console.log("Insert Successful");
            resolve();
        } catch (error) {
            console.log("ERROR: Database Promise declined");
            reject("ERROR: Database User insert Promise declined because: " + error);
        }
    });
}

async function updateUserAuthToken(username, nwAuthToken) {
    return new Promise(async (resolve, reject) => {
        try {
            const query = {username: `${username}`};
            const set = {$set: {authtoken: nwAuthToken}};
            collectionUser.updateOne(query, set);
            console.log("Success");
            resolve();
        } catch {
            console.log("ERROR: Database Promise update Authtoken declined");
            reject();
        }
    });
}
