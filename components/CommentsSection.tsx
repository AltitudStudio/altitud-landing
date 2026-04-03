"use client";

import React, { useState, useEffect } from 'react';
import BorderGlow from './BorderGlow';

interface Comment {
    id: string | number;
    name: string;
    rating: number;
    text: string;
    date?: string;
}

export default function CommentsSection() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newName, setNewName] = useState('');
    const [newText, setNewText] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    const GOOGLE_APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

    const fetchComments = async () => {
        if (!GOOGLE_APPS_SCRIPT_URL) return;
        try {
            setLoading(true);
            const res = await fetch(GOOGLE_APPS_SCRIPT_URL);
            const data = await res.json();
            if (Array.isArray(data)) setComments(data);
        } catch (error) {
            console.error("Error obteniendo comentarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newText || isSubmitting) return;

        setIsSubmitting(true);

        const newCommentData = {
            name: newName,
            text: newText,
            rating: newRating,
            date: new Date().toISOString()
        };

        try {
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCommentData),
            });

            const tempId = Date.now();
            setComments([{ ...newCommentData, id: tempId }, ...comments]);

            setNewName('');
            setNewText('');
            setNewRating(5);
            alert("¡Gracias por tu comentario!");

        } catch (error) {
            console.error("Error al enviar comentario:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStarsInput = () => (
        <div style={{ display: 'flex', gap: '5px', fontSize: '2rem', cursor: 'pointer', margin: '10px 0' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setNewRating(star)}
                    style={{
                        color: (hoverRating || newRating) >= star ? '#FFD700' : 'rgba(255,255,255,0.2)',
                        transition: 'color 0.2s'
                    }}
                >
                    {(hoverRating || newRating) >= star ? '★' : '☆'}
                </span>
            ))}
        </div>
    );

    return (
        <section className="comments-container" id="testimonios">
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem' }}>Experiencias Altitud</h2>
                <p style={{ opacity: 0.7 }}>Tu opinión nos ayuda a seguir volando alto.</p>
            </div>

            {/* Formulario Unificado Envuelto en BorderGlow */}
            <div style={{ marginBottom: '60px' }}>
                <BorderGlow
                    edgeSensitivity={30}
                    glowColor="193 80 60"
                    backgroundColor="var(--glass-bg)"
                    borderRadius={16}
                    glowRadius={30}
                    glowIntensity={0.7}
                    coneSpread={25}
                    colors={['#46C0E9', '#724896', '#a39eb5']}
                    className="glass-panel"
                >
                    <div style={{ padding: '40px' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Deja tu reseña</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Calificación</span>
                                {renderStarsInput()}
                            </div>

                            <input
                                type="text"
                                placeholder="Tu Nombre o Empresa"
                                className="input-base"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                required
                            />

                            <textarea
                                placeholder="¿Qué te pareció nuestro servicio visual?"
                                className="input-base"
                                rows={4}
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={isSubmitting}
                                style={{ alignSelf: 'center', minWidth: '200px' }}
                            >
                                {isSubmitting ? 'Enviando...' : 'Publicar Comentario'}
                            </button>
                        </form>
                    </div>
                </BorderGlow>
            </div>

            {/* Lista de Comentarios */}
            <div className="comments-list">
                {loading && <p style={{ textAlign: 'center' }}>Actualizando comunidad...</p>}

                {comments.map((comment) => (
                    <BorderGlow
                        key={comment.id}
                        edgeSensitivity={20}
                        glowColor="270 50 60"
                        backgroundColor="var(--glass-bg)"
                        borderRadius={16}
                        glowRadius={15}
                        glowIntensity={0.5}
                        coneSpread={15}
                        colors={['#724896', '#46C0E9', '#161121']}
                        className="glass-panel"
                    >
                        <div className="comment-card" style={{ margin: 0, padding: '25px' }}>
                            <div className="comment-header">
                                <div className="avatar-initial">
                                    {comment.name.charAt(0)}
                                </div>
                                <div className="comment-author-info">
                                    <h4>{comment.name}</h4>
                                    <div className="stars">
                                        {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className="comment-text" style={{ marginTop: '15px' }}>"{comment.text}"</p>
                        </div>
                    </BorderGlow>
                ))}
            </div>
        </section>
    );
}