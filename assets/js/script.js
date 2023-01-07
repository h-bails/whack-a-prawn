/** Toggles the music on and off when "Toggle Music" link is clicked */

document.getElementById("toggle-music").addEventListener("click", playMusic)
let audio = new Audio("https://incompetech.com/music/royalty-free/mp3-royaltyfree/Disco%20con%20Tutti.mp3");

function playMusic() {
    if (audio.paused) {
        audio.play();
        loop = true;
        audio.volume = 0.5;
    } else {
        audio.pause();
    }
}

/** Displays instructions when 'Instructions' link is clicked */

document.getElementById("view-instructions").addEventListener("click", showInstructions)

function showInstructions () {
    let popup = document.getElementById("popup")

    if (popup.style.visibility = "hidden") {
        popup.style.visibility = "visible";
    } else {
        popup.style.visibility = "hidden";
    }
}

document.getElementById("popup-close").addEventListener("click", closePopUp)

function closePopUp () {
    let popup = document.getElementById("popup")
    
    popup.style.visibility = "hidden";
}