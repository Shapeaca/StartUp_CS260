# Elevator Pitch
## Idea
I want to make a simple web game. 
It will be a 2d platformer. There will be dungeon crawler elements and/or puzzle elements as well. 
The game will start as the player wakes up in a forest clearing near an entrance to a cave (Which is actually the dungeon.)
As the player progresses, they will learn more about this dungeon, and eventually, they will win when they reach the artifact. 
The player will also occasionally run into a check point that will respawn them there when they die.

## Key Features
##### Player Controls:
The player will have the ability to move left and right, jump, and also use special abilities based on what items they have.
The player will also be able to attack
##### Level based game
The game will have many different levels, which will be connected by doors that the player can walk through.
##### Items for the player
If I have time, the game will have different items that the player can use, with different special powers. 
This is the twist of the game. For example, the items could manipulate gravity, send out a powerful attack, or allow the user to double jump.
##### Game Score
The game will have a timer and a death counter, so that players, if they want, can compete for the best times.
This score will then be displayed for everyone on the leaderboard


## Technologies
##### HTML:
The website will have a few tabs that the user can navigate to, including a login tab, a leaderboard tab, and a play tab. 
##### CSS: 
The graphics of the game will be done pretty much entirely in CSS.
##### Javascript: 
The game's functionality, including movement, interaction, and attacking will be implemented entirely through javascript, as well as many other parts of the site.
##### Web service:
The web server will host the game saves, the user database, and the leaderboard.
The users will communicate with the web service to get login, open the leaderboard, and establish web socket connections.
##### Authentication:
The user will have to sign up / login before they will be able to play a game. They game will they attribute their save file to that user.
##### Database data:
This database will include all the users credentials, information about past play throughs (For the leaderboard), and their current game progress (Which will be a save file of some kind)
##### WebSocket data:
The Websocket connection will send data about the user's current game to the server, and store the data in the database.
Data that will be sent include: The user's current run time, the user's deaths in the run, the players current position. This will allow a score board to be built, and sorted based on different categories. Also, the position that is saved will allow the user to save their progress
##### Web framework / React:
React will help improve the game/website's functionality and use-ability.
React will also help reduce the size of the website

## Sketches
![images/sketch1.jpg](images\sketch1.jpg)
![images/sketch2.jpg](images\sketch2.jpg)
![images/sketch3.jpg](images\sketch3.jpg)
![images/sketch4.jpg](images\sketch4.jpg)
![images/sketch5.jpg](images\sketch5.jpg)

