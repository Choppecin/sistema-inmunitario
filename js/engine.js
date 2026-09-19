/**
 * ENGINE.JS — Motor gráfico, sistema de partículas, gestor de audio,
 * animaciones y controlador de escenas de "El sistema inmunitario".
 * 
 * Cumple estrictamente con las especificaciones de AGENTS.md (Secciones 3 y 5):
 * - Renderizado en Canvas 2D a resolución lógica 1280x720 con escalado letterbox.
 * - Delta Time para animaciones basadas en segundos (no frames).
 * - Primitivas completas de animación, easings matemáticos y pool de partículas.
 * - Audio procedural WebAudio sin dependencias externas.
 * - Persistencia completa en localStorage y soporte de debug con ?debug=1.
 */

// ============================================================================
// 1. SISTEMA DE AUDIO (WebAudio Procedural sin archivos externos)
// ============================================================================
class AudioSystem {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('inmuno_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('inmuno_vol') || '0.7');
    this.initAudio();
  }

  initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('inmuno_muted', this.muted);
    return this.muted;
  }

  playBeep(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.15) {
    if (this.muted || !this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Clic estándar en UI
  playClick() {
    this.playBeep(600, 'triangle', 0.04, 0.1);
  }

  // Sonido de máquina de escribir
  playTypeTick() {
    this.playBeep(320 + Math.random() * 80, 'sine', 0.02, 0.04);
  }

  // Efecto pop al aparecer un elemento
  playPop() {
    if (this.muted || !this.ctx) return;
    this.resume();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Apertura de tarjeta informativa (acorde triunfal armónico)
  playCardOpen() {
    if (this.muted || !this.ctx) return;
    const freqs = [392.00, 493.88, 587.33, 783.99]; // Acorde G Maj
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playBeep(f, 'sine', 0.35, 0.12), idx * 45);
    });
  }

  // Partículas de billetes del guiri (tintineo dorado)
  playMoneyChime() {
    if (this.muted || !this.ctx) return;
    const notes = [880, 1174, 1318, 1760];
    notes.forEach((f, i) => {
      setTimeout(() => this.playBeep(f, 'triangle', 0.15, 0.08), i * 60);
    });
  }

  // Alerta o fallo
  playAlert() {
    this.playBeep(220, 'sawtooth', 0.18, 0.15);
  }
}

// ============================================================================
// 2. GESTOR DE CARGA DE ASSETS (Imágenes con progreso porcentual)
// ============================================================================
class AssetLoader {
  constructor() {
    this.images = new Map();
    this.total = 0;
    this.loaded = 0;
  }

  loadAll(manifest, onProgress) {
    const keys = Object.keys(manifest);
    this.total = keys.length;
    this.loaded = 0;

    if (this.total === 0) {
      return Promise.resolve();
    }

    const promises = keys.map(key => {
      const src = manifest[key];
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.images.set(key, img);
          this.loaded++;
          if (onProgress) onProgress(this.loaded, this.total, key);
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`[AssetLoader] No se pudo cargar: ${src} (ID: ${key}). Creando fallback.`);
          // Crear un canvas de fallback de color según regla de desarrollo de AGENTS.md
          const fb = document.createElement('canvas');
          fb.width = 200;
          fb.height = 200;
          const ctx = fb.getContext('2d');
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(0, 0, 200, 200);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 20px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(key, 100, 105);
          this.images.set(key, fb);
          this.loaded++;
          if (onProgress) onProgress(this.loaded, this.total, key);
          resolve(fb);
        };
        img.src = src;
      });
    });

    return Promise.all(promises);
  }

  get(id) {
    return this.images.get(id) || null;
  }
}

// ============================================================================
// 3. MATEMÁTICAS Y EASINGS REQUERIDOS POR AGENTS.MD
// ============================================================================
const Easings = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutBack: t => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeOutElastic: t => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ============================================================================
// 4. SISTEMA DE PARTÍCULAS (Pool Reutilizable de Alto Rendimiento)
// ============================================================================
class ParticleSystem {
  constructor(maxParticles = 200) {
    this.pool = [];
    this.activeParticles = [];
    for (let i = 0; i < maxParticles; i++) {
      this.pool.push({
        active: false,
        x: 0, y: 0,
        vx: 0, vy: 0,
        gravity: 0,
        size: 8,
        life: 1,
        maxLife: 1,
        color: '#ffffff',
        alpha: 1,
        type: 'dot', // 'dot', 'bill', 'spark'
        rotation: 0,
        vRot: 0
      });
    }
  }

  spawn(config) {
    const p = this.pool.pop();
    if (!p) return; // Pool agotado temporalmente

    p.active = true;
    p.x = config.x || 0.5;
    p.y = config.y || 0.5;
    p.vx = config.vx || (Math.random() - 0.5) * 0.4;
    p.vy = config.vy || (Math.random() - 0.5) * 0.4;
    p.gravity = config.gravity !== undefined ? config.gravity : 0.2;
    p.size = config.size || 8;
    p.maxLife = config.life || 1.2;
    p.life = p.maxLife;
    p.color = config.color || '#ffffff';
    p.alpha = 1;
    p.type = config.type || 'dot';
    p.rotation = Math.random() * Math.PI * 2;
    p.vRot = (Math.random() - 0.5) * 4;

    this.activeParticles.push(p);
  }

  burst(config) {
    const count = config.count || 20;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      const speed = (config.speed || 0.25) * (0.6 + Math.random() * 0.8);
      this.spawn({
        x: config.x,
        y: config.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: config.gravity,
        size: config.size || (config.type === 'bill' ? 14 : 7),
        life: (config.life || 1.2) * (0.7 + Math.random() * 0.6),
        color: config.color,
        type: config.type || 'dot'
      });
    }
  }

  // Lluvia de billetes para la escena del guiri (S02)
  burstBilletes(x, y) {
    for (let i = 0; i < 28; i++) {
      this.spawn({
        x: x + (Math.random() - 0.5) * 0.1,
        y: y + (Math.random() - 0.5) * 0.1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.4,
        gravity: 0.35,
        size: 16,
        life: 1.5 + Math.random() * 0.8,
        color: '#10b981',
        type: 'bill'
      });
    }
  }

  update(dt) {
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const p = this.activeParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        this.activeParticles.splice(i, 1);
        this.pool.push(p);
        continue;
      }

      p.vy += p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.vRot * dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
    }
  }

  render(ctx, width, height) {
    if (this.activeParticles.length === 0) return;

    ctx.save();
    for (const p of this.activeParticles) {
      const px = p.x * width;
      const py = p.y * height;
      ctx.globalAlpha = p.alpha;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rotation);

      if (p.type === 'bill') {
        // Dibujar billete verde miniatura
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size);
        ctx.fillStyle = '#15803d';
        ctx.fillRect(-p.size * 0.7, -p.size * 0.35, p.size * 1.4, p.size * 0.7);
        ctx.fillStyle = '#dcfce7';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
      } else if (p.type === 'spark') {
        // Chispa dorada
        ctx.fillStyle = p.color || '#facc15';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Partícula básica circular
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  clear() {
    while (this.activeParticles.length > 0) {
      const p = this.activeParticles.pop();
      p.active = false;
      this.pool.push(p);
    }
  }
}

// ============================================================================
// 5. MOTOR DE ANIMACIÓN Y ENTIDADES (AnimationEngine)
// ============================================================================
class Entity {
  constructor(config) {
    this.id = config.id;
    this.imgId = config.img;
    this.x = config.pos ? config.pos[0] : (config.x || 0.5);
    this.y = config.pos ? config.pos[1] : (config.y || 0.5);
    this.baseX = this.x;
    this.baseY = this.y;
    this.scale = config.scale || 0.3;
    this.baseScale = this.scale;
    this.rotation = config.rotation || 0;
    this.alpha = config.alpha !== undefined ? config.alpha : 1;
    this.layer = config.layer || 2; // 0: fondo, 1: decorado, 2: personajes, 3: efectos

    // Interacción
    this.interactivo = !!config.interactivo;
    this.tarjeta = config.tarjeta || null;
    this.hovered = false;

    // Bucles activos (float, pulse, shake)
    this.bucle = config.bucle || null;
    this.tiempoVida = 0;

    // Efectos momentáneos
    this.highlightColor = null;
    this.highlightTimer = 0;
    this.shakeIntensity = 0;
    this.shakeTimer = 0;

    // Cola de tweens: [{ prop, from, to, dur, elapsed, delay, easing, onComplete }]
    this.tweens = [];
  }

  addTween(tween) {
    this.tweens.push({
      prop: tween.prop,
      from: tween.from !== undefined ? tween.from : this[tween.prop],
      to: tween.to,
      dur: tween.dur || 0.5,
      delay: tween.delay || 0,
      elapsed: 0,
      easing: Easings[tween.easing] || Easings.easeInOutCubic,
      onComplete: tween.onComplete || null
    });
  }

  update(dt) {
    this.tiempoVida += dt;

    // 1. Procesar tweens encadenados
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tw = this.tweens[i];
      if (tw.delay > 0) {
        tw.delay -= dt;
        continue;
      }

      tw.elapsed += dt;
      const progress = Math.min(1, tw.elapsed / tw.dur);
      const eased = tw.easing(progress);

      this[tw.prop] = tw.from + (tw.to - tw.from) * eased;

      if (progress >= 1) {
        if (tw.onComplete) tw.onComplete();
        this.tweens.splice(i, 1);
      }
    }

    // 2. Procesar bucles idle (float, pulse)
    if (this.bucle === 'float') {
      // Movimiento sinusoidal suave vertical de personaje
      this.y = this.baseY + Math.sin(this.tiempoVida * 2.5) * 0.012;
    } else if (this.bucle === 'pulse') {
      // Pulso suave ±5%
      this.scale = this.baseScale * (1 + Math.sin(this.tiempoVida * 3) * 0.05);
    } else if (this.bucle === 'shake') {
      this.x = this.baseX + (Math.random() - 0.5) * 0.01;
      this.y = this.baseY + (Math.random() - 0.5) * 0.01;
    }

    // 3. Procesar shake temporal
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
      const intensity = (this.shakeTimer / 0.4) * (this.shakeIntensity / 1280);
      this.x = this.baseX + (Math.random() - 0.5) * intensity * 2;
      this.y = this.baseY + (Math.random() - 0.5) * intensity * 2;
      if (this.shakeTimer <= 0) {
        this.x = this.baseX;
        this.y = this.baseY;
      }
    }

    // 4. Highlight
    if (this.highlightTimer > 0) {
      this.highlightTimer -= dt;
      if (this.highlightTimer <= 0) this.highlightColor = null;
    }
  }

  // Primitivas obligatorias según AGENTS.md
  fadeIn(d = 0.5) {
    this.alpha = 0;
    this.addTween({ prop: 'alpha', from: 0, to: 1, dur: d, easing: 'easeOutQuad' });
  }

  fadeOut(d = 0.5) {
    this.addTween({ prop: 'alpha', from: this.alpha, to: 0, dur: d, easing: 'easeInQuad' });
  }

  popIn(d = 0.45) {
    this.scale = 0.01;
    this.alpha = 1;
    this.addTween({ prop: 'scale', from: 0.01, to: this.baseScale, dur: d, easing: 'easeOutBack' });
  }

  popOut(d = 0.35) {
    this.addTween({ prop: 'scale', from: this.scale, to: 0.01, dur: d, easing: 'easeInQuad' });
  }

  moveTo(targetX, targetY, d = 0.8, easing = 'easeInOutCubic', onComplete = null) {
    this.baseX = targetX;
    this.baseY = targetY;
    this.addTween({ prop: 'x', to: targetX, dur: d, easing: easing, onComplete: onComplete });
    this.addTween({ prop: 'y', to: targetY, dur: d, easing: easing });
  }

  slideFrom(dir = 'bottom', d = 0.8, easing = 'easeOutCubic') {
    this.alpha = 1;
    if (dir === 'bottom') {
      this.y = 1.3;
      this.addTween({ prop: 'y', from: 1.3, to: this.baseY, dur: d, easing: easing });
    } else if (dir === 'top') {
      this.y = -0.3;
      this.addTween({ prop: 'y', from: -0.3, to: this.baseY, dur: d, easing: easing });
    } else if (dir === 'left') {
      this.x = -0.3;
      this.addTween({ prop: 'x', from: -0.3, to: this.baseX, dur: d, easing: easing });
    } else if (dir === 'right') {
      this.x = 1.3;
      this.addTween({ prop: 'x', from: 1.3, to: this.baseX, dur: d, easing: easing });
    }
  }

  shake(intensidad = 8) {
    this.shakeIntensity = intensidad;
    this.shakeTimer = 0.4;
  }

  pulse() {
    this.bucle = 'pulse';
  }

  highlight(color = '#fde047', duration = 1.5) {
    this.highlightColor = color;
    this.highlightTimer = duration;
  }

  crossfadeIn(d = 0.8) {
    this.alpha = 0;
    this.addTween({ prop: 'alpha', from: 0, to: 1, dur: d, easing: 'easeOutQuad' });
  }

  // Hit test en coordenadas fraccionales 0-1
  containsPoint(px, py) {
    const bbox = window.DATA.ASSET_BBOXES && window.DATA.ASSET_BBOXES[this.imgId];
    let drawW, drawH;
    if (bbox) {
      const [, , sw, sh] = bbox;
      drawH = 720 * this.scale;
      drawW = drawH * (sw / sh);
    } else {
      drawW = 1280 * this.scale;
      drawH = 720 * this.scale;
    }
    const halfW = (drawW / 2) / 1280;
    const halfH = (drawH / 2) / 720;
    return (
      px >= this.x - halfW &&
      px <= this.x + halfW &&
      py >= this.y - halfH &&
      py <= this.y + halfH
    );
  }
}

// ============================================================================
// 6. GESTOR DE ESCENAS Y CONTROLADOR PRINCIPAL (SceneManager)
// ============================================================================
class SceneManager {
  constructor(canvas, assets, audio) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;
    this.audio = audio;
    this.particles = new ParticleSystem();

    // Escena y estado
    this.escenas = window.DATA.ESCENAS;
    this.escenaActual = null;
    this.indiceEscena = 0;
    this.entidades = [];
    this.tiempoEscena = 0;
    this.debugMode = new URLSearchParams(window.location.search).get('debug') === '1';

    // Cámara (pan y zoom)
    this.camera = {
      x: 0.5,
      y: 0.5,
      zoom: 1.0,
      targetZoom: 1.0,
      zoomDur: 0,
      zoomElapsed: 0,
      shakeIntensity: 0,
      shakeTimer: 0
    };

    // Fondo actual y fondo en transición (crossfade)
    this.fondoActual = null;
    this.fondoPrevio = null;
    this.crossfadeAlpha = 1;
    this.crossfadeDur = 0;
    this.crossfadeElapsed = 0;

    // Controlador de narración
    this.narracionLineas = [];
    this.pasoNarracion = 0;
    this.textoCompleto = '';
    this.textoMostrado = '';
    this.typewriterIndex = 0;
    this.typewriterVel = 35; // Caracteres por segundo (~35 cps según AGENTS.md)
    this.typewriterTimer = 0;
    this.lineaCompletada = false;

    // Checklist persistente
    this.checklist = JSON.parse(localStorage.getItem('inmuno_checklist') || '{}');

    // Inicializar listeners UI
    this.initUI();
  }

  initUI() {
    this.ui = {
      narrationBox: document.getElementById('narration-box'),
      narrationText: document.getElementById('narration-text'),
      speakerTag: document.getElementById('speaker-tag'),
      narrationPrompt: document.getElementById('narration-prompt'),
      skipBtn: document.getElementById('skip-scene-btn'),
      titleScreenUI: document.getElementById('title-screen-ui'),
      btnStart: document.getElementById('btn-start'),
      btnContinue: document.getElementById('btn-continue'),
      cardModal: document.getElementById('card-modal'),
      cardTitle: document.getElementById('card-title'),
      cardIcon: document.getElementById('card-icon-img'),
      cardDesc: document.getElementById('card-description'),
      cardClose: document.getElementById('card-close-btn'),
      checklistModal: document.getElementById('checklist-modal'),
      checklistBtn: document.getElementById('checklist-btn'),
      checklistClose: document.getElementById('checklist-close-btn'),
      checklistGrid: document.getElementById('checklist-items-grid'),
      checklistCounter: document.getElementById('checklist-counter'),
      soundBtn: document.getElementById('sound-btn'),
      soundIcon: document.getElementById('sound-icon'),
      debugHud: document.getElementById('debug-hud')
    };

    if (this.debugMode && this.ui.debugHud) {
      this.ui.debugHud.classList.add('visible');
    }

    // Clic en la caja de narración: completar o avanzar
    this.ui.narrationBox.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      this.audio.playClick();
      this.onNarrationBoxClick();
    });

    // Saltar escena / animación
    this.ui.skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.audio.playClick();
      this.skipScene();
    });

    // Botones de portada
    this.ui.btnStart.addEventListener('click', () => {
      this.audio.playClick();
      this.cargarEscenaPorIndice(1); // Pasar a S01
    });

    this.ui.btnContinue.addEventListener('click', () => {
      this.audio.playClick();
      const guardada = parseInt(localStorage.getItem('inmuno_escena_guardada') || '1', 10);
      this.cargarEscenaPorIndice(guardada);
    });

    // Tarjetas informativas
    this.ui.cardClose.addEventListener('click', () => this.cerrarTarjeta());
    this.ui.cardModal.addEventListener('pointerdown', (e) => {
      if (e.target === this.ui.cardModal) this.cerrarTarjeta();
    });

    // Checklist modal
    this.ui.checklistBtn.addEventListener('click', () => this.abrirChecklist());
    this.ui.checklistClose.addEventListener('click', () => this.cerrarChecklist());
    this.ui.checklistModal.addEventListener('pointerdown', (e) => {
      if (e.target === this.ui.checklistModal) this.cerrarChecklist();
    });

    // Sonido mute toggle
    this.ui.soundBtn.addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      this.ui.soundIcon.textContent = isMuted ? '🔇' : '🔊';
    });
    this.ui.soundIcon.textContent = this.audio.muted ? '🔇' : '🔊';

    this.renderChecklistGrid();
  }

  // Comprueba si hay una partida guardada previa
  checkPartidaGuardada() {
    const saved = localStorage.getItem('inmuno_escena_guardada');
    if (saved && parseInt(saved, 10) > 0) {
      this.ui.btnContinue.style.display = 'inline-flex';
    }
  }

  // Carga y configura una escena por su ID o índice
  cargarEscenaPorIndice(idx) {
    if (idx < 0 || idx >= this.escenas.length) return;
    this.indiceEscena = idx;
    const def = this.escenas[idx];
    this.cargarEscena(def);
  }

  cargarEscena(def) {
    this.escenaActual = def;
    this.tiempoEscena = 0;
    this.entidades = [];
    this.particles.clear();

    // Guardar progreso en localStorage
    if (def.id !== 'S00') {
      localStorage.setItem('inmuno_escena_guardada', this.indiceEscena);
    }

    // Configurar cámara
    this.camera.x = 0.5;
    this.camera.y = 0.5;
    this.camera.zoom = 1.0;
    this.camera.targetZoom = 1.0;

    // Configurar fondo
    this.fondoPrevio = this.fondoActual;
    this.fondoActual = this.assets.get(def.fondo);
    this.crossfadeAlpha = 1;

    // Transición de fondo (p. ej. slideFrom(bottom, 1.2, easeOutCubic) en S01)
    this.fondoOffsetY = 0;
    this.fondoSlideDuration = 0;
    this.fondoSlideElapsed = 0;
    if (def.fondoTransicion && def.fondoTransicion.entra) {
      if (def.fondoTransicion.entra.includes('bottom')) {
        this.fondoOffsetY = 1.0;
        this.fondoSlideDuration = 1.2;
      }
    }

    // Configurar etapa en la barra de navegación superior
    this.actualizarEtapas(def.etapa);

    // Configurar portada o narración
    if (def.interaccion.tipo === 'portada') {
      this.ui.titleScreenUI.style.display = 'flex';
      this.checkPartidaGuardada();
    } else {
      this.ui.titleScreenUI.style.display = 'none';
    }

    // Instanciar entidades de la escena
    if (def.elementos) {
      for (const elConfig of def.elementos) {
        const ent = new Entity(elConfig);
        if (elConfig.entra) {
          this.aplicarEfectoEntrada(ent, elConfig.entra);
        }
        this.entidades.push(ent);
      }
    }

    // Inicializar narración
    this.narracionLineas = def.narracion || [];
    this.pasoNarracion = 0;
    this.iniciarLineaNarracion();

    // Actualizar debug
    const dbgScene = document.getElementById('debug-scene');
    if (dbgScene) dbgScene.textContent = `${def.id} (${def.titulo})`;
  }

  aplicarEfectoEntrada(ent, efectoStr) {
    if (efectoStr.startsWith('fadeIn')) {
      const match = efectoStr.match(/\(([\d\.]+)\)/);
      ent.fadeIn(match ? parseFloat(match[1]) : 0.5);
    } else if (efectoStr === 'popIn') {
      ent.popIn(0.45);
    } else if (efectoStr.startsWith('slideFrom')) {
      const parts = efectoStr.replace('slideFrom(', '').replace(')', '').split(',');
      const dir = parts[0].trim();
      const dur = parts[1] ? parseFloat(parts[1].trim()) : 0.8;
      ent.slideFrom(dir, dur);
    } else if (efectoStr.startsWith('zoomIn')) {
      ent.popIn(0.6);
    }
  }

  actualizarEtapas(etapaNum) {
    const pills = document.querySelectorAll('.stage-pill');
    pills.forEach(pill => {
      const stage = parseInt(pill.getAttribute('data-stage'), 10);
      pill.classList.remove('active', 'completed');
      if (stage < etapaNum) {
        pill.classList.add('completed');
      } else if (stage === etapaNum) {
        pill.classList.add('active');
      }
    });
  }

  iniciarLineaNarracion() {
    if (this.pasoNarracion < this.narracionLineas.length) {
      this.textoCompleto = this.narracionLineas[this.pasoNarracion];
      this.textoMostrado = '';
      this.typewriterIndex = 0;
      this.typewriterTimer = 0;
      this.lineaCompletada = false;
      this.ui.narrationPrompt.style.opacity = '0';
      this.ejecutarEventosTimeline(this.pasoNarracion);
    } else {
      // Líneas agotadas para esta escena
      this.onEscenaNarracionCompleta();
    }
  }

  onNarrationBoxClick() {
    if (!this.lineaCompletada) {
      // Clic 1: completar texto inmediatamente
      this.textoMostrado = this.textoCompleto;
      this.ui.narrationText.textContent = this.textoMostrado;
      this.lineaCompletada = true;
      this.ui.narrationPrompt.style.opacity = '1';
    } else {
      // Clic 2: avanzar a la siguiente línea
      this.pasoNarracion++;
      if (this.pasoNarracion < this.narracionLineas.length) {
        this.iniciarLineaNarracion();
      } else {
        this.avanzarSiguienteEscena();
      }
    }
  }

  ejecutarEventosTimeline(paso) {
    if (!this.escenaActual || !this.escenaActual.timeline) return;

    for (const evento of this.escenaActual.timeline) {
      if (evento.paso === undefined || evento.paso === paso) {
        const retraso = (evento.t || 0) * 1000;
        setTimeout(() => {
          this.ejecutarAccion(evento.accion);
        }, retraso);
      }
    }
  }

  ejecutarAccion(accion) {
    if (!accion) return;

    if (accion === 'burstBilletes') {
      const guiri = this.entidades.find(e => e.id === 'guiri');
      const gx = guiri ? guiri.x : 0.65;
      const gy = guiri ? guiri.y : 0.55;
      this.particles.burstBilletes(gx, gy);
      this.audio.playMoneyChime();
    } else if (accion.startsWith('camera.zoomIn')) {
      const match = accion.match(/\(([\d\.]+)(?:,\s*([\d\.]+))?\)/);
      const zoom = match ? parseFloat(match[1]) : 1.3;
      const dur = match && match[2] ? parseFloat(match[2]) : 1.5;
      this.zoomCamera(zoom, dur);
    } else if (accion.includes('.')) {
      const [entId, metodo] = accion.split('.');
      const ent = this.entidades.find(e => e.id === entId);
      if (ent && typeof ent[metodo] === 'function') {
        ent[metodo]();
      }
    }
  }

  zoomCamera(targetZoom, duration = 1.0) {
    this.camera.targetZoom = targetZoom;
    this.camera.zoomDur = duration;
    this.camera.zoomElapsed = 0;
  }

  onEscenaNarracionCompleta() {
    this.lineaCompletada = true;
    this.ui.narrationPrompt.textContent = '▼ Clic para pasar a la siguiente escena';
    this.ui.narrationPrompt.style.opacity = '1';
  }

  avanzarSiguienteEscena() {
    if (this.indiceEscena < this.escenas.length - 1) {
      this.cargarEscenaPorIndice(this.indiceEscena + 1);
    }
  }

  skipScene() {
    // Si la línea actual no está terminada, terminarla
    if (!this.lineaCompletada) {
      this.textoMostrado = this.textoCompleto;
      this.ui.narrationText.textContent = this.textoMostrado;
      this.lineaCompletada = true;
    } else {
      this.avanzarSiguienteEscena();
    }
  }

  // ==========================================================================
  // TARJETAS Y CHECKLIST EDUCATIVO
  // ==========================================================================
  abrirTarjeta(tarjetaKey) {
    const cardData = window.DATA.TARJETAS[tarjetaKey];
    if (!cardData) return;

    this.audio.playCardOpen();
    this.ui.cardTitle.textContent = cardData.titulo;
    this.ui.cardDesc.textContent = cardData.texto;

    // Cargar icono desde el manifiesto (recortado con su bbox)
    const iconAsset = this.assets.get(cardData.assetIcon);
    if (iconAsset) {
      const bbox = window.DATA.ASSET_BBOXES && window.DATA.ASSET_BBOXES[cardData.assetIcon];
      if (bbox) {
        const [sx, sy, sw, sh] = bbox;
        const c = document.createElement('canvas');
        c.width = sw;
        c.height = sh;
        c.getContext('2d').drawImage(iconAsset, sx, sy, sw, sh, 0, 0, sw, sh);
        this.ui.cardIcon.src = c.toDataURL();
      } else {
        this.ui.cardIcon.src = iconAsset.src;
      }
    }

    // Registrar en checklist
    if (cardData.checklistId) {
      this.marcarChecklist(cardData.checklistId);
    }

    this.ui.cardModal.classList.add('open');
  }

  cerrarTarjeta() {
    this.audio.playClick();
    this.ui.cardModal.classList.remove('open');
  }

  marcarChecklist(id) {
    if (!this.checklist[id]) {
      this.checklist[id] = true;
      localStorage.setItem('inmuno_checklist', JSON.stringify(this.checklist));
      this.renderChecklistGrid();
    }
  }

  renderChecklistGrid() {
    const items = window.DATA.CHECKLIST_ITEMS;
    let checkedCount = 0;
    this.ui.checklistGrid.innerHTML = '';

    for (const item of items) {
      const isChecked = !!this.checklist[item.id];
      if (isChecked) checkedCount++;

      const el = document.createElement('div');
      el.className = `checklist-item ${isChecked ? 'checked' : ''}`;
      el.innerHTML = `
        <div class="checkbox-icon">${isChecked ? '✔' : ''}</div>
        <span>${item.nombre}</span>
      `;
      this.ui.checklistGrid.appendChild(el);
    }

    this.ui.checklistCounter.textContent = `${checkedCount}/${items.length}`;
  }

  abrirChecklist() {
    this.audio.playClick();
    this.renderChecklistGrid();
    this.ui.checklistModal.classList.add('open');
  }

  cerrarChecklist() {
    this.audio.playClick();
    this.ui.checklistModal.classList.remove('open');
  }

  // ==========================================================================
  // BUCLE DE ACTUALIZACIÓN Y RENDERIZADO (DELTA TIME)
  // ==========================================================================
  update(dt) {
    this.tiempoEscena += dt;

    // Actualizar máquina de escribir
    if (!this.lineaCompletada && this.textoCompleto) {
      this.typewriterTimer += dt;
      const charsToAdd = Math.floor(this.typewriterTimer * this.typewriterVel);
      if (charsToAdd > 0) {
        this.typewriterTimer -= charsToAdd / this.typewriterVel;
        this.typewriterIndex = Math.min(this.textoCompleto.length, this.typewriterIndex + charsToAdd);
        this.textoMostrado = this.textoCompleto.substring(0, this.typewriterIndex);
        this.ui.narrationText.textContent = this.textoMostrado;

        // Sonido sutil cada 2 caracteres
        if (this.typewriterIndex % 2 === 0) {
          this.audio.playTypeTick();
        }

        if (this.typewriterIndex >= this.textoCompleto.length) {
          this.lineaCompletada = true;
          this.ui.narrationPrompt.style.opacity = '1';
        }
      }
    }

    // Actualizar cámara
    if (this.camera.zoomDur > 0 && this.camera.zoomElapsed < this.camera.zoomDur) {
      this.camera.zoomElapsed += dt;
      const progress = Math.min(1, this.camera.zoomElapsed / this.camera.zoomDur);
      const eased = Easings.easeInOutCubic(progress);
      this.camera.zoom = 1.0 + (this.camera.targetZoom - 1.0) * eased;
    }

    // Transición de fondo (desplazamiento vertical p. ej. S01)
    if (this.fondoSlideDuration > 0) {
      if (this.fondoSlideElapsed < this.fondoSlideDuration) {
        this.fondoSlideElapsed += dt;
        const progress = Math.min(1, this.fondoSlideElapsed / this.fondoSlideDuration);
        this.fondoOffsetY = 1.0 - Easings.easeOutCubic(progress);
      } else {
        this.fondoOffsetY = 0;
      }
    }

    // Actualizar entidades
    for (const ent of this.entidades) {
      ent.update(dt);
    }

    // Actualizar partículas
    this.particles.update(dt);

    // Actualizar debug
    if (this.debugMode) {
      const dbgEnt = document.getElementById('debug-entities');
      if (dbgEnt) dbgEnt.textContent = `${this.entidades.length} ent | ${this.particles.activeParticles.length} part`;
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, w, h);

    // Aplicar transformación de cámara
    ctx.save();
    ctx.translate(w * this.camera.x, h * this.camera.y);
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-w * this.camera.x, -h * this.camera.y);

    // 1. Capa Fondo
    if (this.fondoActual) {
      const fy = this.fondoOffsetY * h;
      ctx.drawImage(this.fondoActual, 0, fy, w, h);
    }

    // 2. Capa Entidades (ordenadas por layer)
    const ordenadas = [...this.entidades].sort((a, b) => a.layer - b.layer);
    for (const ent of ordenadas) {
      const img = this.assets.get(ent.imgId);
      if (!img) continue;

      ctx.save();
      ctx.globalAlpha = ent.alpha;

      const px = ent.x * w;
      const py = ent.y * h;
      const bbox = window.DATA.ASSET_BBOXES && window.DATA.ASSET_BBOXES[ent.imgId];
      let drawW, drawH;

      ctx.translate(px, py);
      if (ent.rotation !== 0) ctx.rotate(ent.rotation);

      // Efecto Highlight si está activo
      if (ent.highlightColor) {
        ctx.shadowColor = ent.highlightColor;
        ctx.shadowBlur = 30;
      }

      if (bbox) {
        const [sx, sy, sw, sh] = bbox;
        drawH = 720 * ent.scale;
        drawW = drawH * (sw / sh);
        ctx.drawImage(img, sx, sy, sw, sh, -drawW / 2, -drawH / 2, drawW, drawH);
      } else {
        drawW = 1280 * ent.scale;
        drawH = 720 * ent.scale;
        ctx.drawImage(img, 0, 0, img.width, img.height, -drawW / 2, -drawH / 2, drawW, drawH);
      }

      // Si estamos en debug, dibujar hitboxes y IDs
      if (this.debugMode) {
        ctx.strokeStyle = ent.interactivo ? '#38bdf8' : '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(-drawW / 2, -drawH / 2, drawW, drawH);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px monospace';
        ctx.fillText(`${ent.id} (${ent.imgId})`, -drawW / 2, -drawH / 2 - 6);
      }

      ctx.restore();
    }

    // 3. Capa Efectos y Partículas
    this.particles.render(ctx, w, h);

    ctx.restore();
  }

  // Gestión de clics sobre entidades interactivas en el canvas
  handleCanvasClick(logicalX, logicalY) {
    const fracX = logicalX / this.canvas.width;
    const fracY = logicalY / this.canvas.height;

    // Buscar si se clicó alguna entidad interactiva (de arriba hacia abajo)
    for (let i = this.entidades.length - 1; i >= 0; i--) {
      const ent = this.entidades[i];
      if (!ent.interactivo) continue;

      if (ent.containsPoint(fracX, fracY)) {
        if (ent.tarjeta) {
          this.abrirTarjeta(ent.tarjeta);
          return true;
        }
      }
    }
    return false;
  }
}

// Exportación global
window.AudioSystem = AudioSystem;
window.AssetLoader = AssetLoader;
window.ParticleSystem = ParticleSystem;
window.Entity = Entity;
window.SceneManager = SceneManager;
