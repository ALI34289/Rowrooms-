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

// EMI Calculator
const calculateEmiBtn = document.getElementById('calculate-emi');
if (calculateEmiBtn) {
    calculateEmiBtn.addEventListener('click', () => {
        const amount = document.getElementById('amount').value;
        const interest = document.getElementById('interest').value;
        const tenure = document.getElementById('tenure').value;

        const principal = parseFloat(amount);
        const rate = parseFloat(interest) / 100 / 12;
        const n = parseFloat(tenure);

        if (principal && rate && n) {
            const emi = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
            document.getElementById('emi-result').innerHTML = `Your monthly EMI is: <strong>$${emi.toFixed(2)}</strong>`;
        } else {
            document.getElementById('emi-result').innerHTML = 'Please enter valid inputs.';
        }
    });
}

// Add Product Form
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    const productGrid = document.getElementById('productGrid');
    const successMessage = document.getElementById('successMessage');
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const renderProducts = () => {
        productGrid.innerHTML = '';
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <button class="delete-btn" data-index="${index}">&times;</button>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Price:</strong> ₹${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p>${product.description}</p>
            `;
            productGrid.appendChild(productCard);
        });
    };

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProduct = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            image: document.getElementById('productImage').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
        };

        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));

        renderProducts();
        addProductForm.reset();

        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    });

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        }
    });

    renderProducts();
}

// Social Proof Popups
const socialProofPopup = document.getElementById('social-proof-popup');
if (socialProofPopup) {
    const toast = new bootstrap.Toast(socialProofPopup);
    const messages = [
        'A customer from New York just bought a Smart LED TV.',
        'Someone from California just purchased a Modern Refrigerator.',
        'A customer from Texas just bought a Split Air Conditioner.',
        'Someone from Florida just got a new Gaming Laptop.'
    ];

    setInterval(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        socialProofPopup.querySelector('.toast-body').textContent = randomMessage;
        toast.show();
    }, 10000); // Show a popup every 10 seconds
}

// Store Locator
const locationSelect = document.getElementById('location-select');
if (locationSelect) {
    const mapIframe = document.getElementById('map-iframe');
    const locations = {
        melbourne: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086432396585!2d144.9537363159042!3d-37.81720997975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1687530901211!5m2!1sen!2sus',
        sydney: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.099026333285!2d151.2069138158204!3d-33.8732159806525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b9a23%3A0x5017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1687531033336!5m2!1sen!2sus',
        brisbane: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.132929259185!2d153.0251235156914!3d-27.46977198289598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a0c1f8a6a4f%3A0x502a35af3de8460!2sBrisbane%20QLD%2C%20Australia!5e0!3m2!1sen!2sus!4v1687531065432!5m2!1sen!2sus'
    };

    locationSelect.addEventListener('change', () => {
        const selectedLocation = locationSelect.value;
        if (locations[selectedLocation]) {
            mapIframe.src = locations[selectedLocation];
        }
    });
}

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

/**
* Back to top button
*/
const backtotop = document.querySelector('.back-to-top')
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add('active')
    } else {
      backtotop.classList.remove('active')
    }
  }
  window.addEventListener('load', toggleBacktotop)
  document.addEventListener('scroll', toggleBacktotop)
}
