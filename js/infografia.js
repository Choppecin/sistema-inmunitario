/**
 * INFOGRAFIA.JS — Controlador Principal de la Infografía Interactiva
 * "El Sistema Inmunitario: Atlas Biológico y Ruta del Patógeno"
 * 
 * Gestiona navegación por pestañas, etapas secuenciales, personajes animados,
 * simulador del complemento, árbol celular, checklist de conceptos y audio WebAudio.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MOTOR DE AUDIO PROCEDIMENTAL (Totalmente seguro contra bloqueos)
  // =========================================================================
  class AudioSintetizador {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('inmuno_sonido') === 'off';
    }

    init() {
      try {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      } catch (e) {
        // Fallback silencioso
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      try {
        localStorage.setItem('inmuno_sonido', this.muted ? 'off' : 'on');
      } catch (e) {}
      return !this.muted;
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.1) {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    }

    playClick() {
      this.playTone(880, 0.04, 'triangle', 0.08);
    }

    playHotspot() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [587.33, 880];
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.06);
          gain.gain.setValueAtTime(0.1, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.15);
        });
      } catch (e) {}
    }

    playTab() {
      this.playTone(440, 0.06, 'sine', 0.07);
    }

    playCascadeStep() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [440, 554.37, 659.25, 880];
        const now = this.ctx.currentTime;
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.09, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.2);
        });
      } catch (e) {}
    }

    playVictory() {
      if (this.muted) return;
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const now = this.ctx.currentTime;
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.1);
          gain.gain.setValueAtTime(0.12, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.3);
        });
      } catch (e) {}
    }
  }

  const audio = new AudioSintetizador();

  function safeAudio(fn) {
    try { fn(); } catch (e) {}
  }

  // =========================================================================
  // 2. ESTADO GLOBAL
  // =========================================================================
  let storedChecklist = [];
  try {
    storedChecklist = JSON.parse(localStorage.getItem('inmuno_checklist') || '[]');
  } catch (e) {}

  const STATE = {
    activeTab: 'ruta',
    activePhaseIdx: 0,
    exploredConcepts: new Set(storedChecklist),
    selectedCellFilter: 'todos',
    selectedPathway: 'clasica',
    cascadeRunning: false
  };

  const CONCEPT_MAP = {
    'h_antigeno': 'antigeno',
    'h_piel': 'inmunidad_innata',
    'h_madre': 'celulas_inmunitarias',
    'h_neutrofilo': 'inmunidad_innata',
    'h_macrofago': 'inmunidad_innata',
    'h_complemento': 'sistema_complemento',
    'h_tcr': 'linfocitos_t',
    'h_cd8': 'linfocitos_t',
    'h_cd4': 'linfocitos_t',
    'h_b': 'linfocitos_b',
    'h_anticuerpo': 'anticuerpo',
    'h_plasmatica': 'linfocitos_b',
    'h_memoria': 'memoria_inmunologica'
  };

  // =========================================================================
  // 3. INICIALIZACIÓN
  // =========================================================================
  function initApp() {
    setupSoundButton();
    setupTabNavigation();
    setupRutaNavigation();
    setupDuelComparison();
    setupCellTree();
    setupComplementLab();
    setupChecklistGlosario();
    setupCellDetailModal();
    setupKeyboardNavigation();

    // Cargar Fase 1
    cargarFase(0);
    actualizarContadorChecklist();

    // Cierre suave al hacer clic fuera del detalle
    document.addEventListener('click', (e) => {
      const card = document.getElementById('hotspot-detail-card');
      if (card && card.style.display === 'block') {
        const isClickInside = card.contains(e.target) || e.target.closest('.stage-character');
        if (!isClickInside) {
          cerrarDetalleHotspot();
        }
      }
    });
  }

  // Configurar botón de sonido
  function setupSoundButton() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    if (!soundBtn) return;

    soundIcon.textContent = audio.muted ? '🔇' : '🔊';

    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isAudible = audio.toggleMute();
      soundIcon.textContent = isAudible ? '🔊' : '🔇';
      if (isAudible) safeAudio(() => audio.playClick());
    });
  }

  // Navegación de pestañas principales
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = btn.getAttribute('data-tab');
        if (!targetTab) return;

        safeAudio(() => audio.playTab());
        cambiarTab(targetTab);
      });
    });

    const headerChecklistBtn = document.getElementById('header-checklist-btn');
    if (headerChecklistBtn) {
      headerChecklistBtn.addEventListener('click', (e) => {
        e.preventDefault();
        safeAudio(() => audio.playTab());
        cambiarTab('glosario');
      });
    }
  }

  function cambiarTab(tabId) {
    STATE.activeTab = tabId;

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    if (tabId === 'glosario') {
      renderizarGlosario();
    }
  }

  // Atajos de teclado (Flechas izquierda y derecha para avanzar de fase)
  function setupKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      if (STATE.activeTab !== 'ruta') return;
      if (e.key === 'ArrowRight') {
        const fases = window.INFOGRAFIA_DATA.FASES;
        if (STATE.activePhaseIdx < fases.length - 1) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (STATE.activePhaseIdx > 0) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx - 1);
        }
      }
    });
  }

  // =========================================================================
  // 4. TAB 1: RUTA INMUNITARIA (PERSONAJES VIVOS EN ESCENA Y CONTROLES)
  // =========================================================================
  function setupRutaNavigation() {
    const stepperContainer = document.getElementById('timeline-stepper');
    const fases = window.INFOGRAFIA_DATA.FASES;
    if (!stepperContainer || !fases) return;

    // Generar las 6 tarjetas de fase en la barra superior
    stepperContainer.innerHTML = '';
    fases.forEach((fase, idx) => {
      const card = document.createElement('div');
      card.className = `step-card ${idx === 0 ? 'active' : ''}`;
      card.setAttribute('data-phase-idx', idx);
      card.innerHTML = `
        <span class="step-num-badge">0${fase.numero}</span>
        <span class="step-title-text">${fase.titulo.split(':')[0]}</span>
      `;
      card.addEventListener('click', () => {
        safeAudio(() => audio.playClick());
        cargarFase(idx);
      });
      stepperContainer.appendChild(card);
    });

    // Botones de navegación (Toolbar superior)
    const prevBtn = document.getElementById('phase-prev-btn');
    const nextBtn = document.getElementById('phase-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (STATE.activePhaseIdx > 0) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (STATE.activePhaseIdx < fases.length - 1) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx + 1);
        }
      });
    }

    // Flechas flotantes dentro del escenario
    const stageArrowPrev = document.getElementById('stage-arrow-prev');
    const stageArrowNext = document.getElementById('stage-arrow-next');

    if (stageArrowPrev) {
      stageArrowPrev.addEventListener('click', () => {
        if (STATE.activePhaseIdx > 0) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx - 1);
        }
      });
    }

    if (stageArrowNext) {
      stageArrowNext.addEventListener('click', () => {
        if (STATE.activePhaseIdx < fases.length - 1) {
          safeAudio(() => audio.playClick());
          cargarFase(STATE.activePhaseIdx + 1);
        }
      });
    }

    // Botón cerrar ficha de detalle
    const closeHotspotBtn = document.getElementById('close-hotspot-btn');
    if (closeHotspotBtn) {
      closeHotspotBtn.addEventListener('click', () => {
        safeAudio(() => audio.playClick());
        cerrarDetalleHotspot();
      });
    }
  }

  function cargarFase(phaseIdx) {
    const fases = window.INFOGRAFIA_DATA.FASES;
    if (!fases || !fases[phaseIdx]) return;

    STATE.activePhaseIdx = phaseIdx;
    const fase = fases[phaseIdx];

    // Actualizar stepper visual
    document.querySelectorAll('.step-card').forEach((card, idx) => {
      card.classList.toggle('active', idx === phaseIdx);
    });

    // Actualizar botones de navegación
    const prevBtn = document.getElementById('phase-prev-btn');
    const nextBtn = document.getElementById('phase-next-btn');
    const stageArrowPrev = document.getElementById('stage-arrow-prev');
    const stageArrowNext = document.getElementById('stage-arrow-next');

    const isFirst = (phaseIdx === 0);
    const isLast = (phaseIdx === fases.length - 1);

    if (prevBtn) prevBtn.disabled = isFirst;
    if (nextBtn) nextBtn.disabled = isLast;
    if (stageArrowPrev) stageArrowPrev.disabled = isFirst;
    if (stageArrowNext) stageArrowNext.disabled = isLast;

    // Actualizar Escenario
    const backdropImg = document.getElementById('stage-backdrop-img');
    if (backdropImg) {
      backdropImg.style.opacity = '0.3';
      setTimeout(() => {
        backdropImg.src = fase.fondo;
        backdropImg.style.opacity = '1';
      }, 100);
    }

    // Título de la fase en la barra superior del escenario
    const stageTitle = document.getElementById('stage-phase-title');
    if (stageTitle) stageTitle.textContent = `Fase ${fase.numero}: ${fase.titulo}`;

    // Renderizar los personajes interactivos sobre el escenario
    renderizarPersonajesEnEscenario(fase.hotspots);

    // Actualizar Panel Lateral de la Fase
    actualizarSidebarFase(fase);

    // Cerrar detalle anterior de personaje
    cerrarDetalleHotspot();
  }

  function renderizarPersonajesEnEscenario(hotspots) {
    const container = document.getElementById('stage-elements-layer');
    if (!container) return;

    container.innerHTML = '';
    if (!hotspots || hotspots.length === 0) return;

    hotspots.forEach((h, idx) => {
      const charEl = document.createElement('div');
      charEl.className = 'stage-character';
      charEl.style.left = `${h.x}%`;
      charEl.style.top = `${h.y}%`;
      charEl.setAttribute('data-char-id', h.id);

      // Ligero retardo en la flotación para dar variedad orgánica
      const delay = (idx * 0.4).toFixed(2);

      charEl.innerHTML = `
        <div class="char-sprite-wrap" style="animation-delay: ${delay}s;">
          <img src="${h.assetImg}" alt="${h.label}" loading="eager">
          <div class="char-beacon-ring"></div>
        </div>
        <div class="char-badge">
          <span>${h.icon || '🔍'}</span>
          <span>${h.label}</span>
        </div>
      `;

      charEl.addEventListener('click', (e) => {
        e.stopPropagation();
        safeAudio(() => audio.playHotspot());

        document.querySelectorAll('.stage-character').forEach(c => c.classList.remove('selected'));
        charEl.classList.add('selected');

        mostrarDetalleHotspot(h);
      });

      container.appendChild(charEl);
    });
  }

  function actualizarSidebarFase(fase) {
    const title = document.getElementById('sidebar-fase-title');
    const timeVal = document.getElementById('sidebar-meta-time');
    const locVal = document.getElementById('sidebar-meta-loc');
    const desc = document.getElementById('sidebar-fase-desc');
    const mechList = document.getElementById('sidebar-mechanisms-list');

    if (title) title.textContent = fase.titulo;
    if (timeVal) timeVal.textContent = fase.tiempoRespuesta;
    if (locVal) locVal.textContent = fase.ubicacion;
    if (desc) desc.textContent = fase.resumen;

    if (mechList) {
      mechList.innerHTML = '';
      if (fase.mecanismos && fase.mecanismos.length > 0) {
        fase.mecanismos.forEach(m => {
          const item = document.createElement('div');
          item.className = 'mechanism-item';
          item.innerHTML = `<strong>${m.nombre}</strong><span>${m.detalle}</span>`;
          mechList.appendChild(item);
        });
      }
    }
  }

  function mostrarDetalleHotspot(h) {
    const detailCard = document.getElementById('hotspot-detail-card');
    if (!detailCard) return;

    document.getElementById('hotspot-img').src = h.assetImg;
    document.getElementById('hotspot-title').textContent = h.titulo;
    document.getElementById('hotspot-cat').textContent = h.categoria;
    document.getElementById('hotspot-desc').textContent = h.descripcion;

    detailCard.style.display = 'block';

    // Desplazar el sidebar hacia arriba para que la ficha sea visible
    const sidebar = document.querySelector('.phase-sidebar');
    if (sidebar) sidebar.scrollTop = 0;

    // Desbloquear concepto asociado en el checklist si existe
    if (CONCEPT_MAP[h.id]) {
      desbloquearConcepto(CONCEPT_MAP[h.id]);
    }
  }

  function cerrarDetalleHotspot() {
    const detailCard = document.getElementById('hotspot-detail-card');
    if (detailCard) {
      detailCard.style.display = 'none';
    }
    document.querySelectorAll('.stage-character').forEach(c => c.classList.remove('selected'));
  }

  // =========================================================================
  // 5. TAB 2: INNATA VS ADAPTATIVA
  // =========================================================================
  function setupDuelComparison() {
    const comp = window.INFOGRAFIA_DATA.COMPARATIVA_INMUNIDAD;
    if (!comp || !comp.caracteristicas) return;

    const innataList = document.getElementById('innata-features-list');
    if (innataList) {
      innataList.innerHTML = comp.caracteristicas.map(c => `
        <div class="feature-row">
          <div class="feature-header">${c.criterio}</div>
          <div class="feature-value">${c.innata}</div>
        </div>
      `).join('');
    }

    const adaptativaList = document.getElementById('adaptativa-features-list');
    if (adaptativaList) {
      adaptativaList.innerHTML = comp.caracteristicas.map(c => `
        <div class="feature-row">
          <div class="feature-header">${c.criterio}</div>
          <div class="feature-value">${c.adaptativa}</div>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // 6. TAB 3: ÁRBOL CELULAR (MIELOIDE Y LINFOIDE)
  // =========================================================================
  function setupCellTree() {
    const grid = document.getElementById('cells-catalog-grid');
    const celulas = window.INFOGRAFIA_DATA.CATALOGO_CELULAS;
    if (!grid || !celulas) return;

    renderizarCatalogoCelular('todos');

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        STATE.selectedCellFilter = filter;
        safeAudio(() => audio.playClick());
        renderizarCatalogoCelular(filter);
      });
    });
  }

  function renderizarCatalogoCelular(filter) {
    const grid = document.getElementById('cells-catalog-grid');
    const celulas = window.INFOGRAFIA_DATA.CATALOGO_CELULAS;
    const manifest = window.DATA.ASSETS_MANIFEST;
    if (!grid || !celulas) return;

    grid.innerHTML = '';

    const filtered = celulas.filter(c => {
      if (filter === 'todos') return true;
      if (filter === 'mieloide') return c.linaje.toLowerCase().includes('mieloide');
      if (filter === 'linfoide') return c.linaje.toLowerCase().includes('linfoide');
      if (filter === 'fagocitos') return c.nombre.includes('Neutrófilo') || c.nombre.includes('Macrófago') || c.nombre.includes('Monocito') || c.nombre.includes('Dendrítica');
      return true;
    });

    filtered.forEach(c => {
      const card = document.createElement('div');
      const linajeCls = c.linaje.toLowerCase().includes('mieloide') ? 'mieloide' : 'linfoide';
      card.className = `cell-card ${linajeCls}`;
      const imgPath = manifest[c.id] || 'imagenes/assets/P08_celula_madre.png';

      card.innerHTML = `
        <span class="lineage-badge">${c.linaje}</span>
        <div class="cell-card-img-wrap">
          <img src="${imgPath}" alt="${c.nombre}" loading="lazy">
        </div>
        <h4>${c.nombre}</h4>
        <p>${c.papel}</p>
      `;

      card.addEventListener('click', () => {
        safeAudio(() => audio.playHotspot());
        abrirModalCelula(c, imgPath);
      });

      grid.appendChild(card);
    });
  }

  function setupCellDetailModal() {
    const modal = document.getElementById('cell-detail-modal');
    const closeBtn = document.getElementById('close-cell-modal-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        safeAudio(() => audio.playClick());
        modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          safeAudio(() => audio.playClick());
          modal.classList.remove('active');
        }
      });
    }
  }

  function abrirModalCelula(c, imgPath) {
    const modal = document.getElementById('cell-detail-modal');
    if (!modal) return;

    document.getElementById('modal-cell-img').src = imgPath;
    document.getElementById('modal-cell-name').textContent = c.nombre;
    document.getElementById('modal-cell-lineage').textContent = `Linaje: ${c.linaje}`;
    document.getElementById('modal-cell-role').textContent = c.papel;

    if (c.id === 'P18' || c.id === 'P22' || c.id === 'P23') desbloquearConcepto('linfocitos_b');
    if (c.id === 'P19' || c.id === 'P20' || c.id === 'P24') desbloquearConcepto('linfocitos_t');
    if (c.id === 'P08') desbloquearConcepto('celulas_inmunitarias');

    modal.classList.add('active');
  }

  // =========================================================================
  // 7. TAB 4: LABORATORIO DEL COMPLEMENTO
  // =========================================================================
  function setupComplementLab() {
    const pathwayBtns = document.querySelectorAll('.pathway-btn');
    pathwayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pathwayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pathway = btn.getAttribute('data-pathway');
        STATE.selectedPathway = pathway;
        safeAudio(() => audio.playClick());
        actualizarInfoViaComplemento(pathway);
      });
    });

    const triggerBtn = document.getElementById('trigger-cascade-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        if (STATE.cascadeRunning) return;
        ejecutarSimulacionCascada();
      });
    }

    actualizarInfoViaComplemento('clasica');
  }

  function actualizarInfoViaComplemento(pathwayKey) {
    const vias = window.INFOGRAFIA_DATA.VIAS_COMPLEMENTO;
    const via = vias[pathwayKey];
    if (!via) return;

    document.getElementById('sim-step1-title').textContent = '1. Iniciador';
    document.getElementById('sim-step1-desc').textContent = via.iniciador;

    document.getElementById('sim-step2-title').textContent = '2. C3 Convertasa';
    document.getElementById('sim-step2-desc').textContent = via.convertasa;

    document.getElementById('sim-step3-title').textContent = '3. C5 Convertasa';
    document.getElementById('sim-step3-desc').textContent = 'Genera C5b + C5a (quimiotaxis potente)';

    document.getElementById('sim-step4-title').textContent = '4. MAC (Lisis)';
    document.getElementById('sim-step4-desc').textContent = 'Poro lítico C5b-9 en la membrana';

    const stageImg = document.getElementById('sim-stage-img');
    const stageStatus = document.getElementById('sim-stage-status');
    if (stageImg) stageImg.src = 'imagenes/assets/P37_complemento_dormido.png';
    if (stageStatus) stageStatus.textContent = `Proteínas inactivas listas para activación por ${via.nombre}.`;
  }

  function ejecutarSimulacionCascada() {
    STATE.cascadeRunning = true;
    const btn = document.getElementById('trigger-cascade-btn');
    const stageImg = document.getElementById('sim-stage-img');
    const stageStatus = document.getElementById('sim-stage-status');
    const steps = [
      document.getElementById('cascade-step-1'),
      document.getElementById('cascade-step-2'),
      document.getElementById('cascade-step-3'),
      document.getElementById('cascade-step-4')
    ];

    if (btn) btn.disabled = true;

    // Paso 1
    safeAudio(() => audio.playCascadeStep());
    steps.forEach(s => s.classList.remove('active'));
    steps[0].classList.add('active');
    stageImg.src = 'imagenes/assets/P37_complemento_dormido.png';
    stageStatus.textContent = '1/4: Detección y reconocimiento inicial.';

    // Paso 2
    setTimeout(() => {
      safeAudio(() => audio.playCascadeStep());
      steps[1].classList.add('active');
      stageImg.src = 'imagenes/assets/P38_cascada.png';
      stageStatus.textContent = '2/4: Activación exponencial. C3 se escinde en C3a (inflamación) y C3b (opsonización).';
    }, 900);

    // Paso 3
    setTimeout(() => {
      safeAudio(() => audio.playCascadeStep());
      steps[2].classList.add('active');
      stageImg.src = 'imagenes/assets/P39_MAC_taladro.png';
      stageStatus.textContent = '3/4: Ensamblaje del Complejo de Ataque a la Membrana (MAC: C5b-C9).';
    }, 1800);

    // Paso 4
    setTimeout(() => {
      safeAudio(() => audio.playVictory());
      steps[3].classList.add('active');
      stageImg.src = 'imagenes/assets/P28_virus_perforado.png';
      stageStatus.textContent = '¡4/4: Poro lítico completado! Entrada masiva de agua e iones → Lisis celular y muerte del patógeno.';
      desbloquearConcepto('sistema_complemento');
      STATE.cascadeRunning = false;
      if (btn) btn.disabled = false;
    }, 2800);
  }

  // =========================================================================
  // 8. TAB 5: GLOSARIO & CHECKLIST EVALUATIVO (9 CONCEPTOS)
  // =========================================================================
  function setupChecklistGlosario() {
    renderizarGlosario();

    const resetBtn = document.getElementById('reset-checklist-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('¿Deseas reiniciar el registro de conceptos explorados?')) {
          STATE.exploredConcepts.clear();
          try { localStorage.removeItem('inmuno_checklist'); } catch (e) {}
          safeAudio(() => audio.playClick());
          actualizarContadorChecklist();
          renderizarGlosario();
        }
      });
    }

    const markAllBtn = document.getElementById('mark-all-checklist-btn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        window.INFOGRAFIA_DATA.GLOSARIO_CHECKLIST.forEach(item => {
          STATE.exploredConcepts.add(item.id);
        });
        try {
          localStorage.setItem('inmuno_checklist', JSON.stringify(Array.from(STATE.exploredConcepts)));
        } catch (e) {}
        safeAudio(() => audio.playVictory());
        actualizarContadorChecklist();
        renderizarGlosario();
      });
    }
  }

  function desbloquearConcepto(conceptoId) {
    if (!STATE.exploredConcepts.has(conceptoId)) {
      STATE.exploredConcepts.add(conceptoId);
      try {
        localStorage.setItem('inmuno_checklist', JSON.stringify(Array.from(STATE.exploredConcepts)));
      } catch (e) {}
      actualizarContadorChecklist();
    }
  }

  function actualizarContadorChecklist() {
    const count = STATE.exploredConcepts.size;
    const total = window.INFOGRAFIA_DATA.GLOSARIO_CHECKLIST.length;

    const badge = document.getElementById('checklist-count-badge');
    if (badge) badge.textContent = `${count}/${total}`;

    const progressFill = document.getElementById('checklist-progress-bar');
    const percentText = document.getElementById('checklist-percent-text');

    const percent = Math.round((count / total) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (percentText) percentText.textContent = `${count} de ${total} conceptos dominados (${percent}%)`;
  }

  function renderizarGlosario() {
    const container = document.getElementById('checklist-cards-grid');
    const items = window.INFOGRAFIA_DATA.GLOSARIO_CHECKLIST;
    const manifest = window.DATA.ASSETS_MANIFEST;
    if (!container || !items) return;

    container.innerHTML = '';

    items.forEach(item => {
      const isDiscovered = STATE.exploredConcepts.has(item.id);
      const card = document.createElement('div');
      card.className = `checklist-card ${isDiscovered ? 'discovered' : ''}`;
      const imgPath = manifest[item.asset] || 'imagenes/assets/P04_guiri.png';

      card.innerHTML = `
        <div class="checklist-card-header">
          <div class="concept-title-group">
            <div class="concept-sprite-thumb">
              <img src="${imgPath}" alt="${item.termino}">
            </div>
            <div>
              <h4>${item.termino}</h4>
              <span class="concept-cat">${item.categoria}</span>
            </div>
          </div>
          <span class="checklist-status-badge ${isDiscovered ? 'discovered' : 'pending'}">
            ${isDiscovered ? '✔ Aprendido' : '⏳ Pendiente'}
          </span>
        </div>
        <p>${item.definicion}</p>
        <button class="locate-phase-btn" data-concept-id="${item.id}">
          <span>🗺️ Localizar en la Ruta</span>
        </button>
      `;

      const locateBtn = card.querySelector('.locate-phase-btn');
      locateBtn.addEventListener('click', () => {
        safeAudio(() => audio.playClick());
        localizarConceptoEnRuta(item.id);
      });

      container.appendChild(card);
    });

    actualizarContadorChecklist();
  }

  function localizarConceptoEnRuta(conceptoId) {
    const faseMap = {
      'antigeno': 0,
      'inmunidad_innata': 0,
      'celulas_inmunitarias': 1,
      'sistema_complemento': 2,
      'linfocitos_t': 3,
      'linfocitos_b': 4,
      'anticuerpo': 4,
      'inmunidad_adaptativa': 4,
      'memoria_inmunologica': 5
    };

    const targetFase = faseMap[conceptoId] !== undefined ? faseMap[conceptoId] : 0;
    cambiarTab('ruta');
    cargarFase(targetFase);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
