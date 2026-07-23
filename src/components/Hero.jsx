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
            "ASP.NET Core Expert.",
            "React Developer.",
            "Clean Architecture Enthusiast."
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
        let particlesArray = [];
        let animationFrameId;

        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        const setCanvasSize = () => {
            canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
        };

        window.addEventListener('resize', () => {
            setCanvasSize();
            init();
        });

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
                if (this.x > canvas.width || this.x < 0) {
                    this.dx = -this.dx;
                }
                if (this.y > canvas.height || this.y < 0) {
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
            const colors = ['#0ea5e9', '#8b5cf6', '#06b6d4', '#6366f1'];

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 2) - 1;
                let directionY = (Math.random() * 2) - 1;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
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

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                        + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
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
