/*
  Sagar Kumar - Portfolio Script
  Libraries: GSAP, AOS, Typed.js, Particles.js, Vanilla Tilt
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Page Loader
    const loader = document.getElementById('loader');
    const loaderBar = document.querySelector('.loader-bar');
    const loaderPercent = document.querySelector('.loader-percentage');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.8,
                    ease: 'power2.inOut'
                });
                // Initialize AOS after loader is gone
                AOS.init({
                    duration: 1000,
                    easing: 'ease-in-out',
                    once: true
                });
            }, 500);
        } else {
            width++;
            loaderBar.style.width = width + '%';
            loaderPercent.innerText = width + '%';
        }
    }, 15);


    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });

        // Mouse Spotlight / Glow Position
        document.body.style.setProperty('--x', e.clientX + 'px');
        document.body.style.setProperty('--y', e.clientY + 'px');
    });

    const hoverElements = document.querySelectorAll('a, button, .tilt, .project-card, .skill-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });


    // 3. Typed.js Implementation
    new Typed('#typed', {
        strings: [
            'Flutter Developer',
            'Mobile App Engineer',
            'Android & iOS Expert',
            'Cross Platform Developer',
            'GetX & Provider Expert',
            'Clean Architecture Specialist'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });


    // 4. Particles.js Configuration
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00F5FF" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00F5FF", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
        },
        "retina_detect": true
    });


    // 5. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.body.style.setProperty('--scroll', scrolled + '%');
    });


    // 6. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click or overlay click
    const closeMenu = () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    };

    navOverlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // 7. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });


    // 8. Stats Counter Animation
    const observerOptions = { threshold: 0.1 };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutSection = document.getElementById('about');
    if (aboutSection) counterObserver.observe(aboutSection);


    // 9. GSAP Parallax & Entrance
    gsap.registerPlugin(ScrollTrigger);

    // Hero Floating
    gsap.to('.hero-illustration', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Image Tilt Effect
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 10. Ripple Effect for Buttons
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '2px';
            ripple.style.height = '2px';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 11. Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
                gsap.to(backToTop, { opacity: 1, duration: 0.3 });
            } else {
                gsap.to(backToTop, { opacity: 0, duration: 0.3, onComplete: () => { backToTop.style.display = 'none'; } });
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Animation Keyframes via JS for Ripple & Menu
const style = document.createElement('style');
style.innerHTML = `
@keyframes ripple-animation {
    to { transform: scale(300); opacity: 0; }
}
.hamburger.active .bar:nth-child(1) { transform: translateY(8.5px) rotate(45deg); }
.hamburger.active .bar:nth-child(2) { opacity: 0; }
.hamburger.active .bar:nth-child(3) { transform: translateY(-8.5px) rotate(-45deg); }
`;
document.head.appendChild(style);
