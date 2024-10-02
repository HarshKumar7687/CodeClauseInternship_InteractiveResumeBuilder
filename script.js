let currentStep = 1;
const totalSteps = 7;

// Handle Next Buttons
document.querySelectorAll('.next-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    }
  });
});

// Handle Previous Buttons
document.querySelectorAll('.prev-btn').forEach(button => {
  button.addEventListener('click', () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });
});

// Function to Show Specific Step
function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById('step-' + i).classList.remove('active');
  }
  document.getElementById('step-' + step).classList.add('active');
  currentStep = step;
}

// Function to Generate Resume
function generateResume() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value;
  const projects = document.getElementById('projects').value;
  const certifications = document.getElementById('certifications').value;
  const template = document.getElementById('template').value;

  const resumePreview = document.getElementById('resumePreview');
  const profilePhotoInput = document.getElementById('profilePhoto');

  let profilePhotoHTML = '';

  if (profilePhotoInput.files && profilePhotoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profilePhotoHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
      updateResumeContent();
    };
    reader.readAsDataURL(profilePhotoInput.files[0]);
  } else {
    updateResumeContent();
  }

  function updateResumeContent() {
    const resumeHTML = `
      ${profilePhotoHTML}
      <div class="resume-header">
        <h1>${name}</h1>
        <p>Email: <a href="mailto:${email}">${email}</a> | Phone: <a href="tel:${phone}">${phone}</a></p>
      </div>
      <hr>
      <div class="resume-section">
        <h2>Education</h2>
        <p>${education.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="resume-section">
        <h2>Experience</h2>
        <p>${experience.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="resume-section">
        <h2>Skills</h2>
        <p>${skills.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="resume-section">
        <h2>Projects</h2>
        <p>${projects.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="resume-section">
        <h2>Certifications</h2>
        <p>${certifications.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    resumePreview.innerHTML = resumeHTML;
    resumePreview.className = 'resume-template ' + template;
    document.getElementById('downloadBtn').style.display = 'block';
  }
}

// Function to Download Resume as PDF
function downloadResume() {
  const resume = document.getElementById('resumePreview');
  const opt = {
    margin: 0.5,
    filename: 'my_resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  html2pdf().from(resume).set(opt).save();
}
