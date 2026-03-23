// 🌸 Bloom Tracker
const bloomInput = document.getElementById('bloomInput');
bloomInput.addEventListener('input', () => {
  localStorage.setItem('bloomOfDay', bloomInput.value);
});
window.addEventListener('load', () => {
  bloomInput.value = localStorage.getItem('bloomOfDay') || '';
});

// 🎯 Micro-goal Tracker
const goalInput = document.getElementById('goalInput');
const goalText = document.getElementById('goalText');
const percentageText = document.querySelector('.percentage');
const circle = document.querySelector('.circle');

goalInput.addEventListener('input', () => {
  localStorage.setItem('microGoal', goalInput.value);
  goalText.textContent = "🔸 Planned: " + goalInput.value;
});
window.addEventListener('load', () => {
  goalInput.value = localStorage.getItem('microGoal') || '';
  goalText.textContent = "🔸 Planned: " + goalInput.value;
});

document.getElementById('markGoalBtn').addEventListener('click', () => {
  circle.setAttribute('stroke-dasharray', '100, 100');
  percentageText.textContent = "100%";
  goalText.textContent += " ✅ Completed!";
  alert("✅ Micro-goal marked complete!");
});

// 📊 Quick Stats & Streak
const examDate = new Date("2025-07-18");
const examCountdown = document.getElementById("examCountdown");
const streakCount = document.getElementById("streakCount");

function updateStats() {
  const now = new Date();
  const daysLeft = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
  examCountdown.textContent = `${daysLeft} days left`;

  let lastDate = localStorage.getItem("lastVisitDate");
  let currentDate = now.toLocaleDateString();
  let streak = parseInt(localStorage.getItem("studyStreak")) || 0;

  if (lastDate !== currentDate) {
    streak++;
    localStorage.setItem("studyStreak", streak);
    localStorage.setItem("lastVisitDate", currentDate);
  }

  streakCount.textContent = `${streak} Days`;
}
updateStats();

// 💬 Daily Quote
const quotes = [
  "You are growing even if it’s slow.",
  "Focus on your bloom, not others'.",
  "One day at a time, one page at a time.",
  "Keep going. Even small steps matter.",
  "You are your best investment."
];
document.getElementById("dailyQuote").textContent =
  `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;

// 📈 Mood vs Study Chart
const ctx = document.getElementById("moodChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood (1-5)",
        data: [3, 4, 5, 3, 2, 4, 5],
        borderColor: "#ff6384",
        fill: false
      },
      {
        label: "Study Hours",
        data: [2, 3, 4, 1, 0, 3, 4],
        borderColor: "#36a2eb",
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#333" } }
    },
    scales: {
      x: { ticks: { color: "#333" } },
      y: { ticks: { color: "#333" }, beginAtZero: true }
    }
  }
});

// 📅 Mini Calendar
const calendar = document.getElementById("calendarPreview");
const today = new Date().getDay(); // 0-6 (Sun-Sat)
const days = ["S", "M", "T", "W", "T", "F", "S"];
calendar.innerHTML = days.map((d, i) => {
  return `<span style="margin:5px; padding:6px 10px; border-radius:6px; background:${i === today ? '#00c9a7' : '#eee'}; color:${i === today ? '#fff' : '#000'};">${d}</span>`;
}).join(" ");
