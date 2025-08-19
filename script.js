// TARS Website Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFAQ();
    initTypingAnimation();
    initParallaxEffects();
    initModalSystem();
    initFormHandling();
    initCounterAnimations();
    initSmoothScrolling();
    initThemeSystem();
    initLoadingStates();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Scroll-triggered animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('testimonial-card')) {
                    animateTestimonialCard(entry.target);
                } else if (entry.target.classList.contains('step')) {
                    animateStep(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .step, .pricing-card, .hero-content, .section-header'
    );
    
    animatableElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Feature card animations
function animateFeatureCard(card) {
    const demo = card.querySelector('.feature-demo');
    const icon = card.querySelector('.feature-icon');
    
    setTimeout(() => {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }, 200);

    // Animate specific demo types
    if (demo.querySelector('.scanning-overlay')) {
        setTimeout(() => {
            demo.querySelector('.scanning-overlay').style.animationPlayState = 'running';
        }, 500);
    }

    if (demo.querySelector('.action-item')) {
        const actionItems = demo.querySelectorAll('.action-item');
        actionItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
    }
}

// Testimonial card animations
function animateTestimonialCard(card) {
    const stars = card.querySelectorAll('.testimonial-rating i');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.2)';
            star.style.color = '#ffd700';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 150);
        }, index * 100);
    });
}

// Step animations
function animateStep(step) {
    const stepNumber = step.querySelector('.step-number');
    const visual = step.querySelector('.step-visual');
    
    stepNumber.style.transform = 'scale(1.1)';
    setTimeout(() => {
        stepNumber.style.transform = 'scale(1)';
    }, 300);

    if (visual.querySelector('.chrome-icon')) {
        setTimeout(() => {
            visual.querySelector('.chrome-icon').style.animationPlayState = 'running';
        }, 400);
    }
}

// General animations system
function initAnimations() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }

    // Floating animations for various elements
    const floatingElements = document.querySelectorAll('.tars-widget, .browser-mockup');
    floatingElements.forEach(el => {
        el.style.animation = 'float 3s ease-in-out infinite';
    });

    // Gradient text animation
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.backgroundPosition = '200% center';
        });
        text.addEventListener('mouseleave', () => {
            text.style.backgroundPosition = '0% center';
        });
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.querySelector('.hero-title .gradient-text');
    if (!typingText) return;

    const phrases = ['Sees & Acts', 'Understands', 'Automates', 'Assists'];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeWriter() {
        const current = phrases[currentPhrase];
        
        if (isDeleting) {
            typingText.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typingText.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.browser-mockup');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            // Only apply parallax to browser mockup, not feature demos
            if (!el.closest('.feature-demo')) {
                const speed = 0.1;
                const yPos = -(scrollTop * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
    
    // Ensure feature demos stay fixed
    const featureDemos = document.querySelectorAll('.feature-demo');
    featureDemos.forEach(demo => {
        demo.style.transform = 'none';
    });
}

// Modal system for demos and videos
function initModalSystem() {
    // Create modal HTML
    const modalHTML = `
        <div id="modal-overlay" class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('modal-overlay');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    
    // Demo video buttons
    const demoButtons = document.querySelectorAll('[data-demo]');
    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const demoType = button.dataset.demo;
            showDemo(demoType, modalBody);
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        modalBody.innerHTML = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Demo content for modals
function showDemo(type, container) {
    const demos = {
        'visual-understanding': `
            <h3>Visual Understanding Demo</h3>
            <div class="demo-video">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Interactive demo showing how TARS analyzes webpage content</p>
                </div>
            </div>
            <p>Watch how TARS identifies form fields, buttons, and interactive elements on any webpage.</p>
        `,
        'smart-actions': `
            <h3>Smart Actions Demo</h3>
            <div class="demo-video">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>See TARS automatically filling forms and clicking buttons</p>
                </div>
            </div>
            <p>Experience the power of AI-driven web automation in real-time.</p>
        `,
        'natural-conversation': `
            <h3>Natural Conversation Demo</h3>
            <div class="demo-chat">
                <div class="chat-message user">Book a flight from NYC to Paris for next Friday</div>
                <div class="chat-message ai">I'll help you find flights. Let me search for options from New York to Paris for next Friday...</div>
                <div class="chat-message ai">I found several options. Would you like me to open the booking page for the best deals?</div>
            </div>
            <p>Communicate with TARS using natural language - no technical commands required.</p>
        `
    };
    
    container.innerHTML = demos[type] || '<p>Demo content coming soon!</p>';
}

// Form handling and validation
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(form);
        });
    });
    
    // Newsletter signup
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
        input.addEventListener('input', clearValidationError);
    });
}

function handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Success!';
        submitButton.style.background = '#28ca42';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            form.reset();
        }, 2000);
    }, 1500);
}

function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (email && !isValid) {
        showValidationError(e.target, 'Please enter a valid email address');
    }
}

function showValidationError(input, message) {
    clearValidationError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function clearValidationError(input) {
    const error = input.parentNode.querySelector('.validation-error');
    if (error) error.remove();
    input.classList.remove('error');
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
            }
        };
        
        updateCounter();
    };
    
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num.toString();
    };
    
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Theme system (for future dark mode support)
function initThemeSystem() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Loading states for buttons and forms
function initLoadingStates() {
    const buttons = document.querySelectorAll('.btn[data-loading]');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.classList.contains('loading')) {
                e.preventDefault();
                return;
            }
            
            const loadingText = button.dataset.loading || 'Loading...';
            const originalText = button.textContent;
            
            button.classList.add('loading');
            button.textContent = loadingText;
            
            // Simulate async operation
            setTimeout(() => {
                button.classList.remove('loading');
                button.textContent = originalText;
            }, 2000);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        '/styles.css',
        '/script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send error reports to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error reports to analytics service
});

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add additional CSS for animations and modal
const additionalStyles = `
    <style>
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        padding: 40px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modal-overlay.active .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
    }
    
    .modal-close:hover {
        color: #333;
    }
    
    .video-placeholder {
        background: #f0f0f0;
        border-radius: 8px;
        padding: 60px;
        text-align: center;
        color: #666;
    }
    
    .video-placeholder i {
        font-size: 48px;
        margin-bottom: 16px;
        color: var(--primary-color);
    }
    
    .demo-chat {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
    }
    
    .chat-message {
        margin-bottom: 12px;
        padding: 8px 12px;
        border-radius: 12px;
        max-width: 80%;
    }
    
    .chat-message.user {
        background: #e3f2fd;
        margin-left: auto;
        text-align: right;
    }
    
    .chat-message.ai {
        background: var(--primary-color);
        color: white;
    }
    
    .validation-error {
        color: #ff4444;
        font-size: 14px;
        margin-top: 4px;
    }
    
    input.error {
        border-color: #ff4444;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    body.modal-open,
    body.nav-open {
        overflow: hidden;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @media (max-width: 768px) {
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        
        .modal-content {
            padding: 20px;
            width: 95%;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
