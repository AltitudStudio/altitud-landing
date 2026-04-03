"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface PortfolioCarouselProps {
  images: string[];
}

export default function PortfolioCarousel({ images: defaultImages }: PortfolioCarouselProps) {
  const [images, setImages] = useState<string[]>([
    '/images/portfolio1.png',
    '/images/portfolio2.png',
    '/images/portfolio3.png',
    '/images/portfolio4.png',
    '/images/portfolio5.png',
    '/images/portfolio6.png',
    '/images/portfolio7.JPG'
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  // Modal and Zoom State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Drag State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Fix for click vs drag bug
  const dragDistance = useRef(0);

  // --- NEW ANIMATION ENGINE ---
  const [direction, setDirection] = useState<'normal' | 'reverse'>('normal');
  const [activeIndex, setActiveIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ITEM_WIDTH = 320;
  const GAP = 30;
  const TOTAL_ITEM_WIDTH = ITEM_WIDTH + GAP;
  const SCROLL_SPEED = 1;

  const stateRefs = useRef({
    isHovered: false,
    isSnapping: false,
    direction: 'normal' as 'normal' | 'reverse',
    maxScroll: 0,
    originalLength: 0
  });

  // Sync state cleanly without passing dependencies to rAF
  useEffect(() => {
    stateRefs.current.direction = direction;
    stateRefs.current.originalLength = images.length;
    stateRefs.current.maxScroll = images.length * TOTAL_ITEM_WIDTH;
  }, [direction, images.length, TOTAL_ITEM_WIDTH]);

  // Fetch Logic
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/drive');
        if (!res.ok) throw new Error('Error en el endpoint de la API local');

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Extraemos los URLs si el response tiene estructura JSON array de strings
          setImages(data);
        }
      } catch (error) {
        console.error("Error cargando imágenes de Drive:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);


  // RequestAnimationFrame Loop
  const animate = useCallback(() => {
    const { isHovered, isSnapping, direction, maxScroll, originalLength } = stateRefs.current;

    // If not snapping and not hovered, we scroll automatically
    if (!isHovered && !isSnapping && maxScroll > 0) {
      if (direction === 'normal') {
        positionRef.current -= SCROLL_SPEED;
        if (positionRef.current <= -maxScroll) positionRef.current += maxScroll;
      } else {
        positionRef.current += SCROLL_SPEED;
        if (positionRef.current >= 0) positionRef.current -= maxScroll;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      // Update active index
      const absPos = Math.abs(positionRef.current);
      const index = Math.floor((absPos + TOTAL_ITEM_WIDTH / 2) / TOTAL_ITEM_WIDTH) % originalLength;

      setActiveIndex((prev) => {
        if (prev !== index && !Number.isNaN(index)) return index;
        return prev;
      });
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [TOTAL_ITEM_WIDTH]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [animate]);

  // Snap & Direction Handlers
  const forceSnapTo = (targetAbsPos: number) => {
    stateRefs.current.isSnapping = true;

    const index = Math.round(targetAbsPos / TOTAL_ITEM_WIDTH) % stateRefs.current.originalLength;
    setActiveIndex(index);

    positionRef.current = -targetAbsPos;

    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }

    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

    idleTimeoutRef.current = setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = 'none';
      stateRefs.current.isSnapping = false;
    }, 3000); // Resume active crawl after 3 seconds
  };

  const handleNext = () => {
    setDirection('normal');
    stateRefs.current.direction = 'normal';

    let currentItemFloat = Math.abs(positionRef.current) / TOTAL_ITEM_WIDTH;

    // Si nos pasamos del primer set de imágenes, nos teletransportamos al inicio en silencio
    if (currentItemFloat >= stateRefs.current.originalLength) {
      positionRef.current += stateRefs.current.maxScroll;
      currentItemFloat = Math.abs(positionRef.current) / TOTAL_ITEM_WIDTH;

      if (trackRef.current) {
        trackRef.current.style.transition = 'none'; // Quitamos la animación
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
        // Forzamos un reflow del navegador para que el cambio aplique de inmediato
        void trackRef.current.offsetWidth;
      }
    }

    const nextItem = Math.floor(currentItemFloat) + 1;
    forceSnapTo(nextItem * TOTAL_ITEM_WIDTH);
  };

  const handlePrev = () => {
    setDirection('reverse');
    stateRefs.current.direction = 'reverse';

    let currentItemFloat = Math.abs(positionRef.current) / TOTAL_ITEM_WIDTH;

    // Si estamos al principio y vamos hacia atrás, nos teletransportamos al final en silencio
    if (currentItemFloat <= 0) {
      positionRef.current -= stateRefs.current.maxScroll;
      currentItemFloat = Math.abs(positionRef.current) / TOTAL_ITEM_WIDTH;

      if (trackRef.current) {
        trackRef.current.style.transition = 'none'; // Quitamos la animación
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
        // Forzamos un reflow del navegador
        void trackRef.current.offsetWidth;
      }
    }

    const prevItem = Math.ceil(currentItemFloat) - 1;
    forceSnapTo(prevItem * TOTAL_ITEM_WIDTH);
  };

  // Modal Component Handlers
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setZoomLevel(1);
    setTranslate({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setIsDragging(false);
    setTranslate({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  const handleReset = () => {
    setZoomLevel(1);
    setTranslate({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragDistance.current = 0;
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    dragDistance.current += Math.abs(newX - translate.x) + Math.abs(newY - translate.y);
    setTranslate({ x: newX, y: newY });
  };

  const handlePointerUp = () => setIsDragging(false);

  // Derive Data
  const carouselImages = [...images, ...images];
  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const minimapPanX = -(translate.x / winWidth) * 100;
  const minimapPanY = -(translate.y / winHeight) * 100;

  return (
    <section style={{ padding: '80px 0', overflow: 'hidden', position: 'relative' }} id="portafolio">
      <h2 id="portfolio" style={{
        textAlign: 'center',
        marginBottom: '50px',
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        borderBottom: '2px solid var(--acento-cian)',
        display: 'inline-block',
        left: '50%',
        transform: 'translateX(-50%)',
        position: 'relative'
      }}>
        Portafolio
      </h2>

      {/* Navigation Buttons - AHORA ALINEADOS AL 50% EXACTO DEL CENTRO */}
      <div style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 10, transform: 'translateY(-50%)' }}>
        <button className="glass-card" style={{ padding: '15px 20px', borderRadius: '50%', border: '2px solid var(--acento-cian)', background: 'rgba(255,255,255,0.1)', color: 'var(--acento-cian)', fontSize: '1.5rem', cursor: 'pointer', outline: 'none' }} onClick={handlePrev} aria-label="Desplazar Izquierda">
          &#8592;
        </button>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 10, transform: 'translateY(-50%)' }}>
        <button className="glass-card" style={{ padding: '15px 20px', borderRadius: '50%', border: '2px solid var(--acento-cian)', background: 'rgba(255,255,255,0.1)', color: 'var(--acento-cian)', fontSize: '1.5rem', cursor: 'pointer', outline: 'none' }} onClick={handleNext} aria-label="Desplazar Derecha">
          &#8594;
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Cargando imágenes de Drive...</p>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px 0' }}>
          <div
            className="carousel-track"
            ref={trackRef}
            onMouseEnter={() => stateRefs.current.isHovered = true}
            onMouseLeave={() => stateRefs.current.isHovered = false}
          >
            {carouselImages.map((src, index) => (
              <div
                key={index}
                className="glass-card carousel-card"
                style={{
                  width: `${ITEM_WIDTH}px`,
                  height: '450px',
                  flexShrink: 0,
                  cursor: 'zoom-in'
                }}
                onClick={() => handleImageClick(src)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Portafolio ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', alignItems: 'center' }}>
        {images.map((_, i) => {
          const dist = Math.abs(i - activeIndex);
          const wrapDist = Math.min(dist, images.length - dist);

          const isVisible = wrapDist <= 5;
          const isEdge = wrapDist === 4 || wrapDist === 5;

          if (!isVisible) return null;

          return (
            <div key={i} style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: i === activeIndex ? 'var(--acento-cian)' : 'rgba(255,255,255,0.3)',
              boxShadow: i === activeIndex ? '0 0 10px var(--acento-cian)' : 'none',
              filter: isEdge && i !== activeIndex ? 'blur(1px)' : 'none',
              opacity: isEdge && i !== activeIndex ? 0.4 : 1,
              transform: i === activeIndex ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }} />
          );
        })}
      </div>

      {/* Fullscreen Zoom Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          {/* Top Left: Zoom Indicator */}
          <div className="glass-card" style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            color: 'var(--acento-cian)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            zIndex: 1001,
            pointerEvents: 'none',
            border: '1px solid rgba(70, 192, 233, 0.3)'
          }}>
            Zoom: {Math.round(zoomLevel * 100)}%
          </div>

          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              background: 'transparent',
              border: 'none',
              color: 'var(--texto-blanco)',
              fontSize: '3rem',
              cursor: 'pointer',
              zIndex: 1001,
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--acento-cian)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--texto-blanco)'}
          >
            &times;
          </button>

          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: '100%',
            touchAction: 'none',
            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
          }}
            onClick={(e) => {
              if (dragDistance.current < 10 && zoomLevel < 5 && e.target === e.currentTarget) handleZoomIn();
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Zoomed Portafolio"
              style={{
                transform: `scale(${zoomLevel}) translate(${translate.x / zoomLevel}px, ${translate.y / zoomLevel}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                maxHeight: '80vh',
                maxWidth: '90vw',
                objectFit: 'contain',
                userSelect: 'none'
              }}
              draggable={false}
              onClick={(e) => {
                e.stopPropagation();
                if (dragDistance.current < 10 && zoomLevel < 5) handleZoomIn();
              }}
            />
          </div>

          {/* Minimap */}
          {zoomLevel > 1 && selectedImage && (
            <div className="glass-card" style={{
              position: 'absolute',
              bottom: '120px',
              right: '30px',
              width: '120px',
              height: '90px',
              overflow: 'hidden',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedImage} alt="minimap" style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.6 }} />

              <div style={{
                position: 'absolute',
                border: '2px solid var(--acento-cian)',
                backgroundColor: 'rgba(70, 192, 233, 0.3)',
                boxShadow: '0 0 10px rgba(70, 192, 233, 0.5)',
                width: `${100 / zoomLevel}%`,
                height: `${100 / zoomLevel}%`,
                transform: `translate(${minimapPanX}%, ${minimapPanY}%)`,
                transition: isDragging ? 'none' : 'all 0.3s ease',
                pointerEvents: 'none'
              }} />
            </div>
          )}

          <div style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '15px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            padding: '10px 20px',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            zIndex: 1001,
            alignItems: 'center'
          }}>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '1.5rem', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleZoomOut}>-</button>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '1rem', borderRadius: '20px' }} onClick={handleReset}>Restablecer</button>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '1.5rem', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleZoomIn}>+</button>
          </div>
        </div>
      )}
    </section>
  );
}
