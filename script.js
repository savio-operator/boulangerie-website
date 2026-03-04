// Carousel Functionality
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const images = document.querySelectorAll('.carousel-track img');
const totalImages = images.length;

nextBtn.addEventListener('click', ()=> {
    if (currentIndex < totalImages -1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - 1;
    }
    updateCarousel();
});

function updateCarousel() {
    const imageWidth = 420;
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

setInterval(() => { nextBtn.click(); }, 3000);