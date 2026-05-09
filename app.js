document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    highlightActiveLink();
});

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
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
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.classList.toggle('mobile-active');
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
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const speed = 2000 / target;
    
    const updateCount = () => {
        const increment = target / 100;
        if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count).toLocaleString() + (el.getAttribute('data-suffix') || '');
            setTimeout(updateCount, 20);
        } else {
            el.innerText = target.toLocaleString() + (el.getAttribute('data-suffix') || '');
        }
    };
    updateCount();
}

// --- Back to Top ---
function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'btn-back-to-top';
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
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
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- Expert Mock Data ---
const MOCK_EXPERTS = [
    { id: 1, name: "Dr. James K.", avatar: "JK", special: "Dissertations & Thesis", rating: 4.9, completed: 842, price: 45, subjects: ["History", "Philosophy", "Political Science"] },
    { id: 2, name: "Sarah M.", avatar: "SM", special: "Python & Data Science", rating: 5.0, completed: 320, price: 60, subjects: ["Coding", "Statistics", "AI"] },
    { id: 3, name: "Prof. Alan W.", avatar: "AW", special: "Complex Engineering", rating: 4.8, completed: 1205, price: 80, subjects: ["Mechanical", "Physics", "Math"] },
    { id: 4, name: "Elena R.", avatar: "ER", special: "Business & Marketing", rating: 4.7, completed: 560, price: 30, subjects: ["Business Plans", "Economics", "Case Studies"] },
    { id: 5, name: "David L.", avatar: "DL", special: "Law & Ethics", rating: 4.9, completed: 410, price: 50, subjects: ["Law", "Criminal Justice", "Ethics"] },
    { id: 6, name: "Dr. Emily B.", avatar: "EB", special: "Medical & Nursing", rating: 4.9, completed: 930, price: 55, subjects: ["Nursing", "Biology", "Pharmacology"] },
    { id: 7, name: "Michael T.", avatar: "MT", special: "Fullstack Web Dev", rating: 5.0, completed: 215, price: 70, subjects: ["React", "Node.js", "Database"] },
    { id: 8, name: "Jessica H.", avatar: "JH", special: "English & Literature", rating: 4.8, completed: 1450, price: 25, subjects: ["Creative Writing", "Literature", "Essays"] },
    { id: 9, name: "Dr. Robert P.", avatar: "RP", special: "Advanced Mathematics", rating: 4.9, completed: 890, price: 65, subjects: ["Calculus", "Linear Algebra", "Calculus"] },
    { id: 10, name: "Sophia G.", avatar: "SG", special: "Psychology & Sociology", rating: 4.7, completed: 670, price: 35, subjects: ["Psychology", "Social Work", "Sociology"] },
    { id: 11, name: "Chris P.", avatar: "CP", special: "Computer Science", rating: 4.8, completed: 480, price: 50, subjects: ["Algorithms", "C++", "Java"] },
    { id: 12, name: "Lisa W.", avatar: "LW", special: "Accounting & Finance", rating: 4.9, completed: 340, price: 45, subjects: ["Accounting", "Corporate Finance", "Tax"] }
];

// --- Task Mock Data ---
const MOCK_TASKS = [
    { id: "SD-2847", title: "ML Model for Predicting Churn", subject: "Coding & ML", budget: 250, deadline: "2026-05-15", status: "In Progress" },
    { id: "SD-1932", title: "The Impact of Roman Law on Modern Systems", subject: "History/Law", budget: 120, deadline: "2026-05-12", status: "Expert Assigned" },
    { id: "SD-8492", title: "Financial Analysis of Tesla Q1", subject: "Accounting", budget: 80, deadline: "2026-05-10", status: "Under Review" },
    { id: "SD-3301", title: "Vector Calculus Problem Set", subject: "Mathematics", budget: 60, deadline: "2026-05-11", status: "Pending Match" },
    { id: "SD-7721", title: "Shakespearean Sonnets Analysis", subject: "Literature", budget: 45, deadline: "2026-05-09", status: "Completed" }
];
