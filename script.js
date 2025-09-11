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
            window.open('https://tiktok.com/404', '_blank').focus(); // Replace with actual TikTok profile
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
    
    // Enhanced copy functionality for script codes
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeElement = this.parentElement.querySelector('.script-code');
            if (!codeElement) return;
            
            const code = codeElement.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Visual feedback
                this.innerHTML = '✓';
                this.style.color = '#10b981';
                this.style.transform = 'scale(1.2)';
                
                // Show notification
                showNotification('Script copied to clipboard!', 'success');
                
                // Reset after delay
                setTimeout(() => {
                    this.innerHTML = '📋';
                    this.style.color = '';
                    this.style.transform = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy script. Try again.', 'error');
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
    
    // Script search functionality
    const searchInput = document.getElementById('script-search');
    const scriptCards = document.querySelectorAll('.script-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
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
        searchInput.addEventListener('keydown', function(e) {
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
                } else if (element.classList.contains('script-card')) {
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
    
    // Animate script cards
    function animateScriptCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Animate script code
            const code = card.querySelector('.script-code');
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
    document.querySelectorAll('.feature-card, .script-card, .stat-number').forEach(element => {
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
    
    // Handle window resize for responsive animations
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-observe elements on resize to handle layout shifts
            document.querySelectorAll('.feature-card, .script-card, .stat-number').forEach(element => {
                if (element.getBoundingClientRect().top > window.innerHeight) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(40px)';
                    observer.observe(element);
                }
            });
        }, 100);
    });
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .script-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Error boundary for critical operations
    function withErrorBoundary(fn, errorMessage) {
        try {
            return fn();
        } catch (error) {
            console.error(error);
            showNotification(errorMessage || 'An error occurred. Try again.', 'error');
        }
    }
    
    // Initialize stats with realistic values
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 13;
        stat.setAttribute('data-count', target);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Performance optimization: Debounce scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > scrollThreshold) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Image Modal Functionality
    const modal = document.getElementById('image-modal');
    const enlargedImage = document.getElementById('enlarged-image');
    const modalOverlay = document.querySelector('.modal-overlay');
    const scriptImages = document.querySelectorAll('.script-image img');

    if (modal && enlargedImage && modalOverlay && scriptImages) {
        scriptImages.forEach(img => {
            img.addEventListener('click', () => {
                withErrorBoundary(() => {
                    enlargedImage.src = img.src;
                    enlargedImage.alt = img.alt;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }, 'Failed to open image. Try again.');
            });

            // Accessibility: Keyboard interaction
            img.setAttribute('tabindex', '0');
            img.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        modalOverlay.addEventListener('click', () => {
            withErrorBoundary(() => {
                modal.classList.remove('active');
                enlargedImage.src = '';
                enlargedImage.alt = '';
                document.body.style.overflow = ''; // Restore scrolling
            }, 'Failed to close image. Try again.');
        });

        // Accessibility: Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modalOverlay.click();
            }
        });
    }
});