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
    this.bgA = document.getElementById('stage-hero-bg-a') || document.getElementById('stage-hero-bg');
    this.bgB = document.getElementById('stage-hero-bg-b');
    this.bgOverlay = document.getElementById('stage-hero-bg-overlay');
    this.stageBg = this.bgA;
    this.stageChars = document.getElementById('stage-characters-layer');
    this.stageDecorations = document.getElementById('stage-decorations-layer');
    this.stageParticles = document.getElementById('stage-particles-layer');
    this.btnBackToPanel = document.getElementById('btn-back-to-panel');
    this.activeBg = 'A';
    this.currentBgAsset = null;

    this.narrationBox = document.getElementById('pizarra-narration-box');
    this.speakerTag = document.getElementById('narration-speaker');
    this.narrTextEl = document.getElementById('narration-text');
    this.narrCounter = document.getElementById('narration-counter');
    this.btnPrev = document.getElementById('btn-narr-prev');
    this.btnContinue = document.getElementById('btn-narr-continue');

    // Estado
    this.currentStationIndex = 0;
    this.visitedStations = new Set();
    this.shownChapterIntros = new Set();

    // Mecanografiado de narración
    this.currentLineIndex = 0;
    this.isTyping = false;
    this.typewriterTimer = null;
    this.currentFullLine = '';
    this.calloutTimer = null;

    // Estado de la introducción
    this.introTyping = false;

    // Audio WebAudio
    this.soundEnabled = true;
    this.audioCtx = null;

    this.init();
  }

  init() {
    if (window.location.hash) {
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }
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
    const textoCompleto = "Hola, profe, esta es mi infografía/novela visual del aparato inmunitario.\n\nVes recorriendo los capítulos para descubrir la historia completa.";
    this.introTextEl.textContent = '';
    this.introTyping = true;
    let i = 0;
    const velocidad = 30;

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
    if (!this.connectingPath) return;
    if (!this.cards || this.cards.length < 2) {
      this.connectingPath.setAttribute('d', '');
      return;
    }

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
    const midY = (pts[3].y + pts[4].y) / 2 + 10;
    const cp1x = pts[3].x + 70;
    const cp2x = pts[4].x - 70;
    d += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${pts[4].x} ${pts[4].y}`;

    // Fila inferior: 5 -> 6 -> 7
    d += ` L ${pts[5].x} ${pts[5].y}`;
    d += ` L ${pts[6].x} ${pts[6].y}`;

    this.connectingPath.setAttribute('d', d);
  }

  // =========================================================================
  // 2. ABRIR Y CARGAR ESCENA DE UN PUNTO
  // =========================================================================

  abrirPunto(index, pushHistory = true) {
    const data = window.PIZARRA_DATA;
    if (index < 0 || index >= data.ESTACIONES.length) return;

    this.currentStationIndex = index;
    this.visitedStations.add(index);
    this.guardarProgreso();

    const est = data.ESTACIONES[index];

    const enterScene = () => {
      this.reproducirSonido('whoosh_in');

      // Limpiar decorados, partículas y overlay previos
      this.currentBgAsset = null;
      if (this.stageParticles) this.stageParticles.innerHTML = '';
      if (this.stageDecorations) this.stageDecorations.innerHTML = '';
      this.setOverlay(null);

      // Iniciar narración en el primer paso (mostrarLineaNarracion cargará fondo y personajes dinámicos)
      this.currentLineIndex = 0;
      this.zoomedOverlay.classList.add('active');
      this.mostrarLineaNarracion(0);
      this.actualizarUI();

      // Sincronizar con el historial del navegador para soporte de flecha atrás y botón de ratón
      if (pushHistory) {
        try {
          history.pushState({ inScene: true, stationIndex: index }, '', '#punto-' + (index + 1));
        } catch (err) {
          console.warn('history.pushState no disponible:', err);
        }
      }
    };

    // Si es la primera vez que entra a este capítulo, mostrar título en grande con efecto máquina de escribir
    if (!this.shownChapterIntros.has(index)) {
      this.shownChapterIntros.add(index);
      this.guardarProgreso();
      this.mostrarChapterIntro(index, enterScene);
    } else {
      enterScene();
    }
  }

  mostrarChapterIntro(index, onComplete) {
    const est = window.PIZARRA_DATA.ESTACIONES[index];
    const text = est.titulo || "Recorrido: El Sistema Inmunitario";
    const screen = document.getElementById('chapter-intro-screen');
    const textEl = document.getElementById('chapter-intro-text');
    const promptEl = document.getElementById('chapter-intro-prompt');

    if (!screen || !textEl) {
      onComplete();
      return;
    }

    screen.style.display = 'flex';
    screen.classList.remove('fade-out');
    textEl.textContent = '';
    if (promptEl) promptEl.classList.remove('visible');

    let i = 0;
    let isTyping = true;
    const timer = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        isTyping = false;
        if (promptEl) promptEl.classList.add('visible');
      }
    }, 28);

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      if (isTyping) {
        clearInterval(timer);
        textEl.textContent = text;
        isTyping = false;
        if (promptEl) promptEl.classList.add('visible');
        return;
      }
      dismissed = true;
      screen.classList.add('fade-out');
      setTimeout(() => {
        screen.style.display = 'none';
        screen.removeEventListener('click', dismiss);
        window.removeEventListener('keydown', keyDismiss);
        onComplete();
      }, 450);
    };

    const keyDismiss = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        dismiss();
      }
    };

    screen.addEventListener('click', dismiss);
    window.addEventListener('keydown', keyDismiss);
  }

  cerrarEscena(triggerHistory = false) {
    if (!this.zoomedOverlay.classList.contains('active')) return;

    if (this.calloutTimer) {
      clearTimeout(this.calloutTimer);
      this.calloutTimer = null;
    }

    this.reproducirSonido('whoosh_out');
    this.zoomedOverlay.classList.remove('active');
    this.setOverlay(null);
    if (this.stageParticles) this.stageParticles.innerHTML = '';
    if (this.stageDecorations) this.stageDecorations.innerHTML = '';
    this.cerrarFichaPersonaje();
    this.actualizarUI();
    this.actualizarLineaConectora();

    // Si se cerró por botón o teclado/ratón, volver atrás en el historial si hay hash
    if (triggerHistory && window.location.hash) {
      try {
        history.back();
      } catch (err) {
        if (window.location.hash) history.replaceState(null, '', window.location.pathname);
      }
    }
  }

  // =========================================================================
  // DINAMISMO BIOLÓGICO: FONDOS, OVERLAYS, DECORADOS Y PARTÍCULAS
  // =========================================================================

  cambiarFondo(assetId, animClass = null) {
    if (!assetId) return;
    const data = window.PIZARRA_DATA;
    const src = data.ASSETS[assetId];
    if (!src) return;

    if (this.currentBgAsset === assetId) {
      if (animClass) {
        const activeEl = this.activeBg === 'A' ? this.bgA : this.bgB;
        if (activeEl) {
          activeEl.classList.remove(animClass);
          void activeEl.offsetWidth;
          activeEl.classList.add(animClass);
        }
      }
      return;
    }

    this.currentBgAsset = assetId;

    if (this.bgA && this.bgB) {
      const nextTarget = this.activeBg === 'A' ? this.bgB : this.bgA;
      const currentTarget = this.activeBg === 'A' ? this.bgA : this.bgB;

      nextTarget.src = src;
      const applyActive = () => {
        nextTarget.className = 'stage-hero-background active' + (animClass ? ' ' + animClass : '');
        currentTarget.className = 'stage-hero-background';
        this.activeBg = this.activeBg === 'A' ? 'B' : 'A';
        this.stageBg = nextTarget;
      };

      if (nextTarget.complete && nextTarget.naturalWidth > 0) {
        applyActive();
      } else {
        nextTarget.onload = applyActive;
      }
    } else if (this.stageBg) {
      this.stageBg.src = src;
      this.stageBg.className = 'stage-hero-background active' + (animClass ? ' ' + animClass : '');
    }
  }

  setOverlay(overlayAssetId) {
    if (!this.bgOverlay) return;
    if (overlayAssetId && window.PIZARRA_DATA.ASSETS[overlayAssetId]) {
      this.bgOverlay.src = window.PIZARRA_DATA.ASSETS[overlayAssetId];
      this.bgOverlay.classList.add('visible');
    } else {
      this.bgOverlay.classList.remove('visible');
    }
  }

  aplicarShakeStage() {
    if (!this.zoomedOverlay) return;
    this.zoomedOverlay.classList.remove('stage-shake');
    void this.zoomedOverlay.offsetWidth;
    this.zoomedOverlay.classList.add('stage-shake');
  }

  crearParticulas(burstConfig) {
    if (!burstConfig || !this.stageParticles) return;
    const x = (burstConfig.x || 0.5) * 100;
    const y = (burstConfig.y || 0.5) * 100;
    const count = burstConfig.tipo === 'gold' ? 22 : 16;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'stage-particle';
      p.style.left = `${x}%`;
      p.style.top = `${y}%`;

      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const dist = 30 + Math.random() * (burstConfig.tipo === 'gold' ? 90 : 65);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);

      if (burstConfig.tipo === 'gold') {
        p.style.width = '10px';
        p.style.height = '10px';
        p.style.backgroundColor = '#fbbf24';
        p.style.boxShadow = '0 0 10px #f59e0b';
      } else if (burstConfig.tipo === 'aerosol') {
        p.style.width = '6px';
        p.style.height = '6px';
        p.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        p.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
      } else {
        p.style.width = '8px';
        p.style.height = '8px';
        p.style.backgroundColor = '#38bdf8';
        p.style.boxShadow = '0 0 8px rgba(56, 189, 248, 0.8)';
      }

      this.stageParticles.appendChild(p);
      setTimeout(() => p.remove(), 850);
    }
    this.reproducirSonido('pop');
  }

  renderizarDecorados(decoradoTipo) {
    if (!this.stageDecorations) return;
    this.stageDecorations.innerHTML = '';
    if (!decoradoTipo) return;

    if (decoradoTipo === 'dos_caminos') {
      const banner = document.createElement('div');
      banner.className = 'two-paths-banner';
      banner.innerHTML = `
        <div class="path-badge innata">
          <div class="path-title">Respuesta Innata</div>
          <div class="path-desc">Rápida · Inespecífica · Inmediata desde el nacimiento</div>
        </div>
        <div class="path-badge adaptativa">
          <div class="path-title">Respuesta Adaptativa</div>
          <div class="path-desc">Específica · Más eficaz · Genera memoria duradera</div>
        </div>
      `;
      this.stageDecorations.appendChild(banner);
    } else if (decoradoTipo === 'barreras') {
      const pills = document.createElement('div');
      pills.className = 'barriers-pill-row';
      pills.innerHTML = `
        <div class="barrier-pill"><span>🛡️</span> Piel y Queratina</div>
        <div class="barrier-pill"><span>💧</span> Cilios y Mucosas</div>
        <div class="barrier-pill"><span>🦠</span> Microbiota Comensal</div>
      `;
      this.stageDecorations.appendChild(pills);
    } else if (decoradoTipo === 'linajes') {
      const banner = document.createElement('div');
      banner.className = 'two-paths-banner';
      banner.innerHTML = `
        <div class="path-badge mieloide">
          <div class="path-title">Progenitor Mieloide</div>
          <div class="path-desc">Inmunidad Innata · Granulocitos, Monocitos/Macrófagos y Dendríticas</div>
        </div>
        <div class="path-badge linfoide">
          <div class="path-title">Progenitor Linfoide</div>
          <div class="path-desc">Inmunidad Adaptativa (Linfocitos B y T) + Células NK (Innata)</div>
        </div>
      `;
      this.stageDecorations.appendChild(banner);
    } else if (decoradoTipo === 'vias_complemento') {
      const banner = document.createElement('div');
      banner.className = 'two-paths-banner';
      banner.innerHTML = `
        <div class="path-badge clasica">
          <div class="path-title">Vía Clásica</div>
          <div class="path-desc">Activada por complejos Anticuerpo–Antígeno</div>
        </div>
        <div class="path-badge alterna">
          <div class="path-title">Vía Alterna</div>
          <div class="path-desc">Directamente sobre la superficie del microorganismo</div>
        </div>
        <div class="path-badge lectinas">
          <div class="path-title">Vía Lectinas</div>
          <div class="path-desc">Reconocimiento de manosa y azúcares patógenos</div>
        </div>
      `;
      this.stageDecorations.appendChild(banner);
    } else if (decoradoTipo === 'resumen_final') {
      const banner = document.createElement('div');
      banner.className = 'timeline-summary-banner';
      banner.innerHTML = `
        <div class="timeline-step-chip">1. Entrada</div>
        <div class="timeline-step-chip">2. Innata</div>
        <div class="timeline-step-chip">3. Presentación</div>
        <div class="timeline-step-chip">4. Adaptativa</div>
        <div class="timeline-step-chip">5. Eliminación</div>
        <div class="timeline-step-chip active">6. Memoria ✔</div>
      `;
      this.stageDecorations.appendChild(banner);
    }
  }

  renderizarCallout(config) {
    if (!config || !this.stageDecorations) return;
    const prev = this.stageDecorations.querySelector('.character-spotlight-callout');
    if (prev) prev.remove();

    const calloutEl = document.createElement('div');
    calloutEl.className = 'character-spotlight-callout';
    calloutEl.style.left = `${(config.x || 0.38) * 100}%`;
    calloutEl.style.top = `${(config.y || 0.44) * 100}%`;

    const arrowDir = config.flechaDir || 'up';
    let arrowHtml = '';
    if (arrowDir === 'up') {
      calloutEl.classList.add('dir-up');
      arrowHtml = `
        <div class="callout-arrow dir-up">
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
            <path d="M15 26 V6" stroke="#facc15" stroke-width="4.5" stroke-linecap="round"/>
            <polygon points="6,9 15,2 24,9" fill="#facc15"/>
          </svg>
        </div>
      `;
      calloutEl.innerHTML = `
        ${arrowHtml}
        <div class="callout-bubble">
          <span class="callout-title">${config.texto}</span>
        </div>
      `;
    } else if (arrowDir === 'right') {
      calloutEl.classList.add('dir-right');
      arrowHtml = `
        <div class="callout-arrow dir-right">
          <svg width="68" height="28" viewBox="0 0 68 28" fill="none">
            <path d="M4 14 H52" stroke="#facc15" stroke-width="4.5" stroke-linecap="round"/>
            <polygon points="50,5 66,14 50,23" fill="#facc15"/>
          </svg>
        </div>
      `;
      calloutEl.innerHTML = `
        <div class="callout-bubble">
          <span class="callout-title">${config.texto}</span>
        </div>
        ${arrowHtml}
      `;
    } else {
      calloutEl.innerHTML = `
        <div class="callout-bubble">
          <span class="callout-title">${config.texto}</span>
        </div>
      `;
    }

    this.stageDecorations.appendChild(calloutEl);
    this.reproducirSonido('chime');
  }

  renderizarPersonajesPaso(personajes, est) {
    if (!this.stageChars) return;
    this.stageChars.innerHTML = '';
    if (!personajes || personajes.length === 0) return;

    const data = window.PIZARRA_DATA;
    personajes.forEach(p => {
      const charEl = document.createElement('div');
      charEl.className = 'stage-character-item';
      charEl.style.left = `${p.x * 100}%`;
      charEl.style.top = `${p.y * 100}%`;

      // Capa de movimiento de entrada independiente
      const motionEl = document.createElement('div');
      const enterCls = p.entra ? `anim-enter-${p.entra}` : '';
      const shakeCls = p.shake ? 'char-shaking' : '';
      motionEl.className = `stage-character-motion ${enterCls} ${shakeCls}`.trim();

      // Capa de animación continua (idle)
      const innerEl = document.createElement('div');
      const animCls = p.anim ? `anim-${p.anim}` : 'anim-float';
      innerEl.className = `stage-character-inner ${animCls}`;

      const imgSrc = data.ASSETS[p.img];
      const imgEl = document.createElement('img');
      imgEl.src = imgSrc;
      imgEl.alt = p.nombre;

      // Aplicar multiplicador de escala si está definido (ej. 1.25)
      let scaleMult = 1;
      if (typeof p.scale === 'number' && p.scale >= 0.5) {
        scaleMult = p.scale;
      }
      if (scaleMult !== 1) {
        imgEl.style.height = `clamp(${Math.round(220 * scaleMult)}px, ${Math.round(30 * scaleMult)}vh, ${Math.round(320 * scaleMult)}px)`;
      }

      innerEl.appendChild(imgEl);

      // Mostrar badge de nombre si no está explícitamente desactivado
      if (!p.sinBadge) {
        const badge = document.createElement('span');
        badge.className = 'stage-character-badge';
        badge.textContent = p.nombre;
        innerEl.appendChild(badge);
      }

      motionEl.appendChild(innerEl);
      charEl.appendChild(motionEl);

      charEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.abrirFichaPersonaje(p, est);
      });

      this.stageChars.appendChild(charEl);

      if (p.entra === 'pop' || p.entra === 'zoom' || p.entra === 'slideRight') {
        this.reproducirSonido('pop');
      }
    });
  }

  mostrarLineaNarracion(index) {
    const est = window.PIZARRA_DATA.ESTACIONES[this.currentStationIndex];
    if (!est || !est.narracion || index >= est.narracion.length) {
      this.completarPunto();
      return;
    }

    this.currentLineIndex = index;
    const totalLines = est.narracion.length;
    if (this.narrCounter) this.narrCounter.textContent = `${index + 1} / ${totalLines}`;
    if (this.speakerTag) this.speakerTag.textContent = `NARRADOR · ${est.faseNombre}`;

    // Limpiar temporizador de callout previo y callouts huérfanos
    if (this.calloutTimer) {
      clearTimeout(this.calloutTimer);
      this.calloutTimer = null;
    }
    if (this.stageDecorations) {
      const prevCallout = this.stageDecorations.querySelector('.character-spotlight-callout');
      if (prevCallout) prevCallout.remove();
    }

    // Ejecutar dinamismo biológico de la escena (si la estación define pasos específicos)
    if (est.pasos && est.pasos[index]) {
      const paso = est.pasos[index];
      this.cambiarFondo(paso.fondo, paso.fondoAnim);
      this.setOverlay(paso.overlay);
      if (paso.shakeStage) this.aplicarShakeStage();
      if (paso.burst) this.crearParticulas(paso.burst);
      this.renderizarDecorados(paso.decorado || null);
      this.renderizarPersonajesPaso(paso.personajes || [], est);

      // Si el paso tiene un cartel destacado / flecha indicadora
      if (paso.callout) {
        this.calloutTimer = setTimeout(() => {
          this.renderizarCallout(paso.callout);
        }, paso.callout.delay || 650);
      }
    } else {
      // Fallback para estaciones estándar
      this.cambiarFondo(est.fondo);
      this.setOverlay(null);
      this.renderizarDecorados(null);
      this.renderizarPersonajesPaso(est.personajes || [], est);
    }

    const text = est.narracion[index];
    this.currentFullLine = text;

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.isTyping = true;
    this.narrTextEl.innerHTML = '';
    let charIdx = 0;

    const speed = 18;
    this.typewriterTimer = setInterval(() => {
      if (charIdx < text.length) {
        if (text.charAt(charIdx) === '<') {
          const closeIdx = text.indexOf('>', charIdx);
          if (closeIdx !== -1) {
            charIdx = closeIdx + 1;
          } else {
            charIdx++;
          }
        } else {
          charIdx++;
        }
        this.narrTextEl.innerHTML = text.substring(0, charIdx);
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        this.isTyping = false;
        this.narrTextEl.innerHTML = text;
      }
    }, speed);

    // Estado del botón anterior
    if (this.btnPrev) {
      if (index === 0) {
        this.btnPrev.disabled = true;
        this.btnPrev.classList.add('disabled');
      } else {
        this.btnPrev.disabled = false;
        this.btnPrev.classList.remove('disabled');
      }
    }

    if (index === totalLines - 1) {
      this.btnContinue.textContent = 'Volver al Inicio';
    } else {
      this.btnContinue.textContent = 'Siguiente';
    }
  }

  avanzarNarracion() {
    if (this.isTyping) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
      this.isTyping = false;
      this.narrTextEl.innerHTML = this.currentFullLine;
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

  retrocederNarracion() {
    if (this.isTyping) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
      this.isTyping = false;
    }
    if (this.currentLineIndex > 0) {
      this.reproducirSonido('click');
      this.mostrarLineaNarracion(this.currentLineIndex - 1);
    }
  }

  completarPunto() {
    this.reproducirSonido('chime');
    const nextIdx = this.currentStationIndex + 1;
    if (nextIdx < window.PIZARRA_DATA.ESTACIONES.length) {
      this.currentStationIndex = nextIdx;
    }
    this.cerrarEscena(true);
  }

  // =========================================================================
  // 3. FICHA EDUCATIVA DE PERSONAJE
  // =========================================================================

  abrirFichaPersonaje(p, est) {
    this.reproducirSonido('pop');
    const modal = document.getElementById('character-detail-modal');
    const imgEl = document.getElementById('modal-char-img');
    const titleEl = document.getElementById('modal-char-title');

    if (imgEl) imgEl.src = window.PIZARRA_DATA.ASSETS[p.img];
    if (titleEl) titleEl.textContent = p.nombre;

    modal.classList.add('active');
  }

  cerrarFichaPersonaje() {
    const modal = document.getElementById('character-detail-modal');
    if (modal && modal.classList.contains('active')) {
      this.reproducirSonido('click');
      modal.classList.remove('active');
    }
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
        this.abrirPunto(idx, true);
      });
    });

    // Botón en pantalla volver al panel
    this.btnBackToPanel.addEventListener('click', (e) => {
      e.stopPropagation();
      this.cerrarEscena(true);
    });

    // Avanzar narración
    this.narrationBox.addEventListener('click', () => this.avanzarNarracion());
    this.btnContinue.addEventListener('click', (e) => {
      e.stopPropagation();
      this.avanzarNarracion();
    });

    // Retroceder narración con botón Anterior
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        this.retrocederNarracion();
      });
    }

    // Cerrar modal personaje
    document.getElementById('btn-close-modal-char').addEventListener('click', () => {
      this.cerrarFichaPersonaje();
    });
    document.getElementById('character-detail-modal').addEventListener('click', () => {
      this.cerrarFichaPersonaje();
    });

    // --- NAVEGACIÓN HACIA ATRÁS ---

    // 1. Flecha atrás del navegador (History API popstate)
    window.addEventListener('popstate', () => {
      if (this.zoomedOverlay.classList.contains('active')) {
        this.cerrarEscena(false);
      }
      this.cerrarFichaPersonaje();
    });

    // 2. Botón del ratón para volver atrás
    // Botón físico 3 (botón lateral "Atrás" de ratones de 4/5 botones)
    const handleMouseBackButton = (e) => {
      if (e.button === 3) {
        if (this.zoomedOverlay.classList.contains('active')) {
          e.preventDefault();
          e.stopPropagation();
          this.cerrarEscena(true);
        }
      }
    };
    window.addEventListener('mouseup', handleMouseBackButton);
    window.addEventListener('auxclick', handleMouseBackButton);
    window.addEventListener('pointerdown', handleMouseBackButton);

    // Clic secundario (botón derecho del ratón) dentro de la escena para volver atrás
    this.zoomedOverlay.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.cerrarEscena(true);
    });

    // 3. Teclado: Navegación de diapositivas (Flechas / Espacio / Escape)
    window.addEventListener('keydown', (e) => {
      const isSceneOpen = this.zoomedOverlay.classList.contains('active');
      const modalChar = document.getElementById('character-detail-modal');
      const isCharModalOpen = modalChar && modalChar.classList.contains('active');

      if (!isSceneOpen && !isCharModalOpen) {
        if (this.introScreen && this.introScreen.style.display !== 'none') return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'Escape') {
        if (isCharModalOpen) {
          e.preventDefault();
          this.cerrarFichaPersonaje();
          return;
        }
        if (isSceneOpen) {
          e.preventDefault();
          if (e.key === 'Escape') {
            this.cerrarEscena(true);
          } else if (this.currentLineIndex > 0) {
            this.retrocederNarracion();
          } else {
            this.cerrarEscena(true);
          }
        }
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        if (isSceneOpen && !isCharModalOpen) {
          e.preventDefault();
          this.avanzarNarracion();
        }
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
        current: this.currentStationIndex,
        shownIntros: Array.from(this.shownChapterIntros)
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
        if (data.shownIntros) this.shownChapterIntros = new Set(data.shownIntros);
      }
    } catch (e) {}
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.appPizarra = new PizarraEngine();
});
