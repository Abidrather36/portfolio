import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <a href="#hero" className="nav-logo">
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-text">AR</span>
                            <span className="logo-bracket"> /&gt;</span>
                        </a>
                        <p>Full Stack .NET Developer building production-grade systems.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#experience">Experience</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="footer-socials">
                        <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubLogo size={24} /></a>
                        <a href="https://linkedin.com/in/abidrather" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinLogo size={24} /></a>
                        <a href="mailto:abidrather40@yahoo.in" aria-label="Email"><EnvelopeSimple size={24} /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Abid Rather. Crafted with passion & clean code.</p>
                </div>
            </div>
        </footer>
    );
}
