const bottomNav = document.querySelector(".bottom-navigation");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");

  if (menuToggle.classList.contains("active")) {
    bottomNav.style.display = "block";
  } else {
    bottomNav.style.display = "none";
  }
});
