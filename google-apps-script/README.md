# Integración de Google Apps Script para Altitud Studio

Para conectar tu landing page con tu Google Drive y Google Sheets, sigue estos pasos:

## 1. Configurar Google Sheets y el Script
1. Abre tu Google Drive y crea un nuevo **Google Sheets** (Hoja de cálculo).
2. Nombra la primera hoja (pestaña en la parte inferior) como `Feedback`.
3. Ve al menú superior: **Extensiones > Apps Script**.
4. Borra el código que aparece por defecto y pega todo el contenido del archivo `Code.gs`.
5. Crea una carpeta en tu Google Drive donde subirás las fotos del portafolio. Haz clic derecho sobre la carpeta > **Compartir > Cualquier persona con el enlace**.
6. Copia el **ID** de esa carpeta (está en la URL, los caracteres después de `folders/`).
7. Pega ese ID en el archivo `Code.gs` donde dice `YOUR_DRIVE_FOLDER_ID`.
8. Guarda el proyecto (icono de disquete).

## 2. Implementar como Aplicación Web
1. Haz clic en el botón azul **Implementar** en la esquina superior derecha > **Nueva implementación**.
2. Selecciona el tipo: **Aplicación Web** (icono de engranaje).
3. En **Acceso**, selecciona **Cualquier persona** (muy importante para que tu web funcione sin pedir login).
4. Dale a Implementar y autoriza los permisos si te los pide.
5. Copia la `URL de la aplicación web`.

## 3. Conectar a Next.js
1. En la raíz de tu proyecto Next.js, crea un archivo `.env.local` (puedes copiar el `.env.example`).
2. Agrega la variable:
   `GOOGLE_APPS_SCRIPT_URL=TU_URL_AQUI`
3. Reinicia tu servidor local (`npm run dev`).

¡Listo! Tu web de Altitud Studio está sincronizada.
