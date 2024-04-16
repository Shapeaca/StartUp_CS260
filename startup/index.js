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

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Database connected");
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

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
    const reqObject = req.body;
    console.log(reqObject);

    databaseCheckCredentialsUser(reqObject.username, reqObject.password).then(response => { //response = new authtoken

    }).catch(error => {
        res.status(401).send(JSON.stringify({msg: error}));
    })
    console.log("user authenticated");
    databaseUpdateUserAuthToken(reqObject.username, reqObject.password).then(response => { //response = new authtoken
        console.log(response.authtoken);
        setAuthCookie(res, response.authtoken);
        res.status(200).send(JSON.stringify({msg: "Login success", username: reqObject.username}));
    }).catch(error => {
        res.status(500).send(JSON.stringify({msg: error}));
    })

});

apiRouter.post(`/signup`, (req, res) => {
    const reqObject = req.body;
    // console.log(reqObject);
    databaseInsertUser(reqObject.username, reqObject.password, reqObject.email).then(response => { //response = new authtoken
        // console.log("Signup works: " + response.authtoken);
        // console.log(response);
        setAuthCookie(res, response.authtoken);
        res.status(200).send(JSON.stringify({msg: "Signup success", username: reqObject.username}));
    }).catch(error => {
        res.status(400).send(JSON.stringify({msg: error}));
    })
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
    // console.log(scoreObject);
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

async function loginFunction(loginObject) { //todo fix this function - I need to do it
    return new Promise(async (resolve, reject) => {
        try {
            const encryptedPassword = await bcrypt.hash(loginObject.password, 10);
            let lowerUsername = loginObject.username.toLowerCase();
            let nwObject = {username: lowerUsername, password: encryptedPassword, token: uuid.v4()};
            // await databaseUpdateUserAuthToken(nwObject.username, "FakeAuthToken");
            console.log(encryptedPassword);
            await databaseCheckCredentialsUser(lowerUsername, loginObject.password);
            await databaseUpdateUserAuthToken(lowerUsername, nwObject.token);
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
async function databaseInsertUser(username, normalPassword, email, curAuthToken) {
    return new Promise(async (resolve, reject) => {
        try {
            const lowerUsername = username.toLowerCase();
            const encryptedPassword = await bcrypt.hash(normalPassword, 10);
            const nwAuthtoken = uuid.v4();

            await collectionUser.createIndex({ username: 1 }, { unique: true });
            await collectionUser.insertOne( {username: lowerUsername, password: encryptedPassword, email: email, authtoken: nwAuthtoken} );

            resolve({authtoken: nwAuthtoken});
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function databaseCheckCredentialsUser (username, normalPassword) { // fixme does not validate successfully
    return new Promise(async (resolve, reject) => {
        try {
            const lowerUsername = username.toLowerCase();

            const user = await collectionUser.findOne({username: lowerUsername});
            if((user != null) && await bcrypt.compare(normalPassword, user.password)) {
                //userAuthenticated
                console.log(`User: ${username} authenticated`);
                resolve();
            } else {
                //invalid password
                reject("Unauthorized");
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function databaseUpdateUserAuthToken(username) { //fixme this breaks somewhere in here
    return new Promise(async (resolve, reject) => {
        try {
            const nwAuthtoken = uuid.v4();
            const query = {username: `${username}`};
            const set = {$set: {authtoken: nwAuthtoken}};
            collectionUser.updateOne(query, set);
            resolve();
        } catch (error){
            console.log(error);
            reject(error);
        }
    });
}
