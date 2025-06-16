const jokeBox = document.getElementById("jokeBox");
const generateBtn = document.getElementById("generateBtn");

// Highlight potential puns/keywords
function stylizeJoke(text) {
  const keywords = ["pun", "joke", "funny", "laugh", "humor", "chicken", "knock", "why", "because", "you", "double standards"];
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

generateBtn.addEventListener("click", () => {
  fetch("https://v2.jokeapi.dev/joke/Any?type=single") // JokeAPI (clean, fast)
    .then(res => res.json())
    .then(data => {
      const joke = data.joke || "No joke found.";
      jokeBox.innerHTML = stylizeJoke(joke);
    })
    .catch(err => {
      jokeBox.innerHTML = "Oops! Could not fetch a joke.";
      console.error(err);
    });
});

// Dark Mode Toggle
const toggleBtn = document.getElementById("darkModeToggle");
const toggleIcon = document.getElementById("toggleIcon");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleIcon.classList.replace("bx-moon", "bx-sun");
  } else {
    toggleIcon.classList.replace("bx-sun", "bx-moon");
  }
  toggleIcon.classList.add("animate");
  toggleIcon.addEventListener("animationend", () => {
    toggleIcon.classList.remove("animate");
  }, { once: true });
});