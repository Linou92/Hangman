# Hangman using Javascript and https://random-words-api.vercel.app/word API

/********** HOW TO PLAY? **********/
 
 1. download the project
 2. make sure to have nodeJS and express installed
 3. go to the project folder in the terminal and execute npm install to install the packages
 4. then tap node app.js to run the server
 5. finally, open your web browser and go to localhost:3000
 6. Have Fun ! :)


/********** DESIGN **********/

For designing, I used html and css. I usually use bootstrap but since it's a small project and also I could achieve what I wanted using css so I didn't feel the need to use bootstrap.

At first, I went with an input and a "try" button in order for the player to tap the letter but then I figured out that it wasn't very convenient since the user gets to click and move the mouse many times at different places so I changed it and went with a "list" of the alphabets and so the user can directly click on the desired letter.
Once the letter has been chosen/clicked, it changes color and got disabled so the user cannot choose the same letter twice.

After the letters, we have the hint which appears when the hint button is clicked and shows the definition of the word. 

After that, we have the hangman which appears by steps depending on the wrong attempts.

Then, we have the word that should be guessed. It first appears as dashes and everytime a correct letter is guessed, the dash transforms into the letter. If the same letter exists many times in the word, it appears in all its places.

Then, we have the buttons:
  - hint shows the definition of the word
  - play again restarts the game by refreshing the page
  - quit game shows a "goodbye" popup

Finally, we have the popups messages:
  - the winning popup shows a message and plays a sound effect accordingly
  - the loosing popup shows a message and plays a sound effect accordingly
  - the quiting popup shows a message and plays a sound effect accordingly


/********** LOGIC **********/

The logic of the game has been thought the same way as we play it with pen and paper (we first put the alphabets, then the guessing word, then we draw the hangman according to the game's rules)
 1. Pick a random word from the API
 2. Make the design of the page accordingly 
 3. Guess the word by choosing a letter at a time
 4. If the letter is correct, show it in the word and disable it
 5. If not, draw the first step of the hangman and disable the letter
 6. While the word has not been guessed, increase the wrong attempts for each incorrect letter and draw the next steps of the hangman
 7. If the hangman is fully drawn, get the game over popup and all the page is disabled so the user cannot click on any letter etc
 8. If the word has been guessed before the full hangman appears, get the winning popup

In order to draw the hangman, several methods exists such as canvas 2d etc but I chose to draw it as follows because I think it's more understandable and more logic:
Each part of the draw represents a div which are all invisible when starting the game. Each time the user guesses the wrong letter, a div appears. They appears in order.

/********** IMPLEMENTATION **********/

Used languages:
 - Javascript
 - NodeJS
 - Express
 - Html
 - CSS
 
Architecture of the project:
  Hangman => node_modules
          => public 
               => sound effects (won, lost and bye .mp3)
          => views
               => css
                    => style.css (styling of the game and page)
               => js
                    => main.js (logic and code of the game)
               => home.ejs (design of the game and page)
          => app.js (runs the server)
          => packages .json (contains all the used packages)
          => server.cert (in order for the page to open as a secure https link and not http)
          => server.key (in order for the page to open as a secure https link and not http)

/********** REFERENCES **********/

https://www.youtube.com/watch?v=XH5OW46yO8I  
https://nostarch.com/download/JS4K_ch7.pdf  
https://mixkit.co/free-sound-effects/
 
