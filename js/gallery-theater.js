// Gallery Theater Mode
// Leśna Rezydencja Królewo

document.addEventListener('DOMContentLoaded', function() {
    // Gallery configuration
    const galleryImages = [
        {
            src: 'assets/images/widok-frontowy-zewnetrzny.jpg',
            title: 'Widok Frontowy',
            description: 'Główny widok domu z tarasem'
        },
        {
            src: 'assets/images/widok-boczny-zewnetrzny.jpg',
            title: 'Widok Boczny',
            description: 'Ekskluzywna rezydencja z tarasem i balkonem'
        },
        {
            src: 'assets/images/brama-wejscie.jpg',
            title: 'Brama Wejściowa',
            description: 'Prywatne wejście w otoczeniu lasu'
        },
        {
            src: 'assets/images/salon-kominek.jpg',
            title: 'Salon z Kominkiem',
            description: '26m² przestrzeni do spotkań rodzinnych'
        },
        {
            src: 'assets/images/hol-glowny-schody.jpg',
            title: 'Główny Hol',
            description: 'Eleganckie drewniane schody i kominek'
        },
        {
            src: 'assets/images/sypialnia-poddasze.jpg',
            title: 'Sypialnia na Poddaszu',
            description: 'Przytulna sypialnia z drewnianym wykonańczeniem'
        },
        {
            src: 'assets/images/lazienka-wnetrze.jpg',
            title: 'Łazienka',
            description: 'Nowoczesna łazienka w stylu spa'
        },
        {
            src: 'assets/images/schody-wnetrze.jpg',
            title: 'Schody Wewnętrzne',
            description: 'System grzewczy i piękne drewniane wykonańczenie'
        },
        {
            src: 'assets/images/sciezka-lesna.jpg',
            title: 'Ścieżka Leśna',
            description: '4,134m² prywatnego lasu do eksploracji'
        },
        {
            src: 'assets/images/map.jpg',
            title: 'Lokalizacja na Mapie',
            description: 'Strategiczne położenie 50km od Warszawy'
        }
    ];
    
    let currentImageIndex = 0;
    let isTheaterMode = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // DOM elements
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.modal-close');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    const viewAllButton = document.getElementById('view-all-photos');
    
    // Gallery items click handlers
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openTheaterMode(index);
        });
    });
    
    // View all photos button
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            openTheaterMode(0);
        });
    }
    
    // Open theater mode
    function openTheaterMode(index) {
        currentImageIndex = index;
        isTheaterMode = true;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateModalImage();
        
        // Add fade-in animation
        setTimeout(() => {
            modalImage.style.opacity = '1';
        }, 50);
    }
    
    // Close theater mode
    function closeTheaterMode() {
        isTheaterMode = false;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImage.style.opacity = '0';
    }
    
    // Update modal image
    function updateModalImage() {
        const image = galleryImages[currentImageIndex];
        
        // Fade out
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = image.src;
            modalImage.alt = image.title;
            modalCaption.innerHTML = `
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <span class="image-counter">${currentImageIndex + 1} / ${galleryImages.length}</span>
            `;
            
            // Fade in
            modalImage.style.opacity = '1';
        }, 300);
        
        // Update button states
        prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'block';
    }
    
    // Navigation functions
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < galleryImages.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    }
    
    // Event listeners
    closeModal.addEventListener('click', closeTheaterMode);
    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTheaterMode();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!isTheaterMode) return;
        
        switch(e.key) {
            case 'Escape':
                closeTheaterMode();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Touch support for mobile
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - previous image (right to left navigation)
                showPreviousImage();
            } else {
                // Swipe right - next image (right to left navigation)
                showNextImage();
            }
        }
    }
    
    // Preload images for smooth experience
    function preloadImages() {
        galleryImages.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }
    
    // Initialize preloading
    preloadImages();
    
    // Add zoom functionality on double click
    let zoomLevel = 1;
    modalImage.addEventListener('dblclick', function(e) {
        if (zoomLevel === 1) {
            zoomLevel = 2;
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.transformOrigin = `${x}px ${y}px`;
            this.style.transform = `scale(${zoomLevel})`;
            this.style.cursor = 'zoom-out';
        } else {
            zoomLevel = 1;
            this.style.transform = 'scale(1)';
            this.style.cursor = 'zoom-in';
        }
    });
    
    // Reset zoom when changing images
    function resetZoom() {
        zoomLevel = 1;
        modalImage.style.transform = 'scale(1)';
        modalImage.style.cursor = 'zoom-in';
    }
    
    // Add to navigation functions
    const originalShowPrevious = showPreviousImage;
    const originalShowNext = showNextImage;
    
    showPreviousImage = function() {
        resetZoom();
        originalShowPrevious();
    };
    
    showNextImage = function() {
        resetZoom();
        originalShowNext();
    };
    
    // Add styles for gallery modal
    const style = document.createElement('style');
    style.textContent = `
        .gallery-modal .image-counter {
            display: block;
            margin-top: 10px;
            font-size: 0.9rem;
            opacity: 0.7;
        }
        
        .gallery-modal h3 {
            margin: 0 0 5px 0;
            color: var(--luxury-gold);
            font-size: 1.5rem;
        }
        
        .gallery-modal p {
            margin: 0;
            opacity: 0.9;
        }
        
        #modal-image {
            cursor: zoom-in;
            transition: all 0.3s ease;
            max-width: 90vw;
            max-height: 80vh;
        }
        
        .modal-prev:disabled,
        .modal-next:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
            .modal-caption {
                font-size: 0.9rem;
            }
            
            .gallery-modal h3 {
                font-size: 1.2rem;
            }
            
            .modal-prev,
            .modal-next {
                padding: 5px 10px;
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for gallery images
    const lazyLoadGalleryImages = function() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('.gallery-img');
        images.forEach(img => imageObserver.observe(img));
    };
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadGalleryImages();
    }
});