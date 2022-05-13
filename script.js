// VARIABLES ----------------------------------------------------------------------------------------------------------

const celdas = document.querySelectorAll('[data-celdas]');
const tablero = document.querySelector('.container');
let jugadorActual = "jugador-1"; //jugador 1 por default
let ganador = false;
const combinacionesGanadoras = [
  // horizontales
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // verticales
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonales
  [0, 4, 8],
  [2, 4, 6]
];

// FUNCIONES ----------------------------------------------------------------------------------------------------------

function pintar(casillero) {
  if (jugadorActual === "jugador-1") {
    casillero.classList.add('x');
  } else {
    casillero.classList.add('circulo');
  }
}

function cambioDeJugador() {
  if (jugadorActual === "jugador-1") {
    tablero.classList.remove('jugador-1');
    tablero.classList.add('jugador-2');
    jugadorActual = "jugador-2";
  } else {
    tablero.classList.remove('jugador-2');
    tablero.classList.add('jugador-1');
    jugadorActual = "jugador-1";
  }
}

function comprobarGanador() {
  let clase
  jugadorActual === "jugador-1" ? clase = "x" : clase = "circulo";
  console.log(clase);
}


function clickHandler(celda) {
  if (celda.classList.contains('x') || celda.classList.contains('circulo')) return;
  pintar(celda);
  comprobarGanador();
  if (ganador === true) return;
  cambioDeJugador();
}

// EVENTOS ----------------------------------------------------------------------------------------------------------
celdas.forEach(celda => {
  celda.addEventListener('click', () => {
    clickHandler(celda);
  });
});
