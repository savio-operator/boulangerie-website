// Carousel functionality - DELETED (now CSS animation)

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
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.pointerEvents = 'none';
            }
        });
        drawMenuCurve(); // ← calls the curve after switching tab
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

setTimeout(drawMenuCurve, 100); // ← draws curve on first load

// Draw curve function
function drawMenuCurve() {
    const existingSvg = document.querySelector('.curved-path');
    if (existingSvg) existingSvg.remove();

    const timeline = document.querySelector('.menu-timeline');
    const visibleItems = Array.from(menuItems).filter(
        item => item.style.display !== 'none'
    );

    if (visibleItems.length === 0) return;

    const timelineRect = timeline.getBoundingClientRect();
    const centerX = timeline.offsetWidth / 2;

    const points = visibleItems.map(item => {
        const dot = item.querySelector('.menu-dot');
        const dotRect = dot.getBoundingClientRect();
        const y = dotRect.top - timelineRect.top + dot.offsetHeight / 2;
        return { x: centerX, y };
    });

    let pathD = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midY = (prev.y + curr.y) / 2;
        const offset = i % 2 === 0 ? -30 : 30;
        pathD += ` C ${prev.x + offset} ${midY}, ${curr.x + offset} ${midY}, ${curr.x} ${curr.y}`;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'curved-path');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '0';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#1a1a1a');
    path.setAttribute('stroke-width', '1');

    svg.appendChild(path);
    timeline.insertBefore(svg, timeline.firstChild);
}

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

