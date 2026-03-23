// SUBJECT COMPLETION CHART
const subjectCtx = document.getElementById('subjectChart').getContext('2d');
new Chart(subjectCtx, {
  type: 'bar',
  data: {
    labels: ['Physics', 'Chemistry', 'Java', 'DS'],
    datasets: [{
      label: 'Topics Completed (%)',
      data: [70, 45, 60, 50],
      backgroundColor: ['#6FCF97', '#F2994A', '#56CCF2', '#BB6BD9'],
      borderRadius: 10
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});

// MOOD VS PERFORMANCE CHART
const moodPerformanceCtx = document.getElementById('moodPerformanceChart').getContext('2d');
new Chart(moodPerformanceCtx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Mood (1–5)',
      data: [3, 4, 2, 5, 4],
      borderColor: '#F2994A',
      tension: 0.4,
      fill: false
    }, {
      label: 'Study Hours',
      data: [2, 3, 1.5, 4, 3.5],
      borderColor: '#6FCF97',
      tension: 0.4,
      fill: false
    }]
  },
  options: {
    responsive: true
  }
});

// LEARNING PROGRESS BAR CHART
const learningCtx = document.getElementById("learningChart").getContext("2d");
new Chart(learningCtx, {
  type: "bar",
  data: {
    labels: ["DS", "COA", "Java", "Design", "Sanskrit"],
    datasets: [{
      label: "Topics Completed",
      data: [5, 7, 4, 6, 3],
      backgroundColor: "#5dc18b",
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// MOOD VS STUDY CHART
const moodStudyCtx = document.getElementById("moodStudyChart").getContext("2d");
new Chart(moodStudyCtx, {
  type: "line",
  data: {
    labels: ["Jul 9", "Jul 10", "Jul 11", "Jul 12", "Jul 13"],
    datasets: [
      {
        label: "Mood (1-5)",
        data: [3, 4, 2, 5, 4],
        borderColor: "#ffd369",
        fill: false,
      },
      {
        label: "Study Hours",
        data: [2, 4, 3, 5, 4],
        borderColor: "#5dc18b",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
