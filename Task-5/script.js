/* Theme Toggle */
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerHTML = "<i class='fa-solid fa-sun'></i>";
}
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.innerHTML = isDark ? "<i class='fa-solid fa-sun'></i>" : "<i class='fa-solid fa-moon'></i>";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* Expand Details */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".open-details, .close-details");
  if (!btn) return;
  const card = btn.closest(".product-card");
  card.classList.toggle("expand");
});

/* Genre Hover Pause */
const track = document.querySelector(".genre-track");
track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");

/* Wishlist and Cart Counters */
let wishCount = 0;
let cartCount = 0;

document.querySelectorAll(".wishlist").forEach(btn => {
  btn.addEventListener("click", () => {
    wishCount++;
    const wishBadge = document.getElementById("wishCount");
    wishBadge.textContent = wishCount;
    wishBadge.classList.add("pulse");
    setTimeout(() => wishBadge.classList.remove("pulse"), 300);
  });
});

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    cartCount++;
    const cartBadge = document.getElementById("cartCount");
    cartBadge.textContent = cartCount;
    cartBadge.classList.add("pulse");
    setTimeout(() => cartBadge.classList.remove("pulse"), 300);
  });
});

/* Back to Top Button */
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});