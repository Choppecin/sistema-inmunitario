/**
 * INFOGRAFIA_DATA.JS — Datos estructurados, fichas anatómicas,
 * comparativas y etapas de la Infografía Interactiva "El Sistema Inmunitario".
 * 
 * Basado en el temario biológico riguroso y el manifiesto visual de Kurzgesagt.
 */

window.INFOGRAFIA_DATA = {
  // Los 6 grandes bloques o fases del viaje del patógeno
  FASES: [
    {
      id: 'fase1',
      numero: 1,
      titulo: 'Barreras Anatómicas y Puerta de Entrada',
      subtitulo: 'La primera línea de defensa inespecífica',
      fondo: 'imagenes/fondos/P45_piel.png',
      fondoAlt: 'imagenes/fondos/P44_nariz.png',
      tiempoRespuesta: 'Permanente / Inmediato (0 segundos)',
      ubicacion: 'Superficies externas, epitelios y mucosas',
      resumen: 'Para causar daño, un microorganismo patógeno primero debe superar las barreras mecánicas, químicas y biológicas de nuestro cuerpo. Estas defensas son pasivas, automáticas y están presentes desde el nacimiento.',
      conceptosClave: ['Barreras físicas y bioquímicas', 'Antígeno (El Guiri)', 'Microbiota'],
      hotspots: [
        {
          id: 'h_piel',
          x: 28, y: 48,
          label: 'Célula Epitelial (Muralla)',
          icon: '🛡️',
          assetImg: 'imagenes/assets/P29_epitelial_sana.png',
          titulo: 'Barrera Cutánea y Epitelial',
          categoria: 'Barrera Física y Bioquímica',
          descripcion: 'Células epiteliales queratinizadas y fuertemente unidas por uniones estrechas. Su superficie seca, el pH ácido (5.5) del sebo y los ácidos grasos secretados por glándulas sebáceas impiden la proliferación bacteriana.'
        },
        {
          id: 'h_mucosa',
          x: 52, y: 38,
          label: 'Virus Invasor',
          icon: '👾',
          assetImg: 'imagenes/assets/P25_virus.png',
          titulo: 'Microorganismo Invasor (Patógeno)',
          categoria: 'Amenaza Biológica',
          descripcion: 'Partículas virales o bacterias que buscan franquear los epitelios y mucosas para invadir las células del organismo y replicarse.'
        },
        {
          id: 'h_antigeno',
          x: 75, y: 55,
          label: 'El Antígeno (El Guiri)',
          icon: '🦠',
          assetImg: 'imagenes/assets/P04_guiri.png',
          titulo: '¿Qué es un Antígeno?',
          categoria: 'Molécula Extraña',
          descripcion: 'Toda molécula (proteína, polisacárido, glicoproteína) que el organismo reconoce como extraña y es capaz de desencadenar una respuesta inmunitaria. Metafóricamente: un "guiri" que busca aprovecharse de los recursos celulares.'
        }
      ],
      mecanismos: [
        { nombre: 'Barreras Físicas', detalle: 'Piel intacta, pelos nasales, movimiento de cilios, flujo de lágrimas y orina.' },
        { nombre: 'Barreras Químicas', detalle: 'Lisozima en saliva y lágrimas, ácido clorhídrico estomacal (pH 1.5 - 2), péptidos antimicrobianos (defensinas).' },
        { nombre: 'Barreras Biológicas', detalle: 'Microbiota comensal que compite activamente por espacio y nutrientes, bloqueando la colonización patógena.' }
      ]
    },

    {
      id: 'fase2',
      numero: 2,
      titulo: 'La Fábrica Celular: Médula Ósea y Linajes',
      subtitulo: 'Hematopoyesis: origen de las células defensoras',
      fondo: 'imagenes/fondos/P47_medula.png',
      tiempoRespuesta: 'Producción continua (millones de células/segundo)',
      ubicacion: 'Médula ósea roja (huesos largos y planos)',
      resumen: 'Todos los leucocitos provienen de una Célula Madre Hematopoyética Pluripotencial común. En la médula se bifurcan dos grandes familias: la línea mieloide (respuesta innata) y la línea linfoide (respuesta adaptativa y células NK).',
      conceptosClave: ['Célula Madre', 'Linaje Mieloide', 'Linaje Linfoide', 'Granulocitos vs Agranulocitos'],
      hotspots: [
        {
          id: 'h_madre',
          x: 22, y: 45,
          label: 'Célula Madre (HSC)',
          icon: '👑',
          assetImg: 'imagenes/assets/P08_celula_madre.png',
          titulo: 'Célula Madre Hematopoyética',
          categoria: 'Progenitor Multipotencial',
          descripcion: 'Reside en el microambiente de la médula ósea. Tiene capacidad de autorrenovación y es la madre de todas las células sanguíneas e inmunitarias.'
        },
        {
          id: 'h_neutrofilo',
          x: 48, y: 30,
          label: 'Neutrófilo (Policía)',
          icon: '👮',
          assetImg: 'imagenes/assets/P09_neutrofilo.png',
          titulo: 'Neutrófilo (Granulocito)',
          categoria: 'Línea Mieloide · Inmunidad Innata',
          descripcion: 'Los más abundantes (60-70% de todos los leucocitos). Son los primeros en llegar al foco de infección, comen patógenos vorazmente y forman trampas extracelulares (NETs).'
        },
        {
          id: 'h_macrofago',
          x: 72, y: 40,
          label: 'Macrófago (El Comilón)',
          icon: '🍽️',
          assetImg: 'imagenes/assets/P14_macrofago.png',
          titulo: 'Monocito / Macrófago',
          categoria: 'Línea Mieloide · Fagocito Principal',
          descripcion: 'Los monocitos viajan por sangre y al entrar a los tejidos se transforman en macrófagos: grandes barredores que fagocitan restos celulares y patógenos, liberando citoquinas de alarma.'
        },
        {
          id: 'h_nk',
          x: 85, y: 65,
          label: 'Célula NK (Natural Killer)',
          icon: '🥷',
          assetImg: 'imagenes/assets/P21_NK.png',
          titulo: 'Célula NK (Natural Killer)',
          categoria: 'Línea Linfoide · Inmunidad Innata',
          descripcion: 'Excepción fundamental: es linfoide pero actúa en la inmunidad innata. Destruye células infectadas o tumorales que han perdido la molécula CMH-I, sin necesidad de antígeno específico.'
        }
      ],
      mecanismos: [
        { nombre: 'Granulocitos', detalle: 'Neutrófilos (bacterias), Eosinófilos (parásitos y alergias), Basófilos y Mastocitos (histamina e inflamación).' },
        { nombre: 'Agranulocitos', detalle: 'Monocitos/Macrófagos y Linfocitos (B, T CD4+, T CD8+, NK).' },
        { nombre: 'Plaquetas y Hematíes', detalle: 'Derivados mieloides no inmunitarios: transporte de oxígeno y coagulación/sellado de heridas.' }
      ]
    },

    {
      id: 'fase3',
      numero: 3,
      titulo: 'Alarma Tisular, Quimiotaxis y Fagocitosis',
      subtitulo: 'La respuesta innata celular y bioquímica en acción',
      fondo: 'imagenes/fondos/P49_tejido_infectado.png',
      tiempoRespuesta: 'Minutos a Horas tras la penetración',
      ubicacion: 'Tejido conjuntivo infectado y capilares sanguíneos',
      resumen: 'Cuando el virus rompe las barreras y penetra en las células epiteliales, éstas sufren estrés y liberan señales químicas de socorro. Comienza la quimiotaxis, el reclutamiento celular masivo y la activación del sistema del complemento.',
      conceptosClave: ['Infección Celular', 'Quimiotaxis', 'Fagocitosis y Opsonización', 'Sistema del Complemento'],
      hotspots: [
        {
          id: 'h_cel_inf',
          x: 25, y: 55,
          label: 'Célula Infectada',
          icon: '🤒',
          assetImg: 'imagenes/assets/P30_epitelial_infectada.png',
          titulo: 'Célula Epitelial Infectada',
          categoria: 'Diano de Infección Viral',
          descripcion: 'El virus ha secuestrado su maquinaria para replicarse. La célula emite señales de daño (DAMPs) e interferones para advertir a sus vecinas sanas.'
        },
        {
          id: 'h_quimio',
          x: 50, y: 40,
          label: 'Quimiotaxis',
          icon: '📢',
          assetImg: 'imagenes/assets/P43_quimiotaxis.png',
          titulo: 'Gradiente de Quimiotaxis',
          categoria: 'Señalización Química',
          descripcion: 'Rastro químico de quimioquinas que guía a los neutrófilos y macrófagos desde el torrente sanguíneo directamente hacia el corazón de la infección.'
        },
        {
          id: 'h_complemento',
          x: 75, y: 35,
          label: 'Sistema del Complemento',
          icon: '⚡',
          assetImg: 'imagenes/assets/P38_cascada.png',
          titulo: 'El Sistema del Complemento',
          categoria: 'Proteínas Plasmáticas en Cascada',
          descripcion: 'Más de 30 proteínas inactivas en sangre. Al activarse, opsonizan al patógeno (C3b), provocan inflamación (C3a, C5a) y forman el complejo MAC (C5b-C9) que taladra la membrana del invasor.'
        }
      ],
      mecanismos: [
        { nombre: 'Fagocitosis', detalle: 'El macrófago extiende pseudópodos, engloba al microbio en un fagosoma y lo fusiona con lisosomas llenos de enzimas destructivas.' },
        { nombre: 'Opsonización', detalle: 'Marcaje del patógeno con opsoninas (anticuerpos o C3b) para que el fagocito lo atrape hasta 100 veces más rápido.' },
        { nombre: 'Complejo MAC', detalle: 'Taladro molecular circular que perfora la membrana patógena provocando choque osmótico y lisis inmediata.' }
      ]
    },

    {
      id: 'fase4',
      numero: 4,
      titulo: 'El Puente: La Célula Dendrítica y el Ganglio',
      subtitulo: 'Presentación antigénica: de la inmunidad innata a la adaptativa',
      fondo: 'imagenes/fondos/P51_mapa_ganglios.png',
      fondoAlt: 'imagenes/fondos/P50_ganglio.png',
      tiempoRespuesta: '12 a 24 horas',
      ubicacion: 'Vasos linfáticos y Ganglios linfáticos regionales',
      resumen: 'Los linfocitos T son incapaces de reconocer antígenos libres. Necesitan una célula profesional que capture el antígeno, lo procese y se lo "muestre en bandeja" unido a moléculas del CMH dentro de un ganglio linfático.',
      conceptosClave: ['Célula Dendrítica', 'CMH-I y CMH-II', 'Receptor TCR', 'Sinapsis Inmunológica'],
      hotspots: [
        {
          id: 'h_dendritica',
          x: 35, y: 50,
          label: 'Célula Dendrítica (Mensajera)',
          icon: '🌟',
          assetImg: 'imagenes/assets/P15_dendritica.png',
          titulo: 'Célula Presentadora de Antígeno (CPA)',
          categoria: 'Puente Inmunológico Clave',
          descripcion: 'Patrulla los tejidos, fagocita el virus, madura y viaja a través de los vasos linfáticos hasta el ganglio para enseñar las muestras a los linfocitos T.'
        },
        {
          id: 'h_cmh',
          x: 65, y: 45,
          label: 'Complejo CMH (La Bandeja)',
          icon: '🚩',
          assetImg: 'imagenes/assets/P34_CMH.png',
          titulo: 'CMH (Complejo Mayor de Histocompatibilidad)',
          categoria: 'Molécula Presentadora',
          descripcion: 'CMH-I: presente en todas las células nucleadas (muestra lo que ocurre dentro). CMH-II: exclusivo de CPAs profesionales (dendríticas, macrófagos, células B) para activar a CD4+.'
        },
        {
          id: 'h_tcr',
          x: 75, y: 35,
          label: 'Receptor TCR (Linfocito T)',
          icon: '🔑',
          assetImg: 'imagenes/assets/P35_TCR.png',
          titulo: 'Receptor TCR de Linfocito T',
          categoria: 'Receptor Específico',
          descripcion: 'Receptor de membrana de los linfocitos T que reconoce específicamente el complejo CMH + péptido antigénico como una llave en su cerradura.'
        }
      ],
      mecanismos: [
        { nombre: 'Reconocimiento Específico', detalle: 'El receptor TCR del linfocito T encaja como una llave en la cerradura del binomio CMH + Antígeno.' },
        { nombre: 'Doble Señal', detalle: 'Para activarse, el linfocito requiere la señal 1 (TCR-CMH) y la señal 2 de coestimulación (CD80/86 con CD28), evitando autoinmunidad.' },
        { nombre: 'Señal 3 (Citoquinas)', detalle: 'Las citoquinas del entorno definen el tipo de respuesta especializada (Th1, Th2, Th17).' }
      ]
    },

    {
      id: 'fase5',
      numero: 5,
      titulo: 'Inmunidad Adaptativa: Celular y Humoral',
      subtitulo: 'La ofensiva de precisión dirigida por linfocitos T y B',
      fondo: 'imagenes/fondos/P48_vaso.png',
      fondoAlt: 'imagenes/fondos/P50_ganglio.png',
      tiempoRespuesta: 'Días (requiere expansión clonal)',
      ubicacion: 'Ganglios, bazo, torrente circulatorio y foco infectado',
      resumen: 'Una vez activados, los T CD4+ dirigen la orquesta con citoquinas. Los T CD8+ viajan a matar células infectadas (inmunidad celular) mientras los linfocitos B se transforman en fábricas masivas de anticuerpos (inmunidad humoral).',
      conceptosClave: ['T CD4+ Colaborador', 'T CD8+ Citotóxico', 'Linfocito B y Célula Plasmática', 'Expansión Clonal'],
      hotspots: [
        {
          id: 'h_cd4',
          x: 25, y: 35,
          label: 'Linfocito T CD4+ (Director)',
          icon: '🎼',
          assetImg: 'imagenes/assets/P19_T_CD4.png',
          titulo: 'Linfocito T CD4+ (Helper)',
          categoria: 'Director de la Respuesta',
          descripcion: 'Reconoce antígenos en CMH-II. Con su batuta química libera citoquinas (interleucinas) que encienden a los linfocitos B, a los CD8+ y a los macrófagos.'
        },
        {
          id: 'h_cd8',
          x: 50, y: 40,
          label: 'Linfocito T CD8+ (Ninja)',
          icon: '🥋',
          assetImg: 'imagenes/assets/P20_T_CD8.png',
          titulo: 'Linfocito T CD8+ (Citotóxico)',
          categoria: 'Inmunidad Celular',
          descripcion: 'Reconoce células infectadas a través de CMH-I. Libera perforinas (abren poros) y granzimas (activan apoptosis), lisando a la célula diana sin diseminar los virus.'
        },
        {
          id: 'h_plasmatica',
          x: 75, y: 45,
          label: 'Célula Plasmática (Herrero)',
          icon: '⚒️',
          assetImg: 'imagenes/assets/P22_plasmatica.png',
          titulo: 'Célula Plasmática (B diferenciado)',
          categoria: 'Inmunidad Humoral',
          descripcion: 'Fábrica celular dedicada exclusivamente a producir y secretar hasta 2.000 anticuerpos por segundo al torrente sanguíneo.'
        }
      ],
      mecanismos: [
        { nombre: 'Expansión Clonal', detalle: 'El único clon de linfocito B o T específico para ese patógeno se divide miles de veces formando un ejército de réplicas idénticas.' },
        { nombre: 'Inmunidad Celular', detalle: 'Dirigida por CD8+: erradica virus y microorganismos intracelulares mediante lisis directa de las células huésped.' },
        { nombre: 'Inmunidad Humoral', detalle: 'Dirigida por anticuerpos: neutraliza virus libres, bloquea toxinas e impide la invasión celular en fluidos corporales.' }
      ]
    },

    {
      id: 'fase6',
      numero: 6,
      titulo: 'Eliminación Final y Memoria Inmunológica',
      subtitulo: 'Victoria del organismo y vigilancia permanente para el futuro',
      fondo: 'imagenes/fondos/P52_tejido_sano.png',
      fondoAlt: 'imagenes/fondos/P55_final.png',
      tiempoRespuesta: 'Memoria de por vida / Respuesta secundaria en horas',
      ubicacion: 'Todo el organismo (patrulla circulante)',
      resumen: 'Los anticuerpos se unen a los epítopos del virus neutralizándolo y marcándolo para su destrucción total por macrófagos y complemento. Al concluir la batalla, la mayoría de células sufren apoptosis, pero quedan células de memoria permanente.',
      conceptosClave: ['Anticuerpos (IgM / IgG)', 'Neutralización y Epítopos', 'Memoria Inmunológica', 'Respuesta Secundaria'],
      hotspots: [
        {
          id: 'h_anticuerpo',
          x: 25, y: 40,
          label: 'Anticuerpo (Inmunoglobulina)',
          icon: '🔱',
          assetImg: 'imagenes/assets/P32_anticuerpo.png',
          titulo: 'Estructura del Anticuerpo',
          categoria: 'Glicoproteína Defensora',
          descripcion: 'Molécula en forma de "Y". Los extremos variables (Fab) se unen con precisión atómica al epítopo del antígeno; la cola constante (Fc) activa a macrófagos y al complemento.'
        },
        {
          id: 'h_memoria',
          x: 55, y: 45,
          label: 'Células de Memoria (Patrulla)',
          icon: '🚁',
          assetImg: 'imagenes/assets/P53_memoria_patrulla.png',
          titulo: 'Linfocitos B y T de Memoria',
          categoria: 'Vigilancia Permanente',
          descripcion: 'Células de vida muy larga que circulan por sangre y tejidos recordando la "foto policial" del virus. Es el principio biológico en el que se basan las vacunas.'
        },
        {
          id: 'h_secundaria',
          x: 80, y: 40,
          label: 'Respuesta Secundaria',
          icon: '🚀',
          assetImg: 'imagenes/assets/P54_respuesta_secundaria.png',
          titulo: 'Respuesta Primaria vs Secundaria',
          categoria: 'Eficacia Exponencial',
          descripcion: 'En la 1ª infección el cuerpo tarda 1-2 semanas en responder. En la 2ª infección, las células de memoria lo aniquilan en cuestión de horas, a menudo sin síntomas.'
        }
      ],
      mecanismos: [
        { nombre: 'Neutralización', detalle: 'Los anticuerpos bloquean las espículas virales impidiendo físicamente que el virus se una a los receptores celulares.' },
        { nombre: 'Aclaramiento y Reparación', detalle: 'Los macrófagos devoran restos celulares y secretan factores de crecimiento que cicatrizan y restauran el tejido a su estado sano.' },
        { nombre: 'Inmunidad de Memoria', detalle: 'Títulos elevados de IgG de alta afinidad listos para una respuesta inmediata y letal ante una reinfección.' }
      ]
    }
  ],

  // Datos para la tabla comparativa interactiva: INNATA vs ADAPTATIVA
  COMPARATIVA_INMUNIDAD: {
    titulo: 'Inmunidad Innata vs Inmunidad Adaptativa',
    caracteristicas: [
      { criterio: 'Tiempo de respuesta', innata: 'Inmediata (minutos a horas)', adaptativa: 'Tardía (días a semanas en 1ª exp.)' },
      { criterio: 'Especificidad', innata: 'Inespecífica (reconoce patrones PAMPs)', adaptativa: 'Altamente específica (antígenos y epítopos)' },
      { criterio: 'Diversidad', innata: 'Limitada (receptores codificados en línea germinal)', adaptativa: 'Enorme (>10⁹ receptores por recombinación V(D)J)' },
      { criterio: 'Memoria inmunológica', innata: 'Ausente (o memoria entrenada mínima)', adaptativa: 'Presente y duradera (décadas o de por vida)' },
      { criterio: 'Componentes celulares', innata: 'Neutrófilos, Macrófagos, Dendríticas, Mastocitos, NK', adaptativa: 'Linfocitos B, Linfocitos T (CD4+, CD8+), Plasmáticas' },
      { criterio: 'Componentes humorales', innata: 'Sistema del complemento, lisozima, interferones', adaptativa: 'Anticuerpos (Inmunoglobulinas: IgM, IgG, IgA, IgE, IgD)' },
      { criterio: 'Evolución', innata: 'Antigua (presente en todos los metazoos)', adaptativa: 'Moderna (exclusiva de vertebrados mandibulados)' }
    ]
  },

  // Árbol genealógico celular (Mieloide vs Linfoide)
  CATALOGO_CELULAS: [
    { id: 'P08', nombre: 'Célula Madre Hematopoyética', linaje: 'Troncal', papel: 'Origen de todos los leucocitos' },
    { id: 'P09', nombre: 'Neutrófilo', linaje: 'Mieloide', papel: 'Fagocitosis de choque y primer respondedor' },
    { id: 'P10', nombre: 'Eosinófilo', linaje: 'Mieloide', papel: 'Defensa antiparasitaria y alergias' },
    { id: 'P11', nombre: 'Basófilo', linaje: 'Mieloide', papel: 'Secreción de histamina y respuesta inflamatoria' },
    { id: 'P12', nombre: 'Mastocito', linaje: 'Mieloide', papel: 'Inflamación tisular y desgranulación' },
    { id: 'P13', nombre: 'Monocito', linaje: 'Mieloide', papel: 'Circulante sanguíneo precursor de macrófagos' },
    { id: 'P14', nombre: 'Macrófago', linaje: 'Mieloide', papel: 'Fagocito mayor y barredor tisular' },
    { id: 'P15', nombre: 'Célula Dendrítica', linaje: 'Mieloide', papel: 'Presentación antigénica y puente inmune' },
    { id: 'P16', nombre: 'Glóbulo Rojo', linaje: 'Mieloide (No Inmune)', papel: 'Transporte de O₂ y CO₂' },
    { id: 'P17', nombre: 'Plaqueta', linaje: 'Mieloide (No Inmune)', papel: 'Coagulación y reparación vascular' },
    { id: 'P18', nombre: 'Linfocito B', linaje: 'Linfoide', papel: 'Producción de anticuerpos (inmunidad humoral)' },
    { id: 'P19', nombre: 'Linfocito T CD4+', linaje: 'Linfoide', papel: 'Coordinador general mediante citoquinas' },
    { id: 'P20', nombre: 'Linfocito T CD8+', linaje: 'Linfoide', papel: 'Destrucción celular directa por lisis' },
    { id: 'P21', nombre: 'Célula NK', linaje: 'Linfoide (Innata)', papel: 'Lisis rápida de células infectadas y tumorales' },
    { id: 'P22', nombre: 'Célula Plasmática', linaje: 'Linfoide', papel: 'Fábrica masiva de anticuerpos solubles' },
    { id: 'P23', nombre: 'Célula B de Memoria', linaje: 'Linfoide', papel: 'Recuerdo antigénico a largo plazo' },
    { id: 'P24', nombre: 'Célula T de Memoria', linaje: 'Linfoide', papel: 'Patrulla citotóxica y colaboradora duradera' }
  ],

  // Simulador del complemento: 3 vías de activación
  VIAS_COMPLEMENTO: {
    clasica: {
      nombre: 'Vía Clásica',
      iniciador: 'Complejo Antígeno - Anticuerpo (IgM o IgG unidas al patógeno)',
      complejoInicial: 'Complejo C1 (C1q, C1r, C1s)',
      convertasa: 'C4b2a (C3 convertasa clásica)',
      descripcion: 'Requiere anticuerpos previos. Es el mecanismo más potente que enlaza la respuesta adaptativa humoral con la lisis del complemento.'
    },
    alterna: {
      nombre: 'Vía Alterna',
      iniciador: 'Superficie directa de microorganismos (LPS bacteriano, pared fúngica)',
      complejoInicial: 'Hidrólisis espontánea de C3 (tick-over)',
      convertasa: 'C3bBb (C3 convertasa alterna)',
      descripcion: 'No requiere anticuerpos. Es inmediata y forma parte de la inmunidad innata ancestral.'
    },
    lectinas: {
      nombre: 'Vía de las Lectinas',
      iniciador: 'Lectina de unión a manosa (MBL) unida a azúcares de la pared microbiana',
      complejoInicial: 'Proteasas asociadas a MBL (MASP-1, MASP-2)',
      convertasa: 'C4b2a (C3 convertasa de lectinas)',
      descripcion: 'Reconoce patrones de carbohidratos ausentes en células humanas, activando la cascada sin anticuerpos.'
    }
  },

  // Glosario evaluativo con los 9 términos obligatorios del proyecto
  GLOSARIO_CHECKLIST: [
    {
      id: 'antigeno',
      termino: 'Antígeno',
      asset: 'P04',
      categoria: 'Concepto Fundamental',
      definicion: 'Toda sustancia o molécula que el sistema inmunitario reconoce como ajena al organismo ("no propia"), capaz de activar receptores de linfocitos y desencadenar una respuesta inmune defensiva.'
    },
    {
      id: 'anticuerpo',
      termino: 'Anticuerpo',
      asset: 'P32',
      categoria: 'Molécula Efectora',
      definicion: 'Proteína globular (inmunoglobulina) soluble sintetizada por linfocitos B y células plasmáticas. Consta de dos cadenas pesadas y dos ligeras con regiones hipervariables capaces de ligarse específicamente a un epítopo.'
    },
    {
      id: 'inmunidad_innata',
      termino: 'Inmunidad Innata',
      asset: 'P09',
      categoria: 'Línea de Defensa',
      definicion: 'Mecanismo de defensa inespecífico, inmediato y presente desde el nacimiento. Emplea barreras epiteliales, proteínas plasmáticas (complemento) y células fagocíticas sin generar memoria.'
    },
    {
      id: 'inmunidad_adaptativa',
      termino: 'Inmunidad Adaptativa',
      asset: 'P19',
      categoria: 'Línea de Defensa',
      definicion: 'Respuesta de alta especificidad generada por linfocitos T y B ante antígenos particulares. Incluye la selección y expansión clonal, la síntesis masiva de anticuerpos y la creación de memoria inmunológica.'
    },
    {
      id: 'celulas_inmunitarias',
      termino: 'Células del Sistema Inmunitario',
      asset: 'P08',
      categoria: 'Hematopoyesis',
      definicion: 'Conjunto de leucocitos generados en la médula ósea a partir de células madre hematopoyéticas, clasificados morfológica y funcionalmente en linaje mieloide y linfoide.'
    },
    {
      id: 'linfocitos_b',
      termino: 'Linfocitos B',
      asset: 'P18',
      categoria: 'Inmunidad Humoral',
      definicion: 'Células que maduran en la médula ósea. Poseen anticuerpos de membrana (BCR). Al reconocer a su antígeno y recibir señales de CD4+, se transforman en células plasmáticas productoras de anticuerpos.'
    },
    {
      id: 'linfocitos_t',
      termino: 'Linfocitos T',
      asset: 'P20',
      categoria: 'Inmunidad Celular',
      definicion: 'Células originadas en la médula ósea que maduran y se seleccionan en el timo. Se dividen en T CD4+ (colaboradores/helpers) y T CD8+ (citotóxicos). Reconocen antígenos acoplados al CMH mediante el receptor TCR.'
    },
    {
      id: 'sistema_complemento',
      termino: 'Sistema del Complemento',
      asset: 'P38',
      categoria: 'Bioquímica Inmunitaria',
      definicion: 'Conjunto de más de 30 proteínas plasmáticas termolábiles circulantes de forma inactiva. Al activarse por vía clásica, alterna o lectinas, opsonizan patógenos, inducen inflamación y lisan membranas con el poro MAC.'
    },
    {
      id: 'memoria_inmunologica',
      termino: 'Memoria Inmunológica',
      asset: 'P53',
      categoria: 'Fisiología Adaptativa',
      definicion: 'Capacidad del sistema inmunitario para recordar el contacto previo con un patógeno específico gracias a linfocitos B y T de larga vida. Garantiza que exposiciones posteriores desencadenen una respuesta ultrarrápida y eficaz.'
    }
  ]
};
