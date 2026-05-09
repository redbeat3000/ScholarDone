document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomCursor();
    initNavbarScroll();
    initMobileMenu();
    initScrollEffects();
    initMagneticButtons();
    initBackToTop();
    highlightActiveLink();
});

// --- Custom Cursor ---
function initCustomCursor() {
    if (window.innerWidth <= 1024) return;

    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.className = 'cursor-dot';
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateOutline = () => {
        const easing = 0.15;
        outlineX += (mouseX - outlineX) * easing;
        outlineY += (mouseY - outlineY) * easing;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateOutline);
    };
    animateOutline();

    const hoverElements = document.querySelectorAll('a, button, .expert-card, .trust-item, .accordion-header');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
}

// --- Magnetic Buttons ---
function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-primary, .btn-ghost, .theme-toggle');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// --- Navbar Scroll ---
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        // Add transition class to body
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (!icon) return;
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
}

// --- Mobile Menu ---
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = menuBtn.querySelector('i');
        icon.className = navLinks.classList.contains('mobile-active') ? 'ri-close-line' : 'ri-menu-line';
    });
}

// --- Scroll Effects (Reveal & Counters) ---
function initScrollEffects() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = "true";
    
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = progress * (2 - progress);
        
        count = Math.floor(easeOutQuad * target);
        el.innerText = count.toLocaleString() + (el.getAttribute('data-suffix') || '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
        }
    };
    requestAnimationFrame(updateCount);
}

// --- Back to Top ---
function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'btn-back-to-top';
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(btn);

    // Style the back to top button here or in CSS
    Object.assign(btn.style, {
        position: 'fixed', bottom: '30px', right: '30px',
        width: '50px', height: '50px', borderRadius: '50%',
        background: 'var(--color-amber)', color: 'var(--color-black)',
        border: 'none', display: 'none', alignItems: 'center', justifyContent: 'center',
        zIndex: '1000', cursor: 'none', transition: 'all 0.3s ease'
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Navigation ---
function highlightActiveLink() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
}

// --- Toast System ---
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        
        Object.assign(container.style, {
            position: 'fixed', top: '30px', right: '30px',
            zIndex: '10000', display: 'flex', flexDirection: 'column', gap: '10px'
        });
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    Object.assign(toast.style, {
        padding: '1rem 2rem', background: 'var(--card-bg)',
        backdropFilter: 'blur(10px)', border: '1px solid var(--border-color)',
        borderRadius: '1rem', color: 'var(--text-primary)',
        animation: 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
