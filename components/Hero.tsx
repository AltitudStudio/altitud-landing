export default function Hero() {
  // Enlace directo del logo para renderizado web
  const logoUrl = "/images/logo.png";

  return (
    <header id="inicio" style={{
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      // Se recomienda usar .jpg si es el archivo que subiste anteriormente
      backgroundImage: 'linear-gradient(to bottom, rgba(114, 72, 150, 0.4), rgba(22, 17, 33, 0.9)), url("/hero_drone_bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '10px',
        flexWrap: 'wrap'
      }}>
        {/* Contenedor del Logo Actualizado */}
        <div style={{
          width: 'clamp(80px, 18vw, 100px)', // Aumentado ligeramente para mejor visibilidad
          height: 'clamp(80px, 18vw, 100px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid var(--acento-cian)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 0 20px rgba(70, 192, 233, 0.2)'
        }}>
          <img
            src={logoUrl}
            alt="Altitud Studio Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '10px', // Espaciado interno para que el logo no toque los bordes
              background: 'rgba(22, 17, 33, 0.9)',
            }}
          />
        </div>

        <div style={{
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          fontWeight: 700,
          letterSpacing: 'clamp(2px, 2vw, 8px)',
          color: 'var(--acento-cian)',
          textTransform: 'uppercase',
          textShadow: '0 4px 15px rgba(70, 192, 233, 0.4)'
        }}>
          Altitud
        </div>
      </div>

      <p style={{
        fontWeight: 300,
        fontSize: 'clamp(1rem, 4vw, 1.5rem)',
        opacity: 0.9,
        maxWidth: '600px',
        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        marginTop: '20px'
      }}>
        Experiencias visuales aéreas y recorridos 360 para propiedades en Córdoba, integramos servicios de marketing digital y producción audiovisual.
      </p>
    </header>
  );
}
