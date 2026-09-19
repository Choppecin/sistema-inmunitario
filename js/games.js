/**
 * GAMES.JS — Lógica de los 3 minijuegos interactivos
 * (Minijuego 1: Macrófago Comilón, Minijuego 2: Operación CD8+, Minijuego 3: CMH-TCR)
 * Implementación principal programada para la FASE 4.
 */

window.GAMES = {
  iniciarJuego(numeroJuego, onComplete) {
    console.log(`Minijuego ${numeroJuego} iniciado.`);
    // Placeholder para fases previas a la Fase 4
    if (onComplete) {
      setTimeout(() => onComplete(true), 1000);
    }
  }
};
