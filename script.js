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

//Menu tab filtering
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked tab
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        menuItems.forEach(item => {
            if (item.dataset.category === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});