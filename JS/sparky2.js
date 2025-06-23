// JS/sparky2.js

let SPARKY_DIREITA = 1;
let SPARKY_ESQUERDA = 2;
let SPARKY_CIMA = 3; // Embora SPARKY_CIMA possa ser usado para pulo, o Teclado.ESPACO é mais comum

// Classe Sparky para representar o personagem principal do jogo
function Sparky(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.x = 0;
    this.y = 0;
    this.velocidade = 3; // Velocidade de movimento horizontal

    this.velocidadeY = 0; // Velocidade vertical (para pulo e gravidade)
    this.gravidade = 0.4; // Força da gravidade
    this.pulando = false; // Flag para controlar se Sparky está pulando
    this.forcaPulo = -15; // Força inicial do pulo (negativo para mover para cima)

    // A classe Cenario interna não parece ser utilizada aqui e pode ser movida
    // para um arquivo separado (cenario.js) ou removida se não for necessária.
    // Por enquanto, vou deixá-la comentada para evitar confusão.
    // function Cenario(context) {
    //     this.context = context;
    //     this.x = 0;
    //     this.y = 0;
    // }

    // Cria uma nova instância de SpriteSheet para o Sparky
    // AQUI ESTÁ A CORREÇÃO: MUDADO 'Spritesheet' para 'SpriteSheet'
    // Ajuste '2, 8' (linhas, colunas) para corresponder à sua imagem "Sparky.png".
    this.sheet = new SpriteSheet(context, imagem, 2, 8); // Exemplo: 2 linhas, 8 colunas
    this.sheet.intervalo = 100; // Define o intervalo de tempo para a animação do Sparky

    this.andando = false; // Flag para indicar se Sparky está andando
    this.direcao = SPARKY_ESQUERDA; // Direção inicial do Sparky

    // Propriedades para largura e altura do sprite, úteis para colisão
    this.larguraSprite = this.sheet.imagem.width / this.sheet.numColunas;
    this.alturaSprite = this.sheet.imagem.height / this.sheet.numLinhas;
}

// Define os métodos para a classe Sparky usando prototype
Sparky.prototype = {
    // Método para atualizar a lógica do jogo do Sparky a cada frame
    atualizar: function () {
        // Assume que SETA_DIREITA, SETA_ESQUERDA, SETA_CIMA são variáveis globais
        // ou membros de 'this.teclado' (e.g., this.teclado.SETA_DIREITA).
        // Pelo seu código, parece que são globais. Se não forem, ajuste.

        // Reinicia o estado de 'andando' para evitar que a animação continue se a tecla for solta
        this.andando = false;

        // Movimento para a direita
        if (this.teclado.pressionada(SETA_DIREITA)) {
            // Se não estava andando ou mudou de direção, reseta a linha/coluna
            if (this.direcao != SPARKY_DIREITA) {
                this.sheet.linha = 0; // Linha para andar para a direita
                this.sheet.coluna = 0; // Começa na primeira coluna da animação
            }
            this.andando = true;
            this.direcao = SPARKY_DIREITA;

            // Limita o movimento para a direita dentro do canvas
            if (this.x + this.larguraSprite < this.context.canvas.width) {
                this.x += this.velocidade;
            }
        }
        // Movimento para a esquerda
        else if (this.teclado.pressionada(SETA_ESQUERDA)) {
            // Se não estava andando ou mudou de direção, reseta a linha/coluna
            if (this.direcao != SPARKY_ESQUERDA) {
                this.sheet.linha = 1; // Linha para andar para a esquerda
                this.sheet.coluna = 0; // Começa na primeira coluna da animação
            }
            this.andando = true;
            this.direcao = SPARKY_ESQUERDA;

            // Limita o movimento para a esquerda dentro do canvas
            if (this.x > 0) {
                this.x -= this.velocidade;
            }
        }
        
        // Se estiver andando, avança o quadro da animação
        if (this.andando) {
            this.sheet.proximoQuadro();
        } else {
            // Se não estiver andando, mostra um frame parado (se houver)
            // Ou o primeiro frame da linha atual para indicar que parou.
            // Por exemplo, você pode ter uma linha específica para "parado" ou manter o último frame.
            // Por simplicidade, vou manter o último frame. Se você quiser um frame parado específico:
            // this.sheet.linha = X; // Linha do frame parado
            // this.sheet.coluna = Y; // Coluna do frame parado
        }


        // PULO (sempre verifica, independentemente do movimento horizontal)
        // Usando SETA_CIMA para o pulo. Se você tem uma tecla ESPACO no seu Teclado.js, use ela.
        if (this.teclado.pressionada(SETA_CIMA) && !this.pulando) {
            this.velocidadeY = this.forcaPulo;
            this.pulando = true;
            // Opcional: Defina uma linha de animação para o pulo aqui
            // this.sheet.linha = <linha_pulo>;
            // this.sheet.coluna = <coluna_pulo_inicial>;
        }

        // Gravidade sempre é aplicada
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        // Limita o Sparky no "chão" (Y fixo de 695).
        // Isso precisará ser adaptado para colidir com plataformas.
        if (this.y >= 695) { // O número 695 é o limite do chão do seu jogo.
            this.y = 695;
            this.velocidadeY = 0;
            this.pulando = false;
        }
    },

    // Método para desenhar o Sparky no canvas
    desenhar: function () {
        // Desenha o frame atual da spritesheet do Sparky
        this.sheet.desenhar(this.x, this.y);
    },

    // Método para retornar os retângulos de colisão do Sparky
    retangulosColisao: function () {
        // Calcula a largura e altura do frame atual do Sparky
        let largura = this.sheet.imagem.width / this.sheet.numColunas;
        let altura = this.sheet.imagem.height / this.sheet.numLinhas;

        // Retorna um array de retângulos de colisão (neste caso, apenas um)
        return [{
            x: this.x,
            y: this.y,
            largura: largura,
            altura: altura,
        }, ];
    },
};
