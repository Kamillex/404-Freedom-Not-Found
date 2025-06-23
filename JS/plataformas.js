function Plataforma(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.tempoDeVida = 10000; // 10 segundos
    this.criadaEm = Date.now();
    this.cor = "#" + Math.floor(Math.random()*16777215).toString(16); // Cor aleatória
}

Plataforma.prototype.desenhar = function(context) {
    // Corpo principal
    context.fillStyle = this.cor;
    context.fillRect(this.x, this.y, this.largura, this.altura);
    
    // Detalhes
    context.fillStyle = "#000";
    context.fillRect(this.x + 5, this.y + 3, this.largura - 10, 2);
    context.fillRect(this.x + 5, this.y + this.altura - 5, this.largura - 10, 2);
};

Plataforma.prototype.expirada = function() {
    return Date.now() - this.criadaEm > this.tempoDeVida;
};

Plataforma.prototype.atualizar = function(velocidade) {
    this.x -= velocidade; // Move com o cenário
};