# AGENTS.md — Novela visual interactiva "El sistema inmunitario" (v2)

Este documento es la fuente única de verdad (SSoT) del proyecto. TODO agente que trabaje en este workspace debe leerlo completo antes de escribir una línea de código y cumplirlo en cada tarea.

## 1. QUÉ ES ESTE PROYECTO

Una novela visual interactiva y educativa: "El sistema inmunitario — ¿Qué ocurre desde que entra un microorganismo en nuestro organismo hasta que es eliminado?". 22 escenas narradas, 3 minijuegos integrados en la historia, tarjetas educativas y checklist de conceptos. Los gráficos ya están generados (estilo Kurzgesagt). El proyecto se ejecuta en el navegador sin backend.

## 2. REGLAS GENERALES DEL AGENTE

- Lenguaje del código y comentarios: **español**.
- Sin frameworks ni dependencias externas: HTML + CSS + JavaScript vanilla (ES6+). Nada de CDN, npm ni librerías.
- No inventar assets: usar EXCLUSIVAMENTE los del manifiesto (sección 4). Si falta un archivo, dibujar un rectángulo de color con su ID (modo desarrollo), nunca sustituirlo.
- El texto de narración (sección 6) es EXACTO: no reescribir, no resumir, no corregir estilo.
- Trabajar por fases (sección 10): entregar cada fase completa, verificarla y esperar confirmación del usuario antes de la siguiente.
- Al terminar cada fase: ejecutar el servidor local, verificar en navegador y hacer commit con mensaje descriptivo.
- Si una decisión no está cubierta por este documento, preguntar antes de implementarla.

## 3. ARQUITECTURA TÉCNICA

- App de una sola página. Estructura de archivos:
```
/
  AGENTS.md
  index.html
  css/estilos.css
  js/engine.js        (AnimationEngine, ParticleSystem, SceneManager, Input, Assets, Audio)
  js/data.js          (escenas, narración, tarjetas, manifiesto)
  js/games.js         (los tres minijuegos)
  js/main.js          (arranque y game loop)
  imagenes/
    assets/    (39 sprites con fondo transparente)
    fondos/    (16 escenas 16:9)
    juegos/    (20 recursos de los minijuegos)
  raw/                 (los 56 archivos numerados originales — NO borrar)
  _descartes/          (la imagen intrusa y descartes varios)
```
- Renderizado sobre `<canvas>` 2D. Game loop con `requestAnimationFrame` y **delta time** (animaciones por segundos, no por frames). Pausa automática con `document.hidden`.
- Resolución lógica 1280×720 con escalado letterbox. Todas las posiciones en **coordenadas fraccionales 0–1**.
- Cargador de assets con pantalla de carga y barra de progreso (`Promise.all`).
- Persistencia en `localStorage`: escena actual, checklist y récords.
- Modo debug con `?debug=1`: FPS, hitboxes e IDs clicables.

## 4. MANIFIESTO DE ASSETS (75 archivos, nombres exactos)

- **imagenes/assets/** (39): P04_guiri.png, P08_celula_madre.png, P09_neutrofilo.png, P10_eosinofilo.png, P11_basofilo.png, P12_mastocito.png, P13_monocito.png, P14_macrofago.png, P15_dendritica.png, P16_globulo_rojo.png, P17_plaqueta.png, P18_linfocito_B.png, P19_T_CD4.png, P20_T_CD8.png, P21_NK.png, P22_plasmatica.png, P23_B_memoria.png, P24_T_memoria.png, P25_virus.png, P26_virus_epitopos.png, P27_virus_opsonizado.png, P28_virus_perforado.png, P29_epitelial_sana.png, P30_epitelial_infectada.png, P31_lysis_CD8.png, P32_anticuerpo.png, P33_enjambre.png, P34_CMH.png, P35_TCR.png, P36_opsonina.png, P37_complemento_dormido.png, P38_cascada.png, P39_MAC_taladro.png, P40_citoquinas.png, P41_histamina.png, P42_expansion_clonal.png, P43_quimiotaxis.png, P53_memoria_patrulla.png, P54_respuesta_secundaria.png
- **imagenes/fondos/** (16): P01_portada.png, P02_cuerpo.png, P03_red_inmunitaria.png, P05_carterista.png, P06_bomba.png, P07_dos_caminos.png, P44_nariz.png, P45_piel.png, P46_mucosa.png, P47_medula.png, P48_vaso.png, P49_tejido_infectado.png, P50_ganglio.png, P51_mapa_ganglios.png, P52_tejido_sano.png, P55_final.png
- **imagenes/juegos/** (20): G01_macrofago_jugador.png, G02_virus_corredero.png, G03_virus_opsonina.png, G04_bacteria_amiga.png, G05_celula_sana.png, G06_efecto_pop.png, G07_icono_puntos.png, G08_icono_tiempo.png, G09_celula_infectada.png, G10_celula_alarma_falsa.png, G11_efecto_lisis.png, G12_marco_ventana.png, G13_CMH_estrella.png, G14_CMH_hexagono.png, G15_CMH_triangulo.png, G16_TCR_estrella.png, G17_TCR_hexagono.png, G18_TCR_triangulo.png, G19_chispa_encaje.png, G20_efecto_error.png

Cada elemento del juego se referencia por ID (P09, G13…); un manifiesto interno en `data.js` resuelve la ruta según su carpeta. **Los archivos G01–G20 no están en la numeración 0–55** (provienen de otra conversación): el usuario los coloca directamente en `imagenes/juegos/`.

## 5. MOTOR DE ANIMACIÓN

Cada elemento es `{id, img, x, y, scale, rotation, alpha, layer}` con cola de animaciones `{prop, from, to, dur, delay, easing, onComplete}` encadenables.

**Primitivas obligatorias:** `fadeIn(d)`, `fadeOut(d)`, `slideFrom(direccion, d, easing)`, `popIn()`, `popOut()`, `zoomIn(f)`, `zoomOut(f)` (cámara), `moveTo(x, y, d, easing)`, `shake(intensidad)`, `pulse()` (bucle ±5 %), `float()` (bucle sinusoidal idle, lo llevan TODOS los personajes visibles por defecto), `crossfade(d)` (fondos), `highlight(color)`, `spotlight(x, y)`, `particleBurst(config)`, `typewriter(texto)`.

**Easings:** linear, easeInQuad, easeOutQuad, easeInOutCubic, easeOutBack (popIn), easeOutElastic.

**Partículas:** pool reutilizable; config de posición, velocidad, dispersión, gravedad, vida, tamaño decreciente, color y fundido.

**Capas (orden):** fondo → decorado → personajes → efectos/partículas → UI → cuadro de narración.

**Cuadro de narración:** panel inferior, `typewriter` a ~35 caracteres/segundo, clic = completar línea, otro clic = siguiente línea. Nunca avance automático. Botón discreto de saltar escena.

## 6. ESCENAS (22) — narración EXACTA + dirección

Formato de cada escena en `data.js`:
```json
{
  "id": "S13", "titulo": "...", "fondo": "P51",
  "narracion": ["línea 1", "línea 2"],
  "elementos": [{ "id": "dendritica", "img": "P15", "pos": [0.3, 0.6], "entra": "fadeIn(0.5)", "bucle": "float" }],
  "timeline": [{ "t": 1.0, "accion": "punto_rojo.popIn" }],
  "interaccion": { "tipo": "cinematica|clics|tarjetas|minijuego" }
}
```

**S00 Portada** — Fondo P01. Narración: "¿Qué ocurre desde que entra un microorganismo en nuestro organismo hasta que es eliminado?" Dirección: título con `typewriter`; virus P25 en esquina con `float`; botón "Empezar" con `popIn`+`pulse` (y "Continuar" si hay partida guardada).

**S01 Nuestro cuerpo** — Fondo P02. Narración: (1) "Este es nuestro cuerpo humano. Un mundo complejo de aparatos y sistemas." (2) "Entre ellos, el sistema inmunitario, compuesto por todas las células, moléculas, órganos y tejidos que se encargan de defender a nuestro cuerpo de todos los antígenos." (3) "No es un órgano aislado, sino un sistema de vigilancia distribuido por todo el organismo." Dirección: P02 **sube desde abajo** (`slideFrom(bottom, 1.2, easeOutCubic)`); `zoomIn(1.3)` suave; P03 con `crossfade` y ganglios encendiéndose con `popIn` escalonado (0,3 s); P03 se desvanece.

**S02 El antígeno** — Fondo P02. Narración: (1) "Un antígeno es toda molécula que el cuerpo reconoce como extraña y capaz de desencadenar una respuesta inmunitaria. Es decir, un guiri, un extranjero que quiere robarnos todos los dineros." (2) "Pueden ser desde virus, bacterias, hongos, parásitos, polen o tejidos trasplantados." (3) "Y su enemigo natural es el anticuerpo: una proteína producida por los linfocitos B que reconoce específicamente a un antígeno y facilita su neutralización y eliminación." Dirección: `zoomIn(1.6)` hacia la piel; P04 entra `slideFrom(right, 0.8)`+`shake` suave; en la línea del "guiri": `pulse`+`highlight(amarillo)`+`particleBurst` de billetes. Interacción: tocar al guiri → tarjeta ANTÍGENO.

**S03 Dos tipos de amenaza** — Fondo P05→P06→P07. Narración: (1) "Está claro que nuestro sistema no va a atacar de la misma manera a un tipo de ataques que a otros. No es lo mismo un carterista que un aviso de bomba en una ciudad importante." (2) "Por eso, podemos distinguir entre dos tipos de respuestas: la respuesta innata y adaptativa." Dirección: P05 `popIn` izquierda, P06 `popIn` derecha+`shake`, ambos `fadeOut`, `crossfade` a P07 con etiquetas "INNATA"/"ADAPTATIVA" `fadeIn`. Interacción: tocar cada camino → tarjetas (INNATA: rápida, inespecífica, inmediata, desde el nacimiento / ADAPTATIVA: específica, genera memoria, más eficaz ante un antígeno concreto).

**S04 Barreras innatas** — Fondos P45→P44→P46. Narración: (1) "La respuesta innata es la rápida, la inespecífica, la inmediata; es lo primero que se encuentra el patógeno antes de hacer nada, y está presente desde el nacimiento." (2) "Entre los métodos de defensa de esta inmunidad podemos encontrar barreras bioquímicas y físicas: la piel, los cilios, las mucosas, los MALT, los ácidos… y la microbiota." Dirección: P45 `slideFrom(bottom, 1)`; `crossfade` a P44 (pelos `float`); `crossfade` a P46 (estaciones `popIn` escalonado); panel de iconos `fadeIn`. Interacción: tocar cada barrera → tarjeta breve; avanzar tras tocar 3.

**S05 El complemento** — Fondo P48. Narración: (1) "Por otra parte, podemos encontrarnos el sistema del complemento. Este es un conjunto de más de treinta proteínas plasmáticas termolábiles que circulan por la sangre de forma inactiva, y que se activan cuando detectan anomalías." (2) "Tiene tres vías de activación: la clásica (a través de un anticuerpo unido al antígeno), la alterna (directamente sobre la superficie de muchos microorganismos, sin anticuerpos) y la vía de las lectinas (cuando reconocen azúcares de la superficie del microbio), pero eso es otra cosa." (3) "Cuando se activa, el complemento marca al patógeno para los fagocitos, provoca inflamación reclutando más células al foco de la infección y puede lisar directamente al microorganismo." Dirección: P37 `fadeIn(0.8)` flotando lento; tres interruptores abajo (CLÁSICA/ALTERNA/LECTINAS) `popIn`; al pulsar cada uno: proteínas despiertan (`shake`), cascada P38 con `particleBurst` morado, demo breve de P39 (`popIn`+`zoomIn(1.2)`).

**S06 La fábrica de células** — Fondo P47. Narración: (1) "Y lo más importante, de lo que no hemos hablado aún: los policías que se encargan de que todo funcione bien." (2) "Vamos a hablar de las células, los leucocitos o glóbulos blancos, las verdaderas defensoras de todo." (3) "Vamos una por una. Se dividen en dos tipos según tengan o no gránulos visibles en el citoplasma: los granulocitos y los agranulocitos. Los granulocitos son los neutrófilos, los basófilos y los eosinófilos; los agranulocitos son los linfocitos y los monocitos." (4) "Además, todas vienen de células madre hematopoyéticas multipotenciales, situadas en la médula óseo, pero pueden venir de un progenitor linfoide o un progenitor mieloide." (5) "Las células mieloides son las que se encargan de la respuesta innata y las linfoides forman la respuesta adaptativa —ojo: las células NK son linfoides pero participan en la respuesta innata—." Dirección: cintas de P47 en bucle; P08 `popIn`+`highlight`; dos ramas dibujadas con `moveTo` progresivo: NARANJA "mieloide→innata" y AZUL "linfoide→adaptativa". Interacción: tocar cada rama → tarjeta resumen.

**S07 Desfile mieloide** — Fondo P47. Narración: (1) "Vamos a ver las células mieloides, las de la respuesta innata: los glóbulos rojos y las plaquetas, que también derivan de este progenitor, aunque no son células inmunitarias: los glóbulos rojos transportan oxígeno y las plaquetas taponan las heridas." (2) "Los granulocitos que hemos visto antes y los monocitos, que al entrar en los tejidos se convierten en macrófagos, grandes comedores que fagocitan patógenos y restos celulares, y que además secretan citoquinas: mensajeros químicos que activan a otras células inmunitarias." (3) "Y las células dendríticas, las mejores presentadoras de antígeno: son el principal puente entre la inmunidad innata y la adaptativa." (4) "Los granulocitos: los neutrófilos son los más abundantes (60-70% de los leucocitos) y los primeros en llegar al foco de la infección; los eosinófilos atacan sobre todo parásitos; y los basófilos y los mastocitos liberan histamina, provocando inflamación y alergias." Dirección: P09–P17 entran desde la izquierda con `slideFrom(left, 0.5)` escalonado cada 0,4 s en rejilla 3×3 con `float`. Interacción: clic en cada célula → su tarjeta.

**S08 Desfile linfoide** — Fondo P47. Narración: (1) "Ahora veamos las células de la parte linfoide, las de la respuesta adaptativa: los linfocitos B y los linfocitos T, además de las NK o natural killers, que aunque son linfoides pertenecen a la respuesta innata porque destruyen células infectadas y tumorales sin necesidad de reconocer un antígeno específico." (2) "Los mastocitos, en cambio, son mieloides." (3) "Los linfocitos B maduran en la médula óseo (de ahí su inicial) y producen anticuerpos; los linfocitos T maduran en el timo y se dividen en dos equipos: los CD4+ colaboradores, que dirigen la respuesta liberando citoquinas, y los CD8+ citotóxicos, que eliminan células infectadas." (4) "Vamos a imaginar que entra un virus malo en nuestro cuerpo. Gracias a esto vamos a explicar todos los procesos del sistema inmunitario." Dirección: como S07 con P18–P24; etiquetas "CMH-II" y "CMH-I" con `fadeIn` junto a P19 y P20. Interacción: tarjetas de cada linfocito.

**S09 Entra el virus (cinemática)** — Fondo P44. Narración: (1) "Imaginemos que el virus entra por la nariz, debido a un aerosol, por ejemplo el virus de la COVID-19." (2) "Lo primero que hace nuestro cuerpo de manera automática es intentar pararlo con los mecanismos físicos más básicos: pelos en la nariz, mucosas…" Dirección: negro → `fadeIn(1)` a P44; grupo de P25 acercándose con `zoomIn` creciente entre partículas de aerosol; pelos (`shake` suave) atrapan a uno (`fadeOut`+`particleBurst`); el resto escapa con `moveTo` en zigzag.

**S10 La barrera falla (cinemática)** — Fondo P44→P49. Narración: (1) "Nuestro cuerpo es un poco malo y el virus ha comenzado a infectar células." (2) "Lo primero que entra en acción son las células de la respuesta inmunitaria innata." Dirección: P29 con `float`; un virus `moveTo`+`popIn` desaparece dentro; `crossfade` de la célula a P30 con `shake` y `highlight(rojo)` parpadeante; `crossfade` a P49 con varias P30 alarmadas.

**S11 Quimiotaxis (cinemática)** — Fondo P49. Narración: (1) "Los fagocitos (neutrófilos y macrófagos) comienzan a actuar. Comienzan a buscar patógenos de manera natural, como vigilantes de seguridad, atradídos por señales químicas que emiten las células dañadas (quimiotaxis)." Dirección: rastro de P43 dibujándose con `moveTo` progresivo desde las infectadas; neutrófilos P09 en fila con `slideFrom(right, 0.6)` y líneas de velocidad.

**S12 Los fagocitos actúan + MINIJUEGO 1** — Fondo P49. Narración: (1) "Allí los fagocitos hacen su proceso de fagocitosis: reconocen al microorganismo, lo engloban y lo destruyen en su interior, con su marcación u opsonización —los anticuerpos que marcan al patógeno reciben el nombre de opsoninas— y digestión con enzimas." Dirección: P36 `popIn` sobre el virus; el macrófago P14 se lanza con `moveTo`, el virus `fadeOut` dentro; `pulse`+`particleBurst` de fragmentos. Después arranca el Minijuego 1 (sección 7).

**S13 La dendrítica viaja al ganglio (cinemática)** — Fondo P51→P50. Narración: (1) "Por otra parte, las células dendríticas, que también van por allí, una vez captan los antígenos en los tejidos, maduran y viajan hasta los ganglios linfáticos." (2) "Allí, como células presentadoras de antígeno, muestran los fragmentos de estos virus unidos a sus moléculas del CMH (complejo mayor de histocompatibilidad, en inglés MHC), como si agitaran banderitas de alarma." (3) "Y es que los linfocitos T no pueden reconocer un antígeno libre: necesitan que otra célula se lo muestre, y lo detectan mediante su receptor TCR." Dirección: **punto rojo pulsante aparece sobre el tejido infectado**; P15 recorre los vasos dorados con `moveTo` por tramos dejando estela; **el punto rojo salta y se instala en un ganglio del cuello** (`popIn`+`highlight(rojo)`); `zoomIn(2.5)` hacia el ganglio → `crossfade` a P50.

**S14 Presentación antigénica + MINIJUEGO 3** — Fondo P50. Narración: (1) "Si la infección es grave, estas células presentan esos fragmentos de estos virus en los ganglios linfáticos a los linfocitos T y ya comienza la respuesta adaptativa." Dirección: P15 centrada; P34 `popIn` sobre su superficie con la banderita ondeando; P19 y P20 entran por lados opuestos; P35 encaja en el CMH con chispa dorada (`particleBurst`). Después arranca el Minijuego 3.

**S15 Los CD8+ atacan + MINIJUEGO 2** — Fondo P49. Narración: (1) "Una vez ha llegado a los ganglios, los linfocitos T ya se han enterado. Los T CD4+, que reconocen el antígeno presentado sobre moléculas CMH-II, activan a los linfocitos B liberando citoquinas." (2) "Y los T CD8+, que reconocen el antígeno sobre CMH-I en la superficie de las células infectadas, comienzan a eliminar por lisis todas las células que están plagadas de virus. Esta es la inmunidad celular, la que actúa contra los patógenos que viven dentro de las células." Dirección: P20 salta de célula en célula con `moveTo` en arcos; etiqueta "INMUNIDAD CELULAR" con `typewriter`. Después arranca el Minijuego 2.

**S16 Los CD4+ dirigen (cinemática)** — Fondo P50. Narración: (1) "Los linfocitos B activados —que reconocen su antígeno específico y reciben la ayuda de los T CD4+— se dividen y se diferencian en células plasmáticas que generan anticuerpos, multiplicándose en lo que se llama la expansión clonal y comenzando la inmunidad humoral, la que actúa contra los patógenos extracelulares y sus toxinas." Dirección: P19 al centro con su batuta; P18 tímido a un lado; cartas P40 vuelan en tres oleadas (`moveTo`); el B se ilumina y P42 divide 1→2→4→8 con `popIn` escalonado; mitad `crossfade` a P22, mitad a P23.

**S17 Fábrica de anticuerpos (cinemática)** — Fondo P48. Narración: (1) "Estas células comienzan a formar anticuerpos: se trata de moléculas llamadas glicoproteínas o inmunoglobulinas (Ig) —las primeras en aparecer son las IgM y las más abundantes en sangre son las IgG—." Dirección: fila de P22 expulsando P32 con `popIn` continuo; primero "IgM" (grandes), luego "IgG" (numerosas), etiquetas `fadeIn`; etiqueta "INMUNIDAD HUMORAL" `typewriter`; P23 apartada guardando su tarjeta del virus.

**S18 La batalla final (interactiva)** — Fondo P49. Narración: (1) "Estos anticuerpos se unen a los epítopos, zonas concretas de la superficie de los virus, a los que atacan para neutralizarlos, facilitando su opsonización y su fagocitosis, además de activar el complemento." Dirección: P26 se mueve esquivando; P33 entra `slideFrom(top, 0.8)`; **el jugador hace clic en los 3 epítopos (aros amarillos) para clavar anticuerpos**; al completar: `crossfade` a P27, P37→P38 (complemento despierta en cascada), P39 perfora → `crossfade` a P28 con `particleBurst` morado; P14 entra y barre los restos.

**S19 Victoria** — Fondo P52. Narración: (1) "Además, también se crean linfocitos B y T de memoria que consiguen que, cuando todo acabe, el organismo recuerde a este patógeno." Dirección: `crossfade(1)` a P52; `particleBurst` suave de confeti; esquema resumen iluminándose paso a paso (ENTRADA → INNATA → PRESENTACIÓN → ADAPTATIVA → ELIMINACIÓN → MEMORIA); si el jugador abrió todas las tarjetas, mostrar las ✔ del checklist.

**S20 Memoria inmunológica (cinemática)** — Fondo P52. Narración: (1) "Y si vuelve a atacar, la respuesta será mucho más rápida y eficaz que la primera vez." Dirección: P53 cruzan en ronda con `moveTo` lento; entra un virus nuevo `slideFrom(right, 0.5)`; **ataque relámpago**: `crossfade` instantáneo a P54+`shake` suave+líneas de velocidad; el virus desaparece con `particleBurst` en menos de 1 segundo; comparativa `typewriter`: "1ª exposición: semanas — 2ª exposición: horas". Interacción: tocar los linfocitos de memoria → tarjeta MEMORIA INMUNOLÓGICA.

**S21 Final** — Fondo P55. Narración: (1) "Con todo esto acabamos el proceso de la respuesta inmunitaria. Muchas gracias." Dirección: `fadeIn(1)` a P55; texto final `typewriter`; botones `popIn`: "Reiniciar" y "Ver infografía resumen" (muestra el esquema de S19 a pantalla completa).

## 7. MINIJUEGOS (reglas exactas)

**MINIJUEGO 1 — "Macrófago Comilón" (tras S12):** el macrófago G01 sigue el cursor con lerp 0,15 sobre P49; tutorial de 5 s. Aparecen: virus G02 (10 puntos), virus con diana G03 (25 puntos, más rápidos), bacteria amiga G04 y célula propia G05 (tocarlas = −20 puntos y aviso "¡El macrófago no ataca lo propio!"). Duración 45 s; objetivo 300 puntos para continuar (si no: resumen y reintentar; la historia no avanza). Dificultad creciente cada 10 s. Colisión circular; al comer: G06 + `particleBurst`. HUD: G07 (puntos), G08 (tiempo). Récord en localStorage.

**MINIJUEGO 2 — "Operación CD8+" (tras S15):** rejilla 4×3 de marcos G12 sobre P49. En cada hueco, timers aleatorios (visibles 1–2,5 s): infectada G09 (clic = +100, lisis G11 + `particleBurst` azul), sana G05 (clic = −150, "¡El CD8+ solo lisa las que muestran antígeno en CMH-I!"), alarma falsa G10 a partir del 60 % del tiempo (clic = −50, "¡Alarma falsa!"). 30 s por ronda; objetivo 500 puntos. Récord en localStorage.

**MINIJUEGO 3 — "Llave y cerradura: CMH–TCR" (tras S14):** arriba las plataformas G13 (estrella), G14 (hexágono), G15 (triángulo) en posiciones aleatorias; abajo los linfocitos G16, G17, G18 barajados. Drag & drop con pointer events (compatible táctil; también seleccionar y soltar con dos clics). Encaje correcto por forma (no posición): chispa G19 + `highlight` dorado + activación (escala 1,2 `easeOutBack`). Fallo: rebote con tween de vuelta + G20 + −5 s. Contador 60 s; al completar los 3: pulso simultáneo y continúa la historia.

## 8. INTERACCIONES TRANSVERSALES

- **Tarjetas de información:** panel lateral al tocar cualquier elemento con tarjeta; título en mayúsculas, 2–3 líneas, icono del personaje; clic fuera para cerrar. Contenidos: los de las escenas S02–S08 de la sección 6.
- **Checklist:** al abrir cada tarjeta por primera vez se marca ✔ el término (Antígeno, Anticuerpo, Inmunidad innata, Inmunidad adaptativa, Células del sistema inmunitario, Linfocitos B, Linfocitos T, Sistema del complemento, Memoria inmunológica).
- **Barra de progreso** superior con las 6 etapas; la actual con `pulse`.
- **Sonido:** efectos con WebAudio (osciladores, sin archivos). Control de volumen y silencio persistente.
- **Auto-guardado** al entrar en cada escena; botón "Continuar" en la portada.
- Botón de saltar animación en escenas cinemáticas.

## 9. FASE 0 — PREPARACIÓN DE ASSETS (ejecutar ANTES de programar)

**Situación real:** las 55 imágenes del trabajo se han descargado de la conversación de Gemini y se han guardado con **números del 0 al 55 (56 archivos en total)**, en el orden exacto en que se generaron en el chat. **El archivo número 49 es una imagen intrusa que NO forma parte del trabajo** (quedó guardada entre la P47 y la P48, de modo que todos los archivos posteriores están desplazados una posición).

**Tarea del agente en la FASE 0:**

1. Colocar los 56 archivos numerados en la carpeta `raw/` y renombrarlos/copiarlos según esta tabla (si la numeración empieza en 1 en lugar de en 0, aplicar número_de_archivo − 1 para usar esta tabla):

| Nº | Archivo final | Carpeta | | Nº | Archivo final | Carpeta |
|---|---|---|---|---|---|---|
| 0 | P04_guiri.png | assets | | 28 | P35_TCR.png | assets |
| 1 | P08_celula_madre.png | assets | | 29 | P36_opsonina.png | assets |
| 2 | P09_neutrofilo.png | assets | | 30 | P37_complemento_dormido.png | assets |
| 3 | P10_eosinofilo.png | assets | | 31 | P38_cascada.png | assets |
| 4 | P11_basofilo.png | assets | | 32 | P39_MAC_taladro.png | assets |
| 5 | P12_mastocito.png | assets | | 33 | P40_citoquinas.png | assets |
| 6 | P13_monocito.png | assets | | 34 | P41_histamina.png | assets |
| 7 | P14_macrofago.png | assets | | 35 | P42_expansion_clonal.png | assets |
| 8 | P15_dendritica.png | assets | | 36 | P43_quimiotaxis.png | assets |
| 9 | P16_globulo_rojo.png | assets | | 37 | P53_memoria_patrulla.png | assets |
| 10 | P17_plaqueta.png | assets | | 38 | P54_respuesta_secundaria.png | assets |
| 11 | P18_linfocito_B.png | assets | | 39 | P01_portada.png | fondos |
| 12 | P19_T_CD4.png | assets | | 40 | P02_cuerpo.png | fondos |
| 13 | P20_T_CD8.png | assets | | 41 | P03_red_inmunitaria.png | fondos |
| 14 | P21_NK.png | assets | | 42 | P05_carterista.png | fondos |
| 15 | P22_plasmatica.png | assets | | 43 | P06_bomba.png | fondos |
| 16 | P23_B_memoria.png | assets | | 44 | P07_dos_caminos.png | fondos |
| 17 | P24_T_memoria.png | assets | | 45 | P44_nariz.png | fondos |
| 18 | P25_virus.png | assets | | 46 | P45_piel.png | fondos |
| 19 | P26_virus_epitopos.png | assets | | 47 | P46_mucosa.png | fondos |
| 20 | P27_virus_opsonizado.png | assets | | 48 | P47_medula.png | fondos |
| 21 | P28_virus_perforado.png | assets | | 49 | **IMAGEN INTRUSA: mover a `_descartes/`** | — |
| 22 | P29_epitelial_sana.png | assets | | 50 | P48_vaso.png | fondos |
| 23 | P30_epitelial_infectada.png | assets | | 51 | P49_tejido_infectado.png | fondos |
| 24 | P31_lisis_CD8.png | assets | | 52 | P50_ganglio.png | fondos |
| 25 | P32_anticuerpo.png | assets | | 53 | P51_mapa_ganglios.png | fondos |
| 26 | P33_enjambre.png | assets | | 54 | P52_tejido_sano.png | fondos |
| 27 | P34_CMH.png | assets | | 55 | P55_final.png | fondos |

2. **Quitar el fondo verde a los 39 assets** (solo la columna "assets"; los 16 fondos NO se tocan). Dos opciones, por orden de preferencia:
   - **Opción A (preferida):** script propio de chroma key con Pillow: convertir a RGBA, hacer transparentes los píxeles donde el canal verde domine claramente (p. ej., G > 90 y G − R > 40 y G − B > 40), suavizar bordes con feather de 1–2 px y corregir el despill verde en los píxeles semitransparentes del contorno.
   - **Opción B:** usar `rembg` (`pip install rembg onnxruntime`) en modo carpeta, si la opción A deja bordes sucios.
3. **Verificación obligatoria de la FASE 0 (antes de darla por buena):**
   - `imagenes/assets/` contiene exactamente **39 PNG en modo RGBA** (canal alfa real).
   - `imagenes/fondos/` contiene exactamente **16 PNG** sin recortar.
   - La imagen intrusa está en `_descartes/` y `raw/` queda intacta (los originales nunca se borran).
   - **Puntos de control visual** (si alguno no coincide, DETENERSE y avisar al usuario: el orden de numeración no sería el esperado): el archivo 7 debe ser el macrófago comilón naranja con babero; el 12 el linfocito T CD4 con batuta y casaca; el 18 el virus verde con capa negra; el 39 la portada con cuerpo y escudo; el 51 el tejido infectado rojo con escombros.
   - Mostrar al usuario 3 assets recortados sobre fondo oscuro para confirmar que no queda halo verde.

## 10. PLAN DE FASES Y VERIFICACIÓN

- **FASE 0:** preparación de assets (sección 9). Verificación: la de esa sección.
- **FASE 1:** estructura del proyecto + motor completo + pantalla de carga + cuadro de narración + barra de progreso + sistema de tarjetas + escenas S00–S02. Verificación: servidor arranca, S01 sube el cuerpo desde abajo, la tarjeta del antígeno abre y marca el checklist.
- **FASE 2:** escenas S03–S08 (metáforas, barreras, complemento, desfiles con tarjetas). Verificación: los 3 interruptores del complemento funcionan; los 16 personajes son clicables.
- **FASE 3:** escenas S09–S18 con la narrativa principal. Verificación: el punto rojo de S13 aparece, salta al ganglio y la cámara hace zoom; S18 requiere clicar los 3 epítopos.
- **FASE 4:** los tres minijuegos completos con HUD, objetivos y récords. Verificación: cada juego se gana y se pierde correctamente y bloquea el avance si no se alcanza el objetivo.
- **FASE 5:** escenas S19–S21, checklist final, auto-guardado, audio y pulido. Verificación: partida completa de principio a fin sin errores de consola.

**Comandos de verificación (Windows, PowerShell):**
```
python -m http.server 8000
# abrir http://localhost:8000 y http://localhost:8000/?debug=1
```

**Convenciones de Git:** un commit por fase con mensaje "FASE N: descripción". No subir `raw/` ni `_descartes/` al repositorio.

## 11. CRITERIOS DE CALIDAD

- Cero errores ni warnings en consola.
- 60 FPS estables con las 22 escenas y partículas activas.
- Sin fugas de memoria: limpiar listeners, partículas y timers al cambiar de escena.
- Funciona con ratón y táctil (pointer events).
- Tipografía legible (mínimo 18 px lógicos) y contraste suficiente sobre los fondos.
