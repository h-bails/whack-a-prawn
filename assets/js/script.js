/** Global variables */
let audio = new Audio("https://incompetech.com/music/royalty-free/mp3-royaltyfree/Disco%20con%20Tutti.mp3");
let whackSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/24/audio_377f11432b.mp3?filename=kung-fu-punch-4-105262.mp3")
let score = parseInt(document.getElementById("score").innerText);
let missed = parseInt(document.getElementById("missed").innerText);
let holes = document.getElementsByClassName("mole-area");
let prawnInterval


/** Toggles the music on and off when "Toggle Music" link is clicked */
document.getElementById("toggle-music").addEventListener("click", playMusic);

function playMusic() {
    if (audio.paused) {
        audio.play();
        loop = true;
        audio.volume = 0.3;
    } else {
        audio.pause();
    }
}

/** Displays instructions when 'Instructions' link is clicked */
document.getElementById("view-instructions").addEventListener("click", showInstructions);

function showInstructions () {
    let popup = document.getElementById("popup");

    if (popup.style.visibility = "hidden") {
        popup.style.visibility = "visible";
    } else {
        popup.style.visibility = "hidden";
    }
}

// Closes the pop-up when 'OK' is clicked
document.getElementById("popup-close").addEventListener("click", closePopUp)

function closePopUp () {
    let popup = document.getElementById("popup")    
    popup.style.visibility = "hidden";
}

/** Displays image of prawn in a random div */

document.getElementById("start-game").addEventListener("click", startGame)

function startGame() {
    displayPrawns();
    prawnInterval = setInterval(displayPrawns, 3000);
}

function displayPrawns () {
    let randomIndex = Math.floor(Math.random() * holes.length);
    let randomDiv = holes[randomIndex]
    let prawn = document.createElement("img");
    prawn.src = "./assets/images/prawn-hole.png"
    let imageClicked = false

    // Add a prawn to a random div
    randomDiv.innerHTML = ""
    randomDiv.appendChild(prawn);

    // Increase the score when prawn is clicked
    prawn.addEventListener("click", function(){
        console.log("Prawn whacked!");
        ++score;
        document.getElementById("score").innerText = score;
        imageClicked = true;
        whackSound.play();
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
        time = time - (score * 100);
    });

    // Revert the random div to an empty hole 
    // and increment missed prawns if prawn not clicked
        let timeout = setTimeout(function() {
            randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
            if (!imageClicked) {
                console.log("You missed a prawn!")
                ++missed;
                document.getElementById("missed").innerText = missed;
            }
        }, 2000);
    
    // Display a popup once 5 prawns are missed
      if (missed >= 5) {
        let losePopup = document.getElementById("lose-popup");
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
        losePopup.style.visibility = "visible";
        clearTimeout(timeout);
        clearInterval(prawnInterval);
      }
}


/** Resets the game when OK is clicked after "You Lose" is displayed */
document.getElementById("lose-popup-close").addEventListener("click", resetGame)

function resetGame() {
    let losePopup = document.getElementById("lose-popup")
    losePopup.style.visibility = "hidden";
    score = 0;
    missed = 0;
    document.getElementById("score").innerText = "0";
    document.getElementById("missed").innerText = "0";
    document.querySelectorAll('.mole-area').innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
}