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

    // 4. Light/Dark theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    const updateToggleUI = (theme) => {
        if (!themeToggle) return;

        const isDark = theme === 'dark';
        const iconEl = themeToggle.querySelector('.theme-toggle-icon');
        const textEl = themeToggle.querySelector('.theme-toggle-text');

        // aria-pressed = true when light mode is active (button visually "on")
        themeToggle.setAttribute('aria-pressed', String(!isDark));

        if (iconEl) iconEl.textContent = isDark ? '☀️' : '🌙';
        if (textEl) textEl.textContent = isDark ? 'Light' : 'Dark';
    };

    const applyTheme = (theme, persist = true) => {
        const isDark = theme === 'dark';

        // Dark is the default theme (no data attribute needed)
        if (isDark) {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', 'light');
        }

        updateToggleUI(theme);

        if (persist) {
            try {
                localStorage.setItem('theme', theme);
            } catch (e) {
                // Ignore storage errors (private mode, etc.)
            }
        }
    };

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        savedTheme = null;
    }

    let initialTheme = savedTheme;

    // If no saved preference, fall back to system preference, defaulting to dark
    if (!initialTheme) {
        const prefersLight = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: light)').matches;
        initialTheme = prefersLight ? 'light' : 'dark';
    }

    // Apply initial theme and wire up toggle (if present on this page)
    applyTheme(initialTheme, false);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }
});
