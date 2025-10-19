const song = document.getElementById("mySong");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".bar");

// Set initial volume
song.volume = 0.5;

// Try autoplay (some browsers block without user gesture)
window.addEventListener("load", async () => {
  try {
    await song.play();
    playBtn.textContent = "⏸";
    bars.forEach(bar => bar.style.animationPlayState = "running");
  } catch (err) {
    console.log("Autoplay blocked by browser:", err);
  }
});

playBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    playBtn.textContent = "⏸";
    bars.forEach(bar => bar.style.animationPlayState = "running");
  } else {
    song.pause();
    playBtn.textContent = "▶";
    bars.forEach(bar => bar.style.animationPlayState = "paused");
  }
});

song.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  bars.forEach(bar => bar.style.animationPlayState = "paused");
});
