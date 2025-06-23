let SETA_ESQUERDA = 37;
let SETA_DIREITA = 39;
let SETA_CIMA = 38;
let ESPACO = 32;
let ENTER = 13;

function Teclado(elemento) {
  this.elemento = elemento;

  //Array de teclas pressionadas
  this.pressionadas = [];

  //Array de teclas disparadas
  this.disparadas = [];

  //Funções de disparos
  this.funcoesDisparo = [];

  //Registrando o estado das teclas no array
  let teclado = this;
  elemento.addEventListener("keydown", function (evento) {
    let tecla = evento.keyCode;
    teclado.pressionadas[tecla] = true;

    //Disparar somente se for o primeiro keydown
    if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
      teclado.disparadas = true;
      teclado.funcoesDisparo[tecla]();
    }
  });

  elemento.addEventListener("keyup", function (evento) {
    teclado.pressionadas[evento.keyCode] = false;
    teclado.disparadas[evento.keyCode] = false;
  });
}

Teclado.prototype = {
  pressionada: function (tecla) {
    return this.pressionadas[tecla];
  },
  disparou: function (tecla, callback) {
    this.funcoesDisparo[tecla] = callback;
  },
};
