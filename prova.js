class Bloco {
    constructor(x, y, width, height, color = '#C6F05B') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.status = 1; 
    }

    desenhar(ctx) {
        if (this.status === 1) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    colisao(bola) {
        return (
            this.status === 1 &&
            bola.x > this.x &&
            bola.x < this.x + this.width &&
            bola.y > this.y &&
            bola.y < this.y + this.height
        );
    }
}

class Bola {
    constructor(x, y, radius, color = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 4; 
        this.dy = -4; 
    }

    desenhar(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    mover(canvas, raquete, blocos, jogo) {
        if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx; 
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy; 
        }

        if (
            this.y + this.dy > canvas.height - this.radius &&
            this.x > raquete.x &&
            this.x < raquete.x + raquete.width
        ) {
            this.dy = -this.dy; 
        }

        
        for (let i = 0; i < blocos.length; i++) {
            if (blocos[i].colisao(this)) {
                this.dy = -this.dy; 
                blocos[i].status = 0;
                jogo.pontuacao += 10; 
                jogo.atualizarPontuacao(); 
            }
        }

       
        if (this.y + this.dy > canvas.height - this.radius) {
            jogo.gameOver = true;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}

class Raquete {
    constructor(x, y, width, height, color = '#5BF09C') {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 200;
        this.color = color;
        this.dx = 8; 
        this.movendoEsquerda = false;
        this.movendoDireita = false;
    }

    desenhar(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    mover(canvas) {
        if (this.movendoEsquerda && this.x > 0) {
            this.x -= this.dx;
        } else if (this.movendoDireita && this.x < canvas.width - this.width) {
            this.x += this.dx;
        }
    }

    controlar(e) {
        if (e.key === "ArrowLeft") {
            this.movendoEsquerda = true;
        } else if (e.key === "ArrowRight") {
            this.movendoDireita = true;
        }
    }

    parar() {
        this.movendoEsquerda = false;
        this.movendoDireita = false;
    }
}

class Jogo {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.raquete = new Raquete(canvas.width / 2 - 50, canvas.height - 20, 100, 10);
        this.bola = new Bola(canvas.width / 2, canvas.height - 30, 10);
        this.blocos = [];
        this.pontuacao = 0;
        this.gameOver = false;
        this.vitoria = false;

        this.inicializarBlocos();
    }

    inicializarBlocos() {
        const blocoWidth = 75;
        const blocoHeight = 20;
        for (let c = 0; c < 9; c++) {
            for (let r = 0; r < 8; r++) {
                const x = c * (blocoWidth + 10) + 30;
                const y = r * (blocoHeight + 10) + 30;
                this.blocos.push(new Bloco(x, y, blocoWidth, blocoHeight));
            }
        }
    }

    desenhar() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.raquete.desenhar(this.ctx);
        this.bola.desenhar(this.ctx);

        for (let bloco of this.blocos) {
            bloco.desenhar(this.ctx);
        }

        this.atualizarPontuacao();

        if (this.blocos.every(bloco => bloco.status === 0) && !this.gameOver) {
            this.vitoria = true;
        }
        
        if (this.vitoria) {
            this.exibirMensagem('VOCÊ GANHOU!', 'green');
        } else if (this.gameOver) {
            this.exibirMensagem('GAME OVER', 'red');
        }
    }

    exibirMensagem(texto, cor) {
        this.ctx.fillStyle = cor;
        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(texto, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Pressione R para Reiniciar', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }

    atualizar() {
        if (!this.gameOver && !this.vitoria) {
            this.bola.mover(this.canvas, this.raquete, this.blocos, this);
            this.raquete.mover(this.canvas);
            this.desenhar();
        }
    }

    reiniciar() {
        this.raquete = new Raquete(this.canvas.width / 2 - 50, this.canvas.height - 20, 100, 10);
        this.bola = new Bola(this.canvas.width / 2, this.canvas.height - 30, 10);
        this.blocos = [];
        this.inicializarBlocos();
        this.pontuacao = 0;
        this.gameOver = false;
        this.vitoria = false;
    }

    atualizarPontuacao() {
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Pontuação: ${this.pontuacao}`;
    }
}

const canvas = document.getElementById("gameCanvas");
const jogo = new Jogo(canvas);

window.addEventListener("keydown", (e) => {
    if (e.key === "r" && (jogo.gameOver || jogo.vitoria)) {
        jogo.reiniciar();
    }
    jogo.raquete.controlar(e);
});
window.addEventListener("keyup", () => jogo.raquete.parar());

function loop() {
    jogo.atualizar();
    requestAnimationFrame(loop);
}
loop();
