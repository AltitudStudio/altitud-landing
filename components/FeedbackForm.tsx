"use client";
import React, { useState } from 'react';

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre'),
      comentario: formData.get('comentario'),
      rating
    };

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMessage('¡Gracias! Tus comentarios fueron enviados con éxito.');
        (e.target as HTMLFormElement).reset();
        setRating(5);
      } else {
        setStatusMessage('Hubo un error al enviar tus comentarios. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatusMessage('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel" style={{ margin: '80px 5%', padding: '50px 20px', borderRadius: '20px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Califica nuestro Servicio</h2>
      <p style={{ opacity: 0.8, marginBottom: '30px' }}>Tu opinión nos ayuda a volar más alto.</p>
      
      <div style={{ fontSize: '2.5rem', color: '#ffd700', cursor: 'pointer', marginBottom: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            onClick={() => setRating(star)}
            style={{ opacity: rating >= star ? 1 : 0.3, transition: '0.2s' }}
          >
            ★
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', margin: '0 auto', gap: '20px' }}>
        <input 
          type="text" 
          name="nombre"
          className="input-base" 
          placeholder="Tu Nombre / Inmobiliaria" 
          required 
        />
        <textarea 
          name="comentario"
          className="input-base" 
          rows={5} 
          placeholder="¿Qué te pareció el resultado visual?"
          required
        ></textarea>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar a Altitud Studio'}
        </button>
        {statusMessage && <p style={{ marginTop: '15px', color: 'var(--acento-cian)' }}>{statusMessage}</p>}
      </form>
    </section>
  );
}
