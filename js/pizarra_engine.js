/**
 * PIZARRA_ENGINE.JS — Motor de Cámara con Zoom Dinámico, Trazado de Tiza
 * y Narración Interactiva (Estilo Genially / Prezi / Whiteboard)
 */

class PizarraEngine {
  constructor() {
    this.viewport = document.getElementById('pizarra-viewport');
    this.world = document.getElementById('pizarra-world');
    this.svgLayer = document.getElementById('pizarra-svg-layer');
    this.stationsContainer = document.getElementById('pizarra-stations-layer');
    this.zoomedOverlay = document.getElementById('zoomed-stage-overlay');
    this.stageBg = document.getElementById('stage-hero-bg');
    this.stageChars = document.getElementById('stage-characters-layer');
    this.narrationBox = document.getElementById('pizarra-narration-box');
    this.speakerTag = document.getElementById('narration-speaker');
    this.narrTextEl = document.getElementById('narration-text');
    this.narrCounter = document.getElementById('narration-counter');
    this.btnContinue = document.getElementById('btn-narr-continue');
    this.topIndicator = document.getElementById('prezi-station-title');
    this.checklistBadge = document.getElementById('top-checklist-badge');
    this.audioToggleBtn = document.getElementById('btn-toggle-sound');

    // Estado de la cámara y de la historia
    this.cameraMode = 'overview'; // 'overview' | 'station'
    this.currentStationIndex = 0;
    this.visitedStations = new Set();
    this.learnedChecklist = new Set();

    // Estado del mecanografiado
    this.currentLineIndex = 0;
    this.isTyping = false;
    this.typewriterTimer = null;
    this.currentFullLine = '';

    // Audio WebAudio
    this.soundEnabled = true;
    this.audioCtx = null;

    this.init();
  }

  init() {
    this.cargarProgreso();
    this.construirPizarra();
    this.setupEventListeners();
    this.ajustarCamaraOverview(false);

    // Si no ha visitado ninguna, la primera estación es la 0
    if (this.visitedStations.size === 0) {
      this.currentStationIndex = 0;
    }
    this.actualizarUI();
  }

  // =========================================================================
  // 1. CONSTRUCCIÓN DE LA PIZARRA (SVG DE TIZA Y TARJETAS DE ESTACIÓN)
  // =========================================================================

  construirPizarra() {
    const data = window.PIZARRA_DATA;

    // 1. Construir capas SVG para los trazos de tiza
    this.svgLayer.innerHTML = '';
    data.CONEXIONES.forEach((con, idx) => {
      // Línea de fondo discontinua
      const pathBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathBase.setAttribute('d', con.d);
      pathBase.setAttribute('class', 'chalk-path-base');
      this.svgLayer.appendChild(pathBase);

      // Línea de tiza/neón animable
      const pathDrawn = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathDrawn.setAttribute('d', con.d);
      pathDrawn.setAttribute('class', 'chalk-path-drawn');
      pathDrawn.id = `chalk-path-${con.desde}-${con.hacia}`;

      // Configurar dasharray para animación
      this.svgLayer.appendChild(pathDrawn);
    });

    // Calcular longitud de trazos tras renderizado
    setTimeout(() => {
      data.CONEXIONES.forEach(con => {
        const p = document.getElementById(`chalk-path-${con.desde}-${con.hacia}`);
        if (p) {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len;
          // Si ambas estaciones ya fueron visitadas, mostrar trazada
          const desdeIdx = data.ESTACIONES.findIndex(e => e.id === con.desde);
          const haciaIdx = data.ESTACIONES.findIndex(e => e.id === con.hacia);
          if (this.visitedStations.has(haciaIdx)) {
            p.style.strokeDashoffset = '0';
          } else {
            p.style.strokeDashoffset = len;
          }
        }
      });
    }, 100);

    // 2. Construir nodos/tarjetas de las 8 estaciones en la pizarra
    this.stationsContainer.innerHTML = '';
    data.ESTACIONES.forEach((est, idx) => {
      const node = document.createElement('div');
      node.className = `pizarra-station-node station-node-${idx}`;
      node.style.left = `${est.x}px`;
      node.style.top = `${est.y}px`;
      node.dataset.index = idx;

      const isVisited = this.visitedStations.has(idx);
      const isCurrent = idx === this.currentStationIndex;

      if (isVisited) node.classList.add('completed');
      if (isCurrent) node.classList.add('current-active');

      const bgImg = data.ASSETS[est.fondo];
      const previewChars = est.personajes.map(p => 
        `<img src="${data.ASSETS[p.img]}" alt="${p.nombre}" title="${p.nombre}">`
      ).join('');

      node.innerHTML = `
        <div class="station-thumb-backdrop">
          <img src="${bgImg}" class="station-thumb-img" alt="${est.titulo}">
          <div class="station-thumb-overlay">
            <div class="station-pill-num">${est.icono} ${est.numero}</div>
            <div class="station-status-badge ${isVisited ? 'completed' : 'pending'}">
              ${isVisited ? '✔ Explorado' : (isCurrent ? '⚡ Por explorar' : '🔒 En ruta')}
            </div>
          </div>
        </div>
        <div class="station-info-body">
          <div>
            <h3 class="station-title">${est.titulo}</h3>
            <p class="station-sub">${est.subtitulo}</p>
          </div>
          <div class="station-footer">
            <div class="station-chars-preview">${previewChars}</div>
            <div class="station-explore-cta">Explorar ➔</div>
          </div>
        </div>
      `;

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hacerZoomAEstacion(idx);
      });

      this.stationsContainer.appendChild(node);
    });
  }

  // =========================================================================
  // 2. MOTOR DE CÁMARA CON ZOOM DINÁMICO (ESTILO GENIALLY / PREZI)
  // =========================================================================

  ajustarCamaraOverview(animar = true) {
    this.cameraMode = 'overview';
    this.viewport.classList.remove('zoomed-in');
    this.zoomedOverlay.classList.remove('active');

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mw = window.PIZARRA_DATA.MUNDO_ANCHO;
    const mh = window.PIZARRA_DATA.MUNDO_ALTO;

    // Calcular escala óptima para que quepa todo el lienzo con margen elegante
    const scaleX = vw / mw;
    const scaleY = vh / mh;
    const scale = Math.min(scaleX, scaleY) * 0.94;

    const tx = (vw - mw * scale) / 2;
    const ty = (vh - mh * scale) / 2;

    if (!animar) {
      this.world.style.transition = 'none';
      this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
      this.world.offsetHeight; // forzar reflow
      this.world.style.transition = 'transform 1.25s cubic-bezier(0.22, 1, 0.36, 1)';
    } else {
      this.reproducirSonido('whoosh_out');
      this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    }

    this.topIndicator.innerHTML = `
      <span class="prezi-indicator-dot"></span>
      <span>Pizarra Global del Sistema Inmunitario</span>
    `;

    // Resaltar la estación actual en el mapa
    this.actualizarNodosPizarra();
  }

  hacerZoomAEstacion(index) {
    const data = window.PIZARRA_DATA;
    if (index < 0 || index >= data.ESTACIONES.length) return;

    this.currentStationIndex = index;
    this.visitedStations.add(index);
    this.guardarProgreso();
    this.cameraMode = 'station';
    this.viewport.classList.add('zoomed-in');

    const est = data.ESTACIONES[index];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Sonido cinemático de zoom
    this.reproducirSonido('whoosh_in');

    // Escala del zoom a la viñeta
    const zoomScale = Math.max(1.15, Math.min(vw / 900, vh / 600));
    const tx = vw / 2 - est.x * zoomScale;
    const ty = vh / 2 - est.y * zoomScale;

    // 1. Mover y ampliar la cámara hacia la estación
    this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${zoomScale})`;

    // 2. Tras la mitad de la animación de cámara, activar la escena ampliada
    setTimeout(() => {
      this.cargarEscenaAmpliada(est);
    }, 450);

    this.actualizarUI();
  }

  // =========================================================================
  // 3. MODO DETALLE: NOVELA VISUAL Y PERSONAJES INTERACTIVOS
  // =========================================================================

  cargarEscenaAmpliada(est) {
    const data = window.PIZARRA_DATA;

    // 1. Fondo de la escena
    this.stageBg.src = data.ASSETS[est.fondo];

    // 2. Renderizar personajes vivos y animados
    this.stageChars.innerHTML = '';
    est.personajes.forEach(p => {
      const charEl = document.createElement('div');
      charEl.className = `stage-character-item anim-${p.anim || 'float'}`;
      charEl.style.left = `${p.x * 100}%`;
      charEl.style.top = `${p.y * 100}%`;
      charEl.style.transform = 'translate(-50%, -50%)';

      const imgSrc = data.ASSETS[p.img];
      charEl.innerHTML = `
        <div class="stage-character-radar"></div>
        <img src="${imgSrc}" alt="${p.nombre}">
        <span class="stage-character-badge">${p.nombre}</span>
      `;

      // Clic para abrir ficha educativa
      charEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.abrirFichaPersonaje(p, est);
      });

      this.stageChars.appendChild(charEl);
    });

    // 3. Preparar narración
    this.currentLineIndex = 0;
    this.zoomedOverlay.classList.add('active');
    this.topIndicator.innerHTML = `
      <span class="prezi-indicator-dot" style="background:#4ade80;"></span>
      <span>${est.numero}. ${est.titulo}</span>
    `;

    this.mostrarLineaNarracion(0);
  }

  mostrarLineaNarracion(index) {
    const est = window.PIZARRA_DATA.ESTACIONES[this.currentStationIndex];
    if (!est || !est.narracion || index >= est.narracion.length) {
      this.completarEstacion();
      return;
    }

    this.currentLineIndex = index;
    const totalLines = est.narracion.length;
    this.narrCounter.textContent = `${index + 1} / ${totalLines}`;
    this.speakerTag.innerHTML = `🎙️ NARRADOR · ${est.faseNombre}`;

    const text = est.narracion[index];
    this.currentFullLine = text;

    // Mecanografiado
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.isTyping = true;
    this.narrTextEl.textContent = '';
    let charIdx = 0;

    const speed = 24; // ms por carácter
    this.typewriterTimer = setInterval(() => {
      if (charIdx < text.length) {
        this.narrTextEl.textContent += text.charAt(charIdx);
        charIdx++;
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        this.isTyping = false;
      }
    }, speed);

    // Texto del botón
    if (index === totalLines - 1) {
      this.btnContinue.textContent = 'Continuar en Pizarra ➔';
    } else {
      this.btnContinue.textContent = 'Siguiente ›';
    }
  }

  avanzarNarracion() {
    // Si aún está escribiendo, completar la frase al instante
    if (this.isTyping) {
      if (this.typewriterTimer) clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
      this.isTyping = false;
      this.narrTextEl.textContent = this.currentFullLine;
      this.reproducirSonido('click');
      return;
    }

    this.reproducirSonido('click');
    const est = window.PIZARRA_DATA.ESTACIONES[this.currentStationIndex];
    if (this.currentLineIndex < est.narracion.length - 1) {
      this.mostrarLineaNarracion(this.currentLineIndex + 1);
    } else {
      this.completarEstacion();
    }
  }

  completarEstacion() {
    this.reproducirSonido('chime');
    const currentIndex = this.currentStationIndex;
    const nextIndex = currentIndex + 1;

    // Cerrar vista escena y volver a la pizarra con animación de trazo
    this.ajustarCamaraOverview(true);

    if (nextIndex < window.PIZARRA_DATA.ESTACIONES.length) {
      // Dibujar la línea de conexión animada hacia la siguiente estación
      const currentId = window.PIZARRA_DATA.ESTACIONES[currentIndex].id;
      const nextId = window.PIZARRA_DATA.ESTACIONES[nextIndex].id;
      this.animarTrazoTiza(currentId, nextId, () => {
        this.currentStationIndex = nextIndex;
        this.actualizarUI();
      });
    } else {
      // ¡Recorrido completo!
      this.actualizarUI();
    }
  }

  // =========================================================================
  // 4. ANIMACIÓN DE TRAZO DE TIZA EN LA PIZARRA (CONECTANDO ESTACIONES)
  // =========================================================================

  animarTrazoTiza(desdeId, haciaId, onComplete) {
    const pathEl = document.getElementById(`chalk-path-${desdeId}-${haciaId}`);
    if (!pathEl) {
      if (onComplete) onComplete();
      return;
    }

    this.reproducirSonido('chalk');
    const len = pathEl.getTotalLength();
    pathEl.style.transition = 'stroke-dashoffset 1.4s ease-in-out';
    pathEl.style.strokeDashoffset = '0';

    setTimeout(() => {
      this.reproducirSonido('pop');
      if (onComplete) onComplete();
    }, 1450);
  }

  // =========================================================================
  // 5. MODAL DE FICHA EDUCATIVA DE PERSONAJE
  // =========================================================================

  abrirFichaPersonaje(p, est) {
    this.reproducirSonido('pop');
    const modal = document.getElementById('character-detail-modal');
    const imgEl = document.getElementById('modal-char-img');
    const catEl = document.getElementById('modal-badge-cat');
    const titleEl = document.getElementById('modal-char-title');
    const descEl = document.getElementById('modal-char-desc');

    imgEl.src = window.PIZARRA_DATA.ASSETS[p.img];
    catEl.textContent = est.titulo;
    titleEl.textContent = p.nombre;
    descEl.textContent = p.desc;

    // Registrar en checklist si aplica
    if (est.checklistConceptos) {
      est.checklistConceptos.forEach(cid => this.learnedChecklist.add(cid));
      this.guardarProgreso();
      this.actualizarChecklistBadge();
    }

    modal.classList.add('active');
  }

  cerrarFichaPersonaje() {
    this.reproducirSonido('click');
    document.getElementById('character-detail-modal').classList.remove('active');
  }

  // =========================================================================
  // 6. GESTIÓN DEL CHECKLIST Y MODALES
  // =========================================================================

  actualizarChecklistBadge() {
    const total = window.PIZARRA_DATA.CHECKLIST.length;
    const aprendidos = this.learnedChecklist.size;
    this.checklistBadge.textContent = `${aprendidos}/${total}`;
  }

  abrirModalChecklist() {
    this.reproducirSonido('click');
    const modal = document.getElementById('checklist-full-modal');
    const grid = document.getElementById('checklist-modal-grid');
    grid.innerHTML = '';

    window.PIZARRA_DATA.CHECKLIST.forEach(item => {
      const isLearned = this.learnedChecklist.has(item.id);
      const card = document.createElement('div');
      card.className = `checklist-item ${isLearned ? 'learned' : ''}`;
      card.innerHTML = `
        <div class="checklist-item-header">
          <span>${isLearned ? '✔' : '⏳'} ${item.nombre}</span>
          <span style="font-size:11px;color:${isLearned ? '#86efac' : '#94a3b8'}">
            ${isLearned ? 'Dominado' : 'Por explorar'}
          </span>
        </div>
        <p class="checklist-item-desc">${item.desc}</p>
      `;
      grid.appendChild(card);
    });

    modal.classList.add('active');
  }

  cerrarModalChecklist() {
    this.reproducirSonido('click');
    document.getElementById('checklist-full-modal').classList.remove('active');
  }

  // =========================================================================
  // 7. EVENT LISTENERS & NAVEGACIÓN
  // =========================================================================

  setupEventListeners() {
    // Redimensionado de ventana: recalcular escala de pizarra si está en overview
    window.addEventListener('resize', () => {
      if (this.cameraMode === 'overview') {
        this.ajustarCamaraOverview(false);
      }
    });

    // Clic en la caja de narración o botón continuar
    this.narrationBox.addEventListener('click', () => this.avanzarNarracion());
    this.btnContinue.addEventListener('click', (e) => {
      e.stopPropagation();
      this.avanzarNarracion();
    });

    // Botón superior "Ver Pizarra Global" (Zoom Out)
    document.getElementById('btn-prezi-overview').addEventListener('click', () => {
      this.ajustarCamaraOverview(true);
    });

    // Botón superior "Siguiente Estación"
    document.getElementById('btn-prezi-next').addEventListener('click', () => {
      const nextIdx = (this.currentStationIndex + 1) % window.PIZARRA_DATA.ESTACIONES.length;
      this.hacerZoomAEstacion(nextIdx);
    });

    // Botón superior "Estación Anterior"
    document.getElementById('btn-prezi-prev').addEventListener('click', () => {
      const prevIdx = Math.max(0, this.currentStationIndex - 1);
      this.hacerZoomAEstacion(prevIdx);
    });

    // Checklist botón superior
    document.getElementById('btn-open-checklist').addEventListener('click', () => {
      this.abrirModalChecklist();
    });

    // Cerrar modal personaje
    document.getElementById('btn-close-modal-char').addEventListener('click', () => {
      this.cerrarFichaPersonaje();
    });
    document.getElementById('character-detail-modal').addEventListener('click', (e) => {
      if (e.target.id === 'character-detail-modal') this.cerrarFichaPersonaje();
    });

    // Cerrar modal checklist
    document.getElementById('btn-close-modal-checklist').addEventListener('click', () => {
      this.cerrarModalChecklist();
    });
    document.getElementById('checklist-full-modal').addEventListener('click', (e) => {
      if (e.target.id === 'checklist-full-modal') this.cerrarModalChecklist();
    });

    // Sonido toggle
    this.audioToggleBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      this.audioToggleBtn.textContent = this.soundEnabled ? '🔊' : '🔇';
    });

    // Teclas: Espacio / Flechas / Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (this.cameraMode === 'station') {
          e.preventDefault();
          this.avanzarNarracion();
        }
      } else if (e.key === 'Escape') {
        if (this.cameraMode === 'station') {
          this.ajustarCamaraOverview(true);
        }
        this.cerrarFichaPersonaje();
        this.cerrarModalChecklist();
      } else if (e.key === 'ArrowRight') {
        if (this.cameraMode === 'overview') {
          this.hacerZoomAEstacion(this.currentStationIndex);
        } else {
          this.avanzarNarracion();
        }
      } else if (e.key === 'ArrowLeft') {
        if (this.cameraMode === 'station') {
          this.ajustarCamaraOverview(true);
        }
      }
    });
  }

  actualizarNodosPizarra() {
    const nodes = document.querySelectorAll('.pizarra-station-node');
    nodes.forEach(node => {
      const idx = parseInt(node.dataset.index, 10);
      const isVisited = this.visitedStations.has(idx);
      const isCurrent = idx === this.currentStationIndex;

      node.classList.remove('current-active', 'completed');
      if (isVisited) node.classList.add('completed');
      if (isCurrent) node.classList.add('current-active');

      const badge = node.querySelector('.station-status-badge');
      if (badge) {
        badge.className = `station-status-badge ${isVisited ? 'completed' : 'pending'}`;
        badge.textContent = isVisited ? '✔ Explorado' : (isCurrent ? '⚡ Por explorar' : '🔒 En ruta');
      }
    });
  }

  actualizarUI() {
    this.actualizarNodosPizarra();
    this.actualizarChecklistBadge();
  }

  // =========================================================================
  // 8. AUDIO SINTÉTICO WEBAUDIO (FAIL-PROOF)
  // =========================================================================

  reproducirSonido(tipo) {
    if (!this.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (tipo === 'whoosh_in') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (tipo === 'whoosh_out') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(130, now + 0.35);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (tipo === 'chalk') {
        // Trazado de tiza sutil
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(280, now + 0.2);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (tipo === 'chime') {
        // Éxito al completar estación
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.09, now + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.45);
        });
      } else if (tipo === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (tipo === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.09);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      }
    } catch (err) {
      console.warn('Audio no disponible:', err);
    }
  }

  // =========================================================================
  // 9. PERSISTENCIA
  // =========================================================================

  guardarProgreso() {
    try {
      const data = {
        visited: Array.from(this.visitedStations),
        checklist: Array.from(this.learnedChecklist),
        current: this.currentStationIndex
      };
      localStorage.setItem('pizarra_inmuno_save', JSON.stringify(data));
    } catch (e) {
      // LocalStorage deshabilitado o privado
    }
  }

  cargarProgreso() {
    try {
      const saved = localStorage.getItem('pizarra_inmuno_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.visited) this.visitedStations = new Set(data.visited);
        if (data.checklist) this.learnedChecklist = new Set(data.checklist);
        if (typeof data.current === 'number') this.currentStationIndex = data.current;
      }
    } catch (e) {
      // Ignorar si falla lectura
    }
  }
}

// Arrancar motor cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
  window.appPizarra = new PizarraEngine();
});
