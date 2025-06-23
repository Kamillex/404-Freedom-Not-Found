// JS/spritesheet.js

// Classe SpriteSheet para gerenciar animações de sprites
// Recebe o contexto do canvas, a imagem da spritesheet,
// o número de linhas e o número de colunas da spritesheet.
function SpriteSheet(context, imagem, linhas, colunas) {
    this.context = context;
    this.imagem = imagem;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.intervalo = 0; // Intervalo de tempo entre os frames (em milissegundos)
    this.linha = 0;     // Linha atual da animação na spritesheet
    this.coluna = 0;    // Coluna (frame) atual da animação na spritesheet
    this.ultimoTempo = 0; // Marca de tempo do último frame desenhado
}

// Define os métodos para a classe SpriteSheet
SpriteSheet.prototype = {
    // Método para avançar para o próximo quadro (frame) da animação
    proximoQuadro: function () {
        let agora = new Date().getTime(); // Obtém o tempo atual em milissegundos

        // Inicializa ultimoTempo na primeira execução
        if (!this.ultimoTempo) this.ultimoTempo = agora;

        // Verifica se o intervalo de tempo para o próximo frame já passou
        if (agora - this.ultimoTempo < this.intervalo) return;

        // Avança para a próxima coluna (frame)
        if (this.coluna < this.numColunas - 1) {
            this.coluna++;
        } else {
            // Se chegou ao final da linha, volta para a primeira coluna
            this.coluna = 0;
            // Se você tiver múltiplas linhas de animação, pode adicionar lógica para mudar de linha aqui
            // Por exemplo: this.linha = (this.linha + 1) % this.numLinhas;
        }
        
        // Atualiza o tempo do último frame
        this.ultimoTempo = agora;
    },

    // Método para desenhar o frame atual da spritesheet no canvas
    desenhar: function (x, y) {
        // Calcula a largura e altura de um único frame na spritesheet
        let largura = this.imagem.width / this.numColunas;
        let altura = this.imagem.height / this.numLinhas;

        

        // Desenha o frame recortado da imagem no contexto do canvas
        this.context.drawImage(
            this.imagem,
            largura * this.coluna, // Posição X do recorte na imagem de origem
            altura * this.linha,   // Posição Y do recorte na imagem de origem
            largura,               // Largura do recorte
            altura,                // Altura do recorte
            x,                     // Posição X no canvas onde o frame será desenhado
            y,                     // Posição Y no canvas onde o frame será desenhado
            largura,               // Largura final do frame no canvas
            altura                 // Altura final do frame no canvas
        );
    },
};
