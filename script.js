// DOM elements
const wallpaperGrid = document.getElementById("wallpaper-grid");
const searchInput = document.getElementById("search");
const categoriesNav = document.getElementById("categories");
const notFoundMessage = document.getElementById("not-found");

// Current state
let currentCategory = "all";
let currentSearchTerm = "";

// Create a wallpaper card element
function createWallpaperCard(wallpaper) {
  const card = document.createElement("div");
  card.className = "wallpaper-card";
  card.innerHTML = `
        <img src="${wallpaper.url}" alt="${wallpaper.title}" class="wallpaper-image">
        <div class="wallpaper-info">
            <h2 class="wallpaper-title">${wallpaper.title}</h2>
            <button class="download-btn" data-url="${wallpaper.url}" data-title="${wallpaper.title}">Download</button>
        </div>
    `;
  return card;
}

//faizan
// JavaScript for popup and download logic

// Variables to control countdown
let countdownInterval;
let countdown = 10; // Default 10 seconds countdown

// Function to handle wallpaper download with a countdown
function handleDownloadWithPopup(url, title) {
  const popup = document.getElementById("download-popup");
  const countdownElement = document.getElementById("countdown");

  // Reset countdown
  countdown = 10;
  countdownElement.textContent = countdown;

  // Show the popup
  popup.classList.remove("hidden");

  // Update countdown every second
  countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      popup.classList.add("hidden"); // Hide the popup
      downloadWallpaper(url, title); // Trigger the download
    }
  }, 1000);
}

// Function to handle closing the popup and canceling the download
function closePopup() {
  const popup = document.getElementById("download-popup");

  // Hide the popup
  popup.classList.add("hidden");

  // Clear the countdown interval to stop the countdown
  clearInterval(countdownInterval);
}

// Event listener for the "Download" button to show the popup
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("download-btn")) {
    const url = e.target.getAttribute("data-url");
    const title = e.target.getAttribute("data-title");
    handleDownloadWithPopup(url, title);
  }
});

// Event listener for the "X" button to close the popup
document.getElementById("close-popup").addEventListener("click", closePopup);

// Render wallpapers to the grid
function renderWallpapers(wallpapers) {
  wallpaperGrid.innerHTML = "";
  if (wallpapers.length === 0) {
    notFoundMessage.classList.remove("hidden");
    wallpaperGrid.classList.add("hidden");
  } else {
    notFoundMessage.classList.add("hidden");
    wallpaperGrid.classList.remove("hidden");
    wallpapers.forEach((wallpaper) => {
      const card = createWallpaperCard(wallpaper);
      wallpaperGrid.appendChild(card);
    });
  }
}

// Filter wallpapers based on current category and search termfunction filterWallpapers() {
function filterWallpapers() {
  return wallpapers.filter(
    (wallpaper) =>
      (currentCategory === "all" || wallpaper.category === currentCategory) &&
      wallpaper.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
  );
}

// Handle search input
searchInput.addEventListener("input", (e) => {
  currentSearchTerm = e.target.value;
  const filteredWallpapers = filterWallpapers();
  renderWallpapers(filteredWallpapers);
});

// Handle category selection
categoriesNav.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-btn")) {
    currentCategory = e.target.getAttribute("data-category");
    document
      .querySelectorAll(".category-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    const filteredWallpapers = filterWallpapers();
    renderWallpapers(filteredWallpapers);
  }
});

// Handle wallpaper download
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("download-btn")) {
//     const url = e.target.getAttribute("data-url");
//     const title = e.target.getAttribute("data-title");
//     downloadWallpaper(url, title);
//   }
// });

// Download wallpaper
function downloadWallpaper(url, title) {
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initialize the application
function init() {
  renderWallpapers(wallpapers);
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
