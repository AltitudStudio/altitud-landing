# 🛸 Altitud Studio | Hyper-Portfolio & Real Estate Tech

Esta es la plataforma oficial de **Altitud Studio**, desarrollada con un stack moderno de Next.js 14, TypeScript y CSS. La aplicación funciona como un ecosistema dinámico que integra servicios de marketing digital y producción audiovisual mediante una arquitectura de microservicios basada en el entorno de Google.

## 🏗️ Arquitectura del Proyecto

- **Frontend:** React (Next.js App Router) para una navegación ultra rápida y optimización SEO.
- **Lenguaje:** TypeScript para asegurar la integridad de los datos y escalabilidad del código.
- **Estilos:** CSS con configuración personalizada basada en el manual de marca (Deep Violet, Cyan & Night Blue).
- **Backend / API:**
  - **Google Apps Script (GAS):** Utilizado como una API REST personalizada.
  - **Drive API Integration:** Consumo dinámico del catálogo de fotos, videos 4K y tours 360 directamente desde Google Drive.
  - **Data Persistence:** Sistema de recolección de feedback conectado a Google Sheets.

## 🛠️ Unidades de Negocio & Servicios

### 📈 Paid Media & Marketing Digital
- Estrategias de pauta publicitaria en Meta Ads y Google Ads con enfoque en conversiones para el sector inmobiliario.
- Análisis de métricas y optimización de embudos de venta.

### 🎥 Producción Audiovisual (Dron & 360)
- **Catálogo Dinámico:** Galería inteligente que renderiza automáticamente los activos subidos a Drive.
- **Contenido Inmersivo:** Integración fluida de recorridos virtuales 360 y fotografía aérea de alta resolución.

### 🌐 Desarrollo Web & Software
- Creación de plataformas de alta performance para inmobiliarias y desarrollistas, utilizando este mismo stack tecnológico de última generación.

## 🚀 Funcionalidades Técnicas Clave

- **Drive-to-Web Sync:** Sincronización automática de activos. Al añadir archivos a la carpeta de Drive de Altitud, la web se actualiza sin necesidad de nuevos despliegues.
- **Type-Safe Components:** Arquitectura de componentes reutilizables en TSX, garantizando un mantenimiento sencillo.
- **Sistema de Calificación Integrado:** Formulario interactivo que procesa y almacena valoraciones de clientes en tiempo real dentro del ecosistema de Drive.

## 👤 Equipo & Visión
**Altitud Studio** | Liderado por Sara Ramirez en alianza estratégica con Nobles Raíces.
*Perspectivas que venden, tecnología que conecta.*

---

## 💻 Desarrollo Local

Para ejecutar este proyecto localmente, asegúrate de configurar las variables de entorno:

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

2. Crea un archivo `.env.local` en la raíz de tu proyecto basándote en el archivo de ejemplo (`.env.example`), e incluye las siguientes variables que conectan la app con el backend de Google:

   ```env
   NEXT_PUBLIC_GAS_API_URL=https://script.google.com/macros/s/AKfycby_dKfFcEsIJF1s5IF-s3BsvpLFiRu-SKewWqTeYbO7gvEp88IdqlBEkY_bghKwbWe7Gg/exec
   DRIVE_FOLDER_ID=1Ryn0EadorJCMa5gp2JJR4YDE7965Wp8M
   ```
   *(Nota: Asegúrate de que el valor de `DRIVE_FOLDER_ID` coincida con el ID de la carpeta extraído de la URL proporcionada)*.

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para interactuar con la plataforma.

---

## ☁️ Guía de Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en **Vercel**, aprovechando todas las ventajas de Next.js y su integración continua nativa (CI/CD). Sigue estos pasos para subir tu desarrollo a producción.

### Paso 1: Preparar tu Repositorio
Asegúrate de que todos tus cambios estén guardados y hayas hecho *push* del código principal de tu proyecto hacia un repositorio público o privado en **GitHub**, **GitLab** o **Bitbucket**.

### Paso 2: Importar el Proyecto a Vercel
1. Inicia sesión en tu cuenta de [Vercel](https://vercel.com/).
2. Desde tu Dashboard, haz clic en **"Add New..."** y luego selecciona **"Project"**.
3. Si aún no lo has hecho, enlaza tu cuenta de Git (GitHub/GitLab/Bitbucket) para que Vercel pueda listar tus repositorios.
4. Ubica tu repositorio (`altitud-studio`) en la lista mostrada y presiona el botón **"Import"**.

### Paso 3: Configuración del Proyecto
Vercel detectará el framework automáticamente (Next.js) y preparará los comandos de compilación.

- **Project Name:** Elige el nombre de tu proyecto (e.g., `altitud-studio`).
- **Framework Preset:** Debe de estar fijado en **Next.js**.
- **Root Directory:** Déjalo vacio o en `./` si tu archivo `package.json` está en la raíz.

### Paso 4: Añadir Variables de Entorno (🚨 Muy Importante)
Antes de presionar "Deploy", es crucial configurar las variables de entorno para la comunicación con Google Apps Script y Google Drive. Vercel no leerá el archivo `.env.local` que está en tu máquina, debes ingresarlas de forma remota:

1. Despliega la pestaña o sección de **"Environment Variables"**.
2. Añade la variable para la API:
   - **Name:** `NEXT_PUBLIC_GAS_API_URL`
   - **Value:** `https://script.google.com/macros/s/AKfycby_dKfFcEsIJF1s5IF-s3BsvpLFiRu-SKewWqTeYbO7gvEp88IdqlBEkY_bghKwbWe7Gg/exec`
   - Presiona **"Add"**.
3. Añade la variable para el Drive de los archivos:
   - **Name:** `DRIVE_FOLDER_ID`
   - **Value:** `1Ryn0EadorJCMa5gp2JJR4YDE7965Wp8M` 
   - Presiona **"Add"**.

### Paso 5: Despliegue (Deploy)
1. Finalmente haz clic en el botón azul **"Deploy"**. Vercel comenzará a compilar la aplicación.
2. Después de unos instantes (usualmente menos de dos minutos), se generarán URLs dinámicas (por ejemplo `tu-proyecto.vercel.app`) donde tu aplicación ya será visible y estará accesible al público.
3. Para configurar un dominio personalizado ve a las opciones (Settings) del proyecto -> "Domains" dentro de Vercel.

**🔄 Mantenimiento Inteligente (Drive-to-Web Sync):**
No es necesario reconstruir y redesplegar tu app en Vercel sólo para actualizar el portafolio (videos o fotos). Para actualizar contenido basta subir o eliminar los activos en la respectiva carpeta de Google Drive que has configurado. La web reflejará el cambio de forma inteligente y automatizada gracias a nuestra integración personalizada con Google Apps Script API.
