

var animals =          
    [
        "wallaby",
        "elephant",
        "parrot",
        "antelope",
        "turkey",
        "heron",
        "anaconda",
        "lemur",
        "tortoise",
        "lizard",
        "kangaroo",
    ];

const maxTries = 12;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];         
var guessesLeft = 0;      
var gameStarted = false;        
var hasFinished = false;          
var wins = 0;   
var loses = 0;    
var letter = 
    [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];            

function resetGame() {
    guessesLeft = maxTries;
    gameStarted = false;

    
    currentWordIndex = Math.floor(Math.random() * (animals.length));


    guessedLetters = [];
    guessingWord = [];

  
    document.getElementById("emptyHangman").src = "assets/images/emptyHangman.jpg";

   
    for (var i = 0; i < animals
        [currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain");
    document.getElementById("loseImg");
    document.getElementById("winImg");

   
    updateDisplay();
};




function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLoses").innerText = loses;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(guessesLeft <= 0) {
        document.getElementById("loseImg");
        document.getElementById("pressKeyTryAgain");
        hasFinished = true;
    }
};



function updateemptyHangman() {
    document.getElementById("emptyHangman").src = "assets/images/" + (maxTries - guessesLeft) + ".jpg";
};




document.onkeydown = function(event) {
 
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
     
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};


function makeGuess(letter) {
    if (guessesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
    checkLose();
};



function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < animals
        [currentWordIndex].length; i++) {
        if(animals[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }


    if (positions.length <= 0) {
        guessesLeft--;
        updateemptyHangman();
    } else {
  
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};


function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winImg");
        document.getElementById("pressKeyTryAgain");
        wins++;
        hasFinished = true;
    }
};

function checkLose() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("loseImg");
        document.getElementById("pressKeyTryAgain");
        loses++;
        hasFinished = true;
    }
};  