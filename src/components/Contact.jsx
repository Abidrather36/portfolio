import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChatCircleDots, EnvelopeSimple, Phone, MapPin, GithubLogo, LinkedinLogo, PaperPlaneTilt } from '@phosphor-icons/react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
    const headerRef = useScrollAnimation();
    const infoRef = useScrollAnimation();
    const formRef = useScrollAnimation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const EMAILJS_PUBLIC_KEY = 'bdu1iU8D-vhuI8bub';
    const EMAILJS_SERVICE_ID = 'service_joo3i1k';
    const EMAILJS_TEMPLATE_ID = 'template_ouzh1ee';

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const templateParams = {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            time: new Date().toLocaleString()
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
            publicKey: EMAILJS_PUBLIC_KEY,
        })
        .then(() => {
            showToast('Message sent successfully! I will get back to you soon. ✉️');
            setFormData({ name: '', email: '', subject: '', message: '' });
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showToast('⚠️ Failed to send message. Please email me directly at abidrather40@yahoo.in');
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <section className="section contact" id="contact">
            <div className="container">
                <div className="section-header animate-on-scroll" ref={headerRef}>
                    <span className="section-tag"><ChatCircleDots size={16} /> Get In Touch</span>
                    <h2 className="section-title">Let's Build Something <span className="gradient-text">Together</span></h2>
                    <p className="section-subtitle">Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
                </div>
                <div className="contact-grid">
                    <div className="contact-info animate-on-scroll" ref={infoRef}>
                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><EnvelopeSimple weight="fill" size={24} /></div>
                            <div className="contact-card-content">
                                <h4>Email</h4>
                                <a href="mailto:abidrather40@yahoo.in">abidrather40@yahoo.in</a>
                            </div>
                        </div>
                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><Phone weight="fill" size={24} /></div>
                            <div className="contact-card-content">
                                <h4>Phone</h4>
                                <a href="tel:+919596574933">+91-9596574933</a>
                            </div>
                        </div>
                        <div className="contact-card glass-card">
                            <div className="contact-card-icon"><MapPin weight="fill" size={24} /></div>
                            <div className="contact-card-content">
                                <h4>Location</h4>
                                <span>Bengaluru, India</span>
                            </div>
                        </div>
                        <div className="contact-socials">
                            <h4>Find Me On</h4>
                            <div className="contact-social-links">
                                <a href="https://github.com/Abidrather36" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub">
                                    <GithubLogo size={24} />
                                    <span>GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/abidrather" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn">
                                    <LinkedinLogo size={24} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-wrapper animate-on-scroll" ref={formRef}>
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Discussion" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell me about your project..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="loading-spinner"></span> Sending...
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <PaperPlaneTilt size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Toast Container */}
            <div className="toast-container">
                {toast && (
                    <div className="toast fade-in">
                        {toast}
                    </div>
                )}
            </div>
        </section>
    );
}
