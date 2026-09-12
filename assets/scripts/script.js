const song = document.getElementById("mySong");
const playBtn = document.getElementById("playBtn");
const bars = document.querySelectorAll(".bar");

//Tabs

const tabLinks = document.querySelectorAll('.nav-link[data-tab]');
const tabSections = document.querySelectorAll('.tab-content');

function showTab(selected) {
  tabLinks.forEach(link => {
    const isSelected = link.dataset.tab === selected;
    link.classList.toggle('active', isSelected);
    link.setAttribute('aria-selected', String(isSelected));
  });

  tabSections.forEach(section => {
    const isSelected = section.id === selected;
    section.classList.toggle('active', isSelected);
    section.style.display = isSelected ? 'block' : 'none';
  });
}

// Bootstrap Nav -> Custom Tab Content
document.querySelectorAll('.nav-link[data-tab]').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        const selected = this.dataset.tab;
        showTab(selected);
        history.replaceState(null, '', `#${selected}`);
    });
});

const initialTab = window.location.hash.slice(1);
showTab([...tabLinks].some(tab => tab.dataset.tab === initialTab) ? initialTab : 'about');

// Start with volume 50%
if (song) {
  song.volume = 0.5;
}

// Functions to control equalizer animation
function startBars() {
  bars.forEach(bar => bar.style.animationPlayState = "running");
}
function stopBars() {
  bars.forEach(bar => bar.style.animationPlayState = "paused");
}

// Only play on user interaction
playBtn?.addEventListener("click", async () => {
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
song?.addEventListener("ended", () => {
  playBtn.textContent = "▶";
  stopBars();
});

// Filter portfolio cards without leaving the page.
document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    document.querySelectorAll('.filter-button').forEach(filterButton => {
      filterButton.classList.toggle('active', filterButton === button);
    });

    document.querySelectorAll('.project-card').forEach(card => {
      const matchesFilter = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.hidden = !matchesFilter;
    });
  });
});

document.querySelector('.portfolio-link')?.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('.nav-link[data-tab="portfolio"]')?.click();
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();