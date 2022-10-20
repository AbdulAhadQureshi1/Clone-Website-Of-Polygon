// loader
const loader = document.querySelector(".loader");

// grabbing and scrolling variables
const slider = document.querySelector(".container");
let isDown = false;
let startX;
let scrollLeft;

// parallax elements
const subTitleLeft = document.querySelector(".title-bottom-left");
const subTitleRight = document.querySelector(".title-bottom-right");
const subTitleLeftLeft = document.querySelector(".subtitle.left");
const subTitleRightRight = document.querySelector(".subtitle.right");
const projectsBtn = document.querySelector(".bottom-left-projects");
const aboutBtn = document.querySelector(".bottom-right-about");

// parallax variables
let leftAttr;
let rightAttr;
let leftSubAttr;
let rightSubAttr;
let projectsAttr;
let aboutAttr;


function showLoader() {
    loader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function hideLoader() {
    loader.style.display = 'none';
}

// always spawn at the center
window.addEventListener("load", () => {
    showLoader();
    slider.scrollLeft = (slider.scrollWidth - slider.clientWidth)/2;
    hideLoader();
})

// event listeners and the functionality
slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;

    //get the current location for parallax effects
    setAttrs();

    cancelMomentumTracking();
});
slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove('active')
});
slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove('active')
    beginMomentumTracking();
});
slider.addEventListener("mousemove", (e) => {
    if(!isDown) return;
    e.preventDefault();
    const walk = setNewSliderLocation(e);

    // parallax locations
    const decreasingFactor = 5;
    const variation = walk/decreasingFactor;
    setNewLocations(variation);
});

function setNewSliderLocation(e) {
    const x = e.pageX - slider.offsetLeft;
    let walk = (x - startX);
    var prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft -  (walk * 1.8);
    // startX = e.pageX - slider.offsetLeft;
    velX = slider.scrollLeft - prevScrollLeft;
    if(velX == 0) return;
    return walk;
}

// Attr functions
function setAttrs(){
    leftAttr = subTitleLeft.offsetLeft;
    rightAttr = subTitleRight.offsetLeft;
    leftSubAttr = subTitleLeftLeft.offsetLeft;
    rightSubAttr = subTitleRightRight.offsetLeft;
    projectsAttr = projectsBtn.offsetLeft;
    aboutAttr = aboutBtn.offsetLeft;
}
function setNewLocations(variation) {
    subTitleLeft.style.left = ((leftAttr + variation) - 0) +'px';
    subTitleRight.style.left = ((rightAttr + variation) - 0) +'px';
    subTitleLeftLeft.style.left = (leftSubAttr + variation) + 'px';
    subTitleRightRight.style.left = (rightSubAttr + variation) + 'px';
    projectsBtn.style.left = (projectsAttr + variation) + 'px';
    aboutBtn.style.left = (aboutAttr + variation) + 'px';
}

// momentum controlling
var velX = 0;
var momentumID;

slider.addEventListener('wheel', (e) => {
    cancelMomentumTracking();
});  

function beginMomentumTracking(){
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking(){
    cancelAnimationFrame(momentumID);
}

function momentumLoop(){
    slider.scrollLeft += velX * 1;
    velX *= 0.95; 
    if (Math.abs(velX) > 0.5){
        momentumID = requestAnimationFrame(momentumLoop);
    }
}



// horizontal scrolling
const scrollContainer = document.querySelector(".container");
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    setAttrs();
    // scrollContainer.scrollLeft += evt.deltaY;
    window.requestAnimationFrame(() => {
        scrollContainer.scrollTo({ top: 0, left: scrollContainer.scrollLeft + (evt.deltaY * 2), behavior: "smooth" });
        setNewLocations((evt.deltaY * -1)/5);
    });
});

//  Intersection Observer
const scrollToExplore = document.getElementsByClassName("footer")[0];
const leftHeader = document.querySelector(".header.left");
const rightHeader = document.querySelector(".header.right");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        scrollToExplore.classList.toggle("hide", entry.isIntersecting);
        if(entry.target.classList[0] == "bottom-right"){
            rightHeader.classList.toggle("active", entry.isIntersecting);
            return;
        }
        leftHeader.classList.toggle("active", entry.isIntersecting)
    })}, {
        threshold: 0.3,
    })
const designLabel = document.querySelector(".bottom-right");
const studioLabel = document.querySelector(".bottom-left");
observer.observe(designLabel);
observer.observe(studioLabel);

// hamburger menu
const hamburgerBtn = document.querySelectorAll(".menu-icon");
const hamburgerMenu = document.querySelectorAll(".header");
const hamburgerLinks = document.querySelectorAll(".navbar-menu");

for (const btn of hamburgerBtn) {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle("mobile");
    })
}

const exitBtn = document.querySelectorAll(".exit-btn");
for (const btn of exitBtn) {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.classList.toggle("mobile"); //grand-parent element
    })
}
