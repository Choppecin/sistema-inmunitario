/**
 * PIZARRA_ENGINE.JS — Motor de la Infografía Interactiva
 * Pantalla de bienvenida con máquina de escribir, fondo azul oscuro liso y panel principal
 */

class PizarraEngine {
  constructor() {
    this.introScreen = document.getElementById('intro-screen');
    this.introTextEl = document.getElementById('intro-text');
    this.introPromptEl = document.getElementById('intro-prompt');

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

    // Estado de la cámara y de la historia
    this.cameraMode = 'overview'; // 'overview' | 'station'
    this.currentStationIndex = 0;
    this.visitedStations = new Set();

    // Estado del mecanografiado de la escena
    this.currentLineIndex = 0;
    this.isTyping = false;
    this.typewriterTimer = null;
    this.currentFullLine = '';

    // Estado de la introducción
    this.introTyping = false;

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
    this.iniciarIntro();

    if (this.visitedStations.size === 0) {
      this.currentStationIndex = 0;
    }
    this.actualizarUI();
  }

  // =========================================================================
  // 0. INTRODUCCIÓN CON EFECTO MÁQUINA DE ESCRIBIR
  // =========================================================================

  iniciarIntro() {
    const textoCompleto = "Hola, profe, esta es mi infografía interactiva del aparato inmunitario.";
    this.introTextEl.textContent = '';
    this.introTyping = true;
    let i = 0;
    const velocidad = 40; // ms por carácter

    const timer = setInterval(() => {
      if (i < textoCompleto.length) {
        this.introTextEl.textContent += textoCompleto.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        this.introTyping = false;
        if (this.introPromptEl) {
          this.introPromptEl.classList.add('visible');
        }
      }
    }, velocidad);

    const finalizarIntro = () => {
      if (this.introTyping) {
        // Completar texto inmediatamente
        clearInterval(timer);
        this.introTextEl.textContent = textoCompleto;
        this.introTyping = false;
        if (this.introPromptEl) this.introPromptEl.classList.add('visible');
        return;
      }

      // Transición hacia el panel principal
      this.reproducirSonido('whoosh_out');
      this.introScreen.classList.add('fade-out');
      setTimeout(() => {
        this.introScreen.style.display = 'none';
      }, 650);
    };

    this.introScreen.addEventListener('click', finalizarIntro);
    window.addEventListener('keydown', (e) => {
      if (this.introScreen.style.display !== 'none' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        finalizarIntro();
      }
    });
  }

  // =========================================================================
  // 1. CONSTRUCCIÓN DEL PANEL PRINCIPAL (RUTAS SVG Y TARJETAS DE ESTACIÓN)
  // =========================================================================

  construirPizarra() {
    const data = window.PIZARRA_DATA;

    // 1. Capa SVG de conexiones
    this.svgLayer.innerHTML = '';
    data.CONEXIONES.forEach(con => {
      const pathBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathBase.setAttribute('d', con.d);
      pathBase.setAttribute('class', 'chalk-path-base');
      this.svgLayer.appendChild(pathBase);

      const pathDrawn = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathDrawn.setAttribute('d', con.d);
      pathDrawn.setAttribute('class', 'chalk-path-drawn');
      pathDrawn.id = `chalk-path-${con.desde}-${con.hacia}`;
      this.svgLayer.appendChild(pathDrawn);
    });

    setTimeout(() => {
      data.CONEXIONES.forEach(con => {
        const p = document.getElementById(`chalk-path-${con.desde}-${con.hacia}`);
        if (p) {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len;
          const haciaIdx = data.ESTACIONES.findIndex(e => e.id === con.hacia);
          if (this.visitedStations.has(haciaIdx)) {
            p.style.strokeDashoffset = '0';
          } else {
            p.style.strokeDashoffset = len;
          }
        }
      });
    }, 80);

    // 2. Tarjetas de estación del panel principal
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
              ${isVisited ? '✔ Completado' : (isCurrent ? '⚡ Activo' : 'En ruta')}
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
            <div class="station-explore-cta">Entrar ➔</div>
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
  // 2. MOTOR DE CÁMARA (VISTA MACRO / ZOOM A DETALLE)
  // =========================================================================

  ajustarCamaraOverview(animar = true) {
    this.cameraMode = 'overview';
    this.viewport.classList.remove('zoomed-in');
    this.zoomedOverlay.classList.remove('active');

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mw = window.PIZARRA_DATA.MUNDO_ANCHO;
    const mh = window.PIZARRA_DATA.MUNDO_ALTO;

    const scaleX = vw / mw;
    const scaleY = vh / mh;
    const scale = Math.min(scaleX, scaleY) * 0.94;

    const tx = (vw - mw * scale) / 2;
    const ty = (vh - mh * scale) / 2;

    if (!animar) {
      this.world.style.transition = 'none';
      this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
      this.world.offsetHeight;
      this.world.style.transition = 'transform 1.25s cubic-bezier(0.22, 1, 0.36, 1)';
    } else {
      this.reproducirSonido('whoosh_out');
      this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    }

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

    this.reproducirSonido('whoosh_in');

    const zoomScale = Math.max(1.15, Math.min(vw / 900, vh / 600));
    const tx = vw / 2 - est.x * zoomScale;
    const ty = vh / 2 - est.y * zoomScale;

    this.world.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${zoomScale})`;

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

    this.stageBg.src = data.ASSETS[est.fondo];

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

      charEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.abrirFichaPersonaje(p, est);
      });

      this.stageChars.appendChild(charEl);
    });

    this.currentLineIndex = 0;
    this.zoomedOverlay.classList.add('active');
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
    this.speakerTag.textContent = `NARRADOR · ${est.faseNombre}`;

    const text = est.narracion[index];
    this.currentFullLine = text;

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.isTyping = true;
    this.narrTextEl.textContent = '';
    let charIdx = 0;

    const speed = 24;
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

    if (index === totalLines - 1) {
      this.btnContinue.textContent = 'Volver al Panel Principal ➔';
    } else {
      this.btnContinue.textContent = 'Siguiente ›';
    }
  }

  avanzarNarracion() {
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

    this.ajustarCamaraOverview(true);

    if (nextIndex < window.PIZARRA_DATA.ESTACIONES.length) {
      const currentId = window.PIZARRA_DATA.ESTACIONES[currentIndex].id;
      const nextId = window.PIZARRA_DATA.ESTACIONES[nextIndex].id;
      this.animarTrazoTiza(currentId, nextId, () => {
        this.currentStationIndex = nextIndex;
        this.actualizarUI();
      });
    } else {
      this.actualizarUI();
    }
  }

  animarTrazoTiza(desdeId, haciaId, onComplete) {
    const pathEl = document.getElementById(`chalk-path-${desdeId}-${haciaId}`);
    if (!pathEl) {
      if (onComplete) onComplete();
      return;
    }

    this.reproducirSonido('chalk');
    pathEl.style.transition = 'stroke-dashoffset 1.3s ease-in-out';
    pathEl.style.strokeDashoffset = '0';

    setTimeout(() => {
      this.reproducirSonido('pop');
      if (onComplete) onComplete();
    }, 1350);
  }

  // =========================================================================
  // 4. MODAL DE FICHA EDUCATIVA DE PERSONAJE
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

    modal.classList.add('active');
  }

  cerrarFichaPersonaje() {
    this.reproducirSonido('click');
    document.getElementById('character-detail-modal').classList.remove('active');
  }

  // =========================================================================
  // 5. EVENT LISTENERS
  // =========================================================================

  setupEventListeners() {
    window.addEventListener('resize', () => {
      if (this.cameraMode === 'overview') {
        this.ajustarCamaraOverview(false);
      }
    });

    this.narrationBox.addEventListener('click', () => this.avanzarNarracion());
    this.btnContinue.addEventListener('click', (e) => {
      e.stopPropagation();
      this.avanzarNarracion();
    });

    document.getElementById('btn-close-modal-char').addEventListener('click', () => {
      this.cerrarFichaPersonaje();
    });
    document.getElementById('character-detail-modal').addEventListener('click', (e) => {
      if (e.target.id === 'character-detail-modal') this.cerrarFichaPersonaje();
    });

    window.addEventListener('keydown', (e) => {
      if (this.introScreen.style.display !== 'none') return;

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
        badge.textContent = isVisited ? '✔ Completado' : (isCurrent ? '⚡ Activo' : 'En ruta');
      }
    });
  }

  actualizarUI() {
    this.actualizarNodosPizarra();
  }

  // =========================================================================
  // 6. AUDIO SINTÉTICO WEBAUDIO (FAIL-PROOF)
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
      console.warn('Audio:', err);
    }
  }

  // =========================================================================
  // 7. PERSISTENCIA
  // =========================================================================

  guardarProgreso() {
    try {
      const data = {
        visited: Array.from(this.visitedStations),
        current: this.currentStationIndex
      };
      localStorage.setItem('pizarra_inmuno_save', JSON.stringify(data));
    } catch (e) {}
  }

  cargarProgreso() {
    try {
      const saved = localStorage.getItem('pizarra_inmuno_save');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.visited) this.visitedStations = new Set(data.visited);
        if (typeof data.current === 'number') this.currentStationIndex = data.current;
      }
    } catch (e) {}
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.appPizarra = new PizarraEngine();
});
