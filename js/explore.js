// === Course Filtering ===
const courses = [
  {
    title: "Introduction to Web Dev",
    category: "tech",
    level: "beginner",
    link: "https://www.freecodecamp.org/",
  },
  {
    title: "Healthy Eating Basics",
    category: "health",
    level: "beginner",
    link: "https://www.coursera.org/learn/nutrition",
  },
  {
    title: "Career Prep Skills",
    category: "career",
    level: "intermediate",
    link: "https://www.linkedin.com/learning/",
  },
  {
    title: "Advanced JavaScript",
    category: "tech",
    level: "advanced",
    link: "https://javascript.info/",
  },
];

function displayCourses(filteredCourses) {
  const container = document.getElementById("courseCards");
  container.innerHTML = "";

  if (filteredCourses.length === 0) {
    container.innerHTML = "<p>No matching courses found.</p>";
    return;
  }

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.className = "certificate-item";
    div.innerHTML = `
      <h4>${course.title}</h4>
      <p>${course.level.charAt(0).toUpperCase() + course.level.slice(1)} - ${course.category}</p>
      <a href="${course.link}" target="_blank">Visit</a>
    `;
    container.appendChild(div);
  });
}

function filterCourses() {
  const category = document.getElementById("courseCategory").value;
  const level = document.getElementById("courseLevel").value;

  const filtered = courses.filter(course => {
    return (!category || course.category === category) &&
           (!level || course.level === level);
  });

  displayCourses(filtered);
}

document.getElementById("courseCategory").addEventListener("change", filterCourses);
document.getElementById("courseLevel").addEventListener("change", filterCourses);

// Show all by default
displayCourses(courses);


// === Growth Track Suggestions ===
const suggestions = {
  developer: [
    { title: "HTML/CSS Crash Course", link: "https://www.codecademy.com/learn" },
    { title: "JS for Beginners", link: "https://javascript.info/" },
  ],
  data: [
    { title: "Intro to Data Analysis", link: "https://www.kaggle.com/learn" },
    { title: "Excel for Data", link: "https://www.coursera.org/learn/excel-data-analysis" },
  ],
  designer: [
    { title: "UI Basics", link: "https://www.learnui.design/" },
    { title: "Figma Crash Course", link: "https://www.figma.com/resources/learn-design/" },
  ],
  fitness: [
    { title: "Home Workouts", link: "https://www.fitnessblender.com/" },
    { title: "Stretching Guide", link: "https://darebee.com/" },
  ],
  sleep: [
    { title: "Sleep Science", link: "https://www.sleepfoundation.org/" },
    { title: "Relaxation Tips", link: "https://www.headspace.com/" },
  ],
  mental: [
    { title: "Mindfulness Guide", link: "https://www.calm.com/" },
    { title: "Journaling Prompts", link: "https://positivepsychology.com/gratitude-journal/" },
  ]
};

function showTrackSuggestions() {
  const career = document.getElementById("careerTrack").value;
  const wellness = document.getElementById("wellnessTrack").value;
  const container = document.getElementById("trackSuggestions");
  container.innerHTML = "";

  let combined = [];
  if (career && suggestions[career]) {
    combined = combined.concat(suggestions[career]);
  }
  if (wellness && suggestions[wellness]) {
    combined = combined.concat(suggestions[wellness]);
  }

  if (combined.length === 0) {
    container.innerHTML = "<p>No suggestions yet. Choose a track.</p>";
    return;
  }

  combined.forEach(item => {
    const div = document.createElement("div");
    div.className = "certificate-item";
    div.innerHTML = `
      <h4>${item.title}</h4>
      <a href="${item.link}" target="_blank">Visit</a>
    `;
    container.appendChild(div);
  });
}

document.getElementById("careerTrack").addEventListener("change", showTrackSuggestions);
document.getElementById("wellnessTrack").addEventListener("change", showTrackSuggestions);
