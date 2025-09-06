// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Countdown Timer
function updateCountdown() {
    const reunionDate = new Date("November 28, 2025 19:00:00").getTime();
    const now = new Date().getTime();
    const distance = reunionDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("countdown-days").innerHTML = days.toString().padStart(2, "0");
    document.getElementById("countdown-hours").innerHTML = hours.toString().padStart(2, "0");
    document.getElementById("countdown-minutes").innerHTML = minutes.toString().padStart(2, "0");
    document.getElementById("countdown-seconds").innerHTML = seconds.toString().padStart(2, "0");
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown-days").innerHTML = "00";
        document.getElementById("countdown-hours").innerHTML = "00";
        document.getElementById("countdown-minutes").innerHTML = "00";
        document.getElementById("countdown-seconds").innerHTML = "00";
    }
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        }
    });
});

// Form submission
const rsvpForm = document.querySelector('form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your RSVP! We look forward to seeing you at the reunion.');
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.announcement-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.announcement-control:first-of-type');
    const nextBtn = document.querySelector('.announcement-control:last-of-type');
    let currentIndex = 0;
    
    // Auto-rotate announcements every 10 seconds
    let slideInterval = setInterval(nextSlide, 10000);
    
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
        resetInterval();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
        resetInterval();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
        resetInterval();
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.announcement-carousel').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    document.querySelector('.announcement-carousel').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
    
    // Initialize
    updateSlides();
});