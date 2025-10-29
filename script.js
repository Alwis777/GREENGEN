document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Sticky Navigation Bar ---
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) { // Increased scroll threshold for cleaner activation
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Tab Functionality for Features Section ---
    const tabs = document.querySelectorAll('.tabs-nav .tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all buttons and content
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => c.classList.remove('active'));

            // Add 'active' class to the clicked button and corresponding content
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const targetId = tab.getAttribute('data-tab'); // Get data-tab for non-ARIA
            document.getElementById(`tabpanel-${targetId.replace('tab', '')}`).classList.add('active'); // Match ARIA ID
        });
    });

    // Set initial tab to active
    if (tabs.length > 0) {
        tabs[0].click(); 
    }

    // --- 3. Scroll-Based Fade-In Animation ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Element becomes visible when 10% is in viewport
        rootMargin: "0px 0px -50px 0px" // Start observing a bit earlier
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- 4. Carousel/Slider Functionality for Prototypes ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;

    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoAdvance();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dots .dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
            if (i === index) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetAutoAdvance();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetAutoAdvance();
    });

    // Auto-advance the carousel
    let autoAdvanceInterval;
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000); // Change slide every 6 seconds
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval);
        startAutoAdvance();
    }

    startAutoAdvance(); // Initialize auto-advance
    showSlide(currentSlide); // Initialize first slide

    // --- 5. Smooth Scroll for "Learn More" Button ---
    document.querySelector('.scroll-down').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor jump
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Function for "Connect" button in header
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}