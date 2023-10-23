const carouselTitles = document.querySelectorAll(".carousel-title");

let isHovering = false; // Variable to track if the pointer is hovering over the titles

carouselTitles.forEach((title) => {
    const description = title.querySelector(".carousel-description");
    
    title.addEventListener("click", () => {
        description.classList.toggle("show");
    });

    title.addEventListener("mouseenter", () => {
        description.style.display = "block";
        isHovering = true; // Set hovering to true when the pointer enters the title
        pauseAutomaticSlide();
    });

    title.addEventListener("mouseleave", () => {
        description.style.display = "none";
        isHovering = false; // Set hovering to false when the pointer leaves the title
        resumeAutomaticSlide();
    });
});

const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".carousel-dot");
const slides = document.querySelectorAll(".carousel-slide");
const nav = document.querySelector(".carousel-nav");
const leftArrow = document.querySelector(".carousel-arrow-left");
const rightArrow = document.querySelector(".carousel-arrow-right");
let currentSlide = 0;
let isAutomatic = true;
let interval;
let timeout;

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

function slideCarousel(offset) {
    currentSlide = (currentSlide + offset) % slides.length;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    const scrollPosition = currentSlide * 100;
    carousel.style.transition = "transform 0.5s";
    carousel.style.transform = `translateX(-${scrollPosition}%)`;
    updateDots();
    showNav();
    if (isHovering) {
        pauseAutomaticSlide(); // Pause automatic slide if hovering
    }
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        isAutomatic = false;
        const offset = index - currentSlide;
        slideCarousel(offset);
    });
});

leftArrow.addEventListener("click", () => {
    isAutomatic = false;
    slideCarousel(-1);
});

rightArrow.addEventListener("click", () => {
    isAutomatic = false;
    slideCarousel(1);
});

slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
        const clickX = event.clientX - slide.getBoundingClientRect().left;
        if (clickX < slide.offsetWidth / 2) {
            slideCarousel(-1);
        } else {
            slideCarousel(1);
        }
    });
});

function hideNav() {
    nav.style.opacity = 0;
    leftArrow.style.opacity = 0;
    rightArrow.style.opacity = 0;
}

function showNav() {
    if (isAutomatic) {
        nav.style.opacity = 1;
        leftArrow.style.opacity = 1;
        rightArrow.style.opacity = 1;
        clearTimeout(timeout);
        timeout = setTimeout(hideNav, 3000);
    }
}

document.addEventListener("mousemove", showNav);

function startAutomaticSlide() {
    if (isAutomatic) {
        interval = setInterval(() => {
            slideCarousel(1);
        }, 5000);
    }
}

function pauseAutomaticSlide() {
    clearInterval(interval); // Pause the automatic slide
}

function resumeAutomaticSlide() {
    if (!isHovering) {
        startAutomaticSlide(); // Resume the automatic slide if not hovering
    }
}

startAutomaticSlide();
