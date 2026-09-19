/**
 * INFOGRAFIA.JS — Controlador Principal de la Infografía Interactiva
 * "El Sistema Inmunitario: Atlas Biológico y Ruta del Patógeno"
 * 
 * Gestiona navegación por pestañas, etapas secuenciales, hotspots interactivos,
 * simulador del complemento, árbol celular, checklist de conceptos y audio WebAudio.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MOTOR DE AUDIO SINTETIZADO (WebAudio API, sin archivos externos)
  // =========================================================================
  class AudioSintetizador {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('inmuno_sonido') === 'off';
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('inmuno_sonido', this.muted ? 'off' : 'on');
      return !this.muted;
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.12) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      try {
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
      } catch (e) {
        // Silencio seguro en caso de bloqueo del navegador
      }
    }

    playClick() {
      this.playTone(880, 0.04, 'triangle', 0.1);
    }

    playHotspot() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const notes = [587.33, 880]; // D5, A5
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.frequency.setValueAtTime(f, now + i * 0.06);
          gain.gain.setValueAtTime(0.12, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.15);
        });
      } catch (e) {}
    }

    playTab() {
      this.playTone(440, 0.08, 'sine', 0.08);
    }

    playCascadeStep() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
        const now = this.ctx.currentTime;
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.08);
          gain.gain.setValueAtTime(0.1, now + i * 0.08);
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
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C
        const now = this.ctx.currentTime;
        notes.forEach((f, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.1);
          gain.gain.setValueAtTime(0.15, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 0.3);
        });
      } catch (e) {}
    }
  }

  // =========================================================================
  // 2. ESTADO GLOBAL DE LA INFOGRAFÍA
  // =========================================================================
  const audio = new AudioSintetizador();

  const STATE = {
    activeTab: 'ruta',
    activePhaseIdx: 0,
    exploredConcepts: new Set(JSON.parse(localStorage.getItem('inmuno_checklist') || '[]')),
    selectedCellFilter: 'todos',
    selectedPathway: 'clasica',
    cascadeRunning: false
  };

  // Mapeo auxiliar de conceptos del checklist por ID de fase o hotspot
  const CONCEPT_MAP = {
    'h_antigeno': 'antigeno',
    'h_madre': 'celulas_inmunitarias',
    'h_neutrofilo': 'inmunidad_innata',
    'h_macrofago': 'inmunidad_innata',
    'h_complemento': 'sistema_complemento',
    'h_tcr': 'linfocitos_t',
    'h_cd8': 'linfocitos_t',
    'h_cd4': 'linfocitos_t',
    'h_b': 'linfocitos_b',
    'h_anticuerpos': 'anticuerpo',
    'h_memoria': 'memoria_inmunologica'
  };

  // =========================================================================
  // 3. INICIALIZACIÓN Y CONTROLADOR DE PESTAÑAS
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

    // Cargar fase inicial (Fase 1)
    cargarFase(0);
    actualizarContadorChecklist();

    // Permitir clic fuera para cerrar panel de hotspot
    document.addEventListener('click', (e) => {
      const card = document.getElementById('hotspot-detail-card');
      if (card && card.style.display !== 'none') {
        const isClickInside = card.contains(e.target) || e.target.closest('.hotspot-pin');
        if (!isClickInside) {
          cerrarDetalleHotspot();
        }
      }
    });
  }

  // Sonido ON/OFF
  function setupSoundButton() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    if (!soundBtn) return;

    soundIcon.textContent = audio.muted ? '🔇' : '🔊';

    soundBtn.addEventListener('click', () => {
      const isAudible = audio.toggleMute();
      soundIcon.textContent = isAudible ? '🔊' : '🔇';
      if (isAudible) audio.playClick();
    });
  }

  // Navegación de pestañas principales
  function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        if (targetTab === STATE.activeTab) return;

        audio.playTab();
        cambiarTab(targetTab);
      });
    });

    // Botón de acceso rápido al glosario desde la cabecera
    const headerChecklistBtn = document.getElementById('header-checklist-btn');
    if (headerChecklistBtn) {
      headerChecklistBtn.addEventListener('click', () => {
        audio.playTab();
        cambiarTab('glosario');
      });
    }
  }

  function cambiarTab(tabId) {
    STATE.activeTab = tabId;

    // Actualizar botones de pestaña
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Actualizar secciones
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Si abrimos glosario, refrescar la lista
    if (tabId === 'glosario') {
      renderizarGlosario();
    }
  }

  // =========================================================================
  // 4. TAB 1: RUTA INMUNITARIA (ESCENARIO Y HOTSPOTS)
  // =========================================================================
  function setupRutaNavigation() {
    const stepperContainer = document.getElementById('timeline-stepper');
    const fases = window.INFOGRAFIA_DATA.FASES;
    if (!stepperContainer || !fases) return;

    // Generar las 6 tarjetas de la barra superior
    stepperContainer.innerHTML = '';
    fases.forEach((fase, idx) => {
      const card = document.createElement('div');
      card.className = `step-card ${idx === 0 ? 'active' : ''}`;
      card.setAttribute('data-phase-idx', idx);
      card.innerHTML = `
        <span class="step-num-badge">Fase 0${fase.numero}</span>
        <span class="step-title-text">${fase.titulo.split(':')[0]}</span>
        <span class="step-time-text">${fase.tiempoRespuesta.split('(')[0]}</span>
      `;
      card.addEventListener('click', () => {
        audio.playClick();
        cargarFase(idx);
      });
      stepperContainer.appendChild(card);
    });

    // Flechas anterior y siguiente
    const prevBtn = document.getElementById('phase-prev-btn');
    const nextBtn = document.getElementById('phase-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (STATE.activePhaseIdx > 0) {
          audio.playClick();
          cargarFase(STATE.activePhaseIdx - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (STATE.activePhaseIdx < fases.length - 1) {
          audio.playClick();
          cargarFase(STATE.activePhaseIdx + 1);
        }
      });
    }

    // Botón cerrar tarjeta de hotspot
    const closeHotspotBtn = document.getElementById('close-hotspot-btn');
    if (closeHotspotBtn) {
      closeHotspotBtn.addEventListener('click', () => {
        audio.playClick();
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
    if (prevBtn) prevBtn.disabled = (phaseIdx === 0);
    if (nextBtn) nextBtn.disabled = (phaseIdx === fases.length - 1);

    // Actualizar Escenario
    const backdropImg = document.getElementById('stage-backdrop-img');
    if (backdropImg) {
      backdropImg.style.opacity = '0.2';
      setTimeout(() => {
        backdropImg.src = fase.fondo;
        backdropImg.style.opacity = '1';
      }, 150);
    }

    // Título y datos de fase en la barra inferior del escenario
    const stageTitle = document.getElementById('stage-phase-title');
    const stageSub = document.getElementById('stage-phase-sub');
    if (stageTitle) stageTitle.textContent = `Fase ${fase.numero}: ${fase.titulo}`;
    if (stageSub) stageSub.textContent = fase.subtitulo;

    // Actualizar Hotspots
    renderizarHotspots(fase.hotspots);

    // Actualizar Panel Lateral de la Fase
    actualizarSidebarFase(fase);

    // Cerrar detalle anterior de hotspot
    cerrarDetalleHotspot();
  }

  function renderizarHotspots(hotspots) {
    const container = document.getElementById('hotspots-overlay');
    if (!container) return;

    container.innerHTML = '';
    if (!hotspots || hotspots.length === 0) return;

    hotspots.forEach(h => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.style.left = `${h.x}%`;
      pin.style.top = `${h.y}%`;
      pin.setAttribute('data-hotspot-id', h.id);

      pin.innerHTML = `
        <div class="pin-beacon">${h.icon || '🔍'}</div>
        <div class="pin-label">${h.label}</div>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        audio.playHotspot();
        mostrarDetalleHotspot(h);
      });

      container.appendChild(pin);
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
  }

  // =========================================================================
  // 5. TAB 2: INNATA VS ADAPTATIVA
  // =========================================================================
  function setupDuelComparison() {
    const comp = window.INFOGRAFIA_DATA.COMPARATIVA_INMUNIDAD;
    if (!comp || !comp.caracteristicas) return;

    // Renderizar características de Inmunidad Innata
    const innataList = document.getElementById('innata-features-list');
    if (innataList) {
      innataList.innerHTML = comp.caracteristicas.map(c => `
        <div class="feature-row">
          <div class="feature-header">${c.criterio}</div>
          <div class="feature-value">${c.innata}</div>
        </div>
      `).join('');
    }

    // Renderizar características de Inmunidad Adaptativa
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

    // Botones de filtro
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        STATE.selectedCellFilter = filter;
        audio.playClick();
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
      if (filter === 'mieloide') return c.linaje.toLowerCase() === 'mieloide';
      if (filter === 'linfoide') return c.linaje.toLowerCase() === 'linfoide';
      if (filter === 'fagocitos') return c.nombre.includes('Neutrófilo') || c.nombre.includes('Macrófago') || c.nombre.includes('Monocito') || c.nombre.includes('Dendrítica');
      return true;
    });

    filtered.forEach(c => {
      const card = document.createElement('div');
      const linajeCls = c.linaje.toLowerCase();
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
        audio.playHotspot();
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
        audio.playClick();
        modal.classList.remove('active');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          audio.playClick();
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

    // Desbloquear concepto en checklist si corresponde
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
        audio.playClick();
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

    // Inicializar con la vía clásica
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

    // Paso 1: Iniciación
    audio.playCascadeStep();
    steps.forEach(s => s.classList.remove('active'));
    steps[0].classList.add('active');
    stageImg.src = 'imagenes/assets/P37_complemento_dormido.png';
    stageStatus.textContent = '1/4: Detección y reconocimiento inicial.';

    // Paso 2: Cascada y C3
    setTimeout(() => {
      audio.playCascadeStep();
      steps[1].classList.add('active');
      stageImg.src = 'imagenes/assets/P38_cascada.png';
      stageStatus.textContent = '2/4: Activación exponencial. C3 se escinde en C3a (inflamación) y C3b (opsonización).';
    }, 1000);

    // Paso 3: C5 y Taladro MAC
    setTimeout(() => {
      audio.playCascadeStep();
      steps[2].classList.add('active');
      stageImg.src = 'imagenes/assets/P39_MAC_taladro.png';
      stageStatus.textContent = '3/4: Ensamblaje del Complejo de Ataque a la Membrana (MAC: C5b-C9).';
    }, 2000);

    // Paso 4: Lisis osmótica y destrucción del patógeno
    setTimeout(() => {
      audio.playVictory();
      steps[3].classList.add('active');
      stageImg.src = 'imagenes/assets/P28_virus_perforado.png';
      stageStatus.textContent = '¡4/4: Poro lítico completado! Entrada masiva de agua e iones → Lisis celular y muerte del patógeno.';
      desbloquearConcepto('sistema_complemento');
      STATE.cascadeRunning = false;
      if (btn) btn.disabled = false;
    }, 3200);
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
          localStorage.removeItem('inmuno_checklist');
          audio.playClick();
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
        localStorage.setItem('inmuno_checklist', JSON.stringify(Array.from(STATE.exploredConcepts)));
        audio.playVictory();
        actualizarContadorChecklist();
        renderizarGlosario();
      });
    }
  }

  function desbloquearConcepto(conceptoId) {
    if (!STATE.exploredConcepts.has(conceptoId)) {
      STATE.exploredConcepts.add(conceptoId);
      localStorage.setItem('inmuno_checklist', JSON.stringify(Array.from(STATE.exploredConcepts)));
      actualizarContadorChecklist();
      // Notificación sonora suave
      audio.playHotspot();
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

      // Botón para saltar a la fase correspondiente en la Ruta
      const locateBtn = card.querySelector('.locate-phase-btn');
      locateBtn.addEventListener('click', () => {
        audio.playClick();
        localizarConceptoEnRuta(item.id);
      });

      container.appendChild(card);
    });

    actualizarContadorChecklist();
  }

  function localizarConceptoEnRuta(conceptoId) {
    const faseMap = {
      'antigeno': 0, // Fase 1
      'inmunidad_innata': 0, // Fase 1 o 3
      'celulas_inmunitarias': 1, // Fase 2
      'sistema_complemento': 2, // Fase 3
      'linfocitos_t': 3, // Fase 4
      'linfocitos_b': 4, // Fase 5
      'anticuerpo': 4, // Fase 5
      'inmunidad_adaptativa': 4, // Fase 5
      'memoria_inmunologica': 5 // Fase 6
    };

    const targetFase = faseMap[conceptoId] !== undefined ? faseMap[conceptoId] : 0;
    cambiarTab('ruta');
    cargarFase(targetFase);

    // Desplazar hacia arriba suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
