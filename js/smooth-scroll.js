// Smooth Scroll Navigation
// Leśna Rezydencja Królewo

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Height of fixed navigation
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navigation background on scroll
    const navigation = document.getElementById('main-nav');
    
    function handleNavigationScroll() {
        if (window.scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    }
    
    // Throttle function for better performance
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
        }
    }
    
    // Apply throttled scroll handlers
    window.addEventListener('scroll', throttle(highlightNavigation, 100));
    window.addEventListener('scroll', throttle(handleNavigationScroll, 100));
    
    // Scroll to top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--forest-green);
        color: var(--warm-white);
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    function toggleScrollToTop() {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', throttle(toggleScrollToTop, 100));
    
    // Scroll to top on click
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll to top button
    scrollToTop.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--luxury-gold)';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTop.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--forest-green)';
        this.style.transform = 'scale(1)';
    });
    
    // Smooth reveal animations on scroll
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function revealOnScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const viewportHeight = window.innerHeight;
            
            if (elementTop < viewportHeight * 0.9 && elementBottom > 0) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(revealOnScroll, 100));
    window.addEventListener('load', revealOnScroll);
    
    // Preload images for smooth scrolling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
    // Add navigation styles for scrolled state
    const style = document.createElement('style');
    style.textContent = `
        .luxury-nav.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: var(--luxury-gold);
        }
        
        .nav-link.active::after {
            width: 100%;
            background-color: var(--luxury-gold);
        }
        
        img.loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        img:not(.loaded) {
            opacity: 0;
        }
        
        .scroll-to-top:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
});

// Disable smooth scroll for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}