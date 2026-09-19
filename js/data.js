/**
 * DATA.JS — Manifiesto de assets, textos de narración exactos,
 * definiciones de escenas (S00–S21), fichas educativas y checklist.
 * 
 * Regla de oro (AGENTS.md): Los textos de narración son EXACTOS.
 * No reescribir, no resumir, no corregir estilo.
 */

window.DATA = {
  // Manifiesto de Assets: Mapeo de IDs a rutas reales
  ASSETS_MANIFEST: {
    // Fondos (16)
    'P01': 'imagenes/fondos/P01_portada.png',
    'P02': 'imagenes/fondos/P02_cuerpo.png',
    'P03': 'imagenes/fondos/P03_red_inmunitaria.png',
    'P05': 'imagenes/fondos/P05_carterista.png',
    'P06': 'imagenes/fondos/P06_bomba.png',
    'P07': 'imagenes/fondos/P07_dos_caminos.png',
    'P44': 'imagenes/fondos/P44_nariz.png',
    'P45': 'imagenes/fondos/P45_piel.png',
    'P46': 'imagenes/fondos/P46_mucosa.png',
    'P47': 'imagenes/fondos/P47_medula.png',
    'P48': 'imagenes/fondos/P48_vaso.png',
    'P49': 'imagenes/fondos/P49_tejido_infectado.png',
    'P50': 'imagenes/fondos/P50_ganglio.png',
    'P51': 'imagenes/fondos/P51_mapa_ganglios.png',
    'P52': 'imagenes/fondos/P52_tejido_sano.png',
    'P55': 'imagenes/fondos/P55_final.png',

    // Sprites de personajes y elementos (39)
    'P04': 'imagenes/assets/P04_guiri.png',
    'P08': 'imagenes/assets/P08_celula_madre.png',
    'P09': 'imagenes/assets/P09_neutrofilo.png',
    'P10': 'imagenes/assets/P10_eosinofilo.png',
    'P11': 'imagenes/assets/P11_basofilo.png',
    'P12': 'imagenes/assets/P12_mastocito.png',
    'P13': 'imagenes/assets/P13_monocito.png',
    'P14': 'imagenes/assets/P14_macrofago.png',
    'P15': 'imagenes/assets/P15_dendritica.png',
    'P16': 'imagenes/assets/P16_globulo_rojo.png',
    'P17': 'imagenes/assets/P17_plaqueta.png',
    'P18': 'imagenes/assets/P18_linfocito_B.png',
    'P19': 'imagenes/assets/P19_T_CD4.png',
    'P20': 'imagenes/assets/P20_T_CD8.png',
    'P21': 'imagenes/assets/P21_NK.png',
    'P22': 'imagenes/assets/P22_plasmatica.png',
    'P23': 'imagenes/assets/P23_B_memoria.png',
    'P24': 'imagenes/assets/P24_T_memoria.png',
    'P25': 'imagenes/assets/P25_virus.png',
    'P26': 'imagenes/assets/P26_virus_epitopos.png',
    'P27': 'imagenes/assets/P27_virus_opsonizado.png',
    'P28': 'imagenes/assets/P28_virus_perforado.png',
    'P29': 'imagenes/assets/P29_epitelial_sana.png',
    'P30': 'imagenes/assets/P30_epitelial_infectada.png',
    'P31': 'imagenes/assets/P31_lysis_CD8.png',
    'P32': 'imagenes/assets/P32_anticuerpo.png',
    'P33': 'imagenes/assets/P33_enjambre.png',
    'P34': 'imagenes/assets/P34_CMH.png',
    'P35': 'imagenes/assets/P35_TCR.png',
    'P36': 'imagenes/assets/P36_opsonina.png',
    'P37': 'imagenes/assets/P37_complemento_dormido.png',
    'P38': 'imagenes/assets/P38_cascada.png',
    'P39': 'imagenes/assets/P39_MAC_taladro.png',
    'P40': 'imagenes/assets/P40_citoquinas.png',
    'P41': 'imagenes/assets/P41_histamina.png',
    'P42': 'imagenes/assets/P42_expansion_clonal.png',
    'P43': 'imagenes/assets/P43_quimiotaxis.png',
    'P53': 'imagenes/assets/P53_memoria_patrulla.png',
    'P54': 'imagenes/assets/P54_respuesta_secundaria.png',

    // Recursos de minijuegos (G01-G20) en imagenes/juegos/
    'G01': 'imagenes/juegos/G01_macrofago_jugador.png',
    'G02': 'imagenes/juegos/G02_virus_corredero.png',
    'G03': 'imagenes/juegos/G03_virus_opsonina.png',
    'G04': 'imagenes/juegos/G04_bacteria_amiga.png',
    'G05': 'imagenes/juegos/G05_celula_sana.png',
    'G06': 'imagenes/juegos/G06_efecto_pop.png',
    'G07': 'imagenes/juegos/G07_icono_puntos.png',
    'G08': 'imagenes/juegos/G08_icono_tiempo.png',
    'G09': 'imagenes/juegos/G09_celula_infectada.png',
    'G10': 'imagenes/juegos/G10_celula_alarma_falsa.png',
    'G11': 'imagenes/juegos/G11_efecto_lisis.png',
    'G12': 'imagenes/juegos/G12_marco_ventana.png',
    'G13': 'imagenes/juegos/G13_CMH_estrella.png',
    'G14': 'imagenes/juegos/G14_CMH_hexagono.png',
    'G15': 'imagenes/juegos/G15_CMH_triangulo.png',
    'G16': 'imagenes/juegos/G16_TCR_estrella.png',
    'G17': 'imagenes/juegos/G17_TCR_hexagono.png',
    'G18': 'imagenes/juegos/G18_TCR_triangulo.png',
    'G19': 'imagenes/juegos/G19_chispa_encaje.png',
    'G20': 'imagenes/juegos/G20_efecto_error.png'
  },

  // Cajas delimitadoras precalculadas para recorte pixel-perfect en tiempo real
  ASSET_BBOXES: {
    "P04": [1260, 352, 1505, 1498],
    "P08": [1161, 318, 1543, 1524],
    "P09": [1449, 415, 999, 1265],
    "P10": [1415, 495, 1255, 1149],
    "P11": [1252, 339, 1554, 1439],
    "P12": [1120, 267, 1626, 1556],
    "P13": [1290, 630, 1286, 894],
    "P14": [1121, 420, 1617, 1361],
    "P15": [1151, 291, 1561, 1579],
    "P16": [1223, 480, 1417, 1240],
    "P17": [973, 537, 1916, 1086],
    "P18": [1316, 379, 1576, 1404],
    "P19": [1162, 420, 1501, 1239],
    "P20": [1125, 369, 1659, 1503],
    "P21": [1188, 461, 1545, 1238],
    "P22": [1275, 438, 1535, 1330],
    "P23": [1094, 428, 1599, 1304],
    "P24": [1275, 392, 1312, 1271],
    "P25": [1109, 430, 1463, 1414],
    "P26": [1306, 428, 1266, 1258],
    "P27": [1109, 394, 1509, 1450],
    "P28": [1279, 360, 1375, 1509],
    "P29": [1369, 579, 1128, 1002],
    "P30": [1317, 491, 1195, 1092],
    "P31": [426, 238, 3183, 1709],
    "P32": [1373, 487, 1120, 1186],
    "P33": [826, 18, 2214, 1896],
    "P34": [1154, 476, 1840, 1237],
    "P35": [1336, 577, 1161, 923],
    "P36": [1358, 177, 1150, 1627],
    "P37": [1101, 468, 1663, 1327],
    "P38": [679, 443, 2611, 1338],
    "P39": [1279, 495, 1308, 1134],
    "P40": [1309, 483, 1322, 1192],
    "P41": [863, 86, 2049, 1990],
    "P42": [343, 189, 3229, 1811],
    "P43": [271, 377, 3358, 1264],
    "P53": [1136, 518, 1602, 1313],
    "P54": [924, 134, 2049, 1891]
  },

  // Los 9 conceptos clave para el checklist
  CHECKLIST_ITEMS: [
    { id: 'antigeno', nombre: 'Antígeno', escena: 'S02' },
    { id: 'anticuerpo', nombre: 'Anticuerpo', escena: 'S02' },
    { id: 'inmunidad_innata', nombre: 'Inmunidad innata', escena: 'S03' },
    { id: 'inmunidad_adaptativa', nombre: 'Inmunidad adaptativa', escena: 'S03' },
    { id: 'celulas_inmunitarias', nombre: 'Células del sistema inmunitario', escena: 'S06' },
    { id: 'linfocitos_b', nombre: 'Linfocitos B', escena: 'S08' },
    { id: 'linfocitos_t', nombre: 'Linfocitos T', escena: 'S08' },
    { id: 'sistema_complemento', nombre: 'Sistema del complemento', escena: 'S05' },
    { id: 'memoria_inmunologica', nombre: 'Memoria inmunológica', escena: 'S20' }
  ],

  // Fichas educativas (Tarjetas de información)
  TARJETAS: {
    'antigeno': {
      titulo: 'ANTÍGENO',
      assetIcon: 'P04',
      checklistId: 'antigeno',
      texto: 'Toda molécula que el organismo reconoce como extraña y es capaz de desencadenar una respuesta inmunitaria. Pueden ser virus, bacterias, toxinas, polen o tejidos trasplantados.'
    },
    'anticuerpo': {
      titulo: 'ANTICUERPO',
      assetIcon: 'P32',
      checklistId: 'anticuerpo',
      texto: 'Glicoproteína (inmunoglobulina) producida por los linfocitos B y células plasmáticas. Reconoce con altísima especificidad a un epítopo antigénico, facilitando su neutralización y fagocitosis.'
    },
    'inmunidad_innata': {
      titulo: 'INMUNIDAD INNATA',
      assetIcon: 'P09',
      checklistId: 'inmunidad_innata',
      texto: 'Respuesta inmediata, inespecífica y presente desde el nacimiento. Constituye la primera línea de defensa mediante barreras físicas, químicas, el sistema del complemento y células fagocíticas.'
    },
    'inmunidad_adaptativa': {
      titulo: 'INMUNIDAD ADAPTATIVA',
      assetIcon: 'P19',
      checklistId: 'inmunidad_adaptativa',
      texto: 'Respuesta específica y altamente eficaz contra un antígeno concreto. Requiere presentación antigénica, tarda días en desarrollarse y genera memoria inmunológica duradera.'
    },
    'complemento': {
      titulo: 'SISTEMA DEL COMPLEMENTO',
      assetIcon: 'P38',
      checklistId: 'sistema_complemento',
      texto: 'Conjunto de más de 30 proteínas plasmáticas termolábiles circulantes inactivas. Al activarse por vía clásica, alterna o lectinas, opsonizan patógenos, reclutan células y perforan membranas (MAC).'
    },
    'fabrica_celulas': {
      titulo: 'CÉLULAS DEL SISTEMA INMUNITARIO',
      assetIcon: 'P08',
      checklistId: 'celulas_inmunitarias',
      texto: 'Se originan en la médula ósea a partir de células madre hematopoyéticas multipotenciales, ramificándose en progenitor mieloide (innata) y progenitor linfoide (adaptativa y células NK).'
    },
    'linfocito_b': {
      titulo: 'LINFOCITO B',
      assetIcon: 'P18',
      checklistId: 'linfocitos_b',
      texto: 'Madura en la médula ósea. Al reconocer su antígeno con la ayuda de CD4+, se multiplica por expansión clonal y se diferencia en células plasmáticas productoras de anticuerpos y células B de memoria.'
    },
    'linfocito_t': {
      titulo: 'LINFOCITOS T (CD4+ y CD8+)',
      assetIcon: 'P19',
      checklistId: 'linfocitos_t',
      texto: 'Maduran en el timo. Los CD4+ colaboradores liberan citoquinas orquestando la respuesta; los CD8+ citotóxicos reconocen células infectadas por CMH-I y las eliminan por lisis celular.'
    },
    'nk': {
      titulo: 'CÉLULAS NK (NATURAL KILLERS)',
      assetIcon: 'P21',
      checklistId: null,
      texto: 'Linfocitos de la inmunidad innata. Destruyen células infectadas por virus y células tumorales sin necesidad de reconocimiento antigénico específico previo.'
    },
    'memoria': {
      titulo: 'MEMORIA INMUNOLÓGICA',
      assetIcon: 'P53',
      checklistId: 'memoria_inmunologica',
      texto: 'Células B y T de memoria patrullan el organismo permanentemente. Ante una segunda exposición al mismo antígeno, desencadenan una respuesta secundaria inmediata, potente y masiva.'
    }
  },

  // Definición completa de las 22 escenas (S00–S21)
  ESCENAS: [
    {
      id: 'S00',
      titulo: 'Portada',
      etapa: 1, // 1. Entrada
      fondo: 'P01',
      narracion: [
        '¿Qué ocurre desde que entra un microorganismo en nuestro organismo hasta que es eliminado?'
      ],
      elementos: [
        { id: 'virus_portada', img: 'P25', pos: [0.85, 0.72], scale: 0.28, entra: 'fadeIn(0.8)', bucle: 'float' }
      ],
      timeline: [
        { t: 0.5, accion: 'virus_portada.pulse' }
      ],
      interaccion: { tipo: 'portada' }
    },

    {
      id: 'S01',
      titulo: 'Nuestro cuerpo',
      etapa: 1,
      fondo: 'P02',
      fondoTransicion: { entra: 'slideFrom(bottom, 1.2, easeOutCubic)' },
      narracion: [
        'Este es nuestro cuerpo humano. Un mundo complejo de aparatos y sistemas.',
        'Entre ellos, el sistema inmunitario, compuesto por todas las células, moléculas, órganos y tejidos que se encargan de defender a nuestro cuerpo de todos los antígenos.',
        'No es un órgano aislado, sino un sistema de vigilancia distribuido por todo el organismo.'
      ],
      elementos: [
        { id: 'red_inmune', img: 'P03', pos: [0.5, 0.5], scale: 1.0, alpha: 0, entra: null }
      ],
      timeline: [
        { paso: 1, accion: 'red_inmune.crossfadeIn(0.8)' },
        { paso: 2, accion: 'camera.zoomIn(1.3, 1.5)' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S02',
      titulo: 'El antígeno',
      etapa: 1,
      fondo: 'P02',
      narracion: [
        'Un antígeno es toda molécula que el cuerpo reconoce como extraña y capaz de desencadenar una respuesta inmunitaria. Es decir, un guiri, un extranjero que quiere robarnos todos los dineros.',
        'Pueden ser desde virus, bacterias, hongos, parásitos, polen o tejidos trasplantados.',
        'Y su enemigo natural es el anticuerpo: una proteína producida por los linfocitos B que reconoce específicamente a un antígeno y facilita su neutralización y eliminación.'
      ],
      elementos: [
        { id: 'guiri', img: 'P04', pos: [0.65, 0.55], scale: 0.38, entra: 'slideFrom(right, 0.8, easeOutQuad)', bucle: 'float', interactivo: true, tarjeta: 'antigeno' }
      ],
      timeline: [
        { paso: 0, t: 0.1, accion: 'camera.zoomIn(1.5, 1.2)' },
        { paso: 0, t: 1.2, accion: 'guiri.shake(6)' },
        { paso: 0, t: 1.8, accion: 'guiri.pulse' },
        { paso: 0, t: 2.0, accion: 'burstBilletes' }
      ],
      interaccion: { tipo: 'tarjetas' }
    },

    {
      id: 'S03',
      titulo: 'Dos tipos de amenaza',
      etapa: 2, // 2. Innata
      fondo: 'P05',
      narracion: [
        'Está claro que nuestro sistema no va a atacar de la misma manera a un tipo de ataques que a otros. No es lo mismo un carterista que un aviso de bomba en una ciudad importante.',
        'Por eso, podemos distinguir entre dos tipos de respuestas: la respuesta innata y adaptativa.'
      ],
      elementos: [],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S04',
      titulo: 'Barreras innatas',
      etapa: 2,
      fondo: 'P45',
      narracion: [
        'La respuesta innata es la rápida, la inespecífica, la inmediata; es lo primero que se encuentra el patógeno antes de hacer nada, y está presente desde el nacimiento.',
        'Entre los métodos de defensa de esta inmunidad podemos encontrar barreras bioquímicas y físicas: la piel, los cilios, las mucosas, los MALT, los ácidos… y la microbiota.'
      ],
      elementos: [],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S05',
      titulo: 'El complemento',
      etapa: 2,
      fondo: 'P48',
      narracion: [
        'Por otra parte, podemos encontrarnos el sistema del complemento. Este es un conjunto de más de treinta proteínas plasmáticas termolábiles que circulan por la sangre de forma inactiva, y que se activan cuando detectan anomalías.',
        'Tiene tres vías de activación: la clásica (a través de un anticuerpo unido al antígeno), la alterna (directamente sobre la superficie de muchos microorganismos, sin anticuerpos) y la vía de las lectinas (cuando reconocen azúcares de la superficie del microbio), pero eso es otra cosa.',
        'Cuando se activa, el complemento marca al patógeno para los fagocitos, provoca inflamación reclutando más células al foco de la infección y puede lisar directamente al microorganismo.'
      ],
      elementos: [
        { id: 'dormido', img: 'P37', pos: [0.5, 0.5], scale: 0.35, entra: 'fadeIn(0.8)', bucle: 'float', interactivo: true, tarjeta: 'complemento' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S06',
      titulo: 'La fábrica de células',
      etapa: 2,
      fondo: 'P47',
      narracion: [
        'Y lo más importante, de lo que no hemos hablado aún: los policías que se encargan de que todo funcione bien.',
        'Vamos a hablar de las células, los leucocitos o glóbulos blancos, las verdaderas defensoras de todo.',
        'Vamos una por una. Se dividen en dos tipos según tengan o no gránulos visibles en el citoplasma: los granulocitos y los agranulocitos. Los granulocitos son los neutrófilos, los basófilos y los eosinófilos; los agranulocitos son los linfocitos y los monocitos.',
        'Además, todas vienen de células madre hematopoyéticas multipotenciales, situadas en la médula óseo, pero pueden venir de un progenitor linfoide o un progenitor mieloide.',
        'Las células mieloides son las que se encargan de la respuesta innata y las linfoides forman la respuesta adaptativa —ojo: las células NK son linfoides pero participan en la respuesta innata—.'
      ],
      elementos: [
        { id: 'celula_madre', img: 'P08', pos: [0.5, 0.45], scale: 0.35, entra: 'popIn', bucle: 'float', interactivo: true, tarjeta: 'fabrica_celulas' }
      ],
      interaccion: { tipo: 'tarjetas' }
    },

    {
      id: 'S07',
      titulo: 'Desfile mieloide',
      etapa: 2,
      fondo: 'P47',
      narracion: [
        'Vamos a ver las células mieloides, las de la respuesta innata: los glóbulos rojos y las plaquetas, que también derivan de este progenitor, aunque no son células inmunitarias: los glóbulos rojos transportan oxígeno y las plaquetas taponan las heridas.',
        'Los granulocitos que hemos visto antes y los monocitos, que al entrar en los tejidos se convierten en macrófagos, grandes comedores que fagocitan patógenos y restos celulares, y que además secretan citoquinas: mensajeros químicos que activan a otras células inmunitarias.',
        'Y las células dendríticas, las mejores presentadoras de antígeno: son el principal puente entre la inmunidad innata y la adaptativa.',
        'Los granulocitos: los neutrófilos son los más abundantes (60-70% de los leucocitos) y los primeros en llegar al foco de la infección; los eosinófilos atacan sobre todo parásitos; y los basófilos y los mastocitos liberan histamina, provocando inflamación y alergias.'
      ],
      elementos: [
        { id: 'neutrofilo', img: 'P09', pos: [0.25, 0.4], scale: 0.22, entra: 'slideFrom(left, 0.5)', bucle: 'float', interactivo: true },
        { id: 'macrofago', img: 'P14', pos: [0.5, 0.4], scale: 0.25, entra: 'slideFrom(left, 0.6)', bucle: 'float', interactivo: true },
        { id: 'dendritica', img: 'P15', pos: [0.75, 0.4], scale: 0.25, entra: 'slideFrom(left, 0.7)', bucle: 'float', interactivo: true }
      ],
      interaccion: { tipo: 'tarjetas' }
    },

    {
      id: 'S08',
      titulo: 'Desfile linfoide',
      etapa: 2,
      fondo: 'P47',
      narracion: [
        'Ahora veamos las células de la parte linfoide, las de la respuesta adaptativa: los linfocitos B y los linfocitos T, además de las NK o natural killers, que aunque son linfoides pertenecen a la respuesta innata porque destruyen células infectadas y tumorales sin necesidad de reconocer un antígeno específico.',
        'Los mastocitos, en cambio, son mieloides.',
        'Los linfocitos B maduran en la médula óseo (de ahí su inicial) y producen anticuerpos; los linfocitos T maduran en el timo y se dividen en dos equipos: los CD4+ colaboradores, que dirigen la respuesta liberando citoquinas, y los CD8+ citotóxicos, que eliminan células infectadas.',
        'Vamos a imaginar que entra un virus malo en nuestro cuerpo. Gracias a esto vamos a explicar todos los procesos del sistema inmunitario.'
      ],
      elementos: [
        { id: 'linfocito_b', img: 'P18', pos: [0.25, 0.45], scale: 0.25, entra: 'slideFrom(left, 0.5)', bucle: 'float', interactivo: true, tarjeta: 'linfocito_b' },
        { id: 'linfocito_t_cd4', img: 'P19', pos: [0.5, 0.45], scale: 0.25, entra: 'slideFrom(left, 0.6)', bucle: 'float', interactivo: true, tarjeta: 'linfocito_t' },
        { id: 'nk', img: 'P21', pos: [0.75, 0.45], scale: 0.25, entra: 'slideFrom(left, 0.7)', bucle: 'float', interactivo: true, tarjeta: 'nk' }
      ],
      interaccion: { tipo: 'tarjetas' }
    },

    {
      id: 'S09',
      titulo: 'Entra el virus',
      etapa: 1, // Entrada
      fondo: 'P44',
      narracion: [
        'Imaginemos que el virus entra por la nariz, debido a un aerosol, por ejemplo el virus de la COVID-19.',
        'Lo primero que hace nuestro cuerpo de manera automática es intentar pararlo con los mecanismos físicos más básicos: pelos en la nariz, mucosas…'
      ],
      elementos: [
        { id: 'virus_invasor', img: 'P25', pos: [0.5, 0.4], scale: 0.25, entra: 'zoomIn(1.8)', bucle: 'float' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S10',
      titulo: 'La barrera falla',
      etapa: 2, // Innata
      fondo: 'P49',
      narracion: [
        'Nuestro cuerpo es un poco malo y el virus ha comenzado a infectar células.',
        'Lo primero que entra en acción son las células de la respuesta inmunitaria innata.'
      ],
      elementos: [
        { id: 'celula_infectada', img: 'P30', pos: [0.5, 0.5], scale: 0.3, entra: 'fadeIn(0.5)', bucle: 'shake' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S11',
      titulo: 'Quimiotaxis',
      etapa: 2,
      fondo: 'P49',
      narracion: [
        'Los fagocitos (neutrófilos y macrófagos) comienzan a actuar. Comienzan a buscar patógenos de manera natural, como vigilantes de seguridad, atradídos por señales químicas que emiten las células dañadas (quimiotaxis).'
      ],
      elementos: [
        { id: 'quimiotaxis_efecto', img: 'P43', pos: [0.5, 0.5], scale: 0.45, entra: 'fadeIn(0.5)', bucle: 'float' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S12',
      titulo: 'Los fagocitos actúan',
      etapa: 2,
      fondo: 'P49',
      narracion: [
        'Allí los fagocitos hacen su proceso de fagocitosis: reconocen al microorganismo, lo engloban y lo destruyen en su interior, con su marcación u opsonización —los anticuerpos que marcan al patógeno reciben el nombre de opsoninas— y digestión con enzimas.'
      ],
      elementos: [
        { id: 'macrofago_come', img: 'P14', pos: [0.5, 0.5], scale: 0.35, entra: 'popIn', bucle: 'float' }
      ],
      interaccion: { tipo: 'minijuego', juego: 1 }
    },

    {
      id: 'S13',
      titulo: 'La dendrítica viaja al ganglio',
      etapa: 3, // 3. Presentación
      fondo: 'P51',
      narracion: [
        'Por otra parte, las células dendríticas, que también van por allí, una vez captan los antígenos en los tejidos, maduran y viajan hasta los ganglios linfáticos.',
        'Allí, como células presentadoras de antígeno, muestran los fragmentos de estos virus unidos a sus moléculas del CMH (complejo mayor de histocompatibilidad, en inglés MHC), como si agitaran banderitas de alarma.',
        'Y es que los linfocitos T no pueden reconocer un antígeno libre: necesitan que otra célula se lo muestre, y lo detectan mediante su receptor TCR.'
      ],
      elementos: [
        { id: 'dendritica_viajera', img: 'P15', pos: [0.35, 0.6], scale: 0.22, entra: 'fadeIn(0.5)', bucle: 'float' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S14',
      titulo: 'Presentación antigénica',
      etapa: 3,
      fondo: 'P50',
      narracion: [
        'Si la infección es grave, estas células presentan esos fragmentos de estos virus en los ganglios linfáticos a los linfocitos T y ya comienza la respuesta adaptativa.'
      ],
      elementos: [
        { id: 'cmh_dock', img: 'P34', pos: [0.5, 0.45], scale: 0.32, entra: 'popIn', bucle: 'float' }
      ],
      interaccion: { tipo: 'minijuego', juego: 3 }
    },

    {
      id: 'S15',
      titulo: 'Los CD8+ atacan',
      etapa: 4, // 4. Adaptativa
      fondo: 'P49',
      narracion: [
        'Una vez ha llegado a los ganglios, los linfocitos T ya se han enterado. Los T CD4+, que reconocen el antígeno presentado sobre moléculas CMH-II, activan a los linfocitos B liberando citoquinas.',
        'Y los T CD8+, que reconocen el antígeno sobre CMH-I en la superficie de las células infectadas, comienzan a eliminar por lisis todas las células que están plagadas de virus. Esta es la inmunidad celular, la que actúa contra los patógenos que viven dentro de las células.'
      ],
      elementos: [
        { id: 'cd8_ninja', img: 'P20', pos: [0.35, 0.45], scale: 0.3, entra: 'slideFrom(left, 0.6)', bucle: 'float' },
        { id: 'lisis_accion', img: 'P31', pos: [0.65, 0.45], scale: 0.35, entra: 'popIn', bucle: 'pulse' }
      ],
      interaccion: { tipo: 'minijuego', juego: 2 }
    },

    {
      id: 'S16',
      titulo: 'Los CD4+ dirigen',
      etapa: 4,
      fondo: 'P50',
      narracion: [
        'Los linfocitos B activados —que reconocen su antígeno específico y reciben la ayuda de los T CD4+— se dividen y se diferencian en células plasmáticas que generan anticuerpos, multiplicándose en lo que se llama la expansión clonal y comenzando la inmunidad humoral, la que actúa contra los patógenos extracelulares y sus toxinas.'
      ],
      elementos: [
        { id: 'cd4_director', img: 'P19', pos: [0.3, 0.45], scale: 0.3, entra: 'popIn', bucle: 'float' },
        { id: 'expansion', img: 'P42', pos: [0.65, 0.45], scale: 0.4, entra: 'fadeIn(0.8)', bucle: 'pulse' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S17',
      titulo: 'Fábrica de anticuerpos',
      etapa: 4,
      fondo: 'P48',
      narracion: [
        'Estas células comienzan a formar anticuerpos: se trata de moléculas llamadas glicoproteínas o inmunoglobulinas (Ig) —las primeras en aparecer son las IgM y las más abundantes en sangre son las IgG—.'
      ],
      elementos: [
        { id: 'plasmatica_forja', img: 'P22', pos: [0.4, 0.5], scale: 0.32, entra: 'fadeIn(0.5)', bucle: 'float' },
        { id: 'anticuerpo_arma', img: 'P32', pos: [0.68, 0.45], scale: 0.28, entra: 'popIn', bucle: 'float' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S18',
      titulo: 'La batalla final',
      etapa: 5, // 5. Eliminación
      fondo: 'P49',
      narracion: [
        'Estos anticuerpos se unen a los epítopos, zonas concretas de la superficie de los virus, a los que atacan para neutralizarlos, facilitando su opsonización y su fagocitosis, además de activar el complemento.'
      ],
      elementos: [
        { id: 'virus_blanco', img: 'P26', pos: [0.5, 0.45], scale: 0.35, entra: 'fadeIn(0.5)', bucle: 'float' }
      ],
      interaccion: { tipo: 'batalla_epitopos' }
    },

    {
      id: 'S19',
      titulo: 'Victoria',
      etapa: 5,
      fondo: 'P52',
      narracion: [
        'Además, también se crean linfocitos B y T de memoria que consiguen que, cuando todo acabe, el organismo recuerde a este patógeno.'
      ],
      elementos: [
        { id: 'b_memoria_saludo', img: 'P23', pos: [0.35, 0.5], scale: 0.3, entra: 'popIn', bucle: 'float' },
        { id: 't_memoria_saludo', img: 'P24', pos: [0.65, 0.5], scale: 0.3, entra: 'popIn', bucle: 'float' }
      ],
      interaccion: { tipo: 'cinematica' }
    },

    {
      id: 'S20',
      titulo: 'Memoria inmunológica',
      etapa: 6, // 6. Memoria
      fondo: 'P52',
      narracion: [
        'Y si vuelve a atacar, la respuesta será mucho más rápida y eficaz que la primera vez.'
      ],
      elementos: [
        { id: 'patrulla_memoria', img: 'P53', pos: [0.35, 0.5], scale: 0.35, entra: 'slideFrom(left, 0.8)', bucle: 'float', interactivo: true, tarjeta: 'memoria' },
        { id: 'ataque_secundario', img: 'P54', pos: [0.72, 0.5], scale: 0.35, entra: 'popIn', bucle: 'pulse' }
      ],
      interaccion: { tipo: 'tarjetas' }
    },

    {
      id: 'S21',
      titulo: 'Final',
      etapa: 6,
      fondo: 'P55',
      narracion: [
        'Con todo esto acabamos el proceso de la respuesta inmunitaria. Muchas gracias.'
      ],
      elementos: [],
      interaccion: { tipo: 'final' }
    }
  ]
};
