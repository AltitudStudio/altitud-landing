export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--glass-border)',
            backgroundColor: 'rgba(22, 17, 33, 0.95)',
            padding: '60px 5% 30px',
            marginTop: '80px'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '40px',
                marginBottom: '30px'
            }}>
                {/* Brand Info */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primario-violeta)', fontSize: '32px' }}>
                            flight_takeoff
                        </span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Altitud Studio</span>
                    </div>
                    <p style={{ color: 'var(--texto-secundario)', marginBottom: '20px' }}>
                        Elevando la perspectiva visual de tus proyectos con tecnología dron de última generación.
                    </p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <a href="altitud-landing.vercel.app" style={{ color: 'var(--texto-secundario)', transition: 'color 0.3s' }}>
                            <span className="material-symbols-outlined">language</span>
                        </a>
                        <a href="https://www.instagram.com/studioaltitud?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" style={{ color: 'var(--texto-secundario)', transition: 'color 0.3s' }}>
                            <span className="material-symbols-outlined">photo_camera</span>
                        </a>
                        <a href="mailto:studioaltitud@gmail.com" style={{ color: 'var(--texto-secundario)', transition: 'color 0.3s' }}>
                            <span className="material-symbols-outlined">mail</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ marginBottom: '20px', color: 'var(--texto-blanco)' }}>Explorar</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li><a href="#inicio" style={{ color: 'var(--texto-secundario)', textDecoration: 'none' }}>Inicio</a></li>
                        <li><a href="#portfolio" style={{ color: 'var(--texto-secundario)', textDecoration: 'none' }}>Portafolio</a></li>
                        <li><a href="#servicios" style={{ color: 'var(--texto-secundario)', textDecoration: 'none' }}>Servicios</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ marginBottom: '20px', color: 'var(--texto-blanco)' }}>Contacto</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--texto-secundario)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>location_on</span>
                            Córdoba, Argentina
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--texto-secundario)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>call</span>
                            +54 9 351 613-9217
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--texto-secundario)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Altitud Studio. Todos los derechos reservados.
            </div>
        </footer>
    );
}