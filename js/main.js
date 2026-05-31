// Initialize Lucide icons
lucide.createIcons();

// Navbar scroll effect + active section (desktop)
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#desktop-nav [data-nav]');
const navSectionIds = ['about', 'problems', 'methods', 'reviews', 'location', 'contact'];
const NAV_OFFSET = 120;

function updateActiveNav() {
    if (window.innerWidth < 768) {
        navLinks.forEach(link => link.classList.remove('active'));
        return;
    }
    let current = null;
    const scrollY = window.scrollY + NAV_OFFSET;
    navSectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollY) {
            current = id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.nav === current);
    });
}

function onScroll() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = 'blur(12px)';
        navbar.style.borderBottom = '1px solid #e7e5e4';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.0)';
        navbar.style.backdropFilter = 'blur(0px)';
        navbar.style.borderBottom = 'none';
    }
    updateActiveNav();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
});

// Contact form
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name || !phone) {
        showToast('Пожалуйста, заполните имя и телефон', true);
        return;
    }
    showToast(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
    contactForm.reset();
});
function showToast(message, isError = false) {
    toastText.textContent = message;
    toast.style.background = isError ? '#991b1b' : '#1e3a8a';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Lightbox
function openLightbox(el) {
    const imgSrc = el.querySelector('img').src;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    lightbox.classList.remove('pointer-events-none');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { lightboxImg.style.transform = 'scale(1)'; }, 10);
}
function closeLightbox(e) {
    if (e.target.id === 'lightbox' || e.target.closest('button')) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.style.transform = 'scale(0.95)';
        lightbox.classList.remove('active');
        lightbox.classList.add('pointer-events-none');
        document.body.style.overflow = 'auto';
    }
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            closeLightbox({ target: { id: 'lightbox' } });
        }
    }
});

// Swipe track dots (mobile)
function initSwipeTrack(trackId, dotsId, itemSelector, dotClass, labelPrefix) {
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsId);
    if (!track || !dotsContainer) return;

    const items = track.querySelectorAll(itemSelector);
    items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = dotClass + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `${labelPrefix} ${i + 1}`);
        dot.addEventListener('click', () => {
            items[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.' + dotClass);
    track.addEventListener('scroll', () => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let activeIndex = 0;
        let minDistance = Infinity;
        items.forEach((item, i) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(trackCenter - itemCenter);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = i;
            }
        });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }, { passive: true });
}

initSwipeTrack('reviews-track', 'reviews-dots', '.review-card', 'swipe-dot', 'Отзыв');
initSwipeTrack('problems-track', 'problems-dots', '.problem-item', 'swipe-dot', 'Проблема');
initSwipeTrack('methods-track', 'methods-dots', '.method-card', 'swipe-dot', 'Методика');

// Prevent horizontal sliders from hijacking vertical page scroll (mobile)
function initSwipeTrackTouchScroll() {
    const LOCK_THRESHOLD = 8;

    document.querySelectorAll('.swipe-track').forEach(track => {
        let startX = 0;
        let startY = 0;
        let direction = null;

        const reset = () => {
            direction = null;
            track.classList.remove('swipe-track--scroll-y');
        };

        track.addEventListener('touchstart', (e) => {
            if (window.innerWidth >= 768) return;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            direction = null;
            track.classList.remove('swipe-track--scroll-y');
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (window.innerWidth >= 768) return;
            const dx = Math.abs(e.touches[0].clientX - startX);
            const dy = Math.abs(e.touches[0].clientY - startY);
            if (!direction && (dx > LOCK_THRESHOLD || dy > LOCK_THRESHOLD)) {
                direction = dx > dy ? 'horizontal' : 'vertical';
            }
            if (direction === 'vertical') {
                track.classList.add('swipe-track--scroll-y');
            } else if (direction === 'horizontal') {
                track.classList.remove('swipe-track--scroll-y');
            }
        }, { passive: true });

        track.addEventListener('touchend', reset, { passive: true });
        track.addEventListener('touchcancel', reset, { passive: true });
    });
}

initSwipeTrackTouchScroll();
