// Parallax Effects
// Rezydencja Leśna Królewo

document.addEventListener('DOMContentLoaded', function() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        return; // Skip parallax effects for accessibility
    }
    
    // Parallax elements configuration
    const parallaxElements = [
        {
            selector: '.hero-background',
            speed: 0.5,
            offset: 0
        },
        {
            selector: '.story-img-1',
            speed: 0.3,
            offset: 100
        },
        {
            selector: '.story-img-2',
            speed: 0.2,
            offset: 150
        }
    ];
    
    // Initialize parallax elements
    const elements = [];
    parallaxElements.forEach(config => {
        const el = document.querySelector(config.selector);
        if (el) {
            elements.push({
                element: el,
                speed: config.speed,
                offset: config.offset,
                initialTop: el.offsetTop
            });
        }
    });
    
    // Throttle function for performance
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
    
    // Parallax scroll handler
    function handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        elements.forEach(item => {
            const { element, speed, offset } = item;
            const elementTop = element.getBoundingClientRect().top + scrolled;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            
            // Check if element is in viewport
            if (elementBottom >= scrolled && elementTop <= scrolled + windowHeight) {
                const yPos = -(scrolled - elementTop + offset) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    // Apply parallax on scroll
    window.addEventListener('scroll', throttle(handleParallaxScroll, 16));
    
    // Initialize on load
    handleParallaxScroll();
    
    // Mouse parallax for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero-section');
    
    if (heroContent && heroSection) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        heroSection.addEventListener('mousemove', function(e) {
            const rect = heroSection.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        });
        
        // Smooth animation loop
        function animateHeroParallax() {
            // Lerp for smooth movement
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            const translateX = currentX * 20;
            const translateY = currentY * 20;
            
            heroContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
            
            requestAnimationFrame(animateHeroParallax);
        }
        
        animateHeroParallax();
    }
    
    // Depth layers parallax
    const depthLayers = document.querySelectorAll('[data-depth]');
    
    if (depthLayers.length > 0) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            
            depthLayers.forEach(layer => {
                const depth = layer.dataset.depth;
                const movement = -(scrolled * depth);
                const translate3d = `translate3d(0, ${movement}px, 0)`;
                
                layer.style.transform = translate3d;
            });
        }, 16));
    }
    
    // Reveal animations with parallax
    const revealElements = document.querySelectorAll('.scroll-animate');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const scrolled = window.pageYOffset;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrolled;
            const elementVisible = elementTop - windowHeight + 150;
            
            if (scrolled > elementVisible) {
                element.classList.add('in-view');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(checkReveal, 100));
    checkReveal(); // Check on load
    
    // Ken Burns effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        let scale = 1;
        let direction = 1;
        
        function animateKenBurns() {
            scale += 0.0001 * direction;
            
            if (scale > 1.1 || scale < 1) {
                direction *= -1;
            }
            
            heroImage.style.transform = `scale(${scale})`;
            requestAnimationFrame(animateKenBurns);
        }
        
        // Start Ken Burns animation
        animateKenBurns();
    }
    
    // Parallax for gallery items on hover
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const image = item.querySelector('.gallery-img');
        
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            image.style.transform = 'scale(1)';
        });
    });
    
    // Add smooth transitions for parallax elements
    const style = document.createElement('style');
    style.textContent = `
        .hero-background {
            will-change: transform;
            transition: transform 0.1s linear;
        }
        
        .story-img-1,
        .story-img-2 {
            will-change: transform;
            transition: transform 0.1s linear;
        }
        
        .hero-content {
            will-change: transform;
            transition: transform 0.2s ease-out;
        }
        
        [data-depth] {
            will-change: transform;
            transition: transform 0.1s linear;
        }
        
        .gallery-img {
            transition: transform 0.3s ease-out;
        }
        
        /* Performance optimization */
        .parallax-active {
            transform: translateZ(0);
            backface-visibility: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization - disable parallax on low-end devices
    function checkPerformance() {
        let fps = 0;
        let lastTime = performance.now();
        
        function measureFPS() {
            const currentTime = performance.now();
            fps = 1000 / (currentTime - lastTime);
            lastTime = currentTime;
            
            if (fps < 30) {
                // Disable parallax if FPS is too low
                disableParallax();
            }
            
            requestAnimationFrame(measureFPS);
        }
        
        // Run FPS check for 3 seconds
        measureFPS();
        setTimeout(() => {
            cancelAnimationFrame(measureFPS);
        }, 3000);
    }
    
    function disableParallax() {
        // Remove scroll listeners and reset transforms
        window.removeEventListener('scroll', handleParallaxScroll);
        elements.forEach(item => {
            item.element.style.transform = 'none';
        });
        console.log('Parallax disabled for performance');
    }
    
    // Initialize performance check
    checkPerformance();
});