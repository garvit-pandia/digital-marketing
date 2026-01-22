// Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight active nav link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page'); // Accessibility
        }
    });

    // 2. Mobile Menu Toggle Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');
    const overlay = document.createElement('div'); // Create overlay dynamically
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle State
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden'; // Prevent scrolling when menu is open
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            mobileBtn.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Simple scroll animation for cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
