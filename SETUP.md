# Cómo funciona (sincronizado entre celulares, con Firebase gratis)

La app sigue siendo un solo archivo estático (`index.html`), pero ahora los
datos del torneo (jugadores, mazos, resultados) viven en **Firebase
Firestore** en vez de en el navegador de cada quien. Así, cada jugador puede
entrar desde su propio celular y todos ven lo mismo en vivo — incluido tú
como organizador.

## 1. Crea tu proyecto de Firebase (gratis, ~5 minutos)

1. Ve a https://console.firebase.google.com con tu cuenta de Google y crea
   un proyecto nuevo (el análisis de Google Analytics es opcional, puedes
   desactivarlo).
2. En el menú lateral entra a **Compilación → Firestore Database** y pulsa
   "Crear base de datos". Elige una región cercana a ti y modo de
   producción.
3. En la pestaña **Reglas** de Firestore, pega esto y publica:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   Esto deja el torneo abierto a lectura/escritura para cualquiera que tenga
   el link — es el mismo nivel de "seguridad de cortesía" que ya tenía el
   PIN (protege contra errores, no contra alguien mal intencionado que sepa
   lo que hace). No reutilices este proyecto de Firebase para nada más
   sensible.
4. Ve a **Configuración del proyecto** (el engrane) → pestaña **Tus apps**
   → ícono `</>` (Web) → ponle un nombre → "Registrar app". Firebase te
   muestra un bloque `firebaseConfig = { apiKey: ..., ... }`.
5. Copia esos valores y pégalos en `index.html`, hasta arriba del `<script>`
   principal, reemplazando el bloque `firebaseConfig` de ejemplo.

## 2. Sube el archivo

Igual que antes: un solo `index.html`, a cualquier hosting gratuito
(GitHub Pages, Netlify, Cloudflare Pages, etc.). No hace falta carpeta
`functions/` ni backend propio — Firebase hace ese papel.

## Inscripción — cada jugador se une desde su celular

Al crear el torneo, el organizador solo define el nombre y el PIN — no se
captura la lista de jugadores a mano.

1. En la pestaña "Jugadores", cada quien abre el link desde su propio
   celular, escribe su nick, sube una foto (para identificarse — se
   comprime automáticamente) y pulsa "Unirme al torneo". No se pide PIN
   para esto, es libre, y aparece al instante en todos los dispositivos.
2. Se necesitan mínimo 32 jugadores inscritos para poder generar la ronda
   1; el máximo son 128. Mientras no se llegue al mínimo, la pestaña
   "Ronda actual" muestra cuántos faltan.
3. En cuanto se genera la ronda 1, la inscripción queda cerrada (el bracket
   suizo ya fijó a los participantes); si hace falta corregir un nick
   duplicado o quitar a alguien antes de arrancar, el organizador puede
   borrar un registro con el botón "✕" junto a su nombre (pide PIN).

La foto de inscripción es solo para identificar a cada jugador durante el
torneo (por ejemplo al reportar resultados) — es independiente de la foto
del mazo que se sube en cada ronda.

## Mazo por ronda

Cada jugador registra su mazo **en cada ronda** (no una sola vez al inicio):

1. En la pestaña "Ronda actual", junto a cada enfrentamiento, cada jugador
   sube la foto de su mazo de esa ronda, desde su propio celular. La foto
   sí se guarda (comprimida automáticamente).
2. Pulsa "Guardar mazo". La captura es el único registro del mazo — no se
   pide escribir el nombre del mazo ni la lista de Pokémon a mano.

Mientras a un jugador le falte registrar su mazo de la ronda, no se pueden
reportar los resultados de esa partida — es obligatorio para poder jugar.

## PIN de organizador — los jugadores no pueden tocar nada más

Al crear el torneo defines un PIN. La app lo pide para:
- Reportar o corregir el marcador de una partida.
- Generar la siguiente ronda.
- Editar un mazo que ya fue guardado.
- Quitar a un jugador inscrito antes de que arranque la ronda 1.
- Reiniciar el torneo.

Unirse al torneo (nick + foto) y registrar el propio mazo (mientras no se
haya guardado todavía) **no** piden PIN — es lo único que un jugador puede
hacer por su cuenta. Una vez que desbloqueas con el PIN, queda desbloqueado
en **ese dispositivo** mientras la pestaña del navegador siga abierta; cada
celular que administre el torneo debe desbloquearlo por su cuenta. Puedes
pulsar "Bloquear" antes de pasarle el teléfono/tablet a un jugador.

Nota: como es una app sin cuentas de usuario y con reglas de Firestore
abiertas (ver arriba), el PIN protege contra errores accidentales, pero no
es una seguridad a prueba de todo frente a alguien que sepa consultar
Firestore directamente.

## Datos para tu análisis manual

En la pestaña **Analítica** hay un botón "Descargar CSV" con una fila por
jugador y ronda: Ronda, Jugador, Resultado (V/D/BYE). Como ya no se registra
el nombre del mazo ni los Pokémon como texto, para saber qué arquetipo o
Pokémon usó cada jugador tendrás que revisar la captura guardada en la
pestaña "Ronda actual".
