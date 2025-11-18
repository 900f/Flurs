document.addEventListener('DOMContentLoaded', function() {
    // Enhanced navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navbar = document.querySelector('.navbar');
    
    // Handle navigation clicks with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                navLink.setAttribute('aria-current', 'false');
            });
            
            // Add active class and ARIA attribute to clicked nav link
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
            
            // Hide all pages with fade out
            pages.forEach(page => {
                if (page.classList.contains('active')) {
                    page.style.opacity = '0';
                    page.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        page.classList.remove('active');
                        page.style.opacity = '';
                        page.style.transform = '';
                    }, 200);
                }
            });
            
            // Show selected page with fade in
            const targetPage = this.getAttribute('data-page');
            const targetElement = document.getElementById(targetPage + '-page');
            
            if (targetElement) {
                setTimeout(() => {
                    targetElement.classList.add('active');
                    targetElement.style.opacity = '0';
                    targetElement.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        targetElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        targetElement.style.opacity = '1';
                        targetElement.style.transform = 'translateY(0)';
                    });
                }, 200);
            }
            
            // Update URL without page refresh
            history.pushState(null, '', `#${targetPage}`);
            
            // Focus management for accessibility
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
        });
    });
    
    // Handle initial page load from hash
    function handleInitialPage() {
        const hash = window.location.hash.replace('#', '');
        const defaultPage = hash || 'home';
        const targetLink = document.querySelector(`.nav-link[data-page="${defaultPage}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
    
    handleInitialPage();
    
    // Enhanced scroll effects
    let lastScrollTop = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background change on scroll
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for floating particles
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Social media button functionality
    const discordBtn = document.getElementById('download-btn');
    const tiktokBtn = document.getElementById('tiktok-btn');
    const youtubeBtn = document.getElementById('youtube-btn');
    
    if (discordBtn) {
        discordBtn.addEventListener('click', function() {
            // Disable button during animation
            this.setAttribute('disabled', 'true');
            this.style.pointerEvents = 'none';
            
            // Button press animation
            this.style.transform = 'scale(0.95)';
            
            // Progress bar animation
            const btnProgress = this.querySelector('.btn-progress');
            if (btnProgress) {
                btnProgress.style.width = '100%';
            }
            
            // Reset after animation and open new tab
            setTimeout(() => {
                this.style.transform = '';
                this.style.pointerEvents = '';
                this.removeAttribute('disabled');
                if (btnProgress) {
                    btnProgress.style.width = '0%';
                }
                window.open('https://discord.gg/tWK2SqrrFf', '_blank').focus(); // Replace with actual Discord invite
            }, 600);
        });
        
        // Button hover effect
        discordBtn.addEventListener('mouseenter', function() {
            const btnIcon = this.querySelector('.btn-icon');
            if (btnIcon) {
                btnIcon.style.transform = 'translateY(2px)';
            }
        });
        
        discordBtn.addEventListener('mouseleave', function() {
            const btnIcon = this.querySelector('.btn-icon');
            if (btnIcon) {
                btnIcon.style.transform = '';
            }
        });
        
        // Accessibility: Keyboard interaction
        discordBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function() {
            window.open('https://tiktok.com/@flurs.xyz', '_blank').focus(); // Replace with actual TikTok profile
        });
        
        tiktokBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', function() {
            window.open('https://youtube.com/404', '_blank').focus(); // Replace with actual YouTube channel
            showNotification('Opening YouTube channel!', 'success');
        });
        
        youtubeBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Enhanced copy functionality for script codes, config codes, and path codes
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeElement = this.parentElement.querySelector('.script-code') || 
                               this.parentElement.querySelector('.config-code') || 
                               this.parentElement.querySelector('.path-code');
            if (!codeElement) return;
            
            const code = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                this.innerHTML = '✓';
                this.style.color = '#10b981';
                this.style.transform = 'scale(1.2)';
                
                // Show notification
                showNotification('Content copied to clipboard!', 'success');
                
                // Reset after delay
                setTimeout(() => {
                    this.innerHTML = '📋';
                    this.style.color = '';
                    this.style.transform = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy content. Try again.', 'error');
            });
        });
        
        // Accessibility: Keyboard interaction
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Expand/Collapse functionality for config details
    const expandBtns = document.querySelectorAll('.expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.config-details');
            if (details.style.display === 'none' || !details.style.display) {
                details.style.display = 'block';
                details.style.opacity = '0';
                details.style.maxHeight = '0';
                this.textContent = 'Collapse';
                this.classList.add('active');
                requestAnimationFrame(() => {
                    details.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
                    details.style.opacity = '1';
                    details.style.maxHeight = '1000px'; // Large enough to accommodate content
                });
            } else {
                details.style.opacity = '0';
                details.style.maxHeight = '0';
                this.textContent = 'Expand';
                this.classList.remove('active');
                setTimeout(() => {
                    details.style.display = 'none';
                }, 300);
            }
        });
        
        // Accessibility: Keyboard interaction
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Script search functionality
    const scriptSearchInput = document.getElementById('script-search');
    const scriptCards = document.querySelectorAll('.script-card');
    
    if (scriptSearchInput) {
        scriptSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            scriptCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const tags = card.getAttribute('data-tags').toLowerCase();
                
                // Show cards that match name or tags (partial match)
                if (searchTerm === '' || name.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
        
        // Accessibility: Clear search on escape key
        scriptSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                // Trigger input event to show all cards
                const event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }
    
    // Config search functionality
    const configSearchInput = document.getElementById('config-search');
    const configCards = document.querySelectorAll('.config-card');
    
    if (configSearchInput) {
        configSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            
            configCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                
                // Show cards that match name only (partial match)
                if (searchTerm === '' || name.includes(searchTerm)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    requestAnimationFrame(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
        
        // Accessibility: Clear search on escape key
        configSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                // Trigger input event to show all cards
                const event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: #fff;
            z-index: 2000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Animated counters for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate elements based on their class
                if (element.classList.contains('feature-card')) {
                    animateFeatureCard(element);
                } else if (element.classList.contains('script-card') || element.classList.contains('config-card')) {
                    animateScriptCard(element);
                } else if (element.classList.contains('stat-number')) {
                    const target = parseInt(element.getAttribute('data-count')) || 0;
                    animateCounter(element, target);
                }
                
                // Generic animation for other elements
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Unobserve after animation to improve performance
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Animate feature cards
    function animateFeatureCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    // Animate script and config cards
    function animateScriptCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Animate script or config code
            const code = card.querySelector('.script-code') || card.querySelector('.config-code');
            if (code) {
                code.style.opacity = '0';
                code.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    code.style.transition = 'all 0.6s ease';
                    code.style.opacity = '1';
                    code.style.transform = 'translateX(0)';
                }, 200);
            }
        });
    }
    
    // Observe all animatable elements
    document.querySelectorAll('.feature-card, .script-card, .config-card, .stat-number').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        observer.observe(element);
    });
    
    // Performance metrics animation
    const metricBars = document.querySelectorAll('.bar-fill');
    metricBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        observer.observe(bar);
        bar.addEventListener('animationstart', () => {
            bar.style.transition = 'width 1s ease';
            requestAnimationFrame(() => {
                bar.style.width = width;
            });
        }, { once: true });
    });
    
    // Accessibility: Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home-page';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to content';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        padding: 1rem;
        background: #fff;
        color: #000;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100px';
    });
    document.body.prepend(skipLink);
    
    // Image modal functionality for script previews
    const scriptImages = document.querySelectorAll('.script-image img');
    const imageModal = document.getElementById('image-modal');
    const enlargedImage = document.getElementById('enlarged-image');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    scriptImages.forEach(img => {
        img.addEventListener('click', function() {
            enlargedImage.src = this.src;
            enlargedImage.alt = this.alt;
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modalOverlay.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle window resize for responsive animations
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-observe elements on resize to ensure animations trigger correctly
            document.querySelectorAll('.feature-card, .script-card, .config-card, .stat-number').forEach(element => {
                if (!element.style.opacity || element.style.opacity === '0') {
                    observer.observe(element);
                }
            });
        }, 200);

    const brainrotSearchInput = document.getElementById('brainrot-search');
    const brainrotCards = document.querySelectorAll('#brainrots-page .script-card');

    if (brainrotSearchInput) {
        brainrotSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();

            brainrotCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const tags = card.getAttribute('data-tags').toLowerCase();

                if (searchTerm === '' || name.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 400);
                }
            });
        });

        brainrotSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                const event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }

});
