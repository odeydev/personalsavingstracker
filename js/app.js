const addBtn = document.querySelector("#add-btn");
const modal = document.querySelector(".modal-container");
const closeBtn = document.querySelector("#close");

addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
