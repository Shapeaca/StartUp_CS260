GitHub 
assignment - This assignment helped me learn about merging, and how to better do it. That's pretty much all I learned, because I already knew a lot

# Notes

## Javascript Notes
#### Class 2/21/24
##### **await & async:**
await functionCall()
* this forces the browser to wait on the function
async funtion() {}
* if an await is used in the function somewhere (Or if functions in it are async), Then this function has to have async modifier in front of it

## Midterm Review

#### Kahoot 1)
    Hardest problem on exam - Async function, 
    * Know if the function will return an exception
    * Forces the program to wait, until the code is finished running
    * A D B is answer

#### Kahoot 2) - (Not iin order on website, but in order in the class)
    *ANSWER: chmod +x deploy.sh
    * +x = executable
    * chmod = change mode to:
    * deploy.sh = the code

#### Kahoot 3) 
    * Javascript can be in-line: <div onclick ='1+1"

#### Kahoot 4)
    

#### Kahoot 5)
    * Answer = cow:rat:fish
    * Know reduce function

#### Kahoot 6)
    JSON:
    * key is always a string: "key"
    * ANSWER: {"x":3}

#### Kahoot 7) 
    Mouse Event Listener:
    Selects A p element
    
#### Kahoot 8) 
    ANSWER: div - Creates a DivisION element

#### Kahoot 9) 
    Hyperlink:
    <a href=""

#### Kahoot 10)
    DNS record type pointing to a DNS record type
    * ANSWER = CNAME
    - WHAT IS A DNS Record?
    - WHAT IS A Record?
    * CNAME = an alias

#### Kahoot 11) 
    CSS turn specific text blue:
    * div.header {color: blue}

#### Kahoot 12)
    Padding, Margin, etc Question
    ANSWER: Paddding is around content

#### Kahoot 13)
    Arrow Function question
    * Don't have to say return - One line functions will return a value of y
    * Has ++, pre or post increment

#### Kahoot 14)
    DOM element 
    ANSWER: Sets the child text for an element

#### Kahoot 15)
    CSS load fonts from google
    ANSWER = true
    
#### Kahoot 16)
    Valid Javascript function
    ANSWER / Invalid function;
        * function f(x) = {}

#### Kahoot 17)
    CSS Content boxes order
    Margin, ___, Padding, Content

#### Kahoot 18)
    html unorded list tag
    ANSWER = <ul>
    correct

#### Kahoot 19)
    REGEX and JAVASCRIPT
    STUDY REGEX in Javascript
    * ANSWER = rat, fish
    * Answer = anything with an a or an f

#### Kahoot 20)
    Second Hardest Question - not Async (async wait? or promise?) question 
    ANSWER: Burger, fries, taco, (THen a wait), Shake, noodles (finally ALWAYS gets called)

#### Kahoot 21)
    Valid Javascript Object
    ANSWER = {x:1}

#### Kahoot 22)
    DNS Subdomain
    ANSWER: c260.cs.byu.edu
    Root domain = byu.edu   

#### Kahoot 23)
    CSS and HTML formatting
    ANSWER - Two rows, World is before hello (even though in HTML it is the other way)
    * Column Reverse causes the World to be before Hello

### Javascript Functions from Midterm Review Kahoot
    * filter = Returns a filtered array from some sort of query / filter - Input is some function that filterse
    * match = Uses a regex to match a string 
        - Encoded between / regex / slashes  OR use the regex constructor: new RegExp();
        - single letters = single letters
        - * means *
        - + means * without 0
        - ? means 0 or 1 times
        - {n} means matches exactly n times - {n,} at least n - {n,m} means matches n to m times
        - flags: 
            - used after the slash to specify special things 
            - EXAMPLE: i = case insensitive
    * reduce = It folds the array to a single value - (a, b) it will basically recursivley fold in elements of the array) - It will go over every element, first to last
    * join = join elements of an array into a single string, seperated by a comma OR ' ' -  a 'specified separator string'
    * (array).map = creates a new array by running a provided function on the array - [1,2].map(*2) = [2, 4]
    * SetTimeout(() => {}, time(in ms)); - This only runs this code once the provided time has passed

    * (document).QuerySelector(selector(s)) - returns the first Element found in that matches the given selector(s) - returns null if no value found
    * (document).QuerySelectorAll(selector(s)) - returns ALL the Elements found that match the given selector(s)

    * (target).addEventListener(type, listener) - Sets up a function that will be called whenever the specified event is delivered to the target

    - then(), catch(), finally() - To Do with promises - Different from a try, catch statement
        * .then() - A function that executes when the promise is resolved / fulfilled
        * .catch() - A function that executes when the promise is rejected
        * .finally() - always called last - avoids duplicate code in then() and catch()

    * Promise - A function that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.  
        - (Promise).resolve - 'resolves' a promise, by returning a value. - If the value is thenable, it then calls the then() statement

    *async functions - Can only be run asyncrynously
        - use await functionName() to call async function
    * syncryonous functions - Can be run with multiple threads

    
    
        


# Class Notes - 2/26/2024 - The Internet
The Internet is a collection of servers
    - It was created to allow redundancy. You can't destroy one server, or location, to take down the internet. You have to destroy it ALL!
    - It was created by the Military for military constructors to be able to communicate with one another

    Web Protocols: 
    - Layer: Example - Purpose
    * Application: HTTPS - Functionality like web browsing
    * Transport: TCP / UDP - Moving Packets of Information
    * Internet: IP - Establishing Connections
    * Link - Fiber, Hardware - Physical connections

Ports: 
    * Some ports have specific purposes:
        - Example: HTTP = 80, HTTPS = 443
    * Some ports are available for use for any program 
        - Each running service/program is given an available unique port
Personal Computers and Server Ports:
    - PCs and some servers go through a gateway, so that the whole computer is NOT visible to the internet
    - Servers SOMETIMES use something other than a gateway for speed, security?, etc.

    Domain Names:
    Subdomain.domain.topleveldomain
    * once you own the domain, you can have as many subdomains as you want!!!

DNS Record Types


## Class 3/8/2024 notes:
    Daemons:
    * They are programs that run and do stuff when you are not online. 
    * Necessary for always running the website
    * On our web server, we use pm2
    * Command for seeing processes running on our server: pm2 ls


## Class 3/18/2024 notes: 
    Storing Passwords
    * Do NOT store plain text
    * Use a good Hash algorithm - So you never know user's passwords
    * * Needs a Consistent algorithm
    * * Needs a very low chance of repeat values
    * * Add Salt
    
    Hash and Salt
    - Uses a Hash algorithm
    - Uses a unique Salt for each user
    - Append Password to Salt
    - Then Hash the Salt and Password

    Bcrypt
    - A security Program that automatically hashes and salts passwords
    - Uses a special hash function???
    
    Endpoints need passwords
    - Authenticate ONCE using Bcrypt
    - Use AuthTokens / uuid
    - USE uuid package
    - Token's don't last forever, so that they are NOT more powerful than passwords
    - Many companies / websites want to get rid of their token as soon as possible
    * * Examples: Banks, LDS Tools for Leaders 

    Cookies
    - Idea: I'm leaving crumbs behind so that the browser knows what happened on previous sessions
    - Can do many things
    - - Can prove if a user was authenticated on previous sessions
    - - If you want to save a user's language preference
    - - BUT, there is a dark side
    - Dark Side of cookies: It leaves a unique tracker for programs to track individual users
    - - Allows websites / ads to track where you have been

Cookies:
Set-Cookie: session=x83yzi; Secure; HttpOnly; SameSite=Strict
        ___           (HTTPS only)  (!Javascript)    (Only Given back to Origin)

HttpOnly; - Sets so that Javascript can't access it??? Only the browser

npm init -y
npm install express cookie-parser uuid
- Install all 3 of these packages - (express) (cookie-parser) (uuid)

## Class 3/20/24
    Testing Apps
    - What we use (front-end) - Playwright
    - What we use (back-end) - Jest

    Don't use flaky testing apps
    - You don't want the tests to fail because of some random timing issue

    Jest is magic
    - It scans your Javascript automatically
    - - Don't need to import
    - It injects itself into the javascript 
    - - AS LONG AS you have a function called test();

## Class 3/25/24
    Security and common mistakes

    LOG YOUR DATA - Do it correctly
    - Write logs for everything (every request) that happens
    - Make your logs immutable (unchangable)

## Class 3/27/24
Juice Shop
    - A security demonstration application 
        - There are many security vulnerabilities designed to help computer scientists be aware of what NOT to do
    - First thing is to find the score board
        - Look at the source code
    - This is a great way to learn about or practice security vulnerabilities
    - Example: Log into an account - see what vul
    - - There are many

    Notes 
    - All source code on front end applications is public
    - Security Questions are a bad idea
    - - You can get through security walls JUST by knowing something about the person
    - Sanitize input in search bars, etc
    - Don't increment data 
    - THINK LIKE A HACKER 
    - - so that you can DEFEND against hackers
    - - There are so many DOs and DONTs for developers and security

## Class notes 3/29/24
React
    - Create by Jordan Walke
    - A web framework
    - Combines HTML and Javascript
    - Can use functions (example, ReactDOM.) to add pure HTML into Javascript
    * REACT is really Security minded - (It automatically sanitizes input)

JSX
    - Combines Javascript and HTML
    - Since HTML and Javascript go hand in hand, you put in one file
    - JSX is a file type

Babel 
    - Compiles Javascript and HTML from JSX
    - React uses Babel to convert from JSX to Javascript and HTML

Converting our Website into JSX/REACT
    - We have to PORT our website into React
    - We slowly port our code to React by creating components of already working code into the new system

Is React the same as Typescript?

Single Page Application
    - Can be done with React 
    - Done with components

    Components
        - Done using <Hello />
        - Then you create a function with the same name: 
            - const Hello = () => {};
        - You have to wrap <Hello /> with a div or something
        - Your components hvae to be uppercase


## Class Notes 4/1/2024 - Single Page Applications (using React)



## Class Final Review 4/15/2024 

Which Express middleware will match this fetch request 
    - .delete, /fav\/(.*)/ 
        * . = anything 
        * * means that it can b e repeated (regex)
* Middle Ware - The way Express is coded, it uses middleware

You can use fetch in front-end and back-end code
    - True
* Fetch just means calling another service
* If you use fetch in your back-end, it probably means you are fetching another unrelated website/service

Port 80 is reserved for?
    - HTTP
* HTTP - 80
* HTTPS - 443
* SSH - 22
* FTP - 20 & 21

What component will the URL `/burger` render?
    - <Route path=`/burger` element={<B /} />
    - B

() Study This
Which is NOT a standard HTTP header? 
    - Language (is NOT)
* Standard HTTP headers - (Know these)
* * Cookie
* * Content-Type
* * Host

What is NOT a purpose of JSX
    - to combine HTML, CSS, and Javascript (NOT THIS ONE - Not CSS) (It combines Javascript and HTML)
* What it allows
* * To render HTML from Javascript
* * to Componentize your html
* * to allow for composability of your HTML (Putting components together)

Which of the following is NOT true about a linux Daemon?
    - Cannot fork other processes (Not this one)
* A Daemon is something that runs around that doesn't have a user associated with it
* * It runs at the opperating system level
* * It doesn't need an account, even though the request does usually

What does the command "NPM install ws" NOT do
    - Add template code for websockets to your javascript (does NOT do this)
* ws = websockets
* It:
* * Locks the version of ws for your application
* * Adds dependancies
* * one more thing

For the request [GET] /fav/george whit is logged?
    - Paul george john
* app.use is called for everything
* Have to use   next(); in order for the next express middleware to be called
* /* (matches everything)
* Express servers can freeze without a res.send() call

Given the following code, what will console.log print? - WEBSOCKETS example
    - Client:Server:msg
    - - msg = "hello"

What value does WebSocket add to HTTP?
    - It is peer to peer instead of client to server

Cookies allow: 
    - A server to store data on the client
* The idea is:
* * Something the server is leaving on the client

HTTP status codes in the 300 range are for?
    - Content redirects or caching
* Success = 200
* Content redirect or caching = 300
* Client error = 400
* Server error = 500

Why is hashing stored passwords important
    - Security

What will component A initially display? - REACT example
    - tacofish
* The var x initially gets set to B, but later it gets reset to D
* * Because of React - Update function

What document matches this MongoDB query?
    - {name: "Walke", score:-55}
* default is and
* * We reset it to $OR
* lt = less than