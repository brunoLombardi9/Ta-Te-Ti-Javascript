// VARIABLES ----------------------------------------------------------------------------------------------------------

const celdas = document.querySelectorAll('[data-celdas]');
const tablero = document.querySelector('.container');
const finDePartida = document.querySelector('#finDePartida');
const reiniciar = document.querySelector('#reiniciar');
const texto = document.querySelector('#texto');
let jugadorActual = "jugador-1"; //jugador 1 por default
let turno = 0;
let ganador = false;
let empate = false; // empate false por default
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
    casillero.classList.add("x");
  } else {
    casillero.classList.add("circulo");
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
  turno++;
}

function comprobarGanador() {
  let clase
  jugadorActual === "jugador-1" ? clase = "x" : clase = "circulo";
  if (combinacionesGanadoras.some(combinacion => {
      return combinacion.every(index => {
        return celdas[index].classList.contains(clase);
      })
    })) {
    ganador = true
  }
}

function reset() {
  celdas.forEach(celda => {
    celda.classList.remove('x');
    celda.classList.remove('circulo');
  });
  texto.innerText = "";
  finDePartida.classList.remove('mostrar');
  finDePartida.classList.add('esconder');
  ganador = false;
  empate = false;
  turno = 0;
  if (tablero.classList.contains('jugador-2')) {
    tablero.classList.remove('jugador-2');
    tablero.classList.add('jugador-1');
  }
}

function cartelFinDePartida() {
  finDePartida.classList.remove('esconder');
  finDePartida.classList.add('mostrar');
}

function clickHandler(celda) {
  if (celda.classList.contains("x") || celda.classList.contains("circulo")) return;
  pintar(celda);
  comprobarGanador();
  if (ganador === true) {
    cartelFinDePartida()
    texto.innerText = `Ganó ${jugadorActual}`;
  } else {
    cambioDeJugador();
  }
  if (turno === celdas.length && ganador === false) {
    cartelFinDePartida()
    texto.innerText = 'Empate';
  }
}

// EVENTOS ----------------------------------------------------------------------------------------------------------
celdas.forEach(celda => {
  celda.addEventListener('click', () => {
    clickHandler(celda);
  });
});

reiniciar.addEventListener('click', () => {
  reset();
});
