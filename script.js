// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-bs-theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute('data-bs-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Stats Counter Animation
const statsSection = document.getElementById('stats');
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;

        if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`;
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Countdown Timer
const countdown = document.getElementById('countdown');
const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdown) {
        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (distance < 0) {
        clearInterval(interval);
        if (countdown) {
            countdown.innerHTML = "EXPIRED";
        }
    }
};

const interval = setInterval(updateCountdown, 1000);

// Scroll Reveal Animation
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
};

window.addEventListener('scroll', reveal);
