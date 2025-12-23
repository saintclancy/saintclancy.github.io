const song = document.getElementById("mySong");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".bar");

//Tabs

// Bootstrap Nav → Custom Tab Content
document.querySelectorAll('.nav-link[data-tab]').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        const selected = this.getAttribute('data-tab');

        // Remove active from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');

        // Hide all content sections
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
            section.style.display = "none";
        });

        // Show selected content
        const target = document.getElementById(selected);
        if (target) {
            target.classList.add('active');
            target.style.display = "block";
        }
    });
});

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