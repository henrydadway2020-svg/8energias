# Cómo funciona (sin costo, sin backend)

La app es 100% estática: no necesita servidor, API keys ni facturación de ningún
tipo. Todo corre en el navegador y los datos se guardan en `localStorage`,
incluidas las fotos de los mazos.

## Inscripción — cada jugador se une solo

Al crear el torneo, el organizador solo define el nombre y el PIN — ya **no**
se captura la lista de jugadores a mano.

1. En la pestaña "Jugadores", cada quien escribe su nick, sube una foto (para
   identificarse — la foto se comprime automáticamente) y pulsa "Unirme al
   torneo". No se pide PIN para esto, es libre.
2. En cuanto se une, queda inscrito en el torneo y aparece en el listado.
3. Se necesitan mínimo 32 jugadores inscritos para poder generar la ronda 1;
   el máximo son 128. Mientras no se llegue al mínimo, la pestaña "Ronda
   actual" muestra cuántos faltan.
4. En cuanto se genera la ronda 1, la inscripción queda cerrada (el bracket
   suizo ya fijó a los participantes); si hace falta corregir un nick
   duplicado o quitar a alguien antes de arrancar, el organizador puede
   borrar un registro con el botón "✕" junto a su nombre (pide PIN).

La foto de inscripción es solo para identificar a cada jugador durante el
torneo (por ejemplo al reportar resultados) — es independiente de la foto del
mazo que se sube en cada ronda.

## Mazo por ronda

Cada jugador registra su mazo **en cada ronda** (no una sola vez al inicio):

1. En la pestaña "Ronda actual", junto a cada enfrentamiento, cada jugador sube
   la foto de su mazo de esa ronda. La foto sí se guarda (comprimida
   automáticamente para no llenar el almacenamiento del navegador).
2. Pulsa "Guardar mazo". La captura es el único registro del mazo — ya no se
   pide escribir el nombre del mazo ni la lista de Pokémon a mano.

Mientras a un jugador le falte registrar su mazo de la ronda, no se pueden
reportar los resultados de esa partida — es obligatorio para poder jugar.

## PIN de organizador — los jugadores no pueden tocar nada más

Al crear el torneo defines un PIN. La app lo pide para:
- Reportar o corregir el marcador de una partida.
- Generar la siguiente ronda.
- Editar un mazo que ya fue guardado.
- Reiniciar el torneo.

Unirse al torneo (nick + foto) y registrar el propio mazo (mientras no se
haya guardado todavía) **no** piden PIN — es lo único que un jugador puede
hacer por su cuenta. Una vez que
desbloqueas con el PIN, queda desbloqueado mientras la pestaña del navegador
siga abierta; puedes pulsar "Bloquear" antes de pasarle el teléfono/tablet a
un jugador.

Nota: como es una app sin cuentas de usuario, el PIN protege la administración
del torneo, pero no puede verificar "quién" está tecleando en un dispositivo
compartido — es un candado práctico para un torneo presencial, no una
seguridad a prueba de todo.

## Datos para tu análisis manual

En la pestaña **Analítica** hay un botón "Descargar CSV" con una fila por
jugador y ronda: Ronda, Jugador, Resultado (V/D/BYE). Como ya no se registra
el nombre del mazo ni los Pokémon como texto, para saber qué arquetipo o
Pokémon usó cada jugador tendrás que revisar la captura guardada en la
pestaña "Ronda actual".

## Hosting

Un solo archivo estático (`index.html`) — puedes subirlo a cualquier hosting
gratuito: GitHub Pages, Netlify, Cloudflare Pages, etc. No hace falta ninguna
carpeta `functions/` ni variables de entorno.
