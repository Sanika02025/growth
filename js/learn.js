// ========== SMART TO-DO ==========
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;
  document.getElementById("task-list").appendChild(li);
  taskInput.value = "";
}

// ========== SUBJECT TRACKER ==========
let subjects = JSON.parse(localStorage.getItem("subjects")) || [
  { name: "Java", total: 10, completed: 4 },
  { name: "DS", total: 8, completed: 2 }
];
let chartInstance = null;

const subjectSelect = document.getElementById("subjectSelect");
const topicList = document.getElementById("topicList");
const newSubjectInput = document.getElementById("newSubjectName");

const defaultSubjectTopics = {
  Java: ["OOP", "Classes", "Inheritance", "Polymorphism", "Exception Handling"],
  DS: ["Arrays", "Linked List", "Stacks", "Queues", "Trees"],
};

let allSubjectTopics = JSON.parse(localStorage.getItem("subjectTopics")) || defaultSubjectTopics;
let allSubjects = JSON.parse(localStorage.getItem("customSubjects")) || Object.keys(defaultSubjectTopics);

function renderSubjectOptions() {
  subjectSelect.innerHTML = `<option value="">-- Select Subject --</option>`;
  allSubjects.forEach(subj => {
    const option = document.createElement("option");
    option.value = subj;
    option.textContent = subj;
    subjectSelect.appendChild(option);
  });
}

function getProgressColor(percent) {
  if (percent < 25) return "#ff4d4d";
  if (percent < 60) return "#f7c948";
  return "#6fcf97";
}

function renderSubjects() {
  const container = document.getElementById("subjectList");
  container.innerHTML = "";

  subjects.forEach((subj, index) => {
    const percent = Math.round((subj.completed / subj.total) * 100);
    const div = document.createElement("div");
    div.classList.add("subject-item");

    div.innerHTML = `
      <div style="flex: 1">
        <strong>${subj.name}</strong><br>
        <span class="progress-info">${subj.completed} / ${subj.total} topics (${percent}%)</span>
        <input type="number" class="edit-completed" value="${subj.completed}" min="0" max="${subj.total}" style="display:none; width:60px; margin-top:5px;" />
        
        <div class="micro-goal-area">
          <input type="text" class="micro-goal-input" value="${subj.goal || ''}" placeholder="🎯 Micro-goal (e.g., Revise Trees)" />
          <button class="save-goal" onclick="saveGoal(${index}, this)">💾</button>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <div style="background:#444; width:120px; height:10px; border-radius:5px; overflow:hidden;">
          <div style="width:${percent}%; height:100%; background:${getProgressColor(percent)};"></div>
        </div>
        <button onclick="editSubject(${index}, this)">✏️</button>
        <button onclick="deleteSubject(${index})" style="background:#ff6b6b;">✖</button>
      </div>
    `;

    container.appendChild(div);
  });

  updateChart();
}

function updateChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  const labels = subjects.map(s => s.name);
  const data = subjects.map(s => Math.round((s.completed / s.total) * 100));

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Completion %',
        data: data,
        backgroundColor: '#6fcf97'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function addNewSubject() {
  const newSub = newSubjectInput.value.trim();
  if (!newSub) return alert("Please enter a valid subject name.");

  if (!allSubjects.includes(newSub)) {
    allSubjects.push(newSub);
    allSubjectTopics[newSub] = [];
    subjects.push({ name: newSub, total: 10, completed: 0 });
    localStorage.setItem("customSubjects", JSON.stringify(allSubjects));
    localStorage.setItem("subjectTopics", JSON.stringify(allSubjectTopics));
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjectOptions();
    renderSubjects();
    newSubjectInput.value = "";
    alert(`Subject '${newSub}' added successfully!`);
  } else {
    alert("Subject already exists.");
  }
}

function saveGoal(index, btn) {
  const input = btn.previousElementSibling;
  subjects[index].goal = input.value.trim();
  localStorage.setItem("subjects", JSON.stringify(subjects));
  alert("Micro-goal saved!");
}

function editSubject(index, btn) {
  const item = btn.closest(".subject-item");
  const input = item.querySelector(".edit-completed");

  if (input.style.display === "none") {
    input.style.display = "inline-block";
    btn.textContent = "💾";
  } else {
    const newCompleted = parseInt(input.value);
    if (isNaN(newCompleted) || newCompleted < 0 || newCompleted > subjects[index].total) {
      alert("Invalid value.");
      return;
    }
    subjects[index].completed = newCompleted;
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjects();
  }
}

function deleteSubject(index) {
  if (confirm("Are you sure you want to delete this subject?")) {
    subjects.splice(index, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    renderSubjects();
  }
}

subjectSelect.addEventListener("change", () => {
  const selected = subjectSelect.value;
  const topics = allSubjectTopics[selected] || [];
  topicList.innerHTML = "";

  topics.forEach(topic => {
    const li = document.createElement("li");
    li.textContent = `⏳ ${topic}`;
    li.addEventListener("click", () => {
      if (li.textContent.startsWith("⏳")) li.textContent = `✔️ ${topic}`;
      else if (li.textContent.startsWith("✔️")) li.textContent = `🌸 ${topic}`;
      else li.textContent = `⏳ ${topic}`;
    });
    topicList.appendChild(li);
  });
});

// ========== DAILY STUDY SCHEDULE ==========
let today = new Date().toISOString().split("T")[0];
let fullSchedule = JSON.parse(localStorage.getItem("fullSchedule")) || {};
if (!fullSchedule[today]) fullSchedule[today] = [];

function addSchedule() {
  const time = document.getElementById("scheduleTime").value;
  const subject = document.getElementById("scheduleSubject").value.trim();
  const topic = document.getElementById("scheduleTopic").value.trim();

  if (!time || !subject || !topic) {
    alert("Please fill all fields.");
    return;
  }

  fullSchedule[today].push({ time, subject, topic });
  localStorage.setItem("fullSchedule", JSON.stringify(fullSchedule));
  renderTodaySchedule();

  document.getElementById("scheduleTime").value = "";
  document.getElementById("scheduleSubject").value = "";
  document.getElementById("scheduleTopic").value = "";
}

function deleteSchedule(index) {
  fullSchedule[today].splice(index, 1);
  localStorage.setItem("fullSchedule", JSON.stringify(fullSchedule));
  renderTodaySchedule();
}

function editSchedule(index) {
  const item = fullSchedule[today][index];
  const newTime = prompt("Edit Time:", item.time);
  const newSubject = prompt("Edit Subject:", item.subject);
  const newTopic = prompt("Edit Topic:", item.topic);

  if (newTime && newSubject && newTopic) {
    fullSchedule[today][index] = { time: newTime, subject: newSubject, topic: newTopic };
    localStorage.setItem("fullSchedule", JSON.stringify(fullSchedule));
    renderTodaySchedule();
  }
}

function renderTodaySchedule() {
  const list = document.getElementById("todaySchedule");
  list.innerHTML = "";

  (fullSchedule[today] || []).forEach((item, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${item.time} — ${item.subject}: ${item.topic}`;
    li.appendChild(text);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editSchedule(index);
    li.appendChild(editBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑";
    delBtn.onclick = () => deleteSchedule(index);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function renderWeekHistory() {
  const container = document.getElementById("weekLog");
  container.innerHTML = "";
  Object.keys(fullSchedule).forEach(date => {
    const dateDiv = document.createElement("div");
    dateDiv.innerHTML = `<h4>${date}</h4>`;
    const ul = document.createElement("ul");
    fullSchedule[date].forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.time} — ${entry.subject}: ${entry.topic}`;
      ul.appendChild(li);
    });
    dateDiv.appendChild(ul);
    container.appendChild(dateDiv);
  });
}

window.addEventListener("load", () => {
  renderSubjectOptions();
  renderSubjects();
  renderTodaySchedule();
  renderWeekHistory();
});
