// Sidebar toggle logic
let sidebarOpen = false;
let sidebar = document.getElementById("sideBar");
function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("side-responsive");
    sidebar.style.display = "inline";
    sidebarOpen = true;
  }
}
function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("side-responsive");
    sidebar.style.display = "none";
    sidebarOpen = false;
  }
}
// Demo data for platforms
const demoData = {
  overview: { posts: 157, followers: 10200, username: "DashboardUser", comments: 304 },
  twitter:  { posts: 82,  followers: 4100,  username: "tw_username",  comments: 95 },
  instagram:{ posts: 39,  followers: 6900,  username: "insta_user",   comments: 43 },
  facebook: { posts: 36,  followers: 1200,  username: "fb.user",      comments: 166 }
};
// Main dashboard logic
function setDashboard(platform) {
  let data = demoData[platform] || demoData.overview;
  document.getElementById("posts-count").textContent = data.posts;
  document.getElementById("followers-count").textContent = data.followers;
  document.getElementById("username").textContent = data.username;
  document.getElementById("comments-count").textContent = data.comments;
  document.getElementById("section-title").textContent =
    platform === "overview" ? "All Platforms Overview" : `${capitalize(platform)} Stats`;
}
function refreshData(type) {
  const displayId = type === "user" ? "username" : type + "-count";
  document.getElementById(displayId).textContent = "...";
  setTimeout(() => {
    if (type === "followers") {
      document.getElementById('followers-count').textContent = Math.floor(Math.random() * 10000) + 1000;
    } else {
      setDashboard(currentPlatform);
    }
  }, 500);
}
let currentPlatform = "overview";
function showSection(platform) {
  currentPlatform = platform;
  setDashboard(platform);
  document.getElementById("platform-specific-content").innerHTML =
    platform === "overview"
      ? ""
      : `<div class="platform-details">
          <h3>${capitalize(platform)} Details (demo)</h3>
          <p>Here you would load platform-specific insights, stories, or top posts for <b>${capitalize(platform)}</b>.</p>
        </div>`;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if ((prefersDarkScheme && localStorage.getItem("darkMode") !== "false") ||
    localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "☀️";
}
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark);
});
// Logout button
document.getElementById("logoutBtn").onclick = function logout() {
  localStorage.removeItem("dashboard_jwt");
  window.location.href = "login.html";
};
// Init
window.onload = () => {
  setDashboard("overview");
};
