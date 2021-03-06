//js logic for the html
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
        "gorilla"
    ];

      

var gameStarted = false;        
var hasFinished = false;     
var currentWordIndex;           
var guessingWord = [];         
var guessesLeft = 0;               
var winSum = 0;   
var loseSum = 0; 
var guessesSoFar = [];      
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

const bodyParts = 12;   



function resetGame() {
    guessesLeft = bodyParts;
    gameStarted = false;

    
    currentWordIndex = Math.floor(Math.random() * (animals.length));


    guessesSoFar = [];
    guessingWord = [];

  
    document.getElementById("emptyHangman").src = "assets/images/emptyHangman.jpg";

   
    for (var i = 0; i < animals
        [currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
//this part is not working the way I would like so I mislabeled the images in the index.html file to hide them for now until I can figure this part out. Until I get it to work, the switch in between will be awkward and I will have to tell the user to select enter or any key after hitting ok on the prompt. Need to make a more ideal usewr experience flow.
    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("loseImg").style.cssText = "display: none";
    document.getElementById("winImg").style.cssText = "display: none";

   
    updateDisplay();
};


function updateDisplay() {

    document.getElementById("currentWord").innerText = "";
    document.getElementById("totalWins").innerText = winSum;
    document.getElementById("totalLoses").innerText = loseSum;
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("guessesSoFar").innerText = guessesSoFar;
    if(guessesLeft <= 0) {
        document.getElementById("loseImg");
        document.getElementById("tryAgain");
        hasFinished = true;
    }
};



function updateemptyHangman() {
    document.getElementById("emptyHangman").src = "assets/images/" + (bodyParts - guessesLeft) + ".jpg";
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

        if (guessesSoFar.indexOf(letter) === -1) {
            guessesSoFar.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
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

// I think I need to combine these check win and check lose functions into an if else
function checkWin() 
    {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winImg");
        document.getElementById("tryAgain");
        hasFinished = true;
        winSum++;
        alert("you win ---------- play again by selecting OK and enter"); //this alert is firing before the filling in the puzzle; still have to fix this
    }
    else if (guessesLeft<=0) {
        document.getElementById("loseImg");
        document.getElementById("tryAgain");
        loseSum++;
        alert("sorry, you lose ---------- play again by selecting OK and enter"); //this alert is firing before the filling in the puzzle; still have to fix this
    }
    
};

