// Modern Portfolio JavaScript - Micro-interactions and Animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initScrollAnimations();
    initHoverEffects();
    initTypingAnimation();
    initParallaxEffects();
    initSmoothScrolling();
    initThemeColorizer();
    initTimelineInteractions();
});

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animations for child elements
                const staggerItems = entry.target.querySelectorAll('.stagger-item');
                staggerItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3, .stagger-item').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced hover effects for interactive elements
function initHoverEffects() {
    // Skill items with magnetic effect
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
            
            // Add glow effect
            this.style.boxShadow = '0 8px 25px hsl(var(--violet) / 0.3)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Project cards with tilt effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Social links with bounce effect
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Typing animation for hero section - disabled for HTML content
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Skip typing animation for complex HTML content
    // Just add a subtle fade-in effect instead
    heroTitle.style.opacity = '0';
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 0.8s ease-in';
        heroTitle.style.opacity = '1';
    }, 500);
}

// Parallax scrolling effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Dynamic theme colorizer based on scroll position
function initThemeColorizer() {
    const sections = document.querySelectorAll('section');
    const colors = [
        'hsl(250 100% 60%)', // violet
        'hsl(214 100% 60%)', // blue
        'hsl(142 76% 36%)',  // green
        'hsl(25 95% 53%)'    // orange
    ];

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate scroll percentage
        const scrollPercent = scrollPosition / (documentHeight - windowHeight);
        
        // Change accent color based on scroll position
        const colorIndex = Math.floor(scrollPercent * colors.length);
        const currentColor = colors[Math.min(colorIndex, colors.length - 1)];
        
        document.documentElement.style.setProperty('--accent-color', currentColor);
    });
}

// Modern loading state animation
function showLoadingState(element) {
    element.classList.add('shimmer');
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.classList.remove('shimmer');
    element.style.pointerEvents = '';
}

// Utility function for creating ripple effects
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn-modern').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Magnetic cursor effect for interactive elements
function initMagneticCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('magnetic-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add magnetic effect to interactive elements
    document.querySelectorAll('.modern-card, .btn-modern, .social-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Initialize magnetic cursor on desktop devices
if (window.innerWidth > 768) {
    initMagneticCursor();
}

// Performance optimization: Debounce scroll events
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

// Easter egg: Konami code activation
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add rainbow animation to all text
    document.body.classList.add('rainbow-mode');
    
    // Show fun message
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the easter egg! Welcome to rainbow mode! 🌈';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
        padding: 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        text-align: center;
        animation: bounce 0.5s ease-in-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.classList.remove('rainbow-mode');
    }, 3000);
}

// Add CSS for rainbow mode
const rainbowCSS = `
.rainbow-mode * {
    animation: rainbow 2s linear infinite !important;
}

@keyframes rainbow {
    0% { color: #ff6b6b; }
    16% { color: #4ecdc4; }
    32% { color: #45b7d1; }
    48% { color: #96ceb4; }
    64% { color: #feca57; }
    80% { color: #fd79a8; }
    100% { color: #ff6b6b; }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
    40% { transform: translate(-50%, -50%) translateY(-30px); }
    60% { transform: translate(-50%, -50%) translateY(-15px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rainbowCSS;
document.head.appendChild(styleSheet);

// Timeline interactions and animations
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Add progressive delay for animations
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Enhanced hover interactions
        const content = item.querySelector('.timeline-content');
        const keywords = item.querySelector('.timeline-keywords');
        const details = item.querySelector('.timeline-details');
        const marker = item.querySelector('.timeline-marker');
        
        if (content) {
            content.addEventListener('mouseenter', function() {
                // Animate keyword tags individually
                const keywordTags = keywords.querySelectorAll('.keyword-tag');
                keywordTags.forEach((tag, tagIndex) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-4px) scale(1.05)';
                    }, tagIndex * 50);
                });
                
                // Animate marker
                if (marker) {
                    marker.style.transform = 'translateX(-50%) scale(1.15) rotate(10deg)';
                }
                
                // Add ripple effect to the content
                createTimelineRipple(this);
            });
            
            content.addEventListener('mouseleave', function() {
                // Reset keyword animations
                const keywordTags = keywords.querySelectorAll('.keyword-tag');
                keywordTags.forEach(tag => {
                    tag.style.transform = '';
                });
                
                // Reset marker
                if (marker) {
                    marker.style.transform = 'translateX(-50%)';
                }
            });
        }
        
        // Click to expand/collapse on mobile
        if (window.innerWidth <= 768) {
            content.addEventListener('click', function() {
                const isExpanded = this.classList.contains('expanded');
                
                // Close all other expanded items
                timelineItems.forEach(otherItem => {
                    otherItem.querySelector('.timeline-content').classList.remove('expanded');
                });
                
                // Toggle current item
                if (!isExpanded) {
                    this.classList.add('expanded');
                }
            });
        }
    });
    
    // Intersection Observer for timeline animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate the marker with a bounce effect
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.animation = 'timelineBounce 0.6s ease-out';
                    }, 300);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Create ripple effect for timeline items
function createTimelineRipple(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('timeline-ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'hsl(var(--violet) / 0.1)';
    ripple.style.animation = 'timelineRipple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add timeline-specific CSS animations
const timelineCSS = `
@keyframes timelineBounce {
    0% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.3) rotate(180deg); }
    100% { transform: translateX(-50%) scale(1) rotate(360deg); }
}

@keyframes timelineRipple {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

.timeline-content.expanded .timeline-details {
    opacity: 1 !important;
    max-height: 500px !important;
    margin-top: var(--space-4) !important;
}

.timeline-content.expanded .timeline-keywords {
    opacity: 0.7 !important;
    transform: translateY(-4px) !important;
}

/* Enhanced mobile styles */
@media (max-width: 768px) {
    .timeline-content {
        cursor: pointer;
    }
    
    .timeline-content::after {
        content: '👆 Tap to expand';
        position: absolute;
        bottom: var(--space-2);
        right: var(--space-4);
        font-size: var(--text-xs);
        color: hsl(var(--muted-foreground));
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .timeline-content.expanded::after {
        content: '👆 Tap to collapse';
    }
}
`;

const timelineStyleSheet = document.createElement('style');
timelineStyleSheet.textContent = timelineCSS;
document.head.appendChild(timelineStyleSheet);