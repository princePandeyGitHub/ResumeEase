const downloadBtn = document.getElementById('download-btn');

function downloadResume() {
  // hide button before saving
  downloadBtn.style.display = 'none';

  const element = document.querySelector(".page");
  const opt = {
    margin:       0.5,
    filename:     'my_resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    // show button back after saving
    downloadBtn.style.display = 'block';
  });
}

// attach event listener correctly
downloadBtn.addEventListener('click', downloadResume);