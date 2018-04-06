# International-Treasure

## Description

International Treasure is a game made primarily with Javascript and CSS. The player moves around a canvas in search of a "treasure" icon. While searching, "villains" pop up on the canvas at random locations based on a timer. The player must evade the villains and capture five pieces of treasure in order to win.

If the player wins, he or she will advance to the next round. In each round, the time interals change, making the game more difficult. The player can expect that the villains will pop up more frequently, and the treasure will move at a quicker pace. 

If the player runs into a villain, his or her health with decrease by one point. If the player loses enough points and his or her health gets to zero, the player loses and the game is over. 

## User Stories

1. Create Washington DC
..* Make a land (canvas) for the player to travel through.
..* Add a map as the background image for the Canvas.
..* Add a function that creates a villain at a random location on the canvas every 5 seconds, and every time the player runs into one.
..* Add a treasure object that moves to a random location on the canvas either every six seconds, or every time the player runs into it. 

2. Create Nick
..* Give the player basic stats (health and treasure points). Add section to the page for the user to see stats. 
..* Add Nick's face to the page/give him a starting location in Washington D.C.
..* Give the player the ability to move around the canvas/set boundaries so that he doesn't leave the page. 

3. Write Collision Detection
..* If the player runs into a villain, health -=1. 
..* If health = 0, game over.
..* If the player runs into the treasure, treasure points +=1.
..* If treasure = 5, player wins the round. 

4. Add Multiple Nicks
..* Create a place for the player to "Pick their Nick".
..* Make it so that the canvas, player icon, treasure icon, and villain icons update in accordance with the player's choice. 

5. Create Instructions and Modals
..* Make an instructions section for the user. 
..* Add modal for winning a round.
..* Add modal for losing/game over. 

6. Add Buttons
..* Add button to start the game.
..* Add button to pause the game and timer.
..* Add button to clear the board and start over. 
..* Add a back button.
..* Add a button to show instructions. 


## Rules

You are Nick "The Cage Man" Cage, and it's your job to save the world. 
In order to do this, you must collect five pieces of treasure. 

Use the arrow keys to move around the map. 

Be careful! There are bad guys that are also looking for the treasure. If you run into them, your health will decrease. If it gets to zero, you will have failed your mission.

## Things you would like to add in future versions

I'd like to make it so that the villains actively chase the player in the canvas. 

### Problem you overcame

Collision detection between two objects that aren't perfect cirlces. Right now it's written as if we were dealing with two perfect circles - and it works - but it could work better. 