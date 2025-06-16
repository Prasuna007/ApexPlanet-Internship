// Auto-scrolling carousel
let currentSlide = 0;
const slides = document.querySelectorAll('#carousel img');
setInterval(() => {
  slides[currentSlide].style.opacity = 0;
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].style.opacity = 1;
}, 4000);

// Upload and dynamic collage
const imageUpload = document.getElementById('imageUpload');
const gallery = document.getElementById('gallery');

imageUpload.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  files.forEach((file) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement('img');
      img.src = event.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Dark/Light mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleIcon.classList.replace('bx-moon', 'bx-sun');
  } else {
    toggleIcon.classList.replace('bx-sun', 'bx-moon');
  }
  toggleIcon.classList.add('animate');
  toggleIcon.addEventListener('animationend', () => {
    toggleIcon.classList.remove('animate');
  }, { once: true });
});