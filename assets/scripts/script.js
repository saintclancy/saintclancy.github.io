const song = document.getElementById("mySong");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".bar");

// Start with volume 50%
song.volume = 0.5;

// Functions to control equalizer animation
function startBars() {
  bars.forEach(bar => bar.style.animationPlayState = "running");
}
function stopBars() {
  bars.forEach(bar => bar.style.animationPlayState = "paused");
}

// Only play on user interaction
playBtn.addEventListener("click", async () => {
  try {
    if (song.paused) {
      await song.play();         // Play allowed because user clicked
      playBtn.textContent = "⏸";
      startBars();
    } else {
      song.pause();
      playBtn.textContent = "▶";
      stopBars();
    }
  } catch (err) {
    console.log("Playback blocked:", err);
  }
});

// Stop bars when song ends
song.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  stopBars();
});
