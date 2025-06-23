// JS/moedas.js

// Classe Moeda para representar os itens coletáveis no jogo
// O construtor agora recebe 'context' e 'imgMoeda' diretamente para inicializar a SpriteSheet.
function Moeda(context, x, y, largura, altura, imgMoeda) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.coletada = false;
    this.context = context; // Armazenamos o contexto para uso interno, embora SpriteSheet já o tenha.

    // Inicializamos a SpriteSheet da moeda com os parâmetros corretos.
    // 'imgMoeda' é a imagem carregada da spritesheet da moeda.
    // '1' é o número de linhas (assumindo que sua spritesheet tem 1 linha de animação).
    // '6' é o número de colunas (ajuste este valor para o número de frames na sua 'Coin 01.png').
    this.spriteSheet = new SpriteSheet(this.context, imgMoeda, 1, 6);
    this.spriteSheet.intervalo = 100; // Define a velocidade da animação da moeda (100ms por frame).
                                      // Quanto menor, mais rápida a animação.

    // Não precisamos mais de 'this.frameAtual' ou 'this.contadorFrames'
    // porque a SpriteSheet gerenciará o avanço dos quadros.
}

// Define o método de desenho para a Moeda
Moeda.prototype.desenhar = function() {
    // A moeda só é desenhada se não foi coletada
    if (!this.coletada && this.spriteSheet) {
        // Chamamos o método desenhar da SpriteSheet, passando apenas as coordenadas x e y da moeda.
        // O contexto já está definido na SpriteSheet.
        this.spriteSheet.desenhar(this.x, this.y);
        
        // Avançamos para o próximo quadro da animação da moeda.
        // A lógica de tempo e frames é gerenciada internamente pela SpriteSheet.
        this.spriteSheet.proximoQuadro();
    }
};

// Define o método para verificar a colisão da Moeda com o personagem Sparky
Moeda.prototype.verificarColeta = function(sparky) {
    // Se a moeda já foi coletada, não precisamos verificar novamente
    if (this.coletada) return false;
    
    // Calcula a largura e altura do sprite do Sparky com base na sua SpriteSheet.
    // Assumimos que 'sparky' tem uma propriedade 'sheet' que é uma instância de SpriteSheet.
    let sparkyLargura = sparky.sheet.imagem.width / sparky.sheet.numColunas;
    let sparkyAltura = sparky.sheet.imagem.height / sparky.sheet.numLinhas;

    // Lógica de colisão AABB (Axis-Aligned Bounding Box)
    // Verifica se os retângulos de colisão da moeda e do Sparky se sobrepõem.
    this.coletada = (
        sparky.x < this.x + this.largura && // Borda esquerda do Sparky à esquerda da borda direita da moeda
        sparky.x + sparkyLargura > this.x && // Borda direita do Sparky à direita da borda esquerda da moeda
        sparky.y < this.y + this.altura &&   // Borda superior do Sparky acima da borda inferior da moeda
        sparky.y + sparkyAltura > this.y     // Borda inferior do Sparky abaixo da borda superior da moeda
    );
    
    // Se a colisão ocorreu e a moeda foi coletada
    if (this.coletada) {
        console.log("Moeda coletada!");
    }
    
    return this.coletada;
     // Retorna true se coletada, false caso contrário
};
Moeda.prototype.verificarColeta = function(sparky) {
    if (this.coletada) return false;

    // Verificações de segurança
    if (
        !sparky || 
        !sparky.sheet || 
        !sparky.sheet.imagem || 
        !sparky.sheet.imagem.complete || 
        !sparky.sheet.numColunas || 
        !sparky.sheet.numLinhas
    ) {
        console.warn("Sprite do Sparky ainda não carregado completamente.");
        return false;
    }

    let sparkyLargura = sparky.sheet.imagem.width / sparky.sheet.numColunas;
    let sparkyAltura = sparky.sheet.imagem.height / sparky.sheet.numLinhas;

    this.coletada = (
        sparky.x < this.x + this.largura &&
        sparky.x + sparkyLargura > this.x &&
        sparky.y < this.y + this.altura &&
        sparky.y + sparkyAltura > this.y
    );

    if (this.coletada) {
        console.log("Moeda coletada!");
    }

    return this.coletada;
};
