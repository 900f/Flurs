document.addEventListener('DOMContentLoaded', function() {
    // Enhanced navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navbar = document.querySelector('.navbar');
   
    // Handle navigation clicks with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
           
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                navLink.setAttribute('aria-current', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
           
            // Fade out current page
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
           
            // Fade in target page
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
           
            // Update URL hash
            history.pushState(null, '', `#${targetPage}`);
           
            // Accessibility: Focus the new page
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
   
    // Handle initial page load from URL hash
    function handleInitialPage() {
        const hash = window.location.hash.replace('#', '') || 'home';
        const targetLink = document.querySelector(`.nav-link[data-page="${hash}"]`);
        if (targetLink) targetLink.click();
        else document.querySelector('.nav-link[data-page="home"]')?.click();
    }
    handleInitialPage();
   
    // Navbar scroll effect + parallax
    let lastScrollTop = 0;
    const scrollThreshold = 50;
   
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
       
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
       
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${scrollTop * 0.5}px)`;
        }
       
        lastScrollTop = scrollTop;
    });
   
    // Social Buttons
    const discordBtn = document.getElementById('download-btn');
    const tiktokBtn = document.getElementById('tiktok-btn');
    const youtubeBtn = document.getElementById('youtube-btn');
   
    if (discordBtn) {
        discordBtn.addEventListener('click', function() {
            this.disabled = true;
            this.style.pointerEvents = 'none';
            this.style.transform = 'scale(0.95)';
           
            const progress = this.querySelector('.btn-progress');
            if (progress) progress.style.width = '100%';
           
            setTimeout(() => {
                this.style.transform = '';
                this.style.pointerEvents = '';
                this.disabled = false;
                if (progress) progress.style.width = '0%';
                window.open('https://discord.gg/tWK2SqrrFf', '_blank')?.focus();
            }, 600);
        });
       
        ['mouseenter', 'focus'].forEach(ev => discordBtn.addEventListener(ev, () => {
            const icon = discordBtn.querySelector('.btn-icon');
            if (icon) icon.style.transform = 'translateY(2px)';
        }));
        ['mouseleave', 'blur'].forEach(ev => discordBtn.addEventListener(ev, () => {
            const icon = discordBtn.querySelector('.btn-icon');
            if (icon) icon.style.transform = '';
        }));
        discordBtn.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), discordBtn.click()));
    }
   
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', () => window.open('https://tiktok.com/@flurs.xyz', '_blank')?.focus());
        tiktokBtn.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), tiktokBtn.click()));
    }
   
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', () => {
            window.open('https://youtube.com/@YourChannel', '_blank')?.focus();
            showNotification('Opening YouTube channel!', 'success');
        });
        youtubeBtn.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), youtubeBtn.click()));
    }
   
    // Copy buttons (scripts, configs, paths)
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const codeEl = this.parentElement.querySelector('.script-code, .config-code, .path-code');
            if (!codeEl) return;
           
            try {
                await navigator.clipboard.writeText(codeEl.textContent);
                this.innerHTML = 'Copied';
                this.style.color = '#10b981';
                this.style.transform = 'scale(1.2)';
                showNotification('Copied to clipboard!', 'success');
               
                setTimeout(() => {
                    this.innerHTML = 'Copy';
                    this.style.color = '';
                    this.style.transform = '';
                }, 2000);
            } catch (err) {
                showNotification('Failed to copy', 'error');
            }
        });
        btn.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), btn.click()));
    });
   
    // Expand/Collapse config details
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.config-details');
            const isHidden = details.style.display === 'none' || !details.style.display;
           
            details.style.display = 'block';
            details.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
           
            if (isHidden) {
                details.style.opacity = '0';
                details.style.maxHeight = '0';
                requestAnimationFrame(() => {
                    details.style.opacity = '1';
                    details.style.maxHeight = '1000px';
                });
                this.textContent = 'Collapse';
                this.classList.add('active');
            } else {
                details.style.opacity = '0';
                details.style.maxHeight = '0';
                this.textContent = 'Expand';
                this.classList.remove('active');
                setTimeout(() => { details.style.display = 'none'; }, 300);
            }
        });
        btn.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), btn.click()));
    });
   
    // Script & Config Search
    function setupSearch(inputId, cardSelector, useTags = false) {
        const input = document.getElementById(inputId);
        const cards = document.querySelectorAll(cardSelector);
        if (!input) return;
       
        input.addEventListener('input', () => {
            const term = input.value.trim().toLowerCase();
            cards.forEach(card => {
                const name = (card.getAttribute('data-name') || '').toLowerCase();
                const tags = useTags ? (card.getAttribute('data-tags') || '').toLowerCase() : '';
                const matches = term === '' || name.includes(term) || (useTags && tags.includes(term));
               
                if (matches) {
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
                    setTimeout(() => card.style.display = 'none', 400);
                }
            });
        });
       
        input.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        });
    }
   
    setupSearch('script-search', '.script-card', true);
    setupSearch('config-search', '.config-card');
    setupSearch('brainrot-search', '#brainrots-page .script-card', true);
   
    // Notification system
    function showNotification(message, type = 'success') {
        const notif = document.createElement('div');
        notif.className = `notification ${type}`;
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white; border-radius: 8px; z-index: 2000;
            opacity: 0; transform: translateY(20px); transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-weight: 500;
        `;
        document.body.appendChild(notif);
        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateY(20px)';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
   
    // Animated counters
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start).toLocaleString();
            }
        }, 16);
    }
   
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('stat-number')) {
                    const target = parseInt(el.getAttribute('data-count') || 0);
                    animateCounter(el, target);
                }
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
   
    document.querySelectorAll('.feature-card, .script-card, .config-card, .stat-number').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        observer.observe(el);
    });
   
    // Progress bars animation
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0%';
                bar.style.transition = 'width 1.4s ease-out';
                requestAnimationFrame(() => bar.style.width = width);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.6 });
   
    document.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = '0';
        barObserver.observe(bar);
    });
   
    // Skip to content link (accessibility)
    const skipLink = document.createElement('a');
    skipLink.href = '#home-page';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute; top: -100px; left: 6px; background: #000; color: #fff;
        padding: 8px 16px; z-index: 10000; transition: top 0.3s;
    `;
    skipLink.addEventListener('focus', () => skipLink.style.top = '6px');
    skipLink.addEventListener('blur', () => skipLink.style.top = '-100px');
    document.body.prepend(skipLink);
   
    // Image modal
    const modal = document.getElementById('image-modal');
    const enlargedImg = document.getElementById('enlarged-image');
    const overlay = document.querySelector('.modal-overlay');
   
    document.querySelectorAll('.script-image img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            enlargedImg.src = img.src;
            enlargedImg.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        img.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), img.click()));
    });
   
    if (overlay) {
        overlay.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
   
    // Resize handler (re-trigger animations if needed)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.feature-card, .script-card, .config-card, .stat-number')
                .forEach(el => {
                    if (el.style.opacity === '0') observer.observe(el);
                });
        }, 200);
    });
});
