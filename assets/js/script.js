/** Toggles the music on and off when "Toggle Music" link is clicked */

document.getElementById("toggle-music").addEventListener("click", playMusic);
let audio = new Audio("https://incompetech.com/music/royalty-free/mp3-royaltyfree/Disco%20con%20Tutti.mp3");
let score = parseInt(document.getElementById("score").innerText);
let missed = parseInt(document.getElementById("missed").innerText);
let prawnInterval
let time = 3000 - (score * 50)

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

document.getElementById("popup-close").addEventListener("click", closePopUp)

function closePopUp () {
    let popup = document.getElementById("popup")
    let losePopup = document.getElementById("lose-popup")
    
    popup.style.visibility = "hidden";
    losePopup.style.visibility = "hidden";
}

/** Displays image of prawn in a random div */

document.getElementById("start-game").addEventListener("click", startGame)

function startGame() {
    displayPrawns();
    prawnInterval = setInterval(displayPrawns, time);
}

function displayPrawns (time) {
    let holes = document.getElementsByClassName("mole-area");
    let randomIndex = Math.floor(Math.random() * holes.length);
    let randomDiv = holes[randomIndex]
    let prawn = document.createElement("img")
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
        imageClicked = true
        randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
        time = time - (score * 100)
    })

    // Revert the random div to an empty hole
        let interval = setTimeout(function() {
            randomDiv.innerHTML = `<img src="./assets/images/empty-hole.png" alt="empty mole hole">`;
            if (!imageClicked) {
                console.log("You missed a prawn!")
                ++missed;
                document.getElementById("missed").innerText = missed;
            }
        }, 2000);
    
    // display a popup once 5 prawns are missed

      if (missed >= 5) {
        let losePopup = document.getElementById("lose-popup");
        losePopup.style.visibility = "visible";
        clearTimeout(interval);
        clearInterval(prawnInterval);
      }
}

document.getElementById("lose-popup-close").addEventListener("click", closePopUp)

