const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${18 + Math.random() * 22}px`;
    heart.style.opacity = `${0.35 + Math.random() * 0.45}`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6200);
}

setInterval(createHeart, 1050);

function randomColor() {
    const colors = ['#ff76ad', '#ffd166', '#ffffff', '#91f3df', '#b69cff', '#ff9b70'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti(amount = 90) {
    for (let i = 0; i < amount; i += 1) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.background = randomColor();
        confetti.style.animationDuration = `${2.6 + Math.random() * 2.4}s`;
        confetti.style.transform = `rotate(${Math.random() * 180}deg)`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5200);
    }
}

const gift = document.getElementById('gift');
const hiddenMessage = document.getElementById('hiddenMessage');

if (gift && hiddenMessage) {
    gift.addEventListener('click', () => {
        gift.textContent = '💖';
        hiddenMessage.style.display = 'block';
        createConfetti(120);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate([
                { opacity: 0, transform: 'translateY(28px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 700,
                easing: 'ease-out',
                fill: 'both'
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll('section, .feature-tile, .memory-card, .surprise-card').forEach((item) => {
    observer.observe(item);
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-lightbox]').forEach((card) => {
    card.addEventListener('click', () => {
        lightboxImage.src = card.dataset.lightbox;
        lightboxCaption.textContent = card.dataset.caption || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
    });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });
}

const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');

function closeMessageModal() {
    if (!messageModal) return;
    messageModal.classList.remove('is-open');
    messageModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.surprise-card').forEach((card) => {
    card.addEventListener('click', () => {
        modalMessage.textContent = card.dataset.message;
        messageModal.classList.add('is-open');
        messageModal.setAttribute('aria-hidden', 'false');
        createConfetti(45);
    });
});

if (closeModal) closeModal.addEventListener('click', closeMessageModal);
if (messageModal) {
    messageModal.addEventListener('click', (event) => {
        if (event.target === messageModal) closeMessageModal();
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeLightbox();
        closeMessageModal();
    }
});

console.log('%cHappy Birthday DIA ❤️', 'color:#ff76ad;font-size:26px;font-weight:bold;');

