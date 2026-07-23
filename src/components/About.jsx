import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { User, CheckCircle, Briefcase, RocketLaunch, Buildings, Stack } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';

export function About() {
    const headerRef = useScrollAnimation();
    const contentRef = useScrollAnimation();
    const statsRef = useScrollAnimation();

    const countUpElements = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000; // ms
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCount = () => {
                        current += step;
                        if (current < target) {
                            el.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            el.innerText = target;
                        }
                    };
                    updateCount();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        countUpElements.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el) => {
        if (el && !countUpElements.current.includes(el)) {
            countUpElements.current.push(el);
        }
    };

    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><User size={16} /> About Me</span>
                    <h2 className="section-title">Turning Ideas Into <span className="gradient-text">Production Code</span></h2>
                    <p className="section-subtitle">A passionate developer who thrives on building full-stack solutions from the ground up</p>
                </div>
                <div className="about-grid">
                    <div className="about-content animate-on-scroll" ref={contentRef}>
                        <p>
                            I'm a <strong>Full Stack .NET Developer</strong> based in Bengaluru, India, with a deep passion for 
                            building end-to-end production systems. With expertise spanning <strong>ASP.NET Core Web APIs</strong>, 
                            <strong>Clean Architecture</strong> backends, and <strong>React/TypeScript</strong> frontends, I deliver 
                            solutions that are both robust and user-friendly.
                        </p>
                        <p>
                            As the sole engineer on <strong>SalesTern</strong>, I owned everything from architecture design to 
                            deployment — proving my ability to deliver complete products independently. I'm currently tackling 
                            exciting challenges like migrating legacy .NET Framework platforms to <strong>.NET 9</strong> and 
                            integrating <strong>Stripe payments</strong> and <strong>Google OAuth</strong> into live SaaS products.
                        </p>
                        <p>
                            I believe in writing clean, maintainable code that follows <strong>SOLID principles</strong> and 
                            industry best practices. Every project I touch gets the attention to detail it deserves.
                        </p>
                        <div className="about-highlights">
                            <div className="highlight-item">
                                <CheckCircle weight="fill" size={20} />
                                <span>Clean Architecture Advocate</span>
                            </div>
                            <div className="highlight-item">
                                <CheckCircle weight="fill" size={20} />
                                <span>End-to-End Product Delivery</span>
                            </div>
                            <div className="highlight-item">
                                <CheckCircle weight="fill" size={20} />
                                <span>Performance-Focused Development</span>
                            </div>
                            <div className="highlight-item">
                                <CheckCircle weight="fill" size={20} />
                                <span>Agile & Collaborative Mindset</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-stats animate-on-scroll stagger" ref={statsRef}>
                        <div className="stat-card glass-card">
                            <div className="stat-icon"><Briefcase weight="fill" size={24} /></div>
                            <div className="stat-number count-up" data-target="2" ref={addToRefs}>0</div>
                            <div className="stat-suffix">+</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                        <div className="stat-card glass-card">
                            <div className="stat-icon"><RocketLaunch weight="fill" size={24} /></div>
                            <div className="stat-number count-up" data-target="3" ref={addToRefs}>0</div>
                            <div className="stat-suffix">+</div>
                            <div className="stat-label">Production Projects</div>
                        </div>
                        <div className="stat-card glass-card">
                            <div className="stat-icon"><Buildings weight="fill" size={24} /></div>
                            <div className="stat-number count-up" data-target="2" ref={addToRefs}>0</div>
                            <div className="stat-suffix"></div>
                            <div className="stat-label">Companies Worked</div>
                        </div>
                        <div className="stat-card glass-card">
                            <div className="stat-icon"><Stack weight="fill" size={24} /></div>
                            <div className="stat-number count-up" data-target="15" ref={addToRefs}>0</div>
                            <div className="stat-suffix">+</div>
                            <div className="stat-label">Technologies Used</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
