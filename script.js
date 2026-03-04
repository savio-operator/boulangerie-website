// Carousel functionality
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const images = document.querySelectorAll('.carousel-track img');
const totalImages = images.length;

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalImages - 1) {
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

// Menu tab filtering
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        menuItems.forEach(item => {
            if (item.dataset.category === category) {
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            } else {
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
            }
        });
        drawCurve();
    });
});

// Curved path menu
function drawCurve() {
    const timeline = document.getElementById('menuTimeline');
    const canvas = document.getElementById('curveCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = timeline.offsetWidth;
    canvas.height = timeline.offsetHeight;

    const visibleItems = Array.from(menuItems).filter(
        item => item.style.opacity !== '0'
    );

    const totalItems = visibleItems.length;
    const centerX = canvas.width / 2;
    const amplitude = canvas.width * 0.25;
    const itemSpacing = canvas.height / (totalItems + 1);

    // Position items along the curve
    visibleItems.forEach((item, i) => {
        const y = itemSpacing * (i + 1);
        const progress = i / (totalItems - 1 || 1);
        const x = centerX + Math.sin(progress * Math.PI * 2) * amplitude;

        if (i % 2 === 0) {
            item.style.left = `${x - 360}px`;
        } else {
            item.style.left = `${x + 20}px`;
        }
        item.style.top = `${y - 50}px`;
    });

    // Draw the curve
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;

    for (let i = 0; i <= totalItems + 1; i++) {
        const y = itemSpacing * i;
        const progress = i / (totalItems + 1);
        const x = centerX + Math.sin(progress * Math.PI * 2) * amplitude;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
}

// Initialize
window.addEventListener('load', drawCurve);
window.addEventListener('resize', drawCurve);