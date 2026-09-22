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
      fondo: 'P45', // Fondo representativo para la tarjeta del panel principal
      faseNombre: '1. Puerta de Entrada y Barreras',
      titulo: 'Barreras Anatómicas y el Antígeno',
      narracion: [
        'Este es nuestro cuerpo humano. Un mundo complejo de aparatos y sistemas.',
        'Entre ellos, el sistema inmunitario, compuesto por todas las células, moléculas, órganos y tejidos que se encargan de defender a nuestro cuerpo de todos los antígenos.',
        'No es un órgano aislado, sino un sistema de vigilancia distribuido por todo el organismo.',
        'Un antígeno es toda molécula que el cuerpo reconoce como extraña y capaz de desencadenar una respuesta inmunitaria. Es decir, un guiri, un extranjero que quiere robarnos todos los dineros.',
        'Pueden ser desde virus, bacterias, hongos, parásitos, polen o tejidos trasplantados.',
        'Y su enemigo natural es el anticuerpo: una proteína producida por los linfocitos B que reconoce específicamente a un antígeno y facilita su neutralización y eliminación.',
        'Está claro que nuestro sistema no va a atacar de la misma manera a un tipo de ataques que a otros. No es lo mismo un carterista que un aviso de bomba en una ciudad importante.',
        'Por eso, podemos distinguir entre dos tipos de respuestas: la respuesta innata y adaptativa.',
        'La respuesta innata es la rápida, la inespecífica, la inmediata; es lo primero que se encuentra el patógeno antes de hacer nada, y está presente desde el nacimiento.',
        'Entre los métodos de defensa de esta inmunidad podemos encontrar barreras bioquímicas y físicas: la piel, los cilios, las mucosas, los MALT, los ácidos… y la microbiota.',
        'Imaginemos que el virus entra por la nariz, debido a un aerosol, por ejemplo el virus de la COVID-19.',
        'Lo primero que hace nuestro cuerpo de manera automática es intentar pararlo con los mecanismos físicos más básicos: pelos en la nariz, mucosas…'
      ],
      personajes: [
        // Personajes por defecto para visualización general
        { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula foránea que desencadena la respuesta defensiva.', x: 0.72, y: 0.58, scale: 0.28, anim: 'float' },
        { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca replicarse en células huésped.', x: 0.48, y: 0.42, scale: 0.22, anim: 'pulse' },
        { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Muralla celular externa y protectora del organismo.', x: 0.22, y: 0.60, scale: 0.28, anim: 'float' }
      ],
      // Definición paso a paso del dinamismo biológico de las escenas de AGENTS.md
      pasos: [
        // S01: Nuestro cuerpo (Fondo P02, red inmunitaria P03)
        {
          fondo: 'P02',
          fondoAnim: 'slide-up',
          overlay: null,
          personajes: []
        },
        {
          fondo: 'P02',
          overlay: 'P03', // Se enciende la red inmunitaria
          burst: { x: 0.5, y: 0.45, tipo: 'spark' },
          personajes: []
        },
        {
          fondo: 'P02',
          overlay: 'P03',
          personajes: []
        },
        // S02: El antígeno (Fondo P02, Guiri P04 entra con animación, sin badge inicial, callout en grande con flecha)
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.65, y: 0.48, tipo: 'gold' },
          personajes: [
            {
              id: 'guiri',
              img: 'P04',
              nombre: 'Antígeno',
              desc: 'Molécula foránea que desencadena la respuesta defensiva.',
              x: 0.65,
              y: 0.48,
              scale: 1.3,
              entra: 'slideRight',
              anim: 'float',
              sinBadge: true
            }
          ],
          callout: {
            texto: 'ANTÍGENO',
            x: 0.36,
            y: 0.44,
            flechaDir: 'right',
            delay: 700
          }
        },
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.28, y: 0.46, tipo: 'spark' },
          personajes: [
            { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula foránea que desencadena la respuesta defensiva.', x: 0.65, y: 0.48, scale: 1.15, entra: null, anim: 'float' },
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca replicarse en células huésped.', x: 0.28, y: 0.46, scale: 1.1, entra: 'pop', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.80, y: 0.46, tipo: 'spark' },
          personajes: [
            { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula foránea que desencadena la respuesta defensiva.', x: 0.50, y: 0.48, scale: 1.1, entra: null, anim: 'float' },
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca replicarse en células huésped.', x: 0.22, y: 0.46, scale: 1.05, entra: null, anim: 'pulse' },
            { id: 'anticuerpo', img: 'P32', nombre: 'Anticuerpo', desc: 'Inmunoglobulina producida por linfocitos B para neutralizar patógenos.', x: 0.80, y: 0.46, scale: 1.15, entra: 'slideRight', anim: 'float' }
          ]
        },
        // S03: Dos tipos de amenaza (Fondo P05 carterista -> P07 dos caminos innata y adaptativa)
        {
          fondo: 'P05',
          overlay: null,
          shakeStage: true,
          personajes: []
        },
        {
          fondo: 'P07',
          overlay: null,
          decorado: 'dos_caminos',
          personajes: []
        },
        // S04: Barreras innatas (Fondo P45 piel -> P46 mucosa)
        {
          fondo: 'P45',
          overlay: null,
          burst: { x: 0.50, y: 0.54, tipo: 'spark' },
          personajes: [
            { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Barrera física queratinizada que bloquea la penetración microbiana.', x: 0.50, y: 0.54, scale: 0.32, entra: 'pop', anim: 'float' }
          ]
        },
        {
          fondo: 'P46',
          overlay: null,
          decorado: 'barreras',
          personajes: [
            { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Barrera física queratinizada que bloquea la penetración microbiana.', x: 0.26, y: 0.54, scale: 0.28, entra: null, anim: 'float' }
          ]
        },
        // S09: Entra el virus (Fondo P44 nariz, aerosoles y virus filtrándose)
        {
          fondo: 'P44',
          overlay: null,
          burst: { x: 0.50, y: 0.38, tipo: 'aerosol' },
          personajes: [
            { id: 'virus_nasal', img: 'P25', nombre: 'Virus', desc: 'Partícula viral transportada por microgotas de aerosol.', x: 0.50, y: 0.38, scale: 0.28, entra: 'zoom', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P44',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.32, y: 0.58, tipo: 'spark' },
          personajes: [
            { id: 'virus_atrapado', img: 'P25', nombre: 'Virus', desc: 'Patógeno inmovilizado por la barrera física de cilios y moco.', x: 0.32, y: 0.58, scale: 0.23, entra: null, anim: 'trapped' },
            { id: 'virus_infiltrado', img: 'P25', nombre: 'Virus', desc: 'Virus que logra superar el filtrado mecánico nasal.', x: 0.74, y: 0.42, scale: 0.25, entra: 'slideRight', anim: 'pulse' }
          ]
        }
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
      titulo: 'La Fábrica Celular: Médula Ósea y Linajes',
      narracion: [
        'Y lo más importante, de lo que no hemos hablado aún: los policías que se encargan de que todo funcione bien.',
        'Vamos a hablar de las células, los leucocitos o glóbulos blancos, las verdaderas defensoras de todo.',
        'Vamos una por una. Se dividen en dos tipos según tengan o no gránulos visibles en el citoplasma: los granulocitos y los agranulocitos. Los granulocitos son los neutrófilos, los basófilos y los eosinófilos; los agranulocitos son los linfocitos y los monocitos.',
        'Además, todas vienen de células madre hematopoyéticas multipotenciales, situadas en la médula óseo, pero pueden venir de un progenitor linfoide o un progenitor mieloide.',
        'Las células mieloides son las que se encargan de la respuesta innata y las linfoides forman la respuesta adaptativa —ojo: las células NK son linfoides pero participan en la respuesta innata—.',
        'Vamos a ver las células mieloides, las de la respuesta innata: los glóbulos rojos y las plaquetas, que también derivan de este progenitor, aunque no son células inmunitarias: los glóbulos rojos transportan oxígeno y las plaquetas taponan las heridas.',
        'Los granulocitos que hemos visto antes y los monocitos, que al entrar en los tejidos se convierten en macrófagos, grandes comedores que fagocitan patógenos y restos celulares, y que además secretan citoquinas: mensajeros químicos que activan a otras células inmunitarias.',
        'Y las células dendríticas, las mejores presentadoras de antígeno: son el principal puente entre la inmunidad innata y la adaptativa.',
        'Los granulocitos: los neutrófilos son los más abundantes (60-70% de los leucocitos) y los primeros en llegar al foco de la infección; los eosinófilos atacan sobre todo parásitos; y los basófilos y los mastocitos liberan histamina, provocando inflamación y alergias.',
        'Ahora veamos las células de la parte linfoide, las de la respuesta adaptativa: los linfocitos B y los linfocitos T, además de las NK o natural killers, que aunque son linfoides pertenecen a la respuesta innata porque destruyen células infectadas y tumorales sin necesidad de reconocer un antígeno específico.',
        'Los mastocitos, en cambio, son mieloides.',
        'Los linfocitos B maduran en la médula óseo (de ahí su inicial) y producen anticuerpos; los linfocitos T maduran en el timo y se dividen en dos equipos: los CD4+ colaboradores, que dirigen la respuesta liberando citoquinas, y los CD8+ citotóxicos, que eliminan células infectadas.',
        'Vamos a imaginar que entra un virus malo en nuestro cuerpo. Gracias a esto vamos a explicar todos los procesos del sistema inmunitario.'
      ],
      personajes: [
        { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula pluripotencial precursora de todos los leucocitos.', x: 0.18, y: 0.50, scale: 0.28, anim: 'pulse' },
        { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Leucocito más abundante (60-70%), primer respondedor y fagocito.', x: 0.42, y: 0.40, scale: 0.24, anim: 'float' },
        { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Gran comedor fagocitario derivado de monocitos sanguíneos.', x: 0.65, y: 0.55, scale: 0.28, anim: 'float' },
        { id: 'nk', img: 'P21', nombre: 'Célula NK', desc: 'Linfocito innato destructor de infectadas y tumorales sin antígeno específico.', x: 0.85, y: 0.62, scale: 0.24, anim: 'pulse' }
      ],
      pasos: [
        // S06
        {
          fondo: 'P47',
          fondoAnim: 'slide-up',
          overlay: null,
          personajes: []
        },
        {
          fondo: 'P47',
          overlay: null,
          personajes: []
        },
        {
          fondo: 'P47',
          overlay: null,
          personajes: []
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.48, tipo: 'gold' },
          personajes: [
            { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula multipotencial precursora de todos los leucocitos.', x: 0.50, y: 0.48, scale: 0.35, entra: 'pop', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          decorado: 'linajes',
          personajes: [
            { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula multipotencial precursora de todos los leucocitos.', x: 0.50, y: 0.34, scale: 0.28, entra: null, anim: 'pulse' }
          ]
        },
        // S07: Desfile mieloide
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'globulo_rojo', img: 'P16', nombre: 'Glóbulo rojo', desc: 'Transporta oxígeno unido a hemoglobina.', x: 0.35, y: 0.52, scale: 0.28, entra: 'slideRight', anim: 'float' },
            { id: 'plaqueta', img: 'P17', nombre: 'Plaqueta', desc: 'Fragmento celular que tapona heridas (hemostasia).', x: 0.65, y: 0.52, scale: 0.26, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'monocito', img: 'P13', nombre: 'Monocito', desc: 'Leucocito agranulocito que patrulla en sangre.', x: 0.32, y: 0.52, scale: 0.28, entra: 'pop', anim: 'float' },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Gran comedor fagocitario secretor de citoquinas.', x: 0.68, y: 0.52, scale: 0.32, entra: 'slideRight', anim: 'float' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Puente clave entre la inmunidad innata y adaptativa.', x: 0.50, y: 0.50, scale: 0.32, entra: 'pop', anim: 'float' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Primer respondedor celular (60-70% de leucocitos).', x: 0.20, y: 0.52, scale: 0.25, entra: 'slideRight', anim: 'float' },
            { id: 'eosinofilo', img: 'P10', nombre: 'Eosinófilo', desc: 'Especialista en defensa contra helmintos y parásitos.', x: 0.40, y: 0.52, scale: 0.25, entra: 'slideRight', anim: 'float' },
            { id: 'basofilo', img: 'P11', nombre: 'Basófilo', desc: 'Granulocito liberador de histamina e inflamación.', x: 0.60, y: 0.52, scale: 0.25, entra: 'slideRight', anim: 'float' },
            { id: 'mastocito', img: 'P12', nombre: 'Mastocito', desc: 'Célula tisular mieloide inductora de alergias e histamina.', x: 0.80, y: 0.52, scale: 0.25, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        // S08: Desfile linfoide
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Madura en médula y produce anticuerpos específicos.', x: 0.25, y: 0.50, scale: 0.28, entra: 'pop', anim: 'float' },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Colaborador que orquesta la respuesta liberando citoquinas.', x: 0.50, y: 0.50, scale: 0.28, entra: 'pop', anim: 'float' },
            { id: 'nk', img: 'P21', nombre: 'Célula NK', desc: 'Linfocito innato que destruye tumorales e infectadas sin antígeno específico.', x: 0.75, y: 0.50, scale: 0.28, entra: 'pop', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          personajes: [
            { id: 'mastocito', img: 'P12', nombre: 'Mastocito', desc: 'Célula de origen mieloide residente en tejidos.', x: 0.50, y: 0.50, scale: 0.32, entra: 'pop', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.75, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Maduración medular productora de inmunoglobulinas.', x: 0.25, y: 0.50, scale: 0.28, entra: null, anim: 'float' },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II y comanda la respuesta.', x: 0.50, y: 0.50, scale: 0.28, entra: null, anim: 'float' },
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Reconoce CMH-I y ejecuta lisis citotóxica.', x: 0.75, y: 0.50, scale: 0.28, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.45, tipo: 'spark' },
          personajes: [
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno invasor.', x: 0.50, y: 0.45, scale: 0.32, entra: 'zoom', anim: 'pulse' }
          ]
        }
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
      ],
      pasos: [
        // S10: La barrera falla
        {
          fondo: 'P49',
          fondoAnim: 'slide-up',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.40, y: 0.52, tipo: 'spark' },
          personajes: [
            { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Célula epitelial sana alcanzada por el virus.', x: 0.30, y: 0.52, scale: 0.28, entra: null, anim: 'float' },
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Inyecta su genoma en la célula huésped.', x: 0.45, y: 0.42, scale: 0.24, entra: 'zoom', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          personajes: [
            { id: 'infectada', img: 'P30', nombre: 'Célula infectada', desc: 'Célula secuestrada por el virus que emite alarma química.', x: 0.50, y: 0.52, scale: 0.34, entra: 'pop', anim: 'trapped' }
          ]
        },
        // S11: Quimiotaxis
        {
          fondo: 'P49',
          overlay: null,
          burst: { x: 0.50, y: 0.45, tipo: 'spark' },
          personajes: [
            { id: 'quimio', img: 'P43', nombre: 'Quimiotaxis', desc: 'Gradiente químico de atracción hacia el foco de infección.', x: 0.50, y: 0.45, scale: 0.32, entra: 'pop', anim: 'float' },
            { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Fagocito veloz que acude al rastro químico.', x: 0.22, y: 0.54, scale: 0.26, entra: 'slideRight', anim: 'float' },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Fagocito residente que acude a la zona afectada.', x: 0.78, y: 0.54, scale: 0.30, entra: 'slideRight', anim: 'float' }
          ]
        },
        // S12: Fagocitosis y opsonización
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.65, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'opsonina', img: 'P36', nombre: 'Opsonina', desc: 'Marca la superficie del patógeno para su reconocimiento.', x: 0.32, y: 0.42, scale: 0.24, entra: 'pop', anim: 'pulse' },
            { id: 'virus_opsonizado', img: 'P27', nombre: 'Virus opsonizado', desc: 'Virus cubierto de opsoninas listo para ser englobado.', x: 0.46, y: 0.50, scale: 0.26, entra: 'pop', anim: 'trapped' },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Engloba y destruye mediante fagosomas y enzimas digestivas.', x: 0.76, y: 0.50, scale: 0.35, entra: 'slideRight', anim: 'float' }
          ]
        }
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
      ],
      pasos: [
        // S05: El complemento
        {
          fondo: 'P48',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'dormido', img: 'P37', nombre: 'Proteínas del complemento', desc: 'Más de 30 proteínas plasmáticas inactivas en torrente sanguíneo.', x: 0.50, y: 0.50, scale: 0.35, entra: 'pop', anim: 'float' }
          ]
        },
        {
          fondo: 'P48',
          overlay: null,
          decorado: 'vias_complemento',
          personajes: [
            { id: 'dormido', img: 'P37', nombre: 'Proteínas del complemento', desc: 'Despiertan ante anomalías patógenas por 3 vías moleculares.', x: 0.50, y: 0.34, scale: 0.26, entra: null, anim: 'pulse', shake: true }
          ]
        },
        {
          fondo: 'P48',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.72, y: 0.48, tipo: 'spark' },
          personajes: [
            { id: 'cascada', img: 'P38', nombre: 'Cascada del complemento', desc: 'Reacción proteolítica en cadena C3a, C3b, C5a, C5b.', x: 0.32, y: 0.50, scale: 0.32, entra: 'pop', anim: 'pulse' },
            { id: 'mac_drill', img: 'P39', nombre: 'Complejo MAC', desc: 'Taladro citolítico (C5b-9) que perfora la envoltura y causa lisis osmótica.', x: 0.72, y: 0.48, scale: 0.34, entra: 'slideRight', anim: 'pulse', shake: true }
          ]
        }
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
        'Si la infección es grave, estas células presentan esos fragmentos de estos virus en los ganglios linfáticos a los linfocitos T y ya comienza la respuesta adaptativa.'
      ],
      personajes: [
        { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Centinela que procesa el antígeno y viaja al ganglio linfático.', x: 0.26, y: 0.55, scale: 0.28, anim: 'float' },
        { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Molécula de superficie que exhibe el péptido antigénico.', x: 0.50, y: 0.46, scale: 0.28, anim: 'pulse' },
        { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II y orquesta la respuesta liberando citoquinas.', x: 0.78, y: 0.54, scale: 0.28, anim: 'float' }
      ],
      pasos: [
        // S13: La dendrítica viaja al ganglio
        {
          fondo: 'P51',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Centinela procesadora que migra por los vasos linfáticos.', x: 0.50, y: 0.50, scale: 0.32, entra: 'slideRight', anim: 'float' }
          ]
        },
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.45, y: 0.45, tipo: 'spark' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Presentadora profesional de antígenos en el ganglio.', x: 0.35, y: 0.52, scale: 0.30, entra: null, anim: 'float' },
            { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Banderita molecular de alarma que exhibe el péptido antigénico.', x: 0.65, y: 0.48, scale: 0.32, entra: 'pop', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Molécula que presenta el péptido antigénico al TCR.', x: 0.38, y: 0.50, scale: 0.30, entra: null, anim: 'float' },
            { id: 'tcr', img: 'P35', nombre: 'Receptor TCR', desc: 'Receptor del linfocito T con encaje específico de alta afinidad.', x: 0.68, y: 0.50, scale: 0.30, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        // S14: Presentación antigénica adaptativa
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.50, y: 0.46, tipo: 'gold' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Presenta el antígeno a los linfocitos T en el ganglio.', x: 0.25, y: 0.52, scale: 0.28, entra: null, anim: 'float' },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II e inicia la orquestación colaboradora.', x: 0.52, y: 0.48, scale: 0.30, entra: 'pop', anim: 'float' },
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Reconoce CMH-I y prepara la respuesta citotóxica.', x: 0.78, y: 0.52, scale: 0.30, entra: 'pop', anim: 'pulse' }
          ]
        }
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
      ],
      pasos: [
        // S15: Los CD4+ dirigen y CD8+ atacan
        {
          fondo: 'P50',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.50, y: 0.48, tipo: 'spark' },
          personajes: [
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Comanda la respuesta adaptativa liberando citoquinas.', x: 0.35, y: 0.50, scale: 0.32, entra: 'pop', anim: 'float' },
            { id: 'citoquinas', img: 'P40', nombre: 'Citoquinas', desc: 'Mensajeros químicos que activan y reclutan linfocitos B.', x: 0.68, y: 0.48, scale: 0.30, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.65, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Inmunidad celular: lisis directa de células infectadas.', x: 0.35, y: 0.50, scale: 0.32, entra: 'slideRight', anim: 'pulse' },
            { id: 'lisis', img: 'P31', nombre: 'Lisis celular', desc: 'Perforación de membrana y destrucción de la célula con virus.', x: 0.70, y: 0.50, scale: 0.34, entra: 'pop', anim: 'trapped', shake: true }
          ]
        },
        // S16: Expansión clonal B
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.50, y: 0.48, tipo: 'gold' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Activado por el antígeno y CD4+ para multiplicarse.', x: 0.22, y: 0.52, scale: 0.28, entra: 'pop', anim: 'float' },
            { id: 'expansion', img: 'P42', nombre: 'Expansión clonal', desc: 'Multiplicación exponencial de clones específicos (1→2→4→8).', x: 0.50, y: 0.46, scale: 0.32, entra: 'pop', anim: 'pulse' },
            { id: 'plasmatica', img: 'P22', nombre: 'Célula plasmática', desc: 'Fábrica celular diferenciada secretora masiva de anticuerpos.', x: 0.78, y: 0.52, scale: 0.32, entra: 'slideRight', anim: 'float' }
          ]
        }
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
      ],
      pasos: [
        // S17: Fábrica de anticuerpos
        {
          fondo: 'P48',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.65, y: 0.48, tipo: 'spark' },
          personajes: [
            { id: 'plasmatica', img: 'P22', nombre: 'Célula plasmática', desc: 'Fábrica celular que secreta miles de anticuerpos por segundo.', x: 0.30, y: 0.52, scale: 0.32, entra: 'pop', anim: 'float' },
            { id: 'anticuerpo', img: 'P32', nombre: 'Anticuerpo', desc: 'Inmunoglobulinas específicas (IgM e IgG) liberadas a circulación.', x: 0.70, y: 0.48, scale: 0.30, entra: 'slideRight', anim: 'pulse' }
          ]
        },
        // S18: Batalla final
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.50, y: 0.50, tipo: 'spark' },
          personajes: [
            { id: 'virus_epitopos', img: 'P26', nombre: 'Virus con epítopos', desc: 'Superficie antigénica diana de los anticuerpos.', x: 0.26, y: 0.52, scale: 0.28, entra: 'pop', anim: 'trapped' },
            { id: 'enjambre', img: 'P33', nombre: 'Neutralización', desc: 'Enjambre de anticuerpos inmovilizando y bloqueando los virus.', x: 0.58, y: 0.48, scale: 0.32, entra: 'slideRight', anim: 'float' },
            { id: 'virus_perforado', img: 'P28', nombre: 'Virus perforado', desc: 'Lisis osmótica tras ataque del complemento.', x: 0.84, y: 0.52, scale: 0.26, entra: 'pop', anim: 'pulse' }
          ]
        },
        // S19: Victoria
        {
          fondo: 'P52',
          overlay: null,
          burst: { x: 0.50, y: 0.45, tipo: 'gold' },
          personajes: [
            { id: 'b_memoria', img: 'P23', nombre: 'Linfocito B de memoria', desc: 'Guarda el registro antigénico para crear anticuerpos ultra-rápidos.', x: 0.32, y: 0.52, scale: 0.30, entra: 'pop', anim: 'float' },
            { id: 't_memoria', img: 'P24', nombre: 'Linfocito T de memoria', desc: 'Patrulla de larga vida ante reexposiciones.', x: 0.68, y: 0.52, scale: 0.30, entra: 'pop', anim: 'float' }
          ]
        },
        // S20: Memoria inmunológica
        {
          fondo: 'P52',
          overlay: null,
          burst: { x: 0.70, y: 0.48, tipo: 'gold' },
          personajes: [
            { id: 'patrulla', img: 'P53', nombre: 'Linfocitos de memoria', desc: 'Vigilancia permanente por todos los tejidos.', x: 0.32, y: 0.50, scale: 0.32, entra: 'slideRight', anim: 'float' },
            { id: 'secundaria', img: 'P54', nombre: 'Respuesta secundaria', desc: 'Eliminación masiva en horas, sin dar tiempo a enfermedad.', x: 0.70, y: 0.48, scale: 0.32, entra: 'zoom', anim: 'pulse' }
          ]
        },
        // S21: Final
        {
          fondo: 'P55',
          overlay: null,
          decorado: 'resumen_final',
          burst: { x: 0.50, y: 0.40, tipo: 'gold' },
          personajes: []
        }
      ]
    }
  ]
};
