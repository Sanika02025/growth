// Load from localStorage
let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

const today = new Date();
const todayStr = today.toLocaleDateString();
const yesterdayStr = new Date(today.setDate(today.getDate() - 1)).toLocaleDateString();

// Filter only today & yesterday
tasks = tasks.filter(t => t.date === todayStr || t.date === yesterdayStr);

// Save back the cleaned task list
localStorage.setItem("dailyTasks", JSON.stringify(tasks));

// Add new task
document.getElementById("addTask").addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput").value.trim();
  const taskTime = document.getElementById("taskTime").value;
  const taskCategory = document.getElementById("taskCategory").value;
  const taskPriority = document.getElementById("taskPriority").value;
  const taskDate = new Date().toLocaleDateString();

  if (taskInput && taskTime) {
    tasks.push({
      time: taskTime,
      task: taskInput,
      category: taskCategory,
      priority: taskPriority,
      date: taskDate
    });

    // Sort and store
    tasks.sort((a, b) => a.time.localeCompare(b.time));
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));
    renderTasks();
    document.getElementById("taskInput").value = "";
    document.getElementById("taskTime").value = "";
  }
});

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskSchedule");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${t.time}</strong> – ${t.task}
      <span class="tag category">${t.category}</span>
      <span class="tag priority ${t.priority.toLowerCase()}">${t.priority}</span>
    `;
    list.appendChild(li);
  });
}

renderTasks();

// 🎯 Update Progress Ring
function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const circle = document.querySelector(".circle");
  const text = document.querySelector(".percentage");
  circle.setAttribute("stroke-dasharray", `${percent}, 100`);
  text.textContent = `${percent}%`;
}

updateProgress();

// 🧲 Drag and Drop Logic
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.innerText);
}
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerText = data;
  ev.target.appendChild(newTask);
}

// ⏳ Exam Countdown
document.getElementById("setCountdown").addEventListener("click", () => {
  const name = document.getElementById("examName").value;
  const date = new Date(document.getElementById("examDate").value);
  const now = new Date();
  const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  document.getElementById("countdownResult").textContent =
    diff >= 0 ? `⏳ ${name} is in ${diff} day(s)` : "✅ Done!";
});
