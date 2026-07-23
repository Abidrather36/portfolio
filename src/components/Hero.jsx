import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, ArrowRight, Code, Atom, Database } from '@phosphor-icons/react';

export function Hero() {
    const canvasRef = useRef(null);
    const textRef = useRef(null);
    const [text, setText] = useState('');
    
    // Scroll animations
    const greetingRef = useScrollAnimation();
    const nameRef = useScrollAnimation();
    const titleRef = useScrollAnimation();
    const descRef = useScrollAnimation();
    const actionsRef = useScrollAnimation();
    const socialRef = useScrollAnimation();
    const visualRef = useScrollAnimation();
    const scrollIndRef = useScrollAnimation();

    // Typing effect
    useEffect(() => {
        const phrases = [
            "Full Stack Developer.",
            ".NET Core Specialist.",
            "React Enthusiast.",
            "Clean Architecture Advocate."
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let timeout;

        const type = () => {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                setText(currentPhrase.substring(0, currentCharIndex - 1));
                currentCharIndex--;
                typingDelay = 50; // Faster when deleting
            } else {
                setText(currentPhrase.substring(0, currentCharIndex + 1));
                currentCharIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingDelay = 2000; // Pause at end of phrase
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingDelay = 500; // Pause before typing new phrase
            }

            timeout = setTimeout(type, typingDelay);
        };

        timeout = setTimeout(type, 1000); // Initial delay

        return () => clearTimeout(timeout);
    }, []);

    // Particles effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            const particleCount = Math.min(window.innerWidth / 15, 100);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw lines between nearby particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 - distance / 800})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="hero" id="hero">
            <canvas className="hero-particles" ref={canvasRef}></canvas>
            <div className="hero-bg-orbs">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>
            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-greeting animate-on-scroll" ref={greetingRef}>
                        <span className="greeting-line"></span>
                        <span className="greeting-text">Hello, I'm</span>
                    </div>
                    <h1 className="hero-name animate-on-scroll" ref={nameRef}>
                        Abid <span className="gradient-text">Rather</span>
                    </h1>
                    <div className="hero-title animate-on-scroll" ref={titleRef}>
                        <span className="title-prefix">I'm a</span>
                        <span className="typing-text">{text}</span>
                        <span className="typing-cursor">|</span>
                    </div>
                    <p className="hero-description animate-on-scroll" ref={descRef}>
                        Full Stack .NET Developer with 2+ years delivering production systems across the full stack — 
                        ASP.NET Core Web APIs, Clean Architecture backends, and React/TypeScript frontends. 
                        Sole engineer on SalesTern end-to-end; currently migrating legacy platforms to .NET 9 
                        and building payment & auth integrations for live SaaS products.
                    </p>
                    <div className="hero-actions animate-on-scroll" ref={actionsRef}>
                        <a href="#projects" className="btn btn-primary">
                            <span>View My Work</span>
                            <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <span>Get In Touch</span>
                            <EnvelopeSimple size={20} />
                        </a>
                    </div>
                    <div className="hero-social animate-on-scroll" ref={socialRef}>
                        <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                            <GithubLogo size={24} />
                        </a>
                        <a href="https://linkedin.com/in/abidrather" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                            <LinkedinLogo size={24} />
                        </a>
                        <a href="mailto:abidrather40@yahoo.in" className="social-link" aria-label="Email">
                            <EnvelopeSimple size={24} />
                        </a>
                    </div>
                </div>
                <div className="hero-visual animate-on-scroll" ref={visualRef}>
                    <div className="hero-image-wrapper">
                        <div className="hero-image-ring"></div>
                        <div className="hero-image-container">
                            <div className="hero-avatar">
                                <span className="avatar-initials">AR</span>
                            </div>
                        </div>
                        <div className="floating-badge badge-1">
                            <Code weight="fill" size={20} />
                            <span>.NET</span>
                        </div>
                        <div className="floating-badge badge-2">
                            <Atom weight="fill" size={20} />
                            <span>React</span>
                        </div>
                        <div className="floating-badge badge-3">
                            <Database weight="fill" size={20} />
                            <span>SQL</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator animate-on-scroll" ref={scrollIndRef}>
                <div className="mouse">
                    <div className="mouse-wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
