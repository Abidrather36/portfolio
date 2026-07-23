import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Wrench, Code, DiamondsFour, Desktop, HardDrives, Cloud } from '@phosphor-icons/react';

export function Skills() {
    const headerRef = useScrollAnimation();
    const group1Ref = useScrollAnimation();
    const group2Ref = useScrollAnimation();
    const group3Ref = useScrollAnimation();
    const group4Ref = useScrollAnimation();
    const group5Ref = useScrollAnimation();

    return (
        <section className="section skills" id="skills">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><Wrench size={16} /> Technical Arsenal</span>
                    <h2 className="section-title">Skills & <span className="gradient-text">Technologies</span></h2>
                    <p className="section-subtitle">The tools and technologies I use to bring ideas to life</p>
                </div>
                <div className="skills-grid">
                    {/* Languages */}
                    <div className="skill-group glass-card animate-on-scroll" ref={group1Ref}>
                        <div className="skill-group-header">
                            <div className="skill-group-icon"><Code weight="fill" size={24} /></div>
                            <h3 className="skill-group-title">Languages</h3>
                        </div>
                        <div className="skill-tags">
                            <span className="skill-tag">C#</span>
                            <span className="skill-tag">JavaScript</span>
                            <span className="skill-tag">TypeScript</span>
                            <span className="skill-tag">SQL</span>
                            <span className="skill-tag">HTML</span>
                            <span className="skill-tag">CSS</span>
                        </div>
                    </div>

                    {/* .NET Ecosystem */}
                    <div className="skill-group glass-card animate-on-scroll" ref={group2Ref}>
                        <div className="skill-group-header">
                            <div className="skill-group-icon"><DiamondsFour weight="fill" size={24} /></div>
                            <h3 className="skill-group-title">.NET Ecosystem</h3>
                        </div>
                        <div className="skill-tags">
                            <span className="skill-tag accent">ASP.NET Core</span>
                            <span className="skill-tag accent">Web API</span>
                            <span className="skill-tag accent">EF Core</span>
                            <span className="skill-tag accent">ADO.NET</span>
                            <span className="skill-tag accent">Dapper</span>
                            <span className="skill-tag accent">xUnit</span>
                            <span className="skill-tag accent">nUnit</span>
                        </div>
                    </div>

                    {/* Frontend */}
                    <div className="skill-group glass-card animate-on-scroll" ref={group3Ref}>
                        <div className="skill-group-header">
                            <div className="skill-group-icon"><Desktop weight="fill" size={24} /></div>
                            <h3 className="skill-group-title">Frontend</h3>
                        </div>
                        <div className="skill-tags">
                            <span className="skill-tag">React.js</span>
                            <span className="skill-tag">Next.js</span>
                            <span className="skill-tag">Material UI</span>
                            <span className="skill-tag">Tailwind CSS</span>
                            <span className="skill-tag">Zustand</span>
                        </div>
                    </div>

                    {/* Database & Security */}
                    <div className="skill-group glass-card animate-on-scroll" ref={group4Ref}>
                        <div className="skill-group-header">
                            <div className="skill-group-icon"><HardDrives weight="fill" size={24} /></div>
                            <h3 className="skill-group-title">Database & Security</h3>
                        </div>
                        <div className="skill-tags">
                            <span className="skill-tag accent">SQL Server</span>
                            <span className="skill-tag accent">SSMS</span>
                            <span className="skill-tag accent">JWT Auth</span>
                            <span className="skill-tag accent">Google OAuth</span>
                        </div>
                    </div>

                    {/* Cloud & Architecture */}
                    <div className="skill-group glass-card animate-on-scroll" ref={group5Ref}>
                        <div className="skill-group-header">
                            <div className="skill-group-icon"><Cloud weight="fill" size={24} /></div>
                            <h3 className="skill-group-title">Architecture & Tools</h3>
                        </div>
                        <div className="skill-tags">
                            <span className="skill-tag">Clean Architecture</span>
                            <span className="skill-tag">CQRS</span>
                            <span className="skill-tag">SOLID</span>
                            <span className="skill-tag">Azure Functions</span>
                            <span className="skill-tag">Blob Storage</span>
                            <span className="skill-tag">Docker</span>
                            <span className="skill-tag">Git / GitHub</span>
                            <span className="skill-tag">Postman / Swagger</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
