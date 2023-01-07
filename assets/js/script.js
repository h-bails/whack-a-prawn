/** Toggles the music on and off on click */

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
