"use client";
import React from 'react';
import ProfileCard from './ProfileCard';
import BorderGlow from './BorderGlow';

export default function AboutContact() {
  return (
    <section id="nosotros" style={{ padding: '100px 5%', maxWidth: '1400px', margin: '0 auto' }}>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--texto-blanco)' }}>Conoce al Equipo</h2>
        <p style={{ color: 'var(--texto-secundario)' }}>Creatividad y tecnología en cada vuelo.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        alignItems: 'stretch'
      }}>

        {/* Columna Izquierda: Profile Card (Interacción Física) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileCard
            name="Altitud Studio"
            title="Especialistas Audiovisuales"
            handle="studioaltitud"
            status="Operando en Argentina"
            contactText="Ver Portfolio"
            avatarUrl="/images/profile.jpeg" /* Reemplaza con tu foto real en public/images/ */
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(114, 72, 150, 0.4)"
            innerGradient="linear-gradient(145deg, rgba(22, 17, 33, 0.9) 0%, rgba(70, 192, 233, 0.1) 100%)"
          />
        </div>

        {/* Columna Derecha: About + Contact envuelto en BorderGlow */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="193 80 60" /* Acento Cian en HSL */
          backgroundColor="var(--glass-bg)"
          borderRadius={24}
          glowRadius={30}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#724896', '#46C0E9', '#a39eb5']}
          className="glass-panel" /* Usamos glass-panel para el backdrop-filter base */
        >
          <div id="contacto" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', height: '100%', justifyContent: 'center' }}>

            {/* Sección Sobre Mí (Texto Original Restaurado) */}
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--acento-cian)', marginBottom: '15px' }}>
                Sobre Mí
              </h3>
              <p style={{ color: 'var(--texto-blanco)', fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.8' }}>
                Soy especialista en crear experiencias visuales aéreas y recorridos 360 de alta calidad para propiedades en Argentina. Mi enfoque se centra en capturar la esencia de cada espacio, combinando creatividad y tecnología para ofrecer perspectivas únicas que elevan el valor de cada propiedad.
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)' }} />

            {/* Sección Contacto Directo */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--texto-secundario)' }}>Contacto Directo</h3>

              <a href="mailto:studioaltitud@gmail.com" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                <div className="pulse-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>✉️</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Correo Electrónico</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--acento-cian)' }}>studioaltitud@info</div>
                  </div>
                </div>
              </a>

              <a href="https://wa.me/543516139217" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="pulse-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>📱</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--acento-cian)' }}>+54 3 51 613 9217</div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </BorderGlow>

      </div>
      <div style={{ textAlign: 'center', margin: '60px 60px' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--texto-blanco)' }}>Eleva tus ideas</h2>
        <p style={{ color: 'var(--texto-secundario)' }}>Transformo su visión en productos digitales escalables, integrando diseño centrado en el usuario con tecnologías modernas.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        alignItems: 'stretch'
      }}>

        {/* Columna Izquierda: Profile Card (Interacción Física) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileCard
            name="Mateo D. Gonzalez"
            title="Desarrollador Fullstack/APIs RESTsful en PHP, Diseño Web y Experiencia de Usuario (UX/UI)"
            handle="mattwx_danny"
            status="Operando en Línea"
            contactText="Ver Portfolio"
            avatarUrl="/images/profile1.jpg" /* Reemplaza con tu foto real en public/images/ */
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(114, 72, 150, 0.4)"
            innerGradient="linear-gradient(145deg, rgba(22, 17, 33, 0.9) 0%, rgba(70, 192, 233, 0.1) 100%)"
          />
        </div>

        {/* Columna Derecha: About + Contact envuelto en BorderGlow */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="193 80 60" /* Acento Cian en HSL */
          backgroundColor="var(--glass-bg)"
          borderRadius={24}
          glowRadius={30}
          glowIntensity={0.8}
          coneSpread={30}
          animated={false}
          colors={['#724896', '#46C0E9', '#a39eb5']}
          className="glass-panel" /* Usamos glass-panel para el backdrop-filter base */
        >
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', height: '100%', justifyContent: 'center' }}>

            {/* Sección Sobre Mí (Texto Original Restaurado) */}
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--acento-cian)', marginBottom: '15px' }}>
                Sobre Mí
              </h3>
              <p style={{ color: 'var(--texto-blanco)', fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.8' }}>
                Soy Desarrollador Full-Stack, Arquitecto de Soluciones SaaS e
                Ingeniero de software con un enfoque integral en frameworks modernos como Next.js, React, Laravel y Django, enfocado en el diseño y prototipado de ideas enfocado en Usabilidad y Experiencia de Usuario (UX/UI). Mi especialidad radica en la construcción de ecosistemas digitales escalables de Servicios en la web (Catálogos, Tiendas Virtuales, CRMs, etc).
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)' }} />

            {/* Sección Contacto Directo */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--texto-secundario)' }}>Contacto Directo</h3>

              <a href="mailto:mateogonzalez.gemmma@gmail.com" style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '15px' }}>
                <div className="pulse-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>✉️</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Correo Electrónico</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--acento-cian)' }}>mateogonzalez@info</div>
                  </div>
                </div>
              </a>

              <a href="https://wa.me/584144604429" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div className="pulse-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px' }}>
                  <div style={{ fontSize: '2rem' }}>📱</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--acento-cian)' }}>+58 4 14 460 4429</div>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </BorderGlow>

      </div>
    </section>


  );
}