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

// Chat Assistant
const chatIcon = document.querySelector('.chat-icon');
const chatBox = document.querySelector('.chat-box');
const closeChatBtn = document.querySelector('.btn-close-chat');
const sendChatBtn = document.querySelector('.btn-send');
const chatInput = document.querySelector('.chat-footer input');
const chatBody = document.querySelector('.chat-body');

chatIcon.addEventListener('click', () => {
    chatBox.style.display = 'flex';
});

closeChatBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
});

sendChatBtn.addEventListener('click', () => {
    const userInput = chatInput.value;
    if (userInput.trim() === '') return;

    appendMessage(userInput, 'user');
    chatInput.value = '';

    setTimeout(() => {
        botResponse(userInput);
    }, 1000);
});

const appendMessage = (message, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerText = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
};

const botResponse = (userInput) => {
    let botMessage = "I'm not sure how to answer that. Can you ask something else?";
    userInput = userInput.toLowerCase();

    if (userInput.includes('tv')) {
        botMessage = 'We have a wide range of TVs. Are you looking for a specific brand or size?';
    } else if (userInput.includes('fridge') || userInput.includes('refrigerator')) {
        botMessage = 'Our refrigerators come with the latest cooling technology. Do you need a single door or double door?';
    } else if (userInput.includes('ac') || userInput.includes('air conditioner')) {
        botMessage = 'We have both split and window ACs. What is your room size?';
    } else if (userInput.includes('offer') || userInput.includes('deal')) {
        botMessage = 'You can check out our latest offers in the "Top Deals of the Day" section!';
    } else if (userInput.includes('hello') || userInput.includes('hi')) {
        botMessage = 'Hello there! How can I assist you today?';
    }

    appendMessage(botMessage, 'bot');
};

// Live Stock Status
const stockStatuses = document.querySelectorAll('.stock-status');

stockStatuses.forEach(status => {
    const isAvailable = Math.random() > 0.3; // 70% chance of being in stock
    if (isAvailable) {
        status.innerHTML = '<span class="badge bg-success">✅ In Stock</span>';
    } else {
        status.innerHTML = '<span class="badge bg-danger">❌ Out of Stock</span>';
    }
});

// Wishlist Toggle
const wishlistBtn = document.getElementById('wishlist-btn');
let isWished = false;

wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isWished = !isWished;
    if (isWished) {
        wishlistBtn.innerHTML = '💖 Wishlisted';
        wishlistBtn.classList.add('text-danger');
    } else {
        wishlistBtn.innerHTML = '❤️ Wishlist';
        wishlistBtn.classList.remove('text-danger');
    }
});

// Product Comparison
const compareCheckboxes = document.querySelectorAll('.form-check-input');
const compareModalBody = document.getElementById('compare-modal-body');
const compareModal = new bootstrap.Modal(document.getElementById('compareModal'));
let productsToCompare = [];

const productData = {
    '1': { name: 'Smart LED TV 55"', price: '$499', brand: 'Brand A', rating: '4.5/5', availability: 'In Stock' },
    '2': { name: 'Modern Refrigerator', price: '$899', brand: 'Brand B', rating: '4.7/5', availability: 'In Stock' },
    '3': { name: 'Split Air Conditioner', price: '$650', brand: 'Brand C', rating: '4.6/5', availability: 'Out of Stock' }
};

compareCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const productId = checkbox.getAttribute('data-product-id');
        if (checkbox.checked) {
            productsToCompare.push(productId);
        } else {
            productsToCompare = productsToCompare.filter(id => id !== productId);
        }

        if (productsToCompare.length === 2) {
            showComparison();
        }
    });
});

const showComparison = () => {
    const product1 = productData[productsToCompare[0]];
    const product2 = productData[productsToCompare[1]];

    const comparisonHtml = `
        <div class="row">
            <div class="col-md-6">
                <h4>${product1.name}</h4>
                <ul class="list-group">
                    <li class="list-group-item">Price: ${product1.price}</li>
                    <li class="list-group-item">Brand: ${product1.brand}</li>
                    <li class="list-group-item">Rating: ${product1.rating}</li>
                    <li class="list-group-item">Availability: ${product1.availability}</li>
                </ul>
            </div>
            <div class="col-md-6">
                <h4>${product2.name}</h4>
                <ul class="list-group">
                    <li class="list-group-item">Price: ${product2.price}</li>
                    <li class="list-group-item">Brand: ${product2.brand}</li>
                    <li class="list-group-item">Rating: ${product2.rating}</li>
                    <li class="list-group-item">Availability: ${product2.availability}</li>
                </ul>
            </div>
        </div>
    `;

    compareModalBody.innerHTML = comparisonHtml;
    compareModal.show();

    // Reset checkboxes
    productsToCompare = [];
    compareCheckboxes.forEach(checkbox => checkbox.checked = false);
};
