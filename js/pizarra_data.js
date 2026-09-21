/**
 * PIZARRA_DATA.JS — Datos de las 7 Estaciones de la Infografía Interactiva
 * Mapeo exacto de toda la historia biológica en 7 puntos en orden:
 * Fila superior: 1, 2, 3, 4
 * Fila inferior: 5, 6, 7
 * 
 * Regla de oro (AGENTS.md): Los textos de narración son EXACTOS.
 */

window.PIZARRA_DATA = {
  // Manifiesto de assets utilizados
  ASSETS: {
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

    // Sprites transparentes
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
    'P54': 'imagenes/assets/P54_respuesta_secundaria.png'
  },

  // 7 Estaciones organizadas exactamente según el esquema del usuario:
  // Fila 1 (arriba): Puntos 1, 2, 3, 4
  // Fila 2 (abajo):  Puntos 5, 6, 7
  ESTACIONES: [
    // -------------------------------------------------------------
    // PUNTO 1 (Fila 1, Pos 1): La Invasión y Barreras Innatas
    // -------------------------------------------------------------
    {
      id: 'punto_1',
      numero: '1',
      fila: 1,
      fondo: 'P45',
      faseNombre: '1. Puerta de Entrada y Barreras',
      titulo: 'Barreras Anatómicas y el Antígeno',
      narracion: [
        'Este es nuestro cuerpo humano. Un mundo complejo de aparatos y sistemas.',
        'Entre ellos, el sistema inmunitario, compuesto por todas las células, moléculas, órganos y tejidos que se encargan de defender a nuestro cuerpo de todos los antígenos.',
        'No es un órgano aislado, sino un sistema de vigilancia distribuido por todo el organismo.',
        'Un antígeno es toda molécula que el cuerpo reconoce como extraña y capaz de desencadenar una respuesta inmunitaria. Es decir, un guiri, un extranjero que quiere robarnos todos los dineros.',
        'Pueden ser desde virus, bacterias, hongos, parásitos, polen o tejidos trasplantados.',
        'Y su enemigo natural es el anticuerpo: una proteína producida por los linfocitos B que reconoce específicamente a un antígeno y facilita su neutralización y eliminación.',
        'La respuesta innata es la rápida, la inespecífica, la inmediata; es lo primero que se encuentra el patógeno antes de hacer nada, y está presente desde el nacimiento.',
        'Entre los métodos de defensa de esta inmunidad podemos encontrar barreras bioquímicas y físicas: la piel, los cilios, las mucosas, los MALT, los ácidos… y la microbiota.',
        'Imaginemos que el virus entra por la nariz, debido a un aerosol, por ejemplo el virus de la COVID-19.',
        'Lo primero que hace nuestro cuerpo de manera automática es intentar pararlo con los mecanismos físicos más básicos: pelos en la nariz, mucosas…'
      ],
      personajes: [
        { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula o patógeno foráneo reconocido como extraño.', x: 0.72, y: 0.58, scale: 0.26, anim: 'float' },
        { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca infectar células huésped.', x: 0.48, y: 0.42, scale: 0.22, anim: 'pulse' },
        { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Primera línea de barrera física hermética e infranqueable.', x: 0.22, y: 0.60, scale: 0.26, anim: 'float' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 2 (Fila 1, Pos 2): La Fábrica Hematopoyética
    // -------------------------------------------------------------
    {
      id: 'punto_2',
      numero: '2',
      fila: 1,
      fondo: 'P47',
      faseNombre: '2. Fábrica Celular',
      titulo: 'La Fábrica Celular: Médula Ósea',
      narracion: [
        'Y lo más importante, de lo que no hemos hablado aún: los policías que se encargan de que todo funcione bien.',
        'Vamos a hablar de las células, los leucocitos o glóbulos blancos, las verdaderas defensoras de todo.',
        'Vamos una por una. Se dividen en dos tipos según tengan o no gránulos visibles en el citoplasma: los granulocitos y los agranulocitos. Los granulocitos son los neutrófilos, los basófilos y los eosinófilos; los agranulocitos son los linfocitos y los monocitos.',
        'Además, todas vienen de células madre hematopoyéticas multipotenciales, situadas en la médula óseo, pero pueden venir de un progenitor linfoide o un progenitor mieloide.',
        'Las células mieloides son las que se encargan de la respuesta innata y las linfoides forman la respuesta adaptativa —ojo: las células NK son linfoides pero participan en la respuesta innata—.',
        'Vamos a ver las células mieloides, las de la respuesta innata: los glóbulos rojos y las plaquetas, que también derivan de este progenitor, aunque no son células inmunitarias: los glóbulos rojos transportan oxígeno y las plaquetas taponan las heridas.',
        'Los granulocitos que hemos visto antes y los monocitos, que al entrar en los tejidos se convierten en macrófagos, grandes comedores que fagocitan patógenos y restos celulares, y que además secretan citoquinas: mensajeros químicos que activan a otras células inmunitarias.',
        'Y las células dendríticas, las mejores presentadoras de antígeno: son el principal puente entre la inmunidad innata y la adaptativa.',
        'Los granulocitos: los neutrófilos son los más abundantes (60-70% de los leucocitos) y los primeros en llegar al foco de la infección; los eosinófilos atacan sobre todo parásitos; y los basófilos y los mastocitos liberan histamina, provocando inflamación y alergias.'
      ],
      personajes: [
        { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula pluripotencial precursora de todos los leucocitos.', x: 0.18, y: 0.50, scale: 0.28, anim: 'pulse' },
        { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Leucocito más abundante (60-70%), primer respondedor y fagocito.', x: 0.42, y: 0.40, scale: 0.24, anim: 'float' },
        { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Gran comedor fagocitario derivado de monocitos sanguíneos.', x: 0.65, y: 0.55, scale: 0.28, anim: 'float' },
        { id: 'nk', img: 'P21', nombre: 'Célula NK', desc: 'Linfocito innato destructor de infectadas y tumorales sin antígeno específico.', x: 0.85, y: 0.62, scale: 0.24, anim: 'pulse' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 3 (Fila 1, Pos 3): Alarma Tisular, Quimiotaxis y Fagocitosis
    // -------------------------------------------------------------
    {
      id: 'punto_3',
      numero: '3',
      fila: 1,
      fondo: 'P49',
      faseNombre: '3. Infección y Fagocitosis',
      titulo: 'Alarma Tisular, Quimiotaxis y Fagocitosis',
      narracion: [
        'Nuestro cuerpo es un poco malo y el virus ha comenzado a infectar células.',
        'Lo primero que entra en acción son las células de la respuesta inmunitaria innata.',
        'Los fagocitos (neutrófilos y macrófagos) comienzan a actuar. Comienzan a buscar patógenos de manera natural, como vigilantes de seguridad, atradídos por señales químicas que emiten las células dañadas (quimiotaxis).',
        'Allí los fagocitos hacen su proceso de fagocitosis: reconocen al microorganismo, lo engloban y lo destruyen en su interior, con su marcación u opsonización —los anticuerpos que marcan al patógeno reciben el nombre de opsoninas— y digestión con enzimas.'
      ],
      personajes: [
        { id: 'infectada', img: 'P30', nombre: 'Célula infectada', desc: 'Célula epitelial invadida por virus que emite señales de estrés.', x: 0.22, y: 0.62, scale: 0.28, anim: 'pulse' },
        { id: 'quimio', img: 'P43', nombre: 'Quimiotaxis', desc: 'Gradiente de citoquinas y quimioquinas que guía a los leucocitos.', x: 0.50, y: 0.52, scale: 0.25, anim: 'float' },
        { id: 'macro_comilon', img: 'P14', nombre: 'Macrófago', desc: 'Fagocita activamente invasores opsonizados mediante fagosomas.', x: 0.78, y: 0.58, scale: 0.28, anim: 'float' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 4 (Fila 1, Pos 4): El Sistema del Complemento
    // -------------------------------------------------------------
    {
      id: 'punto_4',
      numero: '4',
      fila: 1,
      fondo: 'P48',
      faseNombre: '4. Bioquímica del Complemento',
      titulo: 'El Sistema del Complemento',
      narracion: [
        'Por otra parte, podemos encontrarnos el sistema del complemento. Este es un conjunto de más de treinta proteínas plasmáticas termolábiles que circulan por la sangre de forma inactiva, y que se activan cuando detectan anomalías.',
        'Tiene tres vías de activación: la clásica (a través de un anticuerpo unido al antígeno), la alterna (directamente sobre la superficie de muchos microorganismos, sin anticuerpos) y la vía de las lectinas (cuando reconocen azúcares de la superficie del microbio), pero eso es otra cosa.',
        'Cuando se activa, el complemento marca al patógeno para los fagocitos, provoca inflamación reclutando más células al foco de la infección y puede lisar directamente al microorganismo.'
      ],
      personajes: [
        { id: 'dormido', img: 'P37', nombre: 'Proteínas del complemento', desc: 'Proteínas termolábiles sintetizadas en hígado que patrullan la sangre.', x: 0.25, y: 0.54, scale: 0.26, anim: 'float' },
        { id: 'cascada', img: 'P38', nombre: 'Cascada del complemento', desc: 'Activación proteolítica secuencial (C3 convertasa, C5 convertasa).', x: 0.55, y: 0.45, scale: 0.28, anim: 'pulse' },
        { id: 'mac_drill', img: 'P39', nombre: 'Complejo MAC', desc: 'Poro lítico (C5b-9) que perfora la envoltura y causa lisis osmótica.', x: 0.82, y: 0.58, scale: 0.28, anim: 'pulse' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 5 (Fila 2, Pos 1): Migración y Presentación Antigénica
    // -------------------------------------------------------------
    {
      id: 'punto_5',
      numero: '5',
      fila: 2,
      fondo: 'P51',
      faseNombre: '5. Presentación Antigénica',
      titulo: 'La Célula Dendrítica y el Ganglio Linfático',
      narracion: [
        'Por otra parte, las células dendríticas, que también van por allí, una vez captan los antígenos en los tejidos, maduran y viajan hasta los ganglios linfáticos.',
        'Allí, como células presentadoras de antígeno, muestran los fragmentos de estos virus unidos a sus moléculas del CMH (complejo mayor de histocompatibilidad, en inglés MHC), como si agitaran banderitas de alarma.',
        'Y es que los linfocitos T no pueden reconocer un antígeno libre: necesitan que otra célula se lo muestre, y lo detectan mediante su receptor TCR.',
        'Si la infección es grave, estas células presentan esos fragmentos de estos virus en los ganglios linfáticos a los linfocitos T y ya comienza la respuesta adaptativa.',
        'Los linfocitos T maduran en el timo y se dividen en dos equipos: los CD4+ colaboradores, que dirigen la respuesta liberando citoquinas, y los CD8+ citotóxicos, que eliminan células infectadas.'
      ],
      personajes: [
        { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Centinela que procesa el antígeno y viaja al ganglio linfático.', x: 0.26, y: 0.55, scale: 0.28, anim: 'float' },
        { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Molécula de superficie que exhibe el péptido antigénico.', x: 0.50, y: 0.46, scale: 0.28, anim: 'pulse' },
        { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II y orquesta la respuesta liberando citoquinas.', x: 0.78, y: 0.54, scale: 0.28, anim: 'float' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 6 (Fila 2, Pos 2): Batalla Adaptativa Celular y Humoral
    // -------------------------------------------------------------
    {
      id: 'punto_6',
      numero: '6',
      fila: 2,
      fondo: 'P50',
      faseNombre: '6. Inmunidad Celular y Humoral',
      titulo: 'Lisis por CD8+ y Expansión Clonal B',
      narracion: [
        'Una vez ha llegado a los ganglios, los linfocitos T ya se han enterado. Los T CD4+, que reconocen el antígeno presentado sobre moléculas CMH-II, activan a los linfocitos B liberando citoquinas.',
        'Y los T CD8+, que reconocen el antígeno sobre CMH-I en la superficie de las células infectadas, comienzan a eliminar por lisis todas las células que están plagadas de virus. Esta es la inmunidad celular, la que actúa contra los patógenos que viven dentro de las células.',
        'Los linfocitos B activados —que reconocen su antígeno específico y reciben la ayuda de los T CD4+— se dividen y se diferencian en células plasmáticas que generan anticuerpos, multiplicándose en lo que se llama la expansión clonal y comenzando la inmunidad humoral, la que actúa contra los patógenos extracelulares y sus toxinas.'
      ],
      personajes: [
        { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Elimina células infectadas que exhiben CMH-I mediante lisis.', x: 0.22, y: 0.52, scale: 0.28, anim: 'pulse' },
        { id: 'lysis', img: 'P31', nombre: 'Lisis celular', desc: 'Perforación e inducción de apoptosis de la célula infectada.', x: 0.46, y: 0.48, scale: 0.26, anim: 'float' },
        { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Célula de la inmunidad humoral productora de anticuerpos.', x: 0.70, y: 0.54, scale: 0.26, anim: 'float' },
        { id: 'plasmatica', img: 'P22', nombre: 'Célula plasmática', desc: 'Fábrica celular multiplicada por expansión clonal secretora de anticuerpos.', x: 0.88, y: 0.60, scale: 0.28, anim: 'pulse' }
      ]
    },

    // -------------------------------------------------------------
    // PUNTO 7 (Fila 2, Pos 3): Neutralización Terminal y Memoria
    // -------------------------------------------------------------
    {
      id: 'punto_7',
      numero: '7',
      fila: 2,
      fondo: 'P52',
      faseNombre: '7. Victoria y Memoria',
      titulo: 'Anticuerpos y Memoria Inmunológica',
      narracion: [
        'Estas células comienzan a formar anticuerpos: se trata de moléculas llamadas glicoproteínas o inmunoglobulinas (Ig) —las primeras en aparecer son las IgM y las más abundantes en sangre son las IgG—.',
        'Estos anticuerpos se unen a los epítopos, zonas concretas de la superficie de los virus, a los que atacan para neutralizarlos, facilitando su opsonización y su fagocitosis, además de activar el complemento.',
        'Además, también se crean linfocitos B y T de memoria que consiguen que, cuando todo acabe, el organismo recuerde a este patógeno.',
        'Y si vuelve a atacar, la respuesta será mucho más rápida y eficaz que la primera vez.',
        'Con todo esto acabamos el proceso de la respuesta inmunitaria. Muchas gracias.'
      ],
      personajes: [
        { id: 'anticuerpo', img: 'P32', nombre: 'Anticuerpo', desc: 'Proteína específica que neutraliza epítopos y activa el complemento.', x: 0.20, y: 0.46, scale: 0.26, anim: 'pulse' },
        { id: 'enjambre', img: 'P33', nombre: 'Neutralización', desc: 'Inmovilización y bloqueo masivo de los viriones.', x: 0.46, y: 0.52, scale: 0.30, anim: 'float' },
        { id: 'patrulla', img: 'P53', nombre: 'Linfocitos de memoria', desc: 'Vigilancia permanente de larga duración para respuesta secundaria inmediata.', x: 0.76, y: 0.50, scale: 0.30, anim: 'float' },
        { id: 'secundaria', img: 'P54', nombre: 'Respuesta secundaria', desc: 'Eliminación en cuestión de horas ante una segunda exposición.', x: 0.90, y: 0.60, scale: 0.26, anim: 'pulse' }
      ]
    }
  ]
};
