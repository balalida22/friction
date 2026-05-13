const pauseBtn = document.getElementById("pauseBtn");
const statusDiv = document.getElementById("status");

async function updateUI() {
  const data = await browser.storage.local.get("pauseUntil");
  const now = Date.now();

  // Check if we are currently in a "Paused" state
  if (data.pauseUntil && now < data.pauseUntil) {
    const timeLeft = Math.ceil((data.pauseUntil - now) / 1000);
    statusDiv.innerText = `Paused: ${timeLeft}s remaining`;
    
    // Keep button enabled so user can click to "Resume"
    pauseBtn.disabled = false; 
    pauseBtn.innerText = "Resume Now";
    pauseBtn.dataset.state = "paused";
  } else {
    statusDiv.innerText = "Status: Active";
    pauseBtn.disabled = false;
    pauseBtn.innerText = "Turn off for 2 min";
    pauseBtn.dataset.state = "active";
  }
}

pauseBtn.addEventListener("click", async () => {
  const currentState = pauseBtn.dataset.state;

  if (currentState === "paused") {
    // UNPAUSE: Clear the storage
    await browser.storage.local.remove("pauseUntil");
  } else {
    // PAUSE: Set the 2-minute timer
    const pauseTime = Date.now() + (2 * 60 * 1000);
    await browser.storage.local.set({ pauseUntil: pauseTime });
  }
  
  updateUI();
});

// Initial load and per-second refresh
updateUI();
setInterval(updateUI, 1000);
