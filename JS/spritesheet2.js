// MUDAR DE ACORDO COM O CÓDIGO - Esta é uma anotação sua que mantive.
function Spritesheet(context, imagem, linhas, colunas) {
    this.context = context;
    this.imagem = imagem;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.intervalo = 0; // Usado para controle de velocidade de animação do sprite
    this.linha = 0;     // Linha atual da spritesheet para o frame
    this.coluna = 0;    // Coluna atual da spritesheet para o frame
    this.ultimoTempo = 0; // Para controlar o tempo entre os quadros da animação
}

Spritesheet.prototype = {
    proximoQuadro: function () {
        let agora = new Date().getTime();

        // Verifica se já se passou o intervalo mínimo para a troca de quadro
        // Se this.intervalo for 0, não haverá animação por tempo, apenas avanço de coluna.
        // O intervalo é dado em milissegundos, mas foi definido como 0.10 em moedas.js, o que pode causar problema.
        // Se for para controlar a velocidade da animação em quadros por segundo,
        // this.intervalo deve ser um valor em milissegundos (ex: 100ms para 10 quadros/seg).
        // Se 0.10 for segundos, converta para ms: 0.10 * 1000 = 100.
        // Vou assumir que você quer 100ms (0.10 segundos).
        const intervaloMs = this.intervalo * 1000; // Converte para milissegundos

        if (agora - this.ultimoTempo < intervaloMs) {
            return; // Ainda não é hora de trocar de quadro
        }

        // Avança para a próxima coluna (quadro)
        if (this.coluna < this.numColunas - 1) {
            this.coluna++;
        } else {
            this.coluna = 0; // Volta para o início da linha
        }
        
        this.ultimoTempo = agora; // Atualiza o último tempo de troca de quadro
    },

    desenhar: function (x, y) {
        // *** ESTA É A VERIFICAÇÃO CRÍTICA QUE ESTAVA FALTANDO ***
        // Garante que a imagem existe, que ela terminou de carregar (complete),
        // e que suas dimensões são válidas (naturalWidth > 0).
        if (!this.imagem || !this.imagem.complete || this.imagem.naturalWidth === 0 || this.imagem.naturalHeight === 0) {
            console.warn("Spritesheet.desenhar: Imagem não carregada ou inválida. Caminho:", this.imagem ? this.imagem.src : "Imagem nula ou sem src.");
            return; // Interrompe o desenho para evitar o erro `drawImage`
        }

        let larguraFrame = this.imagem.width / this.numColunas;
        let alturaFrame = this.imagem.height / this.numLinhas;

        // Calcula a posição do frame atual na imagem da spritesheet
        let sx = larguraFrame * this.coluna;
        let sy = alturaFrame * this.linha;

        // Desenha o frame no canvas
        this.context.drawImage(
            this.imagem,       // A imagem da spritesheet
            sx, sy,             // Posição X, Y de onde cortar na imagem
            larguraFrame, alturaFrame, // Largura e altura do corte na imagem
            x, y,               // Posição X, Y onde desenhar no canvas
            larguraFrame, alturaFrame // Largura e altura que o frame terá no canvas
        );
    },
};
