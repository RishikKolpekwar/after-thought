import { useState, useEffect, useRef } from 'react';
import { Zap, ExternalLink, Menu, X } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                background: scrolled ? 'rgba(5, 7, 16, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                transition: 'all 400ms ease',
            }}
        >
            <div style={{ maxWidth: '1152px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '24px', paddingRight: '24px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                {/* Brand */}
                <a href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
                    <Zap size={20} style={{ color: 'var(--color-accent-cyan)' }} />
                    <span className="text-lg font-semibold tracking-tight" style={{ color: 'white' }}>
                        AfterThought
                    </span>
                </a>

                {/* Center nav — Desktop */}
                <nav className="hidden xl:flex items-center gap-3" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    {['Solutions', 'Platform', 'Resources', 'Company'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="inline-flex items-center justify-center font-semibold"
                            style={{
                                color: '#E6ECFF',
                                textDecoration: 'none',
                                fontSize: '14px',
                                lineHeight: 1.15,
                                letterSpacing: '0.01em',
                                padding: '11px 20px',
                                minHeight: '42px',
                                borderRadius: '999px',
                                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.78) 0%, rgba(15, 23, 42, 0.62) 100%)',
                                border: '1px solid rgba(148, 163, 184, 0.34)',
                                boxShadow: '0 6px 16px rgba(2, 6, 23, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                transition: 'all 220ms ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(37, 99, 235, 0.42) 0%, rgba(30, 64, 175, 0.35) 100%)';
                                e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.72)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.28), inset 0 1px 0 rgba(255,255,255,0.2)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#E6ECFF';
                                e.currentTarget.style.background = 'linear-gradient(180deg, rgba(30, 41, 59, 0.78) 0%, rgba(15, 23, 42, 0.62) 100%)';
                                e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.34)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 6, 23, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <a
                        href="http://localhost:5174/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill btn-pill-light hidden md:inline-flex"
                        style={{ padding: '10px 24px', fontSize: '13px' }}
                    >
                        Open Engine
                        <ExternalLink size={13} />
                    </a>
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile */}
            {mobileOpen && (
                <div className="lg:hidden px-6 pb-6 pt-2" style={{ background: 'rgba(5,7,16,0.95)', backdropFilter: 'blur(20px)' }}>
                    {['Solutions', 'Platform', 'Resources', 'Company'].map((l) => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase()}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-3 text-sm font-medium"
                            style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--color-border)' }}
                        >
                            {l}
                        </a>
                    ))}
                    <div className="flex gap-3 mt-4">
                        <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-light" style={{ padding: '10px 20px', fontSize: '13px', flex: 1, justifyContent: 'center' }}>
                            Open Engine
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
