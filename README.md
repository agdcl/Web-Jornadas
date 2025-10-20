# ICHA Landing

Landing del II International Congress on Health and Addictions. Lista para desplegar en GitHub Pages.

## Requisitos
Node 18 o superior.

## Instalar
```bash
npm install
```

## Desarrollo local
```bash
npm run dev
```
Abre http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages
1. Crea un repositorio nuevo en GitHub y sube estos archivos.
2. Deja activadas las GitHub Actions.
3. Haz un commit en main y espera a que termine el workflow `Deploy Pages`.
4. Activa Pages en Settings  Pages  Source: GitHub Actions. La URL final será `https://tuusuario.github.io/NOMBRE_DEL_REPO/`.

El `vite.config.js` detecta el nombre del repo y fija `base` automáticamente para rutas relativas correctas.

## Personalización rápida
Edita `src/App.jsx` dentro del objeto `CONFIG` para cambiar fechas, ponentes, precios, textos y contacto. No necesitas tocar el HTML.

## Notas de producción
- Tailwind se sirve por CDN para minimizar fricción. Si prefieres Tailwind con PostCSS, puedo dejarte la configuración.
- Conecta el formulario a tu pasarela de pago en `onSubmit`.
- Añade Google Analytics, Meta Pixel y etiquetas UTM si lo necesitas.
