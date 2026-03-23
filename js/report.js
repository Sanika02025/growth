document.getElementById('reportForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('reportName').value;
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  const mood = document.getElementById('moodSummary').value;
  const study = document.getElementById('studySummary').value;

  const reportHTML = `
    <div class="generated-report">
      <h2>${name}'s Report</h2>
      <p><strong>From:</strong> ${start} <strong>To:</strong> ${end}</p>
      <h3>Mood Summary</h3>
      <p>${mood}</p>
      <h3>Study Summary</h3>
      <p>${study}</p>
    </div>
  `;

  document.getElementById('reportOutput').innerHTML = reportHTML;
});

// PDF download
document.getElementById('downloadReportBtn').addEventListener('click', function () {
  const reportElement = document.querySelector('.generated-report');
  if (!reportElement) return;

  const opt = {
    margin: 0.5,
    filename: 'Study_Mood_Report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(reportElement).set(opt).save();
});
// 📘 Dummy Study Report PDF Generator
function generateStudyReport() {
  const blob = new Blob(["Study Report\n\n- Topics Completed\n- Hours Studied\n- Goals Achieved"], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Study_Report.pdf";
  link.click();
}

// 😊 Dummy Mood Report Generator
function generateMoodReport() {
  const blob = new Blob(["Mood Report\n\n- Mood Trends\n- Journal Highlights\n- Stress Level Insights"], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Mood_Report.pdf";
  link.click();
}

// 📂 Dummy Growth Portfolio Download
function downloadPortfolio() {
  const blob = new Blob(["Growth Portfolio Summary"], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Growth_Portfolio.pdf";
  link.click();
}

// 📝 Resume PDF Download
document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input, textarea");
  const resumeText = Array.from(inputs).map(i => i.value).join("\n\n");

  const blob = new Blob([resumeText], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Resume.pdf";
  link.click();
});
function downloadPDF(sectionId, filename) {
  const section = document.getElementById(sectionId);

  // Load jsPDF from the window object (UMD build)
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("GrowSphere Report", 20, 20);
  doc.text(section.innerText, 20, 40);
  doc.save(`${filename}.pdf`);
}
