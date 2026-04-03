"use client";
import BorderGlow from './BorderGlow';

export default function ServicesSection() {
    return (
        <section id="servicios" style={{ padding: '80px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Nuestros Servicios</h2>
                <p style={{ color: 'var(--texto-secundario)', maxWidth: '600px', margin: '0 auto' }}>
                    Soluciones audiovisuales de alto impacto desde una nueva perspectiva.
                </p>
            </div>

            <div className="services-grid">

                {/* Tarjeta 1 */}
                <BorderGlow
                    edgeSensitivity={25}
                    glowColor="270 50 60" /* Violeta base */
                    backgroundColor="var(--glass-bg)"
                    borderRadius={16}
                    glowRadius={20}
                    glowIntensity={0.6}
                    coneSpread={20}
                    colors={['#724896', '#46C0E9', '#161121']}
                    className="glass-panel"
                >
                    <div style={{ padding: '40px 30px', textAlign: 'center', height: '100%' }}>
                        <div className="service-icon-wrapper">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </div>
                        <h3 style={{ color: 'var(--texto-blanco)', marginBottom: '15px', fontSize: '1.25rem' }}>Fotografía Aérea</h3>
                        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.95rem' }}>
                            Capturamos imágenes de alta resolución en formato RAW para real estate, eventos masivos y monitoreo industrial en toda la provincia de Córdoba. Combinamos la versatilidad de nuestra Nikon P1000 para detalles terrestres de largo alcance con la perspectiva única de nuestros drones, garantizando nitidez absoluta en cada plano.
                        </p>
                    </div>
                </BorderGlow>

                {/* Tarjeta 2 */}
                <BorderGlow
                    edgeSensitivity={25}
                    glowColor="193 80 60" /* Cian base */
                    backgroundColor="var(--glass-bg)"
                    borderRadius={16}
                    glowRadius={20}
                    glowIntensity={0.6}
                    coneSpread={20}
                    colors={['#46C0E9', '#724896', '#161121']}
                    className="glass-panel"
                >
                    <div style={{ padding: '40px 30px', textAlign: 'center', height: '100%' }}>
                        <div className="service-icon-wrapper">
                            <span className="material-symbols-outlined">360</span>
                        </div>
                        <h3 style={{ color: 'var(--texto-blanco)', marginBottom: '15px', fontSize: '1.25rem' }}>Tours Virtuales 360</h3>
                        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.95rem' }}>
                            Creamos experiencias interactivas que rompen las barreras físicas utilizando tecnología Insta360 X3. Desarrollamos recorridos inmersivos de alta calidad para propiedades, comercios y desarrollos inmobiliarios, permitiendo que tus clientes exploren cada rincón de tu proyecto desde cualquier dispositivo.
                        </p>
                    </div>
                </BorderGlow>

                {/* Tarjeta 3 */}
                <BorderGlow
                    edgeSensitivity={25}
                    glowColor="270 50 60"
                    backgroundColor="var(--glass-bg)"
                    borderRadius={16}
                    glowRadius={20}
                    glowIntensity={0.6}
                    coneSpread={20}
                    colors={['#724896', '#46C0E9', '#161121']}
                    className="glass-panel"
                >
                    <div style={{ padding: '40px 30px', textAlign: 'center', height: '100%' }}>
                        <div className="service-icon-wrapper">
                            <span className="material-symbols-outlined">movie_edit</span>
                        </div>
                        <h3 style={{ color: 'var(--texto-blanco)', marginBottom: '15px', fontSize: '1.25rem' }}>Cine FPV</h3>
                        <p style={{ color: 'var(--texto-secundario)', fontSize: '0.95rem' }}>
                            Elevamos la narrativa de tus videos promocionales mediante vuelos dinámicos y tomas de proximidad. Gracias a la agilidad del DJI Neo y la estabilidad del DJI Mini SE, capturamos la adrenalina y la fluidez del movimiento desde el aire con una estética cinematográfica imposible de lograr con cámaras convencionales.
                        </p>
                    </div>
                </BorderGlow>

            </div>
        </section>
    );
}