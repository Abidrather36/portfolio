import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GraduationCap, Buildings, Calendar, Star, BookOpenText } from '@phosphor-icons/react';

export function Education() {
    const headerRef = useScrollAnimation();
    const ed1Ref = useScrollAnimation();
    const ed2Ref = useScrollAnimation();

    return (
        <section className="section education" id="education">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><GraduationCap size={16} /> Education</span>
                    <h2 className="section-title">Academic <span className="gradient-text">Background</span></h2>
                    <p className="section-subtitle">The foundation that shaped my technical expertise</p>
                </div>
                <div className="education-grid">
                    <div className="education-card glass-card animate-on-scroll" ref={ed1Ref}>
                        <div className="education-icon"><GraduationCap weight="fill" size={24} /></div>
                        <div className="education-content">
                            <h3>MSc. Information Technology</h3>
                            <p className="education-institution"><Buildings size={16} /> University of Kashmir</p>
                            <div className="education-meta">
                                <span className="education-year"><Calendar size={16} /> 2022</span>
                                <span className="education-grade"><Star size={16} /> 8.13 CGPA</span>
                            </div>
                        </div>
                    </div>
                    <div className="education-card glass-card animate-on-scroll" ref={ed2Ref}>
                        <div className="education-icon"><BookOpenText weight="fill" size={24} /></div>
                        <div className="education-content">
                            <h3>Bachelor of Computer Applications (BCA)</h3>
                            <p className="education-institution"><Buildings size={16} /> University of Kashmir</p>
                            <div className="education-meta">
                                <span className="education-year"><Calendar size={16} /> 2017</span>
                                <span className="education-grade"><Star size={16} /> 6.3 CGPA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
