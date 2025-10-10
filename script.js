const downloadBtn = document.getElementById('download-btn');
const page = document.querySelector('.page');

// PDF Download
function downloadResume() {
  downloadBtn.style.display = 'none';
  const element = document.querySelector(".page");
  const opt = {
    margin: 0.5,
    filename: 'my_resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    downloadBtn.style.display = 'block';
  });
}
downloadBtn.addEventListener('click', downloadResume);

// Local Storage Integration
window.addEventListener('load', () => {
  const savedResume = localStorage.getItem('resumeContent');
  if (savedResume) page.innerHTML = savedResume;

  // Load dark mode preference
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'true') document.body.classList.add('dark-mode');
});

// Auto-save changes
page.addEventListener('input', () => {
  localStorage.setItem('resumeContent', page.innerHTML);
});

// 🌗 Dark/Light Mode Toggle
const modeBtn = document.createElement('button');
modeBtn.id = 'mode-btn';
modeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
document.body.appendChild(modeBtn);

modeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  modeBtn.textContent = isDark ? '☀️' : '🌙';
});
