# Cómo funciona (sin costo, sin backend)

La app es 100% estática: no necesita servidor, API keys ni facturación de ningún
tipo. Todo corre en el navegador y los datos se guardan en `localStorage`,
incluidas las fotos de los mazos.

## Mazo por ronda

Cada jugador registra su mazo **en cada ronda** (no una sola vez al inicio):

1. En la pestaña "Ronda actual", junto a cada enfrentamiento, cada jugador sube
   la foto de su mazo de esa ronda. La foto sí se guarda (comprimida
   automáticamente para no llenar el almacenamiento del navegador).
2. Escribe el nombre del mazo y los Pokémon usados.
3. Pulsa "Guardar mazo".

Mientras a un jugador le falte registrar su mazo de la ronda, no se pueden
reportar los resultados de esa partida — es obligatorio para poder jugar.

## PIN de organizador — los jugadores no pueden tocar nada más

Al crear el torneo defines un PIN. La app lo pide para:
- Reportar o corregir el marcador de una partida.
- Generar la siguiente ronda.
- Editar un mazo que ya fue guardado.
- Reiniciar el torneo.

Registrar el propio mazo (mientras no se haya guardado todavía) **no** pide
PIN — es lo único que un jugador puede hacer por su cuenta. Una vez que
desbloqueas con el PIN, queda desbloqueado mientras la pestaña del navegador
siga abierta; puedes pulsar "Bloquear" antes de pasarle el teléfono/tablet a
un jugador.

Nota: como es una app sin cuentas de usuario, el PIN protege la administración
del torneo, pero no puede verificar "quién" está tecleando en un dispositivo
compartido — es un candado práctico para un torneo presencial, no una
seguridad a prueba de todo.

## Colores ganador / perdedor

Al reportar el resultado de una partida, el nombre del mazo de cada jugador se
pinta:
- **Verde** si ganó esa partida.
- **Rojo** si la perdió.

## Datos para tu análisis manual

En la pestaña **Analítica** hay un botón "Descargar CSV" con una fila por
jugador y ronda: Ronda, Jugador, Mazo, Pokémon, Resultado (V/D/BYE). Es la
base para que calcules tú mismo el winrate de cada Pokémon o arquetipo (mejor
y peor desempeño) en la hoja de cálculo que prefieras. La app también muestra
un winrate automático por mazo como referencia rápida, pero el CSV trae el
detalle completo.

## Hosting

Un solo archivo estático (`index.html`) — puedes subirlo a cualquier hosting
gratuito: GitHub Pages, Netlify, Cloudflare Pages, etc. No hace falta ninguna
carpeta `functions/` ni variables de entorno.
