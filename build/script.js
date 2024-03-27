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

initBoard()