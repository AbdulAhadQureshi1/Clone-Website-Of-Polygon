const hamBtn = document.querySelector(".menu-icon");
const header = document.querySelector(".about-header");
hamBtn.addEventListener("click", () => {
    header.classList.toggle("active");
})