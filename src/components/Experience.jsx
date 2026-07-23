import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Briefcase, Calendar, MapPin } from '@phosphor-icons/react';

export function Experience() {
    const headerRef = useScrollAnimation();
    const item1Ref = useScrollAnimation();
    const item2Ref = useScrollAnimation();

    return (
        <section className="section experience" id="experience">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><Briefcase size={16} /> Career Journey</span>
                    <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
                    <p className="section-subtitle">My professional journey building production-grade software</p>
                </div>
                <div className="timeline">
                    {/* Experience 1 */}
                    <div className="timeline-item animate-on-scroll" ref={item1Ref}>
                        <div className="timeline-marker">
                            <div className="timeline-dot"></div>
                        </div>
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <div className="timeline-company">
                                    <h3>Antern Technologies</h3>
                                    <span className="timeline-role">Software Engineer / Associate</span>
                                </div>
                                <div className="timeline-meta">
                                    <span className="timeline-date"><Calendar size={16} /> Jan 2024 – Present</span>
                                    <span className="timeline-location"><MapPin size={16} /> Bengaluru</span>
                                </div>
                            </div>
                            <ul className="timeline-details">
                                <li>Served as <strong>sole full-stack engineer</strong> on SalesTern — owned architecture, development, and deployment end-to-end from zero to production.</li>
                                <li>Designed and shipped a <strong>JWT-secured ASP.NET Core Web API</strong> with granular RBAC, enforcing access control across all endpoints and user roles.</li>
                                <li>Built a modular <strong>React + Material UI</strong> frontend with reusable component architecture, cutting UI development time on new features through shared component reuse.</li>
                                <li>Automated lead follow-up workflows and email notifications, eliminating manual outreach steps for the sales team's daily pipeline management.</li>
                                <li>Delivered fully responsive layouts across desktop, tablet, and mobile — <strong>zero separate mobile codebase</strong>.</li>
                            </ul>
                            <div className="timeline-tags">
                                <span>ASP.NET Core</span>
                                <span>React</span>
                                <span>JWT</span>
                                <span>Material UI</span>
                                <span>SQL Server</span>
                            </div>
                        </div>
                    </div>

                    {/* Experience 2 */}
                    <div className="timeline-item animate-on-scroll" ref={item2Ref}>
                        <div className="timeline-marker">
                            <div className="timeline-dot"></div>
                        </div>
                        <div className="timeline-content glass-card">
                            <div className="timeline-header">
                                <div className="timeline-company">
                                    <h3>Logichub Software Solutions</h3>
                                    <span className="timeline-role">Software Developer</span>
                                </div>
                                <div className="timeline-meta">
                                    <span className="timeline-date"><Calendar size={16} /> Jul 2023 – Dec 2023</span>
                                    <span className="timeline-location"><MapPin size={16} /> Srinagar</span>
                                </div>
                            </div>
                            <ul className="timeline-details">
                                <li>Built and debugged <strong>production-grade CRUD APIs</strong> using ASP.NET Core, ADO.NET, and SQL Server within a live client delivery environment.</li>
                                <li>Gained hands-on fluency in <strong>.NET Core middleware pipelines</strong> and routing, contributing working code within the first two weeks of onboarding.</li>
                                <li>Participated consistently in <strong>Agile ceremonies</strong> (sprint planning, stand-ups) across a 6-month delivery cycle.</li>
                            </ul>
                            <div className="timeline-tags">
                                <span>ASP.NET Core</span>
                                <span>ADO.NET</span>
                                <span>SQL Server</span>
                                <span>Agile</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
