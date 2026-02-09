// Scroll-triggered animations for premium feel - OPTIMIZED for performance
document.addEventListener('DOMContentLoaded', () => {

    // Elements to animate on scroll (using IntersectionObserver - no scroll lag)
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section h2, .content-hero > div, .grid-3 > *, .grid-2 > *');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = Array.from(entry.target.parentElement?.children || []);
                    const siblingIndex = siblings.indexOf(entry.target);
                    const delay = siblingIndex * 0.1;

                    entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    };

    // Hero section floating animation
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.classList.add('float-animation');
    }

    // Initialize scroll animations
    animateOnScroll();

    // OPTIMIZED: Single throttled scroll handler using requestAnimationFrame
    let ticking = false;
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        const scrollY = window.pageYOffset;

        // Navbar scroll state (lightweight class toggle)
        if (navbar) {
            if (scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        ticking = false;
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // Add ripple effect to buttons (click only, no scroll impact)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    console.log('[Animations] Optimized scroll animations initialized');
});
