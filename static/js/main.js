// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            // Enable scrolling on body
            document.body.style.overflow = 'auto';
        }, 2000);
    });
    
    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';
    
    
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .filter-tab, .featured-tab, .action-btn, .social-icon, input, textarea, select, .card-hover, .preview-close');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '1px solid var(--primary-color)';
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'var(--primary-color)';
                cursor.style.border = 'none';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
            });
        });
    } else if (cursor && cursorFollower) {
        // Hide custom cursor on mobile
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Search overlay toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    
    if (searchToggle && searchOverlay && searchClose) {
        searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                document.querySelector('.search-input').focus();
            }, 300);
        });
        
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close search overlay on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Cart sidebar toggle
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    
    if (cartIcon && cartSidebar && cartClose) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close cart sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close cart sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (cartSidebar.classList.contains('active') && 
                !cartSidebar.contains(e.target) && 
                !cartIcon.contains(e.target)) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 3D Canvas Animation for Hero Section
    const heroCanvas = document.getElementById('hero-canvas');
    
    if (heroCanvas && window.THREE) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
        
        renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Create a group to hold all objects
        const group = new THREE.Group();
        scene.add(group);
        
        // Create geometric objects
        const geometry1 = new THREE.TorusKnotGeometry(3, 1, 100, 16);
        const material1 = new THREE.MeshBasicMaterial({ 
            color: 0x6c63ff,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const torusKnot = new THREE.Mesh(geometry1, material1);
        group.add(torusKnot);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xff6584,
            transparent: true,
            opacity: 0.8
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        group.add(particlesMesh);
        
        // Position camera
        camera.position.z = 10;
        
        // Mouse movement effect
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;
            
            group.rotation.y += 0.005;
            group.rotation.x += 0.0025;
            
            group.rotation.y += (targetX - group.rotation.y) * 0.05;
            group.rotation.x += (targetY - group.rotation.x) * 0.05;
            
            renderer.render(scene, camera);
        };
        
        animate();
    }
    
    // Featured tabs
    const featuredTabs = document.querySelectorAll('.featured-tab');
    const featuredItems = document.querySelectorAll('.featured-item');
    
    if (featuredTabs.length > 0 && featuredItems.length > 0) {
        featuredTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                featuredTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                const category = tab.getAttribute('data-category');
                
                // Filter items
                featuredItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category').includes(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Preview modal
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewModal = document.querySelector('.preview-modal');
    const previewClose = document.querySelector('.preview-close');
    const previewCloseBtn = document.querySelector('.preview-close-btn');
    const previewBody = document.querySelector('.preview-body');
    const previewDetailsBtn = document.querySelector('.preview-details-btn');
    
    if (previewBtns.length > 0 && previewModal && previewClose && previewBody) {
        previewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.getAttribute('data-product');
                
                // In a real app, you would fetch product details from the server
                // For now, we'll use dummy content
                previewBody.innerHTML = `
                    <div class="preview-product">
                        <div class="preview-gallery">
                            <div class="preview-main-image">
                                <img src="${btn.closest('.featured-item').querySelector('img').src}" alt="Product Preview">
                            </div>
                            <div class="preview-thumbnails">
                                <div class="preview-thumbnail active">
                                    <img src="${btn.closest('.featured-item').querySelector('img').src}" alt="Thumbnail">
                                </div>
                                <div class="preview-thumbnail">
                                    <img src="/static/images/preview-2.jpg" alt="Thumbnail">
                                </div>
                                <div class="preview-thumbnail">
                                    <img src="/static/images/preview-3.jpg" alt="Thumbnail">
                                </div>
                            </div>
                        </div>
                        <div class="preview-info">
                            <h2>${btn.closest('.featured-item').querySelector('h3').textContent}</h2>
                            <div class="preview-meta">
                                <div class="preview-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>4.8 (120 reviews)</span>
                                </div>
                                <div class="preview-category">
                                    <span>Category: </span>
                                    <a href="#">${btn.closest('.featured-item').querySelector('.featured-category').textContent}</a>
                                </div>
                            </div>
                            <div class="preview-price">
                                <span class="current-price">${btn.closest('.featured-item').querySelector('.price').textContent}</span>
                                <span class="old-price">$59.99</span>
                                <span class="discount">-25%</span>
                            </div>
                            <div class="preview-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                            </div>
                            <div class="preview-features">
                                <h4>Key Features</h4>
                                <ul>
                                    <li><i class="fas fa-check"></i> High-quality resources</li>
                                    <li><i class="fas fa-check"></i> Easy to customize</li>
                                    <li><i class="fas fa-check"></i> Compatible with major software</li>
                                    <li><i class="fas fa-check"></i> Regular updates</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                
                // Update details button link
                previewDetailsBtn.href = `/product/${productId}`;
                
                // Show modal
                previewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal functions
        const closePreviewModal = () => {
            previewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        
        previewClose.addEventListener('click', closePreviewModal);
        if (previewCloseBtn) previewCloseBtn.addEventListener('click', closePreviewModal);
        
        // Close modal when clicking outside content
        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                closePreviewModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && previewModal.classList.contains('active')) {
                closePreviewModal();
            }
        });
    }
    
    // Add to cart functionality
    const cartBtns = document.querySelectorAll('.cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartBtns.length > 0 && cartCount) {
        cartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = btn.getAttribute('data-product');
                
                // In a real app, you would send an AJAX request to add the item to the cart
                // For now, we'll just update the cart count
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Show toast notification
                showToast('Success', 'Product added to cart!', 'success');
                
                // Animation for button
                btn.classList.add('added');
                setTimeout(() => {
                    btn.classList.remove('added');
                }, 1000);
            });
        });
    }
    
    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    if (wishlistBtns.length > 0 && wishlistCount) {
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = btn.getAttribute('data-product');
                
                // Toggle wishlist state
                if (btn.querySelector('i').classList.contains('far')) {
                    btn.querySelector('i').classList.remove('far');
                    btn.querySelector('i').classList.add('fas');
                    
                    // Update wishlist count
                    let count = parseInt(wishlistCount.textContent);
                    wishlistCount.textContent = count + 1;
                    
                    // Show toast notification
                    showToast('Success', 'Product added to wishlist!', 'success');
                } else {
                    btn.querySelector('i').classList.remove('fas');
                    btn.querySelector('i').classList.add('far');
                    
                    // Update wishlist count
                    let count = parseInt(wishlistCount.textContent);
                    wishlistCount.textContent = Math.max(0, count - 1);
                    
                    // Show toast notification
                    showToast('Success', 'Product removed from wishlist!', 'info');
                }
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showToast('Error', 'Please enter your email address.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Error', 'Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real app, you would send an AJAX request to subscribe the user
            // For now, we'll just show a success message
            showToast('Success', 'Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Footer newsletter form
    const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (footerNewsletterForm) {
        footerNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = footerNewsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showToast('Error', 'Please enter your email address.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Error', 'Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real app, you would send an AJAX request to subscribe the user
            // For now, we'll just show a success message
            showToast('Success', 'Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            footerNewsletterForm.reset();
        });
    }
    
    // Toast notification function
    function showToast(title, message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-close"><i class="fas fa-times"></i></div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove toast after 5 seconds
        const toastTimeout = setTimeout(() => {
            removeToast(toast);
        }, 5000);
        
        // Close toast on click
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(toastTimeout);
                removeToast(toast);
            });
        }
    }
    
    function removeToast(toast) {
        toast.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});