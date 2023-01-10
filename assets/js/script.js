// jshint esversion: 6

/** Global variables */
const audio = new Audio("https://incompetech.com/music/royalty-free/mp3-royaltyfree/Disco%20con%20Tutti.mp3");
const whackSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_377f11432b.mp3?filename=kung-fu-punch-4-105262.mp3");
const successSound = new Audio("https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3")
const laughSound = new Audio("./assets/sounds/prawn-laugh.mp3")

let score = parseInt(document.getElementById("score").innerText);
let missed = parseInt(document.getElementById("missed").innerText);
let holes = document.getElementsByClassName("mole-area");
let prawnInterval;


/** Toggles the music on and off when "Toggle Music" link is clicked */
document.getElementById("toggle-music").addEventListener("click", playMusic);

function playMusic() {
    if (audio.paused) {
        audio.play();
        audio.volume = 0.3;
        document.getElementById("toggle-music").innerHTML = `<i class="fa-solid fa-pause"></i> pause music`;
    } else {
        audio.pause();
        document.getElementById("toggle-music").innerHTML = `<i class="fa-solid fa-play"></i> play music`;
    }
}

/** Displays instructions when 'Instructions' link is clicked */
document.getElementById("view-instructions").addEventListener("click", showInstructions);

function showInstructions () {
    let popup = document.getElementById("popup");

    if (popup.style.visibility === "hidden") {
        popup.style.visibility = "visible";
    } else {
        popup.style.visibility = "hidden";
    }
}

/** Closes the pop-up when 'OK' is clicked */ 
document.getElementById("popup-close").addEventListener("click", closePopUp);

function closePopUp () {
    let popup = document.getElementById("popup"); 
    popup.style.visibility = "hidden";
}

document.getElementById("start-game").addEventListener("click", startGame);

/** Starts the game and sets the timer for the prawns to display */
function startGame() {
        displayPrawns();
        prawnInterval = setInterval(displayPrawns, 1500);
}

/** Displays image of prawn in a random div */
function displayPrawns () {
    let randomIndex = Math.floor(Math.random() * holes.length);
    let randomDiv = holes[randomIndex];
    let prawn = document.createElement("img");
    prawn.src = "./assets/images/prawn-hole.png";
    let imageClicked = false;
    gameStarted = true;

    // Add a prawn to a random div
    randomDiv.innerHTML = "";
    randomDiv.appendChild(prawn);

    // Increase the score when prawn is clicked
    prawn.addEventListener("click", function(){
        console.log("Prawn whacked!");
        ++score;
        document.getElementById("score").innerText = score;
        imageClicked = true;
        whackSound.play();
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
    });

    // Revert the random div to an empty hole and increment 'prawns missed' if prawn not clicked
        let timeout = setTimeout(function() {
            randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
            if (!imageClicked) {
                console.log("You missed a prawn!");
                ++missed;
                document.getElementById("missed").innerText = missed;
            }
        }, 1000);
    
    // Display a modal once 5 prawns are missed
      if (missed >= 5) {
        document.body.style.backgroundImage = "url('./assets/images/background-lose.png')"
        let losePopup = document.getElementById("lose-popup");
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
        document.getElementById("start-game").innerText = "start game";
        losePopup.style.visibility = "visible";
        clearTimeout(timeout);
        clearInterval(prawnInterval);
        laughSound.play();
      }
    
      // Display a modal once 10 prawns are hit
      if (score >= 10) {
        let winPopup = document.getElementById("win-popup");
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
        document.getElementById("start-game").innerText = "start game";
        winPopup.style.visibility = "visible";
        clearTimeout(timeout);
        clearInterval(prawnInterval);
        successSound.play();
      }
}


/** Resets the game when button is clicked after win/lose modal is displayed */
document.getElementById("lose-popup-close").addEventListener("click", resetGame);
document.getElementById("win-popup-close").addEventListener("click", resetGame);


function resetGame() {
    let losePopup = document.getElementById("lose-popup");
    let winPopup = document.getElementById("win-popup");
    losePopup.style.visibility = "hidden";
    winPopup.style.visibility = "hidden";
    score = 0;
    missed = 0;
    document.getElementById("score").innerText = "0";
    document.getElementById("missed").innerText = "0";
    document.querySelectorAll('.mole-area').innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
    document.body.style.backgroundImage = "url('./assets/images/background.png')"
}