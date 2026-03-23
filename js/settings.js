const darkModeToggle = document.getElementById('darkModeToggle');
const themeSelector = document.getElementById('themeSelector');

// 🌗 Dark Mode Toggle
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  localStorage.setItem("darkMode", darkModeToggle.checked);
});

// 🎨 Theme Selector
themeSelector.addEventListener('change', () => {
  const theme = themeSelector.value;
  document.body.className = ''; // Clear previous classes
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
});

// 🔠 Font Size
function increaseFont() {
  document.body.style.fontSize = '1.1em';
  localStorage.setItem("fontSize", '1.1em');
}

function decreaseFont() {
  document.body.style.fontSize = '0.95em';
  localStorage.setItem("fontSize", '0.95em');
}

// 🌓 Contrast
function toggleContrast() {
  document.body.classList.toggle("high-contrast");
  localStorage.setItem("contrast", document.body.classList.contains("high-contrast"));
}

// 🔤 Font Family
function changeFontFamily(font) {
  document.body.style.fontFamily = font;
  localStorage.setItem("fontFamily", font);
}

// ♻️ Reset Settings
function resetSettings() {
  document.body.className = '';
  document.body.style.fontSize = '';
  document.body.style.fontFamily = '';
  darkModeToggle.checked = false;
  themeSelector.value = 'default';
  localStorage.clear();
  alert("✅ UI settings have been reset!");
}

// 💾 Load saved preferences
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark = localStorage.getItem("darkMode") === "true";
  const isContrast = localStorage.getItem("contrast") === "true";
  const fontSize = localStorage.getItem("fontSize");
  const fontFamily = localStorage.getItem("fontFamily");

  if (savedTheme) {
    document.body.classList.add(savedTheme);
    if (themeSelector) themeSelector.value = savedTheme;
  }

  if (isDark) {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  if (isContrast) {
    document.body.classList.add("high-contrast");
  }

  if (fontSize) {
    document.body.style.fontSize = fontSize;
  }

  if (fontFamily) {
    document.body.style.fontFamily = fontFamily;
  }
});
