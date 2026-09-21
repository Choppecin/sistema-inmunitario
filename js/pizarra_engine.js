/**
 * PIZARRA_ENGINE.JS — Motor de la Infografía Interactiva
 * Pantalla de bienvenida con máquina de escribir, cuadrícula de 7 puntos y línea conectora normal
 */

class PizarraEngine {
  constructor() {
    this.introScreen = document.getElementById('intro-screen');
    this.introTextEl = document.getElementById('intro-text');
    this.introPromptEl = document.getElementById('intro-prompt');

    this.mainPanel = document.getElementById('main-panel');
    this.connectingPath = document.getElementById('main-connecting-path');
    this.cards = Array.from(document.querySelectorAll('.station-card'));

    this.zoomedOverlay = document.getElementById('zoomed-stage-overlay');
    this.stageBg = document.getElementById('stage-hero-bg');
    this.stageChars = document.getElementById('stage-characters-layer');
    this.btnBackToPanel = document.getElementById('btn-back-to-panel');

    this.narrationBox = document.getElementById('pizarra-narration-box');
    this.speakerTag = document.getElementById('narration-speaker');
    this.narrTextEl = document.getElementById('narration-text');
    this.narrCounter = document.getElementById('narration-counter');
    this.btnContinue = document.getElementById('btn-narr-continue');

    // Estado
    this.currentStationIndex = 0;
    this.visitedStations = new Set();

    // Mecanografiado de narración
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
    this.iniciarIntro();
    this.setupEventListeners();
    this.actualizarUI();

    // Dibujar la línea conectora normal entre los 7 puntos
    setTimeout(() => {
      this.actualizarLineaConectora();
    }, 100);
  }

  // =========================================================================
  // 0. INTRODUCCIÓN CON EFECTO MÁQUINA DE ESCRIBIR
  // =========================================================================

  iniciarIntro() {
    const textoCompleto = "Hola, profe, esta es mi infografía interactiva del aparato inmunitario.";
    this.introTextEl.textContent = '';
    this.introTyping = true;
    let i = 0;
    const velocidad = 38;

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
        clearInterval(timer);
        this.introTextEl.textContent = textoCompleto;
        this.introTyping = false;
        if (this.introPromptEl) this.introPromptEl.classList.add('visible');
        return;
      }

      this.reproducirSonido('whoosh_out');
      this.introScreen.classList.add('fade-out');
      setTimeout(() => {
        this.introScreen.style.display = 'none';
        this.actualizarLineaConectora();
      }, 650);
    };

    this.introScreen.addEventListener('click', finalizarIntro);
    window.addEventListener('keydown', (e) => {
      if (this.introScreen && this.introScreen.style.display !== 'none' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        finalizarIntro();
      }
    });
  }

  // =========================================================================
  // 1. DIBUJAR LÍNEA NORMAL CONECTORA ENTRE LOS 7 PUNTOS
  // =========================================================================

  actualizarLineaConectora() {
    if (!this.cards || this.cards.length < 7 || !this.connectingPath) return;

    const panelRect = this.mainPanel.getBoundingClientRect();
    if (panelRect.width === 0 || panelRect.height === 0) return;

    // Obtener centros exactos de cada una de las 7 tarjetas
    const pts = this.cards.map(card => {
      const r = card.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - panelRect.left,
        y: r.top + r.height / 2 - panelRect.top
      };
    });

    // Fila superior: 1 -> 2 -> 3 -> 4
    let d = `M ${pts[0].x} ${pts[0].y}`;
    d += ` L ${pts[1].x} ${pts[1].y}`;
    d += ` L ${pts[2].x} ${pts[2].y}`;
    d += ` L ${pts[3].x} ${pts[3].y}`;

    // Conexión suave desde el punto 4 (fin fila 1) al punto 5 (inicio fila 2):
    const cp1x = pts[3].x + 80;
    const cp1y = (pts[3].y + pts[4].y) / 2;
    const cp2x = pts[4].x - 80;
    const cp2y = (pts[3].y + pts[4].y) / 2;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pts[4].x} ${pts[4].y}`;

    // Fila inferior: 5 -> 6 -> 7
    d += ` L ${pts[5].x} ${pts[5].y}`;
    d += ` L ${pts[6].x} ${pts[6].y}`;

    this.connectingPath.setAttribute('d', d);
  }

  // =========================================================================
  // 2. ABRIR Y CARGAR ESCENA DE UN PUNTO
  // =========================================================================

  abrirPunto(index) {
    const data = window.PIZARRA_DATA;
    if (index < 0 || index >= data.ESTACIONES.length) return;

    this.currentStationIndex = index;
    this.visitedStations.add(index);
    this.guardarProgreso();

    const est = data.ESTACIONES[index];
    this.reproducirSonido('whoosh_in');

    // Cargar fondo nítido
    this.stageBg.src = data.ASSETS[est.fondo];

    // Cargar personajes vivos y animados
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

    // Iniciar narración
    this.currentLineIndex = 0;
    this.zoomedOverlay.classList.add('active');
    this.mostrarLineaNarracion(0);
    this.actualizarUI();
  }

  cerrarEscena() {
    this.reproducirSonido('whoosh_out');
    this.zoomedOverlay.classList.remove('active');
    this.actualizarUI();
    this.actualizarLineaConectora();
  }

  mostrarLineaNarracion(index) {
    const est = window.PIZARRA_DATA.ESTACIONES[this.currentStationIndex];
    if (!est || !est.narracion || index >= est.narracion.length) {
      this.completarPunto();
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

    const speed = 22;
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
      this.btnContinue.textContent = 'Volver al Esquema ➔';
    } else {
      this.btnContinue.textContent = 'Siguiente ›';
    }
  }

  avanzarNarracion() {
    if (this.isTyping) {
      clearInterval(this.typewriterTimer);
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
      this.completarPunto();
    }
  }

  completarPunto() {
    this.reproducirSonido('chime');
    const nextIdx = this.currentStationIndex + 1;
    if (nextIdx < window.PIZARRA_DATA.ESTACIONES.length) {
      this.currentStationIndex = nextIdx;
    }
    this.cerrarEscena();
  }

  // =========================================================================
  // 3. FICHA EDUCATIVA DE PERSONAJE
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
  // 4. EVENT LISTENERS
  // =========================================================================

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.actualizarLineaConectora();
    });

    // Clic en las tarjetas de la cuadrícula
    this.cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        this.abrirPunto(idx);
      });
    });

    // Botón volver al panel
    this.btnBackToPanel.addEventListener('click', () => {
      this.cerrarEscena();
    });

    // Avanzar narración
    this.narrationBox.addEventListener('click', () => this.avanzarNarracion());
    this.btnContinue.addEventListener('click', (e) => {
      e.stopPropagation();
      this.avanzarNarracion();
    });

    // Cerrar modal personaje
    document.getElementById('btn-close-modal-char').addEventListener('click', () => {
      this.cerrarFichaPersonaje();
    });
    document.getElementById('character-detail-modal').addEventListener('click', (e) => {
      if (e.target.id === 'character-detail-modal') this.cerrarFichaPersonaje();
    });

    // Teclado
    window.addEventListener('keydown', (e) => {
      if (this.introScreen && this.introScreen.style.display !== 'none') return;

      if (e.key === ' ' || e.key === 'Enter') {
        if (this.zoomedOverlay.classList.contains('active')) {
          e.preventDefault();
          this.avanzarNarracion();
        }
      } else if (e.key === 'Escape') {
        if (this.zoomedOverlay.classList.contains('active')) {
          this.cerrarEscena();
        }
        this.cerrarFichaPersonaje();
      }
    });
  }

  actualizarUI() {
    this.cards.forEach((card, idx) => {
      const isVisited = this.visitedStations.has(idx);
      const isCurrent = idx === this.currentStationIndex;

      card.classList.remove('current-active', 'completed');
      if (isVisited) card.classList.add('completed');
      if (isCurrent) card.classList.add('current-active');
    });
  }

  // =========================================================================
  // 5. AUDIO WEBAUDIO (FAIL-PROOF)
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
  // 6. PERSISTENCIA
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
