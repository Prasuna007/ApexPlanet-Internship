const toggleBtn = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleIcon.classList.toggle('bx-moon');
  toggleIcon.classList.toggle('bx-sun');
  toggleIcon.classList.add('animate');
  toggleIcon.addEventListener('animationend', () => {
    toggleIcon.classList.remove('animate');
  }, { once: true });
});