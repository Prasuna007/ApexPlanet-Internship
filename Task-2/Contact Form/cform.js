const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const phoneInput = document.getElementById('phone');
const countryCode = document.getElementById('countryCode');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const phoneError = document.getElementById('phoneError');

function validateName() {
  const name = nameInput.value.trim();
  nameError.textContent =
    name === ''
      ? 'Name is required'
      : name.length < 4
      ? 'Name must be at least 4 characters'
      : '';
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  emailError.textContent =
    email === ''
      ? 'Email is required'
      : !emailPattern.test(email)
      ? 'Enter a valid email'
      : '';
}

function validateMessage() {
  const message = messageInput.value.trim();
  messageError.textContent = message === '' ? 'Message is required' : '';
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const length = countryCode.options[countryCode.selectedIndex].dataset.length;
  const onlyDigits = /^\d+$/;
  phoneError.textContent =
    phone === ''
      ? 'Phone number is required'
      : !onlyDigits.test(phone)
      ? 'Only digits allowed'
      : phone.length !== parseInt(length)
      ? `Enter ${length} digits`
      : '';
}

function updatePhonePlaceholder() {
  const length = countryCode.options[countryCode.selectedIndex].dataset.length;
  phoneInput.placeholder = `Enter ${length} digit number...`;
}

// Dynamic validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);
phoneInput.addEventListener('input', validatePhone);
countryCode.addEventListener('change', () => {
  updatePhonePlaceholder();
  validatePhone();
});

updatePhonePlaceholder(); // Set on load

// Form submit
document.getElementById('contactForm').addEventListener('submit', function (event) {
  validateName();
  validateEmail();
  validateMessage();
  validatePhone();

  if (
    nameError.textContent !== '' ||
    emailError.textContent !== '' ||
    messageError.textContent !== '' ||
    phoneError.textContent !== ''
  ) {
    event.preventDefault();
  } else {
    alert('Form submitted successfully!');
    this.reset();
    updatePhonePlaceholder();
  }
});