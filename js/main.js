/**
 * MAIN.JS — Punto de entrada de la aplicación y Game Loop principal.
 * 
 * Reglas de AGENTS.md:
 * - Game loop con requestAnimationFrame y delta time.
 * - Pausa automática cuando document.hidden = true.
 * - Pantalla de carga con Promise.all y barra de progreso.
 * - Coordenadas lógicas 1280x720 con escalado letterbox y eventos pointer unificados.
 * - FPS counter para modo debug.
 */

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBarFill = document.getElementById('loading-bar-fill');
  const loadingStatus = document.getElementById('loading-status');

  // Inicializar subsistemas
  const audio = new window.AudioSystem();
  const assetLoader = new window.AssetLoader();
  const sceneManager = new window.SceneManager(canvas, assetLoader, audio);
  window.sceneManager = sceneManager;

  // Variables de control de tiempo y FPS
  let lastTime = performance.now();
  let fpsTimer = 0;
  let frameCount = 0;
  let isPaused = false;

  // Pausa automática con visibilidad de página (AGENTS.md Sección 3)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
    } else {
      isPaused = false;
      lastTime = performance.now(); // Evitar salto brusco de delta time
    }
  });

  // Mapeo unificado de eventos de ratón / táctil a resolución lógica 1280x720
  function getLogicalCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  // Interacción en canvas (clic en sprites o fondo)
  canvas.addEventListener('pointerdown', (e) => {
    audio.resume(); // Activar audio tras primer gesto
    const coords = getLogicalCoordinates(e);

    // Actualizar coordenadas en HUD de debug
    const dbgCoords = document.getElementById('debug-coords');
    if (dbgCoords) {
      dbgCoords.textContent = `${(coords.x / 1280).toFixed(2)}, ${(coords.y / 720).toFixed(2)}`;
    }

    const clickedEntity = sceneManager.handleCanvasClick(coords.x, coords.y);
    if (!clickedEntity) {
      // Si no se tocó una entidad interactiva, actuar como clic de avance narrativo
      sceneManager.onNarrationBoxClick();
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (sceneManager.debugMode) {
      const coords = getLogicalCoordinates(e);
      const dbgCoords = document.getElementById('debug-coords');
      if (dbgCoords) {
        dbgCoords.textContent = `${(coords.x / 1280).toFixed(2)}, ${(coords.y / 720).toFixed(2)}`;
      }
    }
  });

  // Game Loop con Delta Time
  function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    if (isPaused) return;

    const dt = Math.min(0.1, (currentTime - lastTime) / 1000); // Tope de 0.1s para evitar saltos enormes
    lastTime = currentTime;

    // Cálculo de FPS
    frameCount++;
    fpsTimer += dt;
    if (fpsTimer >= 0.5) {
      const fps = Math.round(frameCount / fpsTimer);
      const dbgFps = document.getElementById('debug-fps');
      if (dbgFps) dbgFps.textContent = fps;
      frameCount = 0;
      fpsTimer = 0;
    }

    // Actualizar lógica y renderizar frame
    sceneManager.update(dt);
    sceneManager.render();
  }

  // Iniciar precarga de todos los assets requeridos
  loadingStatus.textContent = 'Cargando ilustraciones y personajes... 0%';
  assetLoader.loadAll(window.DATA.ASSETS_MANIFEST, (loaded, total, lastKey) => {
    const pct = Math.round((loaded / total) * 100);
    loadingBarFill.style.width = `${pct}%`;
    loadingStatus.textContent = `Cargando: ${lastKey} (${pct}%)`;
  }).then(() => {
    loadingStatus.textContent = '¡Listo! Iniciando sistema inmunitario...';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
      // Iniciar en S00 (Portada)
      sceneManager.cargarEscenaPorIndice(0);
      // Arrancar bucle
      lastTime = performance.now();
      requestAnimationFrame(gameLoop);
    }, 400);
  }).catch((err) => {
    console.error('Error durante la carga de assets:', err);
    loadingStatus.textContent = 'Error al cargar recursos. Comprueba la consola.';
  });
});
