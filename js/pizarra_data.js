/**
 * PIZARRA_DATA.JS — Datos del Recorrido Completo y Unificado
 * Guion biológico riguroso, cronológico y educativo (S01–S21)
 * Revisado desde la perspectiva inmunológica y docente:
 * - Sin guiones cortos o informales
 * - Rigor terminológico (IgM inicial, cambio de isotipo a IgG, CMH-I/II, TCR, quimiotaxis y células dendríticas)
 * - Escalas de sprites aumentadas para máxima presencia y protagonismo visual
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

  // Recorrido único unificado: orden cronológico fiel a las 22 escenas originales
  ESTACIONES: [
    {
      id: 'recorrido',
      numero: '1',
      fila: 1,
      fondo: 'P02',
      faseNombre: 'Recorrido Completo',
      titulo: 'Recorrido: El Sistema Inmunitario',
      narracion: [
        // S01: Nuestro cuerpo (0, 1, 2)
        'Este es nuestro <strong>cuerpo humano</strong>. Un mundo complejo de aparatos y sistemas.',
        'Entre ellos, el <strong>sistema inmunitario</strong>, compuesto por todas las células, moléculas, órganos y tejidos que se encargan de defender a nuestro cuerpo de todos los <strong>antígenos</strong>.',
        'No es un órgano aislado, sino un <strong>sistema de vigilancia distribuido</strong> por todo el organismo.',

        // S02: El antígeno (3, 4, 5)
        'Para empezar a entenderlo todo, un <strong>antígeno</strong> es toda molécula que el cuerpo humano reconoce como extraña y capaz de desencadenar una respuesta inmunitaria. Es decir, un <strong>GUIRI</strong>, un extranjero <strong>que quiere atacarnos</strong>.',
        'Pueden ser desde <strong>virus</strong>, bacterias, hongos, parásitos, polen o tejidos trasplantados.',
        'Y su enemigo natural es el <strong>anticuerpo</strong>: una proteína producida por los linfocitos B que reconoce específicamente a un antígeno y facilita su neutralización y eliminación.',

        // S03: Dos tipos de amenaza (6, 7)
        'Está claro que nuestro sistema no va a atacar de la misma manera a un tipo de ataques que a otros. No es lo mismo un <strong>carterista</strong> que un <strong>aviso de bomba</strong> en una ciudad importante.',
        'Por eso, podemos distinguir entre dos tipos de respuestas: la <strong>respuesta innata</strong> y la <strong>respuesta adaptativa</strong>.',

        // S04: Barreras innatas (8, 9)
        'La <strong>respuesta innata</strong> es la rápida, la inespecífica, la inmediata; es lo primero que se encuentra el patógeno antes de hacer nada, y está presente desde el nacimiento.',
        'Entre los métodos de defensa de esta inmunidad podemos encontrar barreras bioquímicas y físicas: la <strong>piel</strong>, los <strong>cilios</strong>, las <strong>mucosas</strong>, los MALT, los ácidos… y la <strong>microbiota</strong>.',

        // S05: El complemento (10, 11, 12)
        'Por otra parte, podemos encontrarnos el <strong>sistema del complemento</strong>. Este es un conjunto de más de treinta proteínas plasmáticas termolábiles que circulan por la sangre de forma inactiva, y que se activan cuando detectan anomalías.',
        'Tiene tres vías de activación: la <strong>clásica</strong> (a través de un anticuerpo unido al antígeno), la <strong>alterna</strong> (directamente sobre la superficie de muchos microorganismos, sin anticuerpos) y la vía de las <strong>lectinas</strong> (cuando reconocen azúcares de la superficie del microbio).',
        'Cuando se activa, el complemento marca al patógeno para los fagocitos, provoca <strong>inflamación</strong> reclutando más células al foco de la infección y puede <strong>lisar directamente</strong> al microorganismo.',

        // S06: La fábrica de células (13, 14, 15, 16, 17)
        'Y lo más importante, de lo que no hemos hablado aún: los <strong>policías</strong> que se encargan de que todo funcione bien.',
        'Vamos a hablar de las células, los <strong>leucocitos o glóbulos blancos</strong>, las verdaderas defensoras de todo.',
        'Vamos una por una. Se dividen en dos tipos según tengan o no gránulos visibles en el citoplasma: los <strong>granulocitos</strong> y los <strong>agranulocitos</strong>. Los granulocitos son los neutrófilos, los basófilos y los eosinófilos; los agranulocitos son los linfocitos y los monocitos.',
        'Además, todas vienen de <strong>células madre hematopoyéticas multipotenciales</strong>, situadas en la médula ósea, pero pueden venir de un progenitor linfoide o un progenitor mieloide.',
        'Las células <strong>mieloides</strong> se encargan de la respuesta innata y las <strong>linfoides</strong> forman la respuesta adaptativa, con la particularidad de las células <strong>NK</strong>, que aunque son de linaje linfoide participan activamente en la respuesta innata.',

        // S07: Desfile mieloide (18, 19, 20, 21)
        'Vamos a ver las células mieloides, las de la respuesta innata: los <strong>glóbulos rojos</strong> y las <strong>plaquetas</strong>, que también derivan de este progenitor, aunque no son células inmunitarias: los glóbulos rojos transportan oxígeno y las plaquetas taponan las heridas.',
        'Junto a los granulocitos encontramos los <strong>monocitos</strong>, que al migrar a los tejidos maduran y se transforman en <strong>macrófagos</strong>, grandes células fagocíticas que eliminan patógenos y restos celulares, secretando <strong>citoquinas</strong> para activar a otras defensas.',
        'Y las <strong>células dendríticas</strong>, las mejores presentadoras de antígeno: son el principal puente entre la inmunidad innata y la adaptativa.',
        'Los granulocitos: los <strong>neutrófilos</strong> son los más abundantes (60-70% de los leucocitos) y los primeros en llegar al foco de la infección; los <strong>eosinófilos</strong> atacan sobre todo parásitos; y los <strong>basófilos</strong> y los <strong>mastocitos</strong> liberan histamina, provocando inflamación y alergias.',

        // S08: Desfile linfoide (22, 23, 24, 25)
        'Ahora veamos las células de la parte linfoide, las de la <strong>respuesta adaptativa</strong>: los <strong>linfocitos B</strong> y los <strong>linfocitos T</strong>, además de las <strong>NK o natural killers</strong>, que aunque son linfoides pertenecen a la respuesta innata porque destruyen células infectadas y tumorales sin necesidad de reconocer un antígeno específico.',
        'Los <strong>mastocitos</strong>, en cambio, son de linaje mieloide.',
        'Los <strong>linfocitos B</strong> maduran en la médula ósea (de ahí su inicial) y producen anticuerpos; los <strong>linfocitos T</strong> maduran en el timo y se dividen en dos equipos: los <strong>CD4+ colaboradores</strong>, que dirigen la respuesta liberando citoquinas, y los <strong>CD8+ citotóxicos</strong>, que eliminan células infectadas.',
        'Vamos a imaginar que entra un <strong>virus</strong> en nuestro cuerpo. Gracias a esto vamos a explicar todos los procesos del sistema inmunitario.',

        // S09: Entra el virus (26, 27)
        'Imaginemos que el virus entra por la nariz, debido a un <strong>aerosol</strong>, por ejemplo el virus de la <strong>COVID-19</strong>.',
        'Lo primero que hace nuestro cuerpo de manera automática es intentar pararlo con los mecanismos físicos más básicos: <strong>pelos en la nariz</strong>, <strong>mucosas</strong>…',

        // S10: La barrera falla (28, 29)
        'Sin embargo, cuando la virulencia o la carga patógena supera estas barreras, el virus logra adherirse y comenzar a <strong>infectar células epiteliales</strong>.',
        'Lo primero que entra en acción son las células y moléculas de la <strong>respuesta inmunitaria innata</strong>.',

        // S11: Quimiotaxis (30)
        'Los fagocitos de primera línea (<strong>neutrófilos</strong> y <strong>macrófagos</strong>), junto a las <strong>células dendríticas</strong> centinelas, comienzan a actuar atraídos por las señales químicas que emiten las células dañadas mediante <strong>quimiotaxis</strong>.',

        // S12: Fagocitosis (31)
        'Allí los fagocitos llevan a cabo la <strong>fagocitosis</strong>: reconocen al microorganismo marcado mediante <strong>opsonización</strong> gracias a las opsoninas y lo digieren en su interior con enzimas líticas.',

        // S13: Viaje al ganglio (32, 33, 34)
        'Por otra parte, las <strong>células dendríticas</strong>, tras capturar y procesar los antígenos en los tejidos, maduran y viajan a través de los vasos linfáticos hasta los <strong>ganglios linfáticos</strong>.',
        'Allí, como células presentadoras de antígeno profesionales, exponen los fragmentos del virus unidos a sus moléculas del <strong>CMH</strong> (complejo mayor de histocompatibilidad), como si agitaran banderitas de alarma.',
        'Y es que los linfocitos T no pueden reconocer un antígeno libre: necesitan que otra célula se lo muestre, y lo detectan específicamente mediante su receptor <strong>TCR</strong>.',

        // S14: Presentación antigénica adaptativa (35)
        'Si la infección es importante, las células dendríticas presentan estos fragmentos antigénicos en los ganglios a los <strong>linfocitos T</strong>, iniciando formalmente la <strong>respuesta adaptativa</strong>.',

        // S15: CD4+ y CD8+ atacan (36, 37)
        'Una vez informados en los ganglios, los linfocitos T se activan. Los <strong>T CD4+</strong> reconocen el antígeno sobre moléculas CMH-II y liberan <strong>citoquinas</strong> para coordinar la respuesta.',
        'Y los <strong>T CD8+ citotóxicos</strong>, que reconocen el antígeno sobre CMH-I en la superficie de las células infectadas, proceden a eliminarlas por <strong>lisis celular</strong>. Esta es la <strong>inmunidad celular</strong>, que actúa contra los patógenos intracelulares.',

        // S16: Expansión clonal B (38)
        'Los <strong>linfocitos B</strong> activados, tras reconocer su antígeno específico y recibir la ayuda de los T CD4+, se dividen y se diferencian en células plasmáticas que generan anticuerpos, multiplicándose en la <strong>expansión clonal</strong> para liderar la <strong>inmunidad humoral</strong>.',

        // S17: Fábrica de anticuerpos (39)
        'Estas células plasmáticas secretan anticuerpos, glicoproteínas conocidas como <strong>inmunoglobulinas (Ig)</strong>. En la fase aguda inicial las primeras en liberarse son las <strong>IgM</strong>, y con el avance de la respuesta se produce el cambio de isotipo a <strong>IgG</strong>, las más abundantes y duraderas en sangre.',

        // S18: La batalla final (40)
        'Estos anticuerpos se unen a los <strong>epítopos</strong>, zonas concretas de la superficie de los virus, neutralizándolos, facilitando su opsonización y fagocitosis, y activando la cascada del <strong>complemento</strong>.',

        // S19: Victoria (41)
        'Además, se generan <strong>linfocitos B y T de memoria</strong> que consiguen que, cuando la infección finalice, el organismo conserve un registro permanente de este patógeno.',

        // S20: Memoria inmunológica (42)
        'Y ante una segunda exposición, la <strong>respuesta secundaria</strong> será mucho más rápida, masiva y eficaz que la primera vez, eliminando al invasor en cuestión de horas.',

        // S21: Final (43)
        'Con todo esto acabamos el proceso de la respuesta inmunitaria. <strong>Muchas gracias.</strong>'
      ],

      // Pasos visuales sincronizados con personajes agrandados y bien posicionados
      pasos: [
        // 0: S01 Cuerpo humano
        {
          fondo: 'P02',
          fondoAnim: 'slide-up',
          overlay: null,
          personajes: []
        },
        // 1: S01 Red inmunitaria
        {
          fondo: 'P02',
          overlay: 'P03',
          burst: { x: 0.5, y: 0.45, tipo: 'spark' },
          personajes: []
        },
        // 2: S01 Vigilancia distribuida
        {
          fondo: 'P02',
          overlay: 'P03',
          personajes: []
        },

        // 3: S02 El antígeno (Guiri P04) con flecha arriba y callout destacado
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.65, y: 0.28, tipo: 'gold' },
          personajes: [
            {
              id: 'guiri',
              img: 'P04',
              nombre: 'Antígeno',
              desc: 'Molécula foránea que desencadena la respuesta defensiva.',
              x: 0.65,
              y: 0.28,
              scale: 1.45,
              entra: 'slideRight',
              anim: 'float',
              sinBadge: true
            }
          ],
          callout: {
            texto: 'ANTÍGENO',
            x: 0.65,
            y: 0.49,
            flechaDir: 'up',
            delay: 600
          }
        },

        // 4: S02 Virus P25 con flecha arriba y callout destacado
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.28, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula foránea que desencadena la respuesta defensiva.', x: 0.68, y: 0.32, scale: 1.30, entra: null, anim: 'float' },
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca replicarse en células huésped.', x: 0.28, y: 0.28, scale: 1.35, entra: 'pop', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'VIRUS',
            x: 0.28,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 5: S02 Anticuerpo P32 con flecha arriba y callout destacado
        {
          fondo: 'P02',
          overlay: null,
          burst: { x: 0.78, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno que busca replicarse en células huésped.', x: 0.20, y: 0.32, scale: 1.20, entra: null, anim: 'pulse' },
            { id: 'guiri', img: 'P04', nombre: 'Antígeno', desc: 'Molécula foránea que desencadena la respuesta defensiva.', x: 0.48, y: 0.32, scale: 1.25, entra: null, anim: 'float' },
            { id: 'anticuerpo', img: 'P32', nombre: 'Anticuerpo', desc: 'Inmunoglobulina producida por linfocitos B para neutralizar patógenos.', x: 0.78, y: 0.28, scale: 1.40, entra: 'slideRight', anim: 'float', sinBadge: true }
          ],
          callout: {
            texto: 'ANTICUERPO',
            x: 0.78,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 6: S03 Dos tipos de amenaza (P05 Carterista)
        {
          fondo: 'P05',
          overlay: null,
          shakeStage: true,
          personajes: []
        },

        // 7: S03 P07 Dos caminos (Carteles grandes de Respuesta Innata y Adaptativa)
        {
          fondo: 'P07',
          overlay: null,
          decorado: 'dos_caminos',
          personajes: []
        },

        // 8: S04 Barreras Innatas (P45 Piel, Célula epitelial P29 grande con callout)
        {
          fondo: 'P45',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'spark' },
          personajes: [
            {
              id: 'epitelio',
              img: 'P29',
              nombre: 'Célula epitelial',
              desc: 'Barrera física queratinizada que bloquea la penetración microbiana.',
              x: 0.50,
              y: 0.28,
              scale: 1.45,
              entra: 'pop',
              anim: 'float',
              sinBadge: true
            }
          ],
          callout: {
            texto: 'CÉLULA EPITELIAL',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 500
          }
        },

        // 9: S04 P46 Mucosa, Cilios y Microbiota (Píldoras y célula epitelial coronando)
        {
          fondo: 'P46',
          overlay: null,
          decorado: 'barreras',
          personajes: [
            {
              id: 'epitelio',
              img: 'P29',
              nombre: 'Célula epitelial',
              desc: 'Muralla celular externa y protectora del organismo.',
              x: 0.50,
              y: 0.16,
              scale: 1.30,
              entra: null,
              anim: 'float'
            }
          ]
        },

        // 10: S05 El Complemento (P48 torrente sanguíneo, P37 durmiente con callout ajustado)
        {
          fondo: 'P48',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.50, y: 0.30, tipo: 'spark' },
          personajes: [
            {
              id: 'dormido',
              img: 'P37',
              nombre: 'Proteínas del complemento',
              desc: 'Más de 30 proteínas plasmáticas inactivas en torrente sanguíneo.',
              x: 0.50,
              y: 0.30,
              scale: 1.40,
              entra: 'pop',
              anim: 'float',
              sinBadge: true
            }
          ],
          callout: {
            texto: 'SISTEMA DEL COMPLEMENTO',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 11: S05 Las 3 vías del complemento (Badges compactos en una sola fila)
        {
          fondo: 'P48',
          overlay: null,
          decorado: 'vias_complemento',
          personajes: [
            { id: 'dormido', img: 'P37', nombre: 'Proteínas del complemento', desc: 'Despiertan ante anomalías patógenas por 3 vías moleculares.', x: 0.50, y: 0.43, scale: 1.15, entra: null, anim: 'pulse', shake: true, sinBadge: true }
          ]
        },

        // 12: S05 Cascada P38 y Taladro MAC P39 perforando
        {
          fondo: 'P48',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.72, y: 0.30, tipo: 'spark' },
          personajes: [
            { id: 'cascada', img: 'P38', nombre: 'Cascada del complemento', desc: 'Reacción proteolítica en cadena C3a, C3b, C5a, C5b.', x: 0.28, y: 0.30, scale: 1.30, entra: 'pop', anim: 'pulse' },
            { id: 'mac_drill', img: 'P39', nombre: 'Complejo MAC', desc: 'Taladro citolítico (C5b-9) que perfora la envoltura y causa lisis osmótica.', x: 0.72, y: 0.28, scale: 1.40, entra: 'slideRight', anim: 'pulse', shake: true, sinBadge: true }
          ],
          callout: {
            texto: 'COMPLEJO MAC (PORO LÍTICO)',
            x: 0.72,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 13: S06 Médula ósea P47
        {
          fondo: 'P47',
          fondoAnim: 'slide-up',
          overlay: null,
          personajes: []
        },
        // 14: S06 Leucocitos defensores
        {
          fondo: 'P47',
          overlay: null,
          personajes: []
        },
        // 15: S06 Granulocitos vs agranulocitos
        {
          fondo: 'P47',
          overlay: null,
          personajes: []
        },
        // 16: S06 Célula madre hematopoyética P08 con callout
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula multipotencial precursora de todos los leucocitos.', x: 0.50, y: 0.28, scale: 1.45, entra: 'pop', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'CÉLULA MADRE HEMATOPOYÉTICA',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },
        // 17: S06 Linajes mieloide y linfoide
        {
          fondo: 'P47',
          overlay: null,
          decorado: 'linajes',
          personajes: [
            { id: 'celula_madre', img: 'P08', nombre: 'Célula madre', desc: 'Célula multipotencial precursora de todos los leucocitos.', x: 0.50, y: 0.26, scale: 1.20, entra: null, anim: 'pulse' }
          ]
        },

        // 18: S07 Desfile mieloide - Glóbulo rojo P16 y Plaqueta P17 con callout
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.30, tipo: 'spark' },
          personajes: [
            { id: 'globulo_rojo', img: 'P16', nombre: 'Glóbulo rojo', desc: 'Transporta oxígeno unido a hemoglobina.', x: 0.35, y: 0.30, scale: 1.35, entra: 'slideRight', anim: 'float', sinBadge: true },
            { id: 'plaqueta', img: 'P17', nombre: 'Plaqueta', desc: 'Fragmento celular que tapona heridas (hemostasia).', x: 0.65, y: 0.30, scale: 1.25, entra: 'slideRight', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'GLÓBULO ROJO Y PLAQUETA',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 19: S07 Monocito, Macrófago y todos los Granulocitos (Neutrófilo, Eosinófilo, Basófilo)
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.38, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'monocito', img: 'P13', nombre: 'Monocito', desc: 'Leucocito agranulocito que patrulla en sangre.', x: 0.16, y: 0.32, scale: 1.15, entra: 'pop', anim: 'float' },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Gran comedor fagocitario secretor de citoquinas.', x: 0.38, y: 0.28, scale: 1.40, entra: 'slideRight', anim: 'float', sinBadge: true },
            { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Granulocito fagocito más abundante.', x: 0.58, y: 0.32, scale: 1.15, entra: 'slideRight', anim: 'float' },
            { id: 'eosinofilo', img: 'P10', nombre: 'Eosinófilo', desc: 'Granulocito antiparasitario.', x: 0.74, y: 0.32, scale: 1.10, entra: 'slideRight', anim: 'float' },
            { id: 'basofilo', img: 'P11', nombre: 'Basófilo', desc: 'Granulocito con histamina.', x: 0.88, y: 0.32, scale: 1.10, entra: 'slideRight', anim: 'float' }
          ],
          callout: {
            texto: 'MACRÓFAGO Y GRANULOCITOS',
            x: 0.38,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 20: S07 Célula dendrítica P15 con callout
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Puente clave entre la inmunidad innata y adaptativa.', x: 0.50, y: 0.28, scale: 1.45, entra: 'pop', anim: 'float', sinBadge: true }
          ],
          callout: {
            texto: 'CÉLULA DENDRÍTICA',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 21: S07 Granulocitos (Neutrófilo P09 con callout, Eosinófilo P10, Basófilo P11, Mastocito P12)
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.20, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Primer respondedor celular (60-70% de leucocitos).', x: 0.20, y: 0.28, scale: 1.35, entra: 'slideRight', anim: 'float', sinBadge: true },
            { id: 'eosinofilo', img: 'P10', nombre: 'Eosinófilo', desc: 'Especialista en defensa contra helmintos y parásitos.', x: 0.42, y: 0.32, scale: 1.15, entra: 'slideRight', anim: 'float' },
            { id: 'basofilo', img: 'P11', nombre: 'Basófilo', desc: 'Granulocito liberador de histamina e inflamación.', x: 0.64, y: 0.32, scale: 1.15, entra: 'slideRight', anim: 'float' },
            { id: 'mastocito', img: 'P12', nombre: 'Mastocito', desc: 'Célula tisular mieloide inductora de alergias e histamina.', x: 0.84, y: 0.32, scale: 1.15, entra: 'slideRight', anim: 'pulse' }
          ],
          callout: {
            texto: 'NEUTRÓFILO (60-70%)',
            x: 0.20,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 22: S08 Desfile linfoide (Linf B P18, T CD4 P19, NK P21 con callout)
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.25, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Madura en médula y produce anticuerpos específicos.', x: 0.25, y: 0.28, scale: 1.35, entra: 'pop', anim: 'float', sinBadge: true },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Colaborador que orquesta la respuesta liberando citoquinas.', x: 0.52, y: 0.32, scale: 1.25, entra: 'pop', anim: 'float' },
            { id: 'nk', img: 'P21', nombre: 'Célula NK', desc: 'Linfocito innato que destruye tumorales e infectadas.', x: 0.78, y: 0.32, scale: 1.25, entra: 'pop', anim: 'pulse' }
          ],
          callout: {
            texto: 'LINFOCITO B',
            x: 0.25,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 23: S08 Mastocito P12
        {
          fondo: 'P47',
          overlay: null,
          personajes: [
            { id: 'mastocito', img: 'P12', nombre: 'Mastocito', desc: 'Célula de origen mieloide residente en tejidos.', x: 0.50, y: 0.28, scale: 1.45, entra: 'pop', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'MASTOCITO',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 24: S08 Linf B, CD4 y CD8 P20 con callout
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.75, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Maduración medular productora de inmunoglobulinas.', x: 0.22, y: 0.32, scale: 1.20, entra: null, anim: 'float' },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II y comanda la respuesta.', x: 0.48, y: 0.32, scale: 1.20, entra: null, anim: 'float' },
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Reconoce CMH-I y ejecuta lisis citotóxica.', x: 0.75, y: 0.28, scale: 1.35, entra: 'slideRight', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'LINFOCITO T CD8+',
            x: 0.75,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 25: S08 Entra el virus en la historia
        {
          fondo: 'P47',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Microorganismo patógeno invasor.', x: 0.50, y: 0.28, scale: 1.45, entra: 'zoom', anim: 'pulse' }
          ]
        },

        // 26: S09 Entra el virus por la nariz (P44 aerosoles)
        {
          fondo: 'P44',
          overlay: null,
          burst: { x: 0.50, y: 0.30, tipo: 'aerosol' },
          personajes: [
            { id: 'virus_nasal', img: 'P25', nombre: 'Virus en aerosol', desc: 'Partícula viral transportada por microgotas de aerosol.', x: 0.50, y: 0.30, scale: 1.40, entra: 'zoom', anim: 'pulse' }
          ]
        },

        // 27: S09 Pelos y mucosas atrapando
        {
          fondo: 'P44',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.32, y: 0.32, tipo: 'spark' },
          personajes: [
            { id: 'virus_atrapado', img: 'P25', nombre: 'Virus atrapado', desc: 'Patógeno inmovilizado por la barrera física de cilios y moco.', x: 0.32, y: 0.32, scale: 1.25, entra: null, anim: 'trapped' },
            { id: 'virus_infiltrado', img: 'P25', nombre: 'Virus infiltrado', desc: 'Virus que logra superar el filtrado mecánico nasal.', x: 0.74, y: 0.30, scale: 1.35, entra: 'slideRight', anim: 'pulse' }
          ]
        },

        // 28: S10 La barrera falla (P49 célula epitelial y virus infectando)
        {
          fondo: 'P49',
          fondoAnim: 'slide-up',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.40, y: 0.30, tipo: 'spark' },
          personajes: [
            { id: 'epitelio', img: 'P29', nombre: 'Célula epitelial', desc: 'Célula epitelial sana alcanzada por el virus.', x: 0.30, y: 0.30, scale: 1.35, entra: null, anim: 'float' },
            { id: 'virus', img: 'P25', nombre: 'Virus', desc: 'Inyecta su genoma en la célula huésped.', x: 0.48, y: 0.28, scale: 1.30, entra: 'zoom', anim: 'pulse' }
          ]
        },

        // 29: S10 Célula epitelial infectada P30 con alarma roja y callout
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.50, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'infectada', img: 'P30', nombre: 'Célula infectada', desc: 'Célula secuestrada por el virus que emite alarma química.', x: 0.50, y: 0.28, scale: 1.45, entra: 'pop', anim: 'trapped', sinBadge: true }
          ],
          callout: {
            texto: 'CÉLULA INFECTADA',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 30: S11 Quimiotaxis P43 (señales químicas, neutrófilos, macrófagos y dendrítica) con callout
        {
          fondo: 'P49',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'quimio', img: 'P43', nombre: 'Quimiotaxis', desc: 'Gradiente químico de atracción hacia el foco de infección.', x: 0.50, y: 0.28, scale: 1.40, entra: 'pop', anim: 'float', sinBadge: true },
            { id: 'neutrofilo', img: 'P09', nombre: 'Neutrófilo', desc: 'Fagocito veloz que acude al rastro químico.', x: 0.14, y: 0.32, scale: 1.25, entra: 'slideRight', anim: 'float' },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Fagocito tisular que acude a la zona afectada.', x: 0.84, y: 0.32, scale: 1.35, entra: 'slideRight', anim: 'float' },
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Centinela tisular captador de antígenos.', x: 0.30, y: 0.32, scale: 1.25, entra: 'slideRight', anim: 'float', sinBadge: true }
          ],
          callout: {
            texto: 'SEÑALES QUÍMICAS (QUIMIOTAXIS)',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 31: S12 Fagocitosis (Opsonina P36, virus opsonizado P27 y macrófago P14) con callout
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.46, y: 0.30, tipo: 'spark' },
          personajes: [
            { id: 'opsonina', img: 'P36', nombre: 'Opsonina', desc: 'Marca la superficie del patógeno para su reconocimiento.', x: 0.24, y: 0.32, scale: 1.20, entra: 'pop', anim: 'pulse' },
            { id: 'virus_opsonizado', img: 'P27', nombre: 'Virus opsonizado', desc: 'Virus cubierto de opsoninas listo para ser englobado.', x: 0.46, y: 0.28, scale: 1.35, entra: 'pop', anim: 'trapped', sinBadge: true },
            { id: 'macrofago', img: 'P14', nombre: 'Macrófago', desc: 'Engloba y destruye mediante fagosomas y enzimas digestivas.', x: 0.78, y: 0.30, scale: 1.45, entra: 'slideRight', anim: 'float' }
          ],
          callout: {
            texto: 'VIRUS OPSONIZADO',
            x: 0.46,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 32: S13 Viaje al ganglio (P51 mapa ganglios linfáticos, dendrítica P15 migrando) con callout
        {
          fondo: 'P51',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.50, y: 0.30, tipo: 'gold' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Centinela procesadora que migra por los vasos linfáticos.', x: 0.50, y: 0.30, scale: 1.45, entra: 'slideRight', anim: 'float', sinBadge: true }
          ],
          callout: {
            texto: 'VIAJE AL GANGLIO LINFÁTICO',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 33: S13 P50 Ganglio, dendrítica con CMH P34 con callout
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.65, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Presentadora profesional de antígenos en el ganglio.', x: 0.32, y: 0.32, scale: 1.30, entra: null, anim: 'float' },
            { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Banderita molecular de alarma que exhibe el péptido antigénico.', x: 0.65, y: 0.28, scale: 1.45, entra: 'pop', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'COMPLEJO CMH (BANDERITA)',
            x: 0.65,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 34: S13 Acople CMH P34 y TCR P35 con callout
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.68, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'cmh', img: 'P34', nombre: 'Complejo CMH', desc: 'Molécula que presenta el péptido antigénico al TCR.', x: 0.35, y: 0.32, scale: 1.30, entra: null, anim: 'float' },
            { id: 'tcr', img: 'P35', nombre: 'Receptor TCR', desc: 'Receptor del linfocito T con encaje específico de alta afinidad.', x: 0.68, y: 0.28, scale: 1.45, entra: 'slideRight', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'RECEPTOR TCR',
            x: 0.68,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 35: S14 Presentación antigénica adaptativa (Dendrítica, CD4 y CD8)
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'dendritica', img: 'P15', nombre: 'Célula dendrítica', desc: 'Presenta el antígeno a los linfocitos T en el ganglio.', x: 0.20, y: 0.32, scale: 1.25, entra: null, anim: 'float' },
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Reconoce CMH-II e inicia la orquestación colaboradora.', x: 0.50, y: 0.30, scale: 1.35, entra: 'pop', anim: 'float' },
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Reconoce CMH-I y prepara la respuesta citotóxica.', x: 0.80, y: 0.32, scale: 1.30, entra: 'pop', anim: 'pulse' }
          ]
        },

        // 36: S15 T CD4+ orquestando con Citoquinas P40 con callout
        {
          fondo: 'P50',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.68, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 't_cd4', img: 'P19', nombre: 'Linfocito T CD4+', desc: 'Comanda la respuesta adaptativa liberando citoquinas.', x: 0.32, y: 0.32, scale: 1.35, entra: 'pop', anim: 'float' },
            { id: 'citoquinas', img: 'P40', nombre: 'Citoquinas', desc: 'Mensajeros químicos que activan y reclutan linfocitos B.', x: 0.68, y: 0.28, scale: 1.45, entra: 'slideRight', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'CITOQUINAS',
            x: 0.68,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 37: S15 Lisis citotóxica CD8+ P20 y Lisis P31 con callout
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.70, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 't_cd8', img: 'P20', nombre: 'Linfocito T CD8+', desc: 'Inmunidad celular: lisis directa de células infectadas.', x: 0.32, y: 0.32, scale: 1.35, entra: 'slideRight', anim: 'pulse' },
            { id: 'lisis', img: 'P31', nombre: 'Lisis celular', desc: 'Perforación de membrana y destrucción de la célula con virus.', x: 0.70, y: 0.28, scale: 1.45, entra: 'pop', anim: 'trapped', shake: true, sinBadge: true }
          ],
          callout: {
            texto: 'LISIS POR CD8+ (INMUNIDAD CELULAR)',
            x: 0.70,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 38: S16 Expansión clonal B (P18 Linf B, P42 Expansión clonal, P22 Plasmática) con callout
        {
          fondo: 'P50',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'linf_b', img: 'P18', nombre: 'Linfocito B', desc: 'Activado por el antígeno y CD4+ para multiplicarse.', x: 0.20, y: 0.32, scale: 1.25, entra: 'pop', anim: 'float' },
            { id: 'expansion', img: 'P42', nombre: 'Expansión clonal', desc: 'Multiplicación exponencial de clones específicos (1→2→4→8).', x: 0.50, y: 0.28, scale: 1.45, entra: 'pop', anim: 'pulse', sinBadge: true },
            { id: 'plasmatica', img: 'P22', nombre: 'Célula plasmática', desc: 'Fábrica celular diferenciada secretora masiva de anticuerpos.', x: 0.80, y: 0.32, scale: 1.35, entra: 'slideRight', anim: 'float' }
          ],
          callout: {
            texto: 'EXPANSIÓN CLONAL B',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 39: S17 Fábrica de anticuerpos (Plasmática P22 secretando IgM e IgG P32) con callout
        {
          fondo: 'P48',
          fondoAnim: 'slide-up',
          overlay: null,
          burst: { x: 0.30, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'plasmatica', img: 'P22', nombre: 'Célula plasmática', desc: 'Fábrica celular que secreta miles de anticuerpos por segundo.', x: 0.30, y: 0.28, scale: 1.45, entra: 'pop', anim: 'float', sinBadge: true },
            { id: 'anticuerpo', img: 'P32', nombre: 'Anticuerpo', desc: 'Inmunoglobulinas específicas (IgM e IgG) liberadas a circulación.', x: 0.72, y: 0.30, scale: 1.35, entra: 'slideRight', anim: 'pulse' }
          ],
          callout: {
            texto: 'CÉLULA PLASMÁTICA (IgM / IgG)',
            x: 0.30,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 40: S18 Batalla final (Virus epítopos P26, Enjambre P33 y Perforado P28) con callout
        {
          fondo: 'P49',
          overlay: null,
          shakeStage: true,
          burst: { x: 0.58, y: 0.28, tipo: 'spark' },
          personajes: [
            { id: 'virus_epitopos', img: 'P26', nombre: 'Virus con epítopos', desc: 'Superficie antigénica diana de los anticuerpos.', x: 0.22, y: 0.32, scale: 1.25, entra: 'pop', anim: 'trapped' },
            { id: 'enjambre', img: 'P33', nombre: 'Neutralización', desc: 'Enjambre de anticuerpos inmovilizando y bloqueando los virus.', x: 0.58, y: 0.28, scale: 1.45, entra: 'slideRight', anim: 'float', sinBadge: true },
            { id: 'virus_perforado', img: 'P28', nombre: 'Virus perforado', desc: 'Lisis osmótica tras ataque del complemento.', x: 0.86, y: 0.32, scale: 1.25, entra: 'pop', anim: 'pulse' }
          ],
          callout: {
            texto: 'NEUTRALIZACIÓN POR ANTICUERPOS',
            x: 0.58,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 41: S19 Victoria (Tejido sano P52, B memoria P23 y T memoria P24) con callout
        {
          fondo: 'P52',
          overlay: null,
          burst: { x: 0.50, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'b_memoria', img: 'P23', nombre: 'Linfocito B de memoria', desc: 'Guarda el registro antigénico para crear anticuerpos ultra-rápidos.', x: 0.32, y: 0.28, scale: 1.40, entra: 'pop', anim: 'float', sinBadge: true },
            { id: 't_memoria', img: 'P24', nombre: 'Linfocito T de memoria', desc: 'Patrulla de larga vida ante reexposiciones.', x: 0.68, y: 0.28, scale: 1.40, entra: 'pop', anim: 'float', sinBadge: true }
          ],
          callout: {
            texto: 'LINFOCITOS DE MEMORIA',
            x: 0.50,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 42: S20 Memoria inmunológica (Patrulla P53 y Respuesta secundaria P54) con callout
        {
          fondo: 'P52',
          overlay: null,
          burst: { x: 0.70, y: 0.28, tipo: 'gold' },
          personajes: [
            { id: 'patrulla', img: 'P53', nombre: 'Linfocitos de memoria', desc: 'Vigilancia permanente por todos los tejidos.', x: 0.30, y: 0.32, scale: 1.35, entra: 'slideRight', anim: 'float' },
            { id: 'secundaria', img: 'P54', nombre: 'Respuesta secundaria', desc: 'Eliminación masiva en horas, sin dar tiempo a enfermedad.', x: 0.70, y: 0.28, scale: 1.45, entra: 'zoom', anim: 'pulse', sinBadge: true }
          ],
          callout: {
            texto: 'MEMORIA INMUNOLÓGICA (RESPUESTA SECUNDARIA)',
            x: 0.70,
            y: 0.49,
            flechaDir: 'up',
            delay: 550
          }
        },

        // 43: S21 Final (P55 agradecimiento con lluvia dorada, sin banner numérico)
        {
          fondo: 'P55',
          overlay: null,
          decorado: null,
          burst: { x: 0.50, y: 0.35, tipo: 'gold' },
          personajes: []
        }
      ]
    }
  ]
};
