const hamBtn = document.querySelector(".menu-icon");
const header = document.querySelector(".projects-header");
hamBtn.addEventListener("click", () => {
    header.classList.toggle("active");
})

const cards = document.getElementById("desktop-cards");
const body= document.getElementsByTagName("body")[0];
window.addEventListener('click', e=> {
    if(window.innerWidth<=1000) return;
    spawnImage(e.pageX, e.pageY)
})

function spawnImage(x, y) {
    const img = document.createElement("img");
    const imgDiv = document.createElement("div");
    const textDiv = document.createElement("div");
    const text = document.createElement("p");
    const head = document.createElement("h2");

    img.src = "https://cdn.dribbble.com/users/5950324/screenshots/18602246/media/f884b07744186cf7a02d87694968d7bd.jpg?compress=1&resize=800x600&vertical=top";
    img.loading = "lazy";
    img.style.width = "100%";


    imgDiv.classList.add("desktop-card-img");
    imgDiv.style.top = `${y}px`;
    imgDiv.style.left = `${x}px`;
    
    
    text.innerHTML= "This is a sample project we did.";
    head.innerHTML = "Project Name";
    textDiv.classList.add("project-text")
    
    textDiv.append(head, text)
    imgDiv.append(img, textDiv);
    cards.append(imgDiv);
    body.append(cards);
}