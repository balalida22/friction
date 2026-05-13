(async () => {
  const data = await browser.storage.local.get("pauseUntil");
  const now = Date.now();

  // If we are currently in the 2-minute "turn off" period, do nothing
  if (data.pauseUntil && now < data.pauseUntil) return;

  // Create the overlay
  const overlay = document.createElement("div");
  overlay.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:white;z-index:999999;display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:sans-serif;";
  overlay.innerHTML = `
    <h1>Hold on for 10 seconds...</h1>
    <p>Think about your feelings. Why do you want to open this page? Write it down.p>
  `;
  document.documentElement.appendChild(overlay);

  // Remove overlay automatically after 10 seconds
  setTimeout(() => {
    if (overlay.parentNode) overlay.remove();
  }, 10000);
})();
