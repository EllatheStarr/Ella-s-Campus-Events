// Dark Mode Toggle
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggleButton.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// Scroll Animation with Intersection Observer
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add the 'visible' class when the card is in view
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

cards.forEach((card) => observer.observe(card));
