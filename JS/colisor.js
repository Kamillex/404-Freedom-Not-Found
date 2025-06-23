function Colisor() {
  this.sprites = [];
  this.jaColidiu = false;
}
Colisor.prototype = {
  novoSprite: function (sprite) {
    this.sprites.push(sprite);
  },
  processar: function () {
    //for alinhado(for dentro de um for)
    for (let i in this.sprites) {
      //acontece uma repetição maior
      for (let j in this.sprites) {
        if (i == j) continue;

        //Teste de colisão
        this.testarColisao(this.sprites[i], this.sprites[j]);
      }
    }
  },
  testarColisao: function (sprite1, sprite2) {
    let rets1 = sprite1.retangulosColisao();
    let rets2 = sprite2.retangulosColisao();

    let houveColisao = false;

    for (let i in rets1) {
      for (let j in rets2) {
        if (this.retangulosColidem(rets1[i], rets2[j])) {
          houveColisao = true;
          break;
        }
      }
      if (houveColisao) break;
    }

    // Se colidiu agora e ainda não tinha colidido
    if (houveColisao && !this.jaColidiu) {
      sprite1.colidiuCom(sprite2);
      sprite2.colidiuCom(sprite1);
      this.jaColidiu = true;
    }

    // Se NÃO está colidindo mais, resetar flag
    if (!houveColisao) {
      this.jaColidiu = false;
    }
  },

  retangulosColidem: function (ret1, ret2) {
    //Fórmula de intersecção de retÂngulos
    return (
      ret1.x + ret1.largura > ret2.x &&
      ret1.x < ret2.x + ret2.largura &&
      ret1.y + ret1.altura > ret2.y &&
      ret1.y < ret2.y + ret2.altura
    );
  },
};
