// GA4 Custom Event Tracking for MKT907 Assignment
// This file tracks custom events to demonstrate GA4 implementation

document.addEventListener('DOMContentLoaded', () => {

    // Helper function to send GA4 events
    function sendGA4Event(eventName, eventParams = {}) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
            console.log(`[GA4] Event sent: ${eventName}`, eventParams);
        } else {
            console.warn('[GA4] gtag not available');
        }
    }

    // =====================================================
    // 1. CTA BUTTON CLICKS - Track all primary buttons
    // =====================================================
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (e) => {
            sendGA4Event('cta_click', {
                button_text: e.target.textContent.trim(),
                button_location: window.location.pathname,
                link_url: e.target.href || 'no-href'
            });
        });
    });

    // =====================================================
    // 2. THEME TOGGLE - Track user preference
    // =====================================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            sendGA4Event('theme_toggle', {
                selected_theme: newTheme
            });
        });
    }

    // =====================================================
    // 3. MOBILE MENU OPEN - Track mobile engagement
    // =====================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpening = mobileMenuBtn.getAttribute('aria-expanded') !== 'true';
            if (isOpening) {
                sendGA4Event('mobile_menu_open', {
                    page: window.location.pathname
                });
            }
        });
    }

    // =====================================================
    // 4. SCROLL DEPTH TRACKING - 25%, 50%, 75%, 100%
    // =====================================================
    const scrollThresholds = [25, 50, 75, 100];
    const triggeredThresholds = new Set();

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !triggeredThresholds.has(threshold)) {
                triggeredThresholds.add(threshold);
                sendGA4Event('scroll_depth', {
                    percent_scrolled: threshold,
                    page: window.location.pathname
                });
            }
        });
    });

    // =====================================================
    // 5. NEWSLETTER FORM SUBMISSION
    // =====================================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput ? emailInput.value : '';

            // Send GA4 event
            sendGA4Event('newsletter_signup', {
                method: 'email_form',
                page: window.location.pathname
            });

            // Show success message
            const formContainer = newsletterForm.parentElement;
            formContainer.innerHTML = `
                <div class="newsletter-success">
                    <h3>🎉 Thanks for subscribing!</h3>
                    <p>You'll receive the latest digital marketing insights in your inbox.</p>
                </div>
            `;
        });
    }

    // =====================================================
    // 6. EXTERNAL LINK CLICKS
    // =====================================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', (e) => {
                sendGA4Event('external_link_click', {
                    link_url: link.href,
                    link_text: link.textContent.trim(),
                    page: window.location.pathname
                });
            });
        }
    });

    // =====================================================
    // 7. NAV LINK CLICKS - Track navigation patterns
    // =====================================================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            sendGA4Event('navigation_click', {
                destination: link.getAttribute('href'),
                link_text: link.textContent.trim(),
                from_page: window.location.pathname
            });
        });
    });

    // =====================================================
    // 8. CARD INTERACTIONS - Track content engagement
    // =====================================================
    document.querySelectorAll('.card').forEach((card, index) => {
        card.addEventListener('click', () => {
            const cardTitle = card.querySelector('h3, h4')?.textContent || `Card ${index + 1}`;
            sendGA4Event('card_interaction', {
                card_title: cardTitle,
                card_index: index + 1,
                page: window.location.pathname
            });
        });
    });

    console.log('[GA4] Custom event tracking initialized');
});
