
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
                item.style.display ='flex';// show — back in layout
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            } else {
                item.style.display ='none'  // out of layout entirely
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
            }
        });
    });
});

// Run once on load to hide non-active items
menuItems.forEach(item => {
    if (item.dataset.category !== 'breakfast') {
        item.style.display = 'none';
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';
    }
});

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});