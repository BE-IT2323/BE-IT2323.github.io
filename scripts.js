// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Countdown Timer
function updateCountdown() {
    const reunionDate = new Date("September 23, 2025 18:00:00").getTime();
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