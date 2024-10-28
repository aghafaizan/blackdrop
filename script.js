// Sample wallpaper data with categories
const wallpapers = [
  {
    id: 1,
    url: "https://picsum.photos/id/1018/1080/1920",
    title: "Mountain View",
    category: "nature",
  },
  {
    id: 2,
    url: "https://picsum.photos/id/1015/1080/1920",
    title: "Alpine Lake",
    category: "nature",
  },
  {
    id: 3,
    url: "https://picsum.photos/id/1020/1080/1920",
    title: "Abstract Shapes",
    category: "abstract",
  },
  {
    id: 4,
    url: "https://picsum.photos/id/1019/1080/1920",
    title: "Tropical Beach",
    category: "nature",
  },
  {
    id: 5,
    url: "https://picsum.photos/id/1021/1080/1920",
    title: "City Lights",
    category: "urban",
  },
  {
    id: 6,
    url: "https://picsum.photos/id/1039/1080/1920",
    title: "Geometric Patterns",
    category: "abstract",
  },
  {
    id: 7,
    url: "https://picsum.photos/id/1042/1080/1920",
    title: "Urban Skyline",
    category: "urban",
  },
  {
    id: 8,
    url: "https://picsum.photos/id/1043/1080/1920",
    title: "Forest Path",
    category: "nature",
  },
];

// DOM elements
const wallpaperGrid = document.getElementById("wallpaper-grid");
const featuredGrid = document.getElementById("featured-grid");
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

// Render wallpapers to the grid
function renderWallpapers(wallpapers, gridElement) {
  gridElement.innerHTML = "";
  wallpapers.forEach((wallpaper) => {
    const card = createWallpaperCard(wallpaper);
    gridElement.appendChild(card);
  });
}

// Render all wallpapers
function renderAllWallpapers(wallpapers) {
  if (wallpapers.length === 0) {
    notFoundMessage.classList.remove("hidden");
    wallpaperGrid.classList.add("hidden");
  } else {
    notFoundMessage.classList.add("hidden");
    wallpaperGrid.classList.remove("hidden");
    renderWallpapers(wallpapers, wallpaperGrid);
  }
}

// Filter wallpapers based on current category and search term
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
  renderAllWallpapers(filteredWallpapers);
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
    renderAllWallpapers(filteredWallpapers);
  }
});

// Handle wallpaper download
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("download-btn")) {
    const url = e.target.getAttribute("data-url");
    const title = e.target.getAttribute("data-title");
    downloadWallpaper(url, title);
  }
});

// Download wallpaper
function downloadWallpaper(url, title) {
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Get featured wallpapers (random selection)
function getFeaturedWallpapers(count) {
  const shuffled = wallpapers.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Initialize the application
function init() {
  const featuredWallpapers = getFeaturedWallpapers(3);
  renderWallpapers(featuredWallpapers, featuredGrid);
  renderAllWallpapers(wallpapers);
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
