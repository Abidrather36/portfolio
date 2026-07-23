import { useState, useEffect } from 'react';
import '../index.css';

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#hero" className="nav-logo" onClick={closeMenu}>
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">AR</span>
                    <span className="logo-bracket"> /&gt;</span>
                </a>
                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><a href="#about" className="nav-link" onClick={closeMenu}>About</a></li>
                    <li><a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a></li>
                    <li><a href="#experience" className="nav-link" onClick={closeMenu}>Experience</a></li>
                    <li><a href="#projects" className="nav-link" onClick={closeMenu}>Projects</a></li>
                    <li><a href="#education" className="nav-link" onClick={closeMenu}>Education</a></li>
                    <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
                </ul>
                <a href="#contact" className="nav-cta" onClick={closeMenu}>Let's Talk</a>
                <button 
                    className={`hamburger ${menuOpen ? 'active' : ''}`} 
                    onClick={toggleMenu} 
                    aria-label="Toggle navigation"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>
        </nav>
    );
}
