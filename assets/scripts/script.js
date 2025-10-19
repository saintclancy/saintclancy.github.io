const song = document.getElementById("mySong");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".bar");

// Set volume to 50%
song.volume = 0.5;

// Function to start bars animation
function startBars() {
  bars.forEach(bar => bar.style.animationPlayState = "running");
}

// Function to stop bars animation
function stopBars() {
  bars.forEach(bar => bar.style.animationPlayState = "paused");
}

// Try autoplay on load (some browsers block autoplay)
window.addEventListener("load", async () => {
  try {
    await song.play();
    playBtn.textContent = "⏸";
    startBars();
  } catch (err) {
    // Autoplay blocked, user can click play
    playBtn.textContent = "▶";
  }
});

// Play/pause button
playBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    playBtn.textContent = "⏸";
    startBars();
  } else {
    song.pause();
    playBtn.textContent = "▶";
    stopBars();
  }
});

// Stop bars when song ends
song.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  stopBars();
});
