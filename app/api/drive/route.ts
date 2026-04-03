import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.NEXT_PUBLIC_DRIVE_ENDPOINT || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint configurado faltante en variables de entorno' }, { status: 500 });
  }

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      // Evita caché y re-hace la petición periódicamente (ej: 0 significa no cache, 3600=1 hr)
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      throw new Error('Error al obtener imágenes desde Apps Script: ' + res.statusText);
    }
    
    const data = await res.json();
    
    // El script en Apps Script retorna directamente un array "images" de URLs
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching drive images:", error);
    return NextResponse.json({ error: error.message || 'Fallo interno al obtener imágenes' }, { status: 500 });
  }
}
