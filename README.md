SOBRE O RAQUETE RUSH
Objetivo:
O jogador controla uma raquete na parte inferior da tela.
A bola se move pela tela, rebatendo nas paredes, na raquete e nos blocos.
O objetivo é destruir todos os blocos na tela sem deixar a bola cair abaixo da raquete.

Mecânicas:
A bola rebate nas paredes laterais e na parte superior da tela.
Se a bola tocar a parte inferior da tela (sem ser rebatida pela raquete), o jogo acaba.
Quando a bola colide com um bloco, o bloco é destruído, e a pontuação aumenta.
Se todos os blocos forem destruídos, o jogador vence o jogo.

Controles:
O jogador move a raquete para a esquerda e direita usando seta para a esquerda e seta para a direita.
Se o jogo terminar vitória ou derrota, o jogador pode reiniciar pressionando a tecla R.


Blocos:
Representados pela classe Bloco.
Cada bloco tem uma posição (x, y), tamanho, cor e um status, que indica se o bloco está ativo ou destruído.
O método colisao verifica se a bola colidiu com o bloco.

Bola:
Representada pela classe Bola.
A bola tem uma posição, um raio, uma cor e uma direção.
O método mover(canvas, raquete, blocos, jogo) atualiza a posição da bola, verifica colisões com as paredes, raquete e blocos, e atualiza o estado do jogo.

Raquete:
Representada pela classe Raquete.
A raquete tem uma posição (x, y), tamanho (width, height), cor e uma velocidade de movimento.
O método mover(canvas) atualiza a posição da raquete com base nas teclas pressionadas pelo jogador.

Jogo:
Representado pela classe Jogo.
Gerencia todos os elementos do jogo (raquete, bola, blocos) e o estado do jogo (pontuação, vitória, derrota).

Inicialização:
O jogo começa com a raquete no centro da parte inferior da tela, a bola acima da raquete e uma matriz de blocos na parte superior da tela.

Loop Principal:
A cada quadro, o jogo:
Move a bola e verifica colisões.
Move a raquete com base nas teclas pressionadas.
Desenha todos os elementos na tela.
Verifica se o jogador venceu todos os blocos destruídos ou perdeu bola caiu.

Fim do Jogo:

Se o jogador perder, a mensagem "GAME OVER" é exibida.
Se o jogador vencer, a mensagem "VOCÊ GANHOU!" é exibida.
O jogador pode reiniciar o jogo pressionando a tecla R.
