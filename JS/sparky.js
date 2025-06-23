let SPARKY_DIREITA = 1;
let SPARKY_ESQUERDA = 2;
let SPARKY_CIMA = 3;

function Sparky(context, teclado, imagem) {
  this.context = context;
  this.teclado = teclado;
  this.x = 0;
  this.y = 0;
  this.velocidade = 3;

  this.velocidadeY = 0;
  this.gravidade = 0.4;
  this.pulando = false;
  this.forcaPulo = -15;

  function Cenario(context) {
    this.context = context;
    this.x = 0;
    this.y = 0;
  }

  this.sheet = new Spritesheet(context, imagem, 2, 8);
  this.sheet.intervalo = 5;

  this.andando = false;
  this.direcao = SPARKY_ESQUERDA;
}

Sparky.prototype = {
  atualizar: function () {
    let largura = this.sheet.imagem.width / this.sheet.numColunas;

    // Movimento para a direita
    if (this.teclado.pressionada(SETA_DIREITA)) {
      if (!this.andando || this.direcao != SPARKY_DIREITA) {
        this.sheet.linha = 0;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.direcao = SPARKY_DIREITA;

      this.sheet.proximoQuadro();
      if (this.x + largura < this.context.canvas.width) {
        this.x += this.velocidade;
      }
    }

    // Movimento para a esquerda
    else if (this.teclado.pressionada(SETA_ESQUERDA)) {
      if (!this.andando || this.direcao != SPARKY_ESQUERDA) {
        this.sheet.linha = 1;
        this.sheet.coluna = 1;
      }
      this.andando = true;
      this.direcao = SPARKY_ESQUERDA;

      this.sheet.proximoQuadro();
      if (this.x > 0) {
        this.x -= this.velocidade;
      }
    } else {
      this.andando = false;
    }

    //PULO (fora dos ifs acima)
    if (this.teclado.pressionada(SETA_CIMA) && !this.pulando) {
      this.velocidadeY = this.forcaPulo;
      this.pulando = true;
    }

    //Gravidade sempre é aplicada
    this.velocidadeY += this.gravidade;
    this.y += this.velocidadeY;

    //Limita no chão
    if (this.y >=695) {
      this.y = 695;
      this.velocidadeY = 0;
      this.pulando = false;
    }
  },

  desenhar: function () {
    this.sheet.desenhar(this.x, this.y);
  },
};

Sparky.prototype.retangulosColisao = function () {
  let largura = this.sheet.imagem.width / this.sheet.numColunas;
  let altura = this.sheet.imagem.height / this.sheet.numLinhas;

  return [
    {
      x: this.x,
      y: this.y,
      largura: largura,
      altura: altura,
    },
  ];
};