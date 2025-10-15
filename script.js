const downloadBtn = document.getElementById('download-btn');
const page = document.querySelector('.page');
const topContainer = document.getElementById('top-container');
const modeBtn = document.getElementById('mode-btn');

// PDF Download
function downloadResume() {
  applyLightMode(); // resume should be downloaded in Light mode
  topContainer.style.display = 'none'; //top-container should be removed
  const element = document.querySelector(".page");
  const opt = {
    margin: 0.5,
    filename: 'my_resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    topContainer.style.display = 'flex';
  });
}
downloadBtn.addEventListener('click', downloadResume);

// Local Storage Integration
window.addEventListener('load', () => {
  const savedResume = localStorage.getItem('resumeContent');
  if (savedResume) page.innerHTML = savedResume;
});

// Auto-save changes
page.addEventListener('input', () => {
  localStorage.setItem('resumeContent', page.innerHTML);
});


//Dark mode functionality
let isDark = false;

function applyDarkMode() {
  //dark mode styles
  document.body.style.background = '#333';
  document.body.style.color = 'white';
  document.querySelectorAll('.section-title').forEach(section => {
    section.style.color = 'white';
  })
  downloadBtn.style.background = '#FF9100'
  downloadBtn.style.color = 'black'
  modeBtn.innerText = '🌙';
  document.querySelector('.footer').style.color = 'white';
  document.getElementById('menu-panel').style.background = '#333';
  document.querySelector('#menu-panel h3').style.color = 'white'
}

function applyLightMode() {
  //light mode styles
  document.body.style.background = 'white';
  document.body.style.color = 'black';
  document.querySelectorAll('.section-title').forEach(section => {
    section.style.color = 'black';
  })
  downloadBtn.style.background = '#4CAF50'
  downloadBtn.style.color = 'white'
  modeBtn.innerText = '☀️';
  document.querySelector('.footer').style.color = 'black';
  document.getElementById('menu-panel').style.background = 'white';
  document.querySelector('#menu-panel h3').style.color = '#007bff'
}

modeBtn.addEventListener('click',()=>{
  if(isDark){
    isDark = false;
    applyLightMode();
  }
  else{
    isDark = true;
    applyDarkMode();
  }
})

function toggleMenu() {
  const panel = document.getElementById('menu-panel');
  const overlay = document.getElementById('menu-overlay');
  panel.classList.toggle('active');
  overlay.classList.toggle('active');
}

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const checkbox = document.querySelector(`#menu-panel input[onchange="toggleSection('${sectionId}')"]`);
  
  if (checkbox.checked) {
    section.style.display = 'block'; // Show section
  } else {
    section.style.display = 'none'; // Hide section
  }
}



