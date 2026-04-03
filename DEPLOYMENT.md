# Guía de Despliegue y Conexión Automática con Google Drive

Esta guía detalla cómo conectar tu portafolio para que se actualice automáticamente leyendo imágenes desde una carpeta de Google Drive, y cómo desplegar la aplicación en Vercel.

---

## 1. Crear el Endpoint en Google Drive usando Google Apps Script

El carrusel de imágenes está preparado para leer desde una URL pública que devuelve un array (lista) de imágenes en formato JSON. Para lograr esto sin backend complejo, usaremos Google Apps Script.

### Pasos:

1. **Crear una carpeta en Google Drive:**
   - Crea una nueva carpeta en tu Google Drive donde guardarás las imágenes del portafolio.
   - Sube al menos un par de imágenes de prueba.
   - Haz clic derecho en la carpeta -> **Compartir**.
   - Cambia el acceso general a **"Cualquier usuario que tenga el vínculo"** (lector).
   - Fíjate en la URL de la carpeta. El ID de la carpeta es la cadena de caracteres extraña después de `folders/`. Ej: `https://drive.google.com/drive/u/0/folders/1abcDEfgXYZ...` (el ID sería `1abcDEfgXYZ...`).

2. **Crear el Google Apps Script:**
   - Ve a [script.google.com](https://script.google.com/) y crea un "Nuevo proyecto".
   - Borra el código que aparece por defecto (`function myFunction() {...}`) y pega el siguiente código:

```javascript
// ====== CÓDIGO DE GOOGLE APPS SCRIPT ====== //

function doGet(e) {
  // Reemplaza esto con el ID de la carpeta que obtuviste en el paso anterior
  const FOLDER_ID = 'TU_CARPETA_ID_AQUI'; 
  
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const files = folder.getFiles();
    const images = [];
    
    while (files.hasNext()) {
      const file = files.next();
      const mimeType = file.getMimeType();
      
      // Asegurarse de que el archivo es una imagen
      if (mimeType.indexOf('image/') === 0) {
        const id = file.getId();
        // Convertimos el ID a un enlace de visualización directa
        const url = 'https://drive.google.com/uc?export=view&id=' + id;
        images.push(url);
      }
    }
    
    // Retornamos la respuesta como un JSON adecuado
    return ContentService.createTextOutput(JSON.stringify(images))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Desplegar como Web App:**
   - En la parte superior derecha, haz clic en el botón azul **"Implementar"** (o Deploy) -> **"Nueva implementación"**.
   - En el tipo, selecciona **"Aplicación web"** (engrane a la izquierda).
   - Configúralo así:
     - Ejecutar como: **"Yo"** (tu cuenta)
     - Quién tiene acceso: **"Cualquier persona"** (Cualquiera)
   - Haz clic en **Implementar**.
   - Te pedirá autorizar permisos la primera vez. Concede los permisos (puede que diga que la app no es segura, haz clic en Avanzado -> Ir a Proyecto).
   - Finalmente, obtendrás una **URL final**. Guárdala bien. Es tu "Drive Endpoint".

---

## 2. Despliegue en Vercel

Vercel es la plataforma ideal para hospedar aplicaciones Next.js. El proceso es muy sencillo:

### Pasos:

1. **Sube tu código a GitHub:**
   - Crea un repositorio en [GitHub](https://github.com/).
   - Sube todos los archivos del proyecto (puedes usar GitHub Desktop o Git tradicional).

2. **Importar a Vercel:**
   - Entra a [Vercel.com](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
   - Haz clic en **Add New -> Project**.
   - Selecciona el repositorio que acabas de subir a GitHub.

3. **Configurar el Endpoint (Variable de Entorno):**
   - Antes de darle al botón "Deploy", ve a la sección de **"Environment Variables"** (Variables de Entorno) que está en las opciones desplegables de configuración.
   - Ingresa los siguientes datos:
     - **Key**: `NEXT_PUBLIC_DRIVE_ENDPOINT`
     - **Value**: Pega aquí la **URL final** que obtuviste en el paso 3 de Google Apps Script.
   - Haz clic en **Add**.

4. **Desplegar!**
   - Por último, haz clic en el botón **"Deploy"**.
   - Espera un par de minutos a que Vercel construya la página.
   - Cuando termine, haz clic en el botón "Continue to Dashboard" y podrás ver el dominio asignado a tu página.

¡Listo! A partir de ahora, cada vez que agregues o elimines una imagen en tu carpeta de Google Drive, tu carrusel en la página web se actualizará automáticamente.
