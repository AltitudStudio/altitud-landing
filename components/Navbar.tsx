'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation">
      {/* Brand - Ahora con logo estático */}
      <a
        href="#inicio"
        className="navbar__brand"
        onClick={(e) => handleLink(e, '#inicio')}
        style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
      >
        <img
          src="/images/altitud-header.png"
          alt="Altitud Logo"
          style={{
            height: '40px', // Altura ideal para un navbar
            width: 'auto',
            objectFit: 'contain',
            // Opcional: si el logo es oscuro, este brillo lo hará resaltar
            filter: scrolled ? 'none' : 'drop-shadow(0 0 5px rgba(70, 192, 233, 0.3))'
          }}
        />
        {/* Si el logo ya incluye el nombre "Altitud", puedes borrar este <span>. 
        Si solo es el símbolo, déjalo para mantener la marca textual.
      */}
        <span style={{
          color: 'var(--texto-blanco)',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Altitud
        </span>
      </a>

      {/* Desktop links */}
      <ul className="navbar__links" role="list">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="navbar__link" onClick={(e) => handleLink(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Desktop */}
      <a href="#contacto" className="btn-primary navbar__cta" onClick={(e) => handleLink(e, '#contacto')}>
        Cotizá Ahora
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
      </a>

      {/* Menú Hamburguesa Móvil */}
    </nav>
  );
}