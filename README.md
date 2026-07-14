# JJ TECH | Enterprise Intelligence Platform

Este es el repositorio oficial de **JJ TECH**, una suite tecnológica premium de próxima generación enfocada en optimizar operaciones, automatizar procesos comerciales y entregar resultados empresariales medibles.

---

## 📁 Estructura del Proyecto

El repositorio está dividido en dos partes principales:

1. **`barberia-realtime/` (Recomendado - Nueva Plataforma Premium)**
   - Una aplicación completa en **Vite + React** que representa la **Enterprise Intelligence Platform** de JJ TECH.
   - Implementa la navegación inmersiva de 5 modos basada en resultados:
     - **Mission Control**: Centro de comando interactivo con indicadores de horas automatizadas, errores reducidos y procesos optimizados.
     - **Transformaciones**: Casos de éxito animados de tipo *Antes → Después* (Fletes, Devoluciones, BI, Gestión Comercial, Automatización).
     - **Ecosistema**: Mapa interactivo en red (SVG animado) que ilustra la conexión en tiempo real de todas las áreas operativas.
     - **Plataforma**: Simulación visual del sistema operativo empresarial y sus módulos integrados.
     - **Iniciar Proyecto**: Conversión rápida para agendamiento directo vía WhatsApp.
     - **/reserva**: Mantiene el flujo original de reservas en vivo de *Luxury Brother* integrado con total compatibilidad de estilos.

2. **Raíz (`/` - Legacy Reference)**
   - Contiene la landing page estática original en HTML, CSS y Javascript para referencia funcional y de contenido.

---

## 🚀 Inicio Rápido (Local)

Para correr la nueva **Enterprise Intelligence Platform** de manera local:

1. **Navegar al directorio de la aplicación:**
   ```bash
   cd barberia-realtime
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor se iniciará en `http://localhost:5173` o `http://localhost:5174` (si el 5173 está ocupado).*

---

## 🛠️ Compilación y Despliegue

Para compilar la aplicación para producción:

1. **Ejecutar el script de construcción:**
   ```bash
   npm run build
   ```
   *Esto generará la carpeta estática `barberia-realtime/dist/` optimizada para producción (bundle ligero <430 KB).*

2. **Configuración de Despliegue (Vercel, Netlify o similar):**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `barberia-realtime/dist`
   - **Root Directory**: `barberia-realtime`
