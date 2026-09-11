# Cómo activar el análisis automático de capturas

El análisis de la imagen (identificar nombre del mazo y Pokémon usados) necesita un
backend, porque requiere llamar a la API de Claude con una API key que **nunca debe
quedar expuesta en el HTML**. Por eso esto ya NO puede correr en GitHub Pages (que solo
sirve archivos estáticos) — necesita **Cloudflare Pages**, que sí permite correr
funciones (`functions/api/analyze-deck.js`) de forma gratuita.

## Estructura de archivos (así debe quedar el repo)

```
tu-repo/
├── index.html
└── functions/
    └── api/
        └── analyze-deck.js
```

## Pasos

1. **Sube ambos** (`index.html` y la carpeta `functions/`) a tu repositorio de GitHub,
   respetando exactamente esa estructura de carpetas.

2. **Consigue una API key de Anthropic:**
   - Entra a https://console.anthropic.com
   - Ve a "API Keys" y crea una nueva key.
   - Necesitas tener crédito/facturación activa en esa cuenta — cada análisis de imagen
     tiene un costo pequeño (fracciones de centavo por captura).

3. **Conecta el repo a Cloudflare Pages:**
   - Entra a tu dashboard de Cloudflare → Workers & Pages → Create → Pages →
     conecta tu repositorio de GitHub.
   - Cloudflare detecta automáticamente la carpeta `functions/` y publica
     `/api/analyze-deck` como endpoint — no necesitas configurar ningún build command
     (déjalo vacío) ni carpeta de salida especial (usa la raíz).

4. **Agrega tu API key como secreto:**
   - En el proyecto de Cloudflare Pages → Settings → Environment variables.
   - Agrega una variable llamada exactamente `ANTHROPIC_API_KEY`, pega tu key, márcala
     como **secreta** (encrypted).
   - Guarda y vuelve a desplegar (Cloudflare a veces pide un redeploy para que la
     variable tome efecto).

5. Listo. En la app, cuando un jugador gane, el organizador puede subir la captura del
   mazo (JPG o PNG), pulsar "Analizar captura" y el nombre del mazo y los Pokémon se
   autocompletan — siempre editables antes de guardar, por si el análisis se equivoca.

## Nota importante

El resto de los datos del torneo (jugadores, rondas, resultados) se sigue guardando en
el navegador (`localStorage`), como en la versión anterior — esto no cambia. Lo único
que ahora pasa por un servidor es el análisis puntual de cada imagen.
