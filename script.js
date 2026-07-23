/**
 * Abid Rather - Professional Portfolio Interactivity
 * Handles typing effects, scroll animations, particle backgrounds, and DOM interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Utilities ---
    // Debounce function to limit the rate at which a function can fire.
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

    // --- 1. Typing Effect ---
    const initTypingEffect = () => {
        const textElement = document.querySelector('.typing-text');
        if (!textElement) return;

        const phrases = [
            'Full Stack .NET Developer',
            'ASP.NET Core Expert',
            'React Developer',
            'Clean Architecture Enthusiast'
        ];
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                textElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing after initial delay
        setTimeout(type, 1000);
    };

    // --- 2 & 6. Scroll Animations & Skill Counters ---
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('animated');

                    // Handle staggered children animations
                    const staggeredChildren = target.querySelectorAll('.stagger');
                    staggeredChildren.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 100}ms`;
                        child.classList.add('animated');
                    });

                    // Only animate once
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => animationObserver.observe(el));

        // Intersection observer for counters
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initSkillCounters(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const counterElements = document.querySelectorAll('.count-up');
        counterElements.forEach(el => counterObserver.observe(el));
    };

    const initSkillCounters = (element) => {
        const target = +element.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // roughly 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // --- 3. Navigation ---
    const initNavigation = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        const hamburger = document.querySelector('.hamburger');
        const body = document.body;

        const handleScroll = debounce(() => {
            const scrollY = window.scrollY;
            
            // Navbar solid/glassmorphism state
            if (scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Active link highlighting
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 250)) { // Offset for navbar
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }, 10);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init state on load

        // Smooth scroll to sections
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Offset for fixed nav
                            behavior: 'smooth'
                        });
                    }

                    // Close mobile menu on click
                    body.classList.remove('nav-open');
                    hamburger?.classList.remove('active');
                }
            });
        });

        // Mobile hamburger toggle
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                body.classList.toggle('nav-open');
                hamburger.classList.toggle('active');
            });
        }
    };

    // --- 4. Particle Background ---
    const initParticles = () => {
        const canvas = document.getElementById('heroParticles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let animationFrameId;

        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.x - rect.left;
            mouse.y = event.y - rect.top;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const setCanvasSize = () => {
            canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
        };

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Bounce off edges
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                // Mouse repel interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * 5;
                        const directionY = forceDirectionY * force * 5;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                this.draw();
            }
        }

        const init = () => {
            setCanvasSize();
            particlesArray = [];
            const isMobile = window.innerWidth < 768;
            const numberOfParticles = isMobile ? 40 : 80;
            const colors = ['#0ea5e9', '#8b5cf6', '#06b6d4', '#6366f1']; // Theme matching colors

            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 2 + 1;
                let x = Math.random() * (canvas.width - size * 2) + size * 2;
                let y = Math.random() * (canvas.height - size * 2) + size * 2;
                let dx = (Math.random() - 0.5) * 1.2;
                let dy = (Math.random() - 0.5) * 1.2;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particlesArray.push(new Particle(x, y, dx, dy, size, color));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let dx = particlesArray[a].x - particlesArray[b].x;
                    let dy = particlesArray[a].y - particlesArray[b].y;
                    let distance = dx * dx + dy * dy;
                    
                    // Connect threshold
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue})`; // purple connecting lines
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        };

        const handleResize = debounce(() => {
            setCanvasSize();
            init();
        }, 250);

        window.addEventListener('resize', handleResize);

        init();
        animate();

        // Cleanup
        window.addEventListener('unload', () => {
            cancelAnimationFrame(animationFrameId);
        });
    };

    // --- 5. 3D Card Tilt Effect ---
    const initTiltCards = () => {
        const cards = document.querySelectorAll('.tilt-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Add or update shine effect
                let shine = card.querySelector('.shine-effect');
                if (!shine) {
                    shine = document.createElement('div');
                    shine.classList.add('shine-effect');
                    // Styling for shine, expects parent to have overflow: hidden and position: relative
                    Object.assign(shine.style, {
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        transition: 'background 0.1s ease',
                        zIndex: '2'
                    });
                    card.appendChild(shine);
                }
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                const shine = card.querySelector('.shine-effect');
                if (shine) {
                    shine.style.background = 'none';
                }
            });
        });
    };

    // --- 7 & 8. Scroll Progress & Back to Top ---
    const initScrollFeatures = () => {
        const progressBar = document.querySelector('.scroll-progress');
        const backToTopBtn = document.querySelector('.back-to-top');

        const updateScrollState = debounce(() => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (progressBar) {
                progressBar.style.width = `${scrollPercent}%`;
            }

            if (backToTopBtn) {
                if (scrollTop > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }
        }, 10);

        window.addEventListener('scroll', updateScrollState, { passive: true });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // --- 9. Contact Form & Toast Notification ---
    const initContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            const email = form.querySelector('input[type="email"]');
            if (email && email.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    isValid = false;
                    email.classList.add('error');
                }
            }

            if (isValid) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                // Loading state
                btn.innerHTML = '<span class="loading-spinner"></span> Sending...';
                btn.disabled = true;

                // Prepare template parameters matching EmailJS template
                const templateParams = {
                    name: form.querySelector('#name').value,
                    email: form.querySelector('#email').value,
                    subject: form.querySelector('#subject').value,
                    message: form.querySelector('#message').value,
                    time: new Date().toLocaleString()
                };

                // Send email via EmailJS
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
                    publicKey: EMAILJS_PUBLIC_KEY,
                })
                    .then(() => {
                        showToast('Message sent successfully! I will get back to you soon. ✉️');
                        form.reset();
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        showToast('⚠️ Failed to send message. Please email me directly at abidrather40@yahoo.in');
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    });
            }
        });

        // Toast Notification System
        const showToast = (message) => {
            let toastContainer = document.querySelector('.toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.className = 'toast-container';
                document.body.appendChild(toastContainer);
                
                // Basic styles applied via JS fallback (ideally in CSS)
                Object.assign(toastContainer.style, {
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: '9999',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                });
            }

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<div class="toast-content">${message}</div>`;
            
            Object.assign(toast.style, {
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                borderLeft: '4px solid #0ea5e9',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                opacity: '0',
                transform: 'translateX(50px)',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            });

            toastContainer.appendChild(toast);

            // Animate in
            requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(0)';
            });

            // Auto dismiss
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(50px)';
                
                setTimeout(() => {
                    toast.remove();
                }, 300); // Wait for exit animation
            }, 3000);
        };
        
        // Remove error class on input
        form.addEventListener('input', (e) => {
            if (e.target.classList.contains('error')) {
                e.target.classList.remove('error');
            }
        });
    };

    // --- Initialize All Features ---
    initTypingEffect();
    initScrollAnimations();
    initNavigation();
    initParticles();
    initTiltCards();
    initScrollFeatures();
    initContactForm();
});
