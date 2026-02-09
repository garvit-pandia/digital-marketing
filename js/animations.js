// Scroll-triggered animations for premium feel
document.addEventListener('DOMContentLoaded', () => {

    // Elements to animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section h2, .content-hero > div, .grid-3 > *, .grid-2 > *');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on element index within its parent
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

    // Parallax effect on hero section (subtle)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            const heroImageEl = hero.querySelector('.hero-image');

            if (heroContent && scrolled < 600) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
                heroContent.style.opacity = 1 - (scrolled * 0.002);
            }
            if (heroImageEl && scrolled < 600) {
                heroImageEl.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        });
    }

    // Add ripple effect to buttons
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

    // Smooth reveal for navbar on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    console.log('[Animations] Premium scroll animations initialized');
});
