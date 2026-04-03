# Contribuir a Altitud Studio 🚀

¡Gracias por el interés en colaborar con este portafolio profesional! Este proyecto busca elevar el estándar visual del Real Estate mediante tecnología Next.js y automatización con Google Workspace.

## 🛠️ Requisitos Previos

- **Node.js**: v18.x o superior.
- **npm** o **pnpm**.
- **Cuenta de Google**: Para realizar pruebas con la API de Drive y Sheets.

## 🌿 Flujo de Trabajo

1. **Fork el Repositorio**: Crea una copia del proyecto en tu cuenta.
2. **Crear una Rama de Característica**: 
   - Usa nombres descriptivos: `git checkout -b feat/mejora-carrusel` o `fix/error-responsive`.
3. **Desarrollo Local**:
   - Crea un archivo `.env.local` basado en `.env.example`.
   - Asegúrate de que el código sigue las reglas de TypeScript.
4. **Commit con Sentido**: 
   - Sigue el estándar de [Conventional Commits](https://www.conventionalcommits.org/). Ejemplo: `feat: agrega animaciones de entrada a la sección hero`.

## 🎨 Estándares de Diseño (Glassmorphism)

Este proyecto utiliza una estética de "Interfaz Holográfica". Al agregar nuevos componentes:
- Usa `backdrop-filter: blur(12px)`.
- El color de acento principal es el Cian: `#46C0E9`.
- Evita el uso de fondos sólidos; prefiere `rgba(255, 255, 255, 0.03)`.

## 🧪 Pruebas

Antes de enviar un Pull Request, verifica:
- Que no haya errores de compilación: `npm run build`.
- Que el diseño sea responsive (móvil, tablet y desktop).
- Que los endpoints de Google Apps Script respondan correctamente.

## 📬 ¿Encontraste un error?

Si detectas un bug o tienes una idea increíble:
1. Revisa si ya existe un *Issue* abierto.
2. Si no, abre uno nuevo describiendo el problema y los pasos para reproducirlo.

---

Elevando perspectivas, juntos. 🚁