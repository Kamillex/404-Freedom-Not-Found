function Animacao(context) {
  this.context = context;
  this.sprites = [];
  this.ligado = false;
}
Animacao.prototype = {
  //Adiciona um novo objeto à lista de animação
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
  },
  //Inicia o loop de animação
  ligar: function () {
    this.ligado = true;
    this.proximoFrame();
  },
  //Para a animação
  desligar: function () {
    this.ligado = false;
  },
  //Atualiza e redesenha todos os objetos na tela
  proximoFrame: function () {
    // Executar processamentos adicionais
    if(this.processamentos){
    for(let i in this.processamentos){
        this.processamentos[i]();
    }
    }

    //Posso ligar?
    if (!this.ligado) return;

    //A cada ciclo, limpamos a tela
    this.limparTela();

    //Atualizar o estado da sprite
    for (let i in this.sprites) this.sprites[i].atualizar();

    //Responsável por desenhar os sprites
    for (let i in this.sprites) this.sprites[i].desenhar();

    //Chamar o próximo ciclo
    let animacao = this;
    // Usa requestAnimationFrame() para manter a animação fluida.
    requestAnimationFrame(function () {
      animacao.proximoFrame();
    });
  },
  limparTela: function () {
    let ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  },
};

Animacao.prototype.novoProcessamento = function(processamento){
    if(!this.processamentos) this.processamentos = [];
    this.processamentos.push(processamento);
};


function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imgCenario, x, 0);
  context.drawImage(imgCenario, x + fundo.width, 0);
  x -= velocidade;
  if (x <= -imgCenario.width) {
    x = 0;
  }
  requestAnimationFrame(loop);
}
