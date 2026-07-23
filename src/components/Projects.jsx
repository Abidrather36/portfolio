import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FolderOpen, ChartLineUp, GithubLogo, UserGear, Calendar, GraduationCap, CreditCard } from '@phosphor-icons/react';
import { useRef } from 'react';

function TiltCard({ children, animationRef }) {
    const cardRef = useRef(null);
    const shineRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (shineRef.current) {
            shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
        if (shineRef.current) {
            shineRef.current.style.background = 'none';
        }
    };

    return (
        <div 
            className="project-card glass-card tilt-card animate-on-scroll" 
            ref={(node) => {
                cardRef.current = node;
                if (animationRef) animationRef.current = node;
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {children}
            <div 
                ref={shineRef} 
                className="shine-effect" 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    transition: 'background 0.1s ease',
                    zIndex: 2
                }}
            />
        </div>
    );
}

export function Projects() {
    const headerRef = useScrollAnimation();
    const proj1Ref = useScrollAnimation();
    const proj2Ref = useScrollAnimation();
    const proj3Ref = useScrollAnimation();

    return (
        <section className="section projects" id="projects">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><FolderOpen size={16} /> Featured Work</span>
                    <h2 className="section-title">Projects I've <span className="gradient-text">Built</span></h2>
                    <p className="section-subtitle">Real-world applications I've architected, developed, and shipped</p>
                </div>
                <div className="projects-grid">
                    {/* Project 1 */}
                    <TiltCard animationRef={proj1Ref}>
                        <div className="project-card-header">
                            <div className="project-icon"><ChartLineUp weight="fill" size={24} /></div>
                            <div className="project-links">
                                <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubLogo size={24} /></a>
                            </div>
                        </div>
                        <h3 className="project-title">SalesTern</h3>
                        <p className="project-role"><UserGear size={16} /> Full Stack Developer</p>
                        <p className="project-date"><Calendar size={16} /> Sep 2024</p>
                        <ul className="project-description">
                            <li>Built data-driven analytics dashboards giving stakeholders real-time pipeline visibility — replacing manual reporting.</li>
                            <li>Sole engineer owning architecture, development, and deployment end-to-end from zero to production.</li>
                        </ul>
                        <div className="project-tags">
                            <span>ASP.NET Core</span>
                            <span>React</span>
                            <span>JWT</span>
                            <span>RBAC</span>
                            <span>Material UI</span>
                            <span>SQL Server</span>
                        </div>
                    </TiltCard>

                    {/* Project 2 */}
                    <TiltCard animationRef={proj2Ref}>
                        <div className="project-card-header">
                            <div className="project-icon"><GraduationCap weight="fill" size={24} /></div>
                            <div className="project-links">
                                <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubLogo size={24} /></a>
                            </div>
                        </div>
                        <h3 className="project-title">MySkillTest</h3>
                        <p className="project-role"><UserGear size={16} /> Migration Engineer / .NET Core Developer</p>
                        <p className="project-date"><Calendar size={16} /> Nov 2025 – Present</p>
                        <ul className="project-description">
                            <li>Migrated platform from .NET Framework 4.3 (OWIN) → .NET 9, eliminating 6 major versions of framework debt.</li>
                            <li>Replaced OWIN session auth with JWT-based stateless authentication, enabling horizontal scaling without sticky sessions.</li>
                            <li>Refactored monolith into Clean Architecture (4-layer), making each layer independently testable and deployable.</li>
                        </ul>
                        <div className="project-tags">
                            <span>.NET 9</span>
                            <span>Clean Architecture</span>
                            <span>JWT</span>
                            <span>CQRS</span>
                            <span>Migration</span>
                        </div>
                    </TiltCard>

                    {/* Project 3 */}
                    <TiltCard animationRef={proj3Ref}>
                        <div className="project-card-header">
                            <div className="project-icon"><CreditCard weight="fill" size={24} /></div>
                            <div className="project-links">
                                <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubLogo size={24} /></a>
                            </div>
                        </div>
                        <h3 className="project-title">StreamlineAcademies</h3>
                        <p className="project-role"><UserGear size={16} /> Implementation Engineer</p>
                        <p className="project-date"><Calendar size={16} /> Nov 2025 – Present</p>
                        <ul className="project-description">
                            <li>Integrated Google OAuth 2.0, replacing password-based onboarding and reducing user drop-off at account creation.</li>
                            <li>Implemented Stripe payment gateway with webhook automation, enabling real-time subscription lifecycle events without manual intervention.</li>
                        </ul>
                        <div className="project-tags">
                            <span>Google OAuth 2.0</span>
                            <span>Stripe</span>
                            <span>Webhooks</span>
                            <span>ASP.NET Core</span>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
