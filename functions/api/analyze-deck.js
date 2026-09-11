// Cloudflare Pages Function — POST /api/analyze-deck
// Recibe una imagen en base64 (captura del mazo de Pokémon TCG Pocket) y usa la
// API de Claude (con visión) para identificar el nombre del mazo y los Pokémon usados.
//
// Requiere una variable de entorno / secreto en Cloudflare Pages:
//   ANTHROPIC_API_KEY  -> tu API key de https://console.anthropic.com

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { image, mediaType } = body || {};

    if (!image || !mediaType) {
      return json({ error: "Falta la imagen." }, 400);
    }
    if (mediaType !== "image/png" && mediaType !== "image/jpeg") {
      return json({ error: "Formato de imagen no soportado." }, 400);
    }

    const apiKey = context.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return json({ error: "Falta configurar ANTHROPIC_API_KEY en Cloudflare Pages." }, 500);
    }

    const prompt =
      "Esta es una captura de pantalla de una partida o de un mazo en el videojuego " +
      "Pokémon TCG Pocket. Identifica el nombre del mazo (si el jugador le puso uno visible en " +
      "pantalla, úsalo; si no hay ninguno visible, sugiere un nombre corto basado en los Pokémon " +
      "principales, por ejemplo \"Pikachu ex / Raichu\") y la lista de los Pokémon que aparecen en " +
      "el mazo o en las cartas jugadas. Responde ÚNICAMENTE con JSON válido, sin texto adicional, " +
      "sin explicaciones y sin bloques de código, con exactamente este formato: " +
      '{"deckName": "string", "pokemons": ["string", "string"]}';

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: image } },
              { type: "text", text: prompt },
            ],
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      return json({ error: "La API de Anthropic devolvió un error.", detail }, 502);
    }

    const data = await anthropicRes.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    const raw = textBlock ? textBlock.text : "";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return json({ error: "No se pudo interpretar la respuesta del análisis.", raw: cleaned }, 502);
    }

    return json({
      deckName: typeof parsed.deckName === "string" ? parsed.deckName : "",
      pokemons: Array.isArray(parsed.pokemons) ? parsed.pokemons.filter((p) => typeof p === "string") : [],
    });
  } catch (err) {
    return json({ error: "Error inesperado analizando la imagen." }, 500);
  }
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { "Content-Type": "application/json" },
  });
}
