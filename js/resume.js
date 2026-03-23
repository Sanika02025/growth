document.getElementById('resumeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const skills = document.getElementById('skills').value.split(',');
  const projects = document.getElementById('projects').value.split(',');
  const certifications = document.getElementById('certifications').value.split(',');

  const resumeHTML = `
    <div class="generated-resume">
      <h2>${name}</h2>
      <h3>Skills</h3>
      <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
      <h3>Projects</h3>
      <ul>${projects.map(project => `<li>${project.trim()}</li>`).join('')}</ul>
      <h3>Certifications</h3>
      <ul>${certifications.map(cert => `<li>${cert.trim()}</li>`).join('')}</ul>
    </div>
  `;

  document.getElementById('resumeOutput').innerHTML = resumeHTML;
});

// Optional: Download as PDF using jsPDF
document.getElementById('downloadBtn').addEventListener('click', function () {
  const element = document.querySelector('.generated-resume');
  if (!element) return;

  const opt = {
    margin: 0.5,
    filename: 'My_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
});
function saveResume() {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const phone = document.getElementById("phoneInput").value;
  const education = document.getElementById("educationInput").value;
  const skills = document.getElementById("skillsInput").value;
  const projects = document.getElementById("projectsInput").value;
  const languages = document.getElementById("languagesInput").value;
  const hobbies = document.getElementById("hobbiesInput").value;

  const preview = document.getElementById("resumePreview");
  preview.innerHTML = `
    <h3>${name}</h3>
    <p><strong>📧 Email:</strong> ${email}</p>
    <p><strong>📞 Phone:</strong> ${phone}</p>
    <p><strong>🎓 Education:</strong><br/> ${education.replace(/\n/g, "<br/>")}</p>
    <p><strong>💼 Skills:</strong><br/> ${skills.replace(/\n/g, "<br/>")}</p>
    <p><strong>🛠 Projects:</strong><br/> ${projects.replace(/\n/g, "<br/>")}</p>
    <p><strong>🌐 Languages Known:</strong><br/> ${languages.replace(/\n/g, "<br/>")}</p>
    <p><strong>🎯 Hobbies:</strong><br/> ${hobbies.replace(/\n/g, "<br/>")}</p>
  `;
}

// 📄 Certificate Upload Function
function addCertificate() {
  const imgInput = document.getElementById("certImageInput");
  const title = document.getElementById("certTitleInput").value;
  const platform = document.getElementById("certOrgInput").value;
  const date = document.getElementById("certDateInput").value;
  const certList = document.getElementById("certList");

  if (imgInput.files.length === 0) {
    alert("Please select a certificate image!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const certCard = document.createElement("div");
    certCard.className = "certificate-item";

    certCard.innerHTML = `
      <img src="${e.target.result}" alt="${title}" />
      <div class="cert-details">
        <h4>${title}</h4>
        <p>🏛️ ${platform}</p>
        <p>📅 ${date}</p>
      </div>
    `;

    certList.appendChild(certCard);

    // Reset inputs after upload
    imgInput.value = "";
    document.getElementById("certTitleInput").value = "";
    document.getElementById("certOrgInput").value = "";
    document.getElementById("certDateInput").value = "";
  };

  reader.readAsDataURL(imgInput.files[0]);
}
