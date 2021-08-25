/********** MODAL POPUPS **********/

const quitGame = document.getElementById('quit')
const modalContainer = document.getElementById('modalContainer')
const modalContainerWin = document.getElementById('modalContainerWin')
const modalContainerLost = document.getElementById('modalContainerLost')
const close = document.getElementById('close')
const closeWin = document.getElementById('closeWin')
const closeLost = document.getElementById('closeLost')

// show the popup when the quit game button is clicked
quitGame.addEventListener("click", () => {
    modalContainer.classList.add('show')
    modalContainer.style.display='block'
    var bye = new Audio('../public/bye.mp3')
    bye.play();
})

// remove the popup when closed
close.addEventListener('click', () => {
    modalContainer.classList.remove('show')
})
closeWin.addEventListener('click', () => {
    modalContainerWin.classList.remove('show')
})
closeLost.addEventListener('click', () => {
    modalContainerLost.classList.remove('show')
})


/********** RESTART THE GAME **********/

// used when play again is clicked by reloading the current page in the browser
function restartGame(){
    document.location.href=""
}

/********** START OF THE GAMES'S LOGIC **********/


// putting the alphabet
const letters = "abcdefghijklmnopqrstuvwxyz"

// put letters in array
var lettersArray = Array.from(letters)

// get letter container
var lettersContainer = document.querySelector(".letters")


// get word from API
async function getWordFromApi(){
    const api = await fetch('https://random-words-api.vercel.app/word')
    const data = await api.json()
    return data[0]
}


var wordDiv = document.getElementById('randomWord')
var defDiv = document.getElementById('defWord')

// all the main logic is inside this function
async function addWordToDOM(){
    randomData = await getWordFromApi()
    randomWord = randomData.word.toLowerCase() 
    wordDef = randomData.definition
    wordDiv.innerHTML = randomWord
    defDiv.innerHTML = "Hint : "+wordDef
    var word = wordDiv.innerHTML
    
    console.log("word = ", word)
    console.log("definition = ", wordDef)

    document.getElementById("hint").addEventListener("click", (e) => {
        document.getElementById('defWord').style.display = "block"
    })

    // word into guessing word
    var wordLettersArray = []

    /* keep track of how many letters are left to be guessed, each right guess 
        decreases the value by 1 for each instance of that letter in the word.)*/
    var remainingLetters = word.length
    var letter=''


    //generate letters
    lettersArray.forEach(letter => {
        //create span
        var span = document.createElement("span")
        // create letter text node
        var oneLetter = document.createTextNode(letter)
        // append the letter to the span
        span.appendChild(oneLetter)
        // add class to the span
        span.className = 'letterBox'
        // append span to the letters container
        lettersContainer.appendChild(span)
    })


    //transform word into guessing word ex. fish into __ __ __ __
    for (var i = 0; i < word.length; i++) {
        wordLettersArray[i] = "______"
    }

    // hide the word with ____
    document.querySelector('.word').innerHTML = wordLettersArray.join(" ")

    // number of wrong attempts
    var wrongAttempts = 0

    // get the draw element
    var draw = document.querySelector(".hangmanDraw")


    // handle the clicking on the letters
    // getting all the spans/letters
    var spans = document.getElementsByTagName('span')

    // transform it into an array
    spans = Array.from(spans)
    
    // for each span/ letter clicked
    spans.forEach(span => {
        span.addEventListener("click", (e) => {
            var status = false; // if it's the wrong letter otherwise true
            if(e.target.className === 'letterBox'){
                e.target.classList.add("clicked")
                // get the clicked letter
                letter = e.target.innerHTML.toLowerCase()
                // while the word is not completely guessed
                if(remainingLetters > 0){
                    for (var j = 0; j < word.length; j++) {
                        // if the letter exists in the word and has not been already guessed, put it in the guessing word and decrease the remaining letters
                        if (word[j] === letter) {
                            wordLettersArray[j] = letter
                            document.querySelector('.word').innerHTML = wordLettersArray.join(" ").toUpperCase()
                            remainingLetters--
                            status = true
                            // if the word has been guessed
                            if(wordLettersArray.join("") == word){
                                modalContainerWin.classList.add('show')
                                modalContainerWin.style.display='block'
                                var won = new Audio('../public/won.mp3')
                                won.play()
                           }
                        }
                    }
                }
            }
            // draw the hangman according to the wrong attempts
            if(status !== true){
                wrongAttempts++
                // ex. wrong-1 
                draw.classList.add('wrong-'+wrongAttempts)
                // max number of attempts is 8
                if(wrongAttempts === 8){
                    lettersContainer.classList.add("finished")
                    modalContainerLost.classList.add('show')
                    modalContainerLost.style.display='block'
                    var p = document.createElement("p")
                    var text = document.createTextNode("The word was "+word+".")
                    p.appendChild(text)
                    modalContainerLost.querySelector(".para").appendChild(p)
                    var lost = new Audio('../public/lost.mp3')
                    lost.play()
                }
            }
        })
    })
}

getWordFromApi()
addWordToDOM()


