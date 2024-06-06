import { WORDS } from "./words.js";

const number_of_guesses = 6;
let guessesRemaining = number_of_guesses;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("game-board")
    for (let i = 0; i < number_of_guesses; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let i = 0; i < 5; i++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

document.addEventListener("keyup", (e)=> {
    if(guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter!== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess() {
    console.log('beginning check')
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    if(!WORDS.includes(guessString)) {
        alert("Not a word!")
        return
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])

        if(letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if(currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = '#'
        }

        let delay = 250 * i
        setTimeout(()=> {
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        switch(guessesRemaining) {
            case 5:
                alert("Amazing!")
                break
            case 4:
                alert("Great!")
                break
            case 3:
                alert("Good job!")
                break
            case 2:
                alert("That was close!")
                break
            case 1:
                alert("Phew!")
                break
        }
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1
        currentGuess = []
        nextLetter = 0
    }
}

function shadeKeyBoard(letter, color) {
    for(const elem of document.getElementsByClassName("keyboard-button")) {
        if(elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if(oldColor === 'green') {
                return
            }

            if(oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

initBoard()