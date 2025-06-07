function jogar(){
    document.getElementById("menu").style.display='none';
    document.getElementById("jogo").style.display='';
    embaralhar(imgs);
    criarCartões(imgs);
    jogadorDaVez = Math.random() < 0.5 ? 1 : 2;
    oea.innerHTML='Vez do Jogador '+jogadorDaVez;
}


let imgs = [
    'armadilha.png','armadilha.png',
    'armadura.png','armadura.png',
    'escudo.png','escudo.png',
    'espada.png','espada.png',
    'nada.png','nada.png',
    'pao.png','pao.png',
    'pergaminho.png','pergaminho.png',
    'pocao_vida.png','pocao_vida.png',
    'varinha.png','varinha.png',
    'veneno.png','veneno.png'
]

function embaralhar(c) {
    for(let i = c.length - 1; i > 0; i--) {
        const n = Math.floor(Math.random() * (1+i));
        [c[i],c[n]] = [c[n],c[i]];
    }
}

let cartoes = [];

function criarCartões(e){
    let i = 0;
    e.forEach(c => {
        cartoes.push(document.createElement("img"))
        cartoes[cartoes.length-1].src='img/interrogation.png';
        cartoes[cartoes.length-1].width = 140; 
        cartoes[cartoes.length-1].height = 140;
        cartoes[cartoes.length-1].alt=i;
        cartoes[cartoes.length-1].onclick=function() {
            virarCartao(this);
        };
        cartoes[cartoes.length-1].style.border='black solid'
        cartoes[cartoes.length-1].classList.add("carta");
        document.getElementById("cartas").appendChild(cartoes[cartoes.length-1]);
        i++;
    });
}

let oea = document.getElementById('oea');
let jogadorDaVez = 0;
let paresEncontrados = 0;
let numeroCartoes = 0;
let cartoesVirados = [-1,-1];
let cartasBloqueadas =  false;
let acaoPermitida = false;

let jogadores = [
    {
        jogador: {
            id: 'j1',
            pv: 10,
            atq: 1,
            esc: 1,
            arm: 0,
            sta: [],
            def: false
        }
    },
    {
        jogador: {
            id: 'j2',
            pv: 10,
            atq: 1,
            esc: 1,
            arm: 0,
            sta: [],
            def: false
        }
    }
]

function virarCartao(cartao){
    if (cartasBloqueadas) {
        return;
    } else {
        numeroCartoes++;
        cartoes[parseInt(cartao.alt)].src='img/cartas/'+imgs[parseInt(cartao.alt)];
        if (cartoesVirados[0] == -1) {
            cartoesVirados[0] = parseInt(cartao.alt);
            cartoes[cartoesVirados[0]].onclick=null;
        } else if (cartoesVirados[1] == -1) {
            cartoesVirados[1] = parseInt(cartao.alt);
            cartoes[cartoesVirados[1]].onclick=null;
        }
        if (numeroCartoes > 1) {
            numeroCartoes = 0;
            if (imgs[cartoesVirados[0]] == imgs[cartoesVirados[1]]) {
                carta = imgs[cartoesVirados[0]];
                cartoesVirados[0] = -1;
                cartoesVirados[1] = -1;
                paresEncontrados++;
                usarCarta(carta);
                fim();
            } else {
                cartasBloqueadas = true;
                setTimeout(() => {
                    cartoes[cartoesVirados[0]].onclick=function() {virarCartao(this);};
                    cartoes[cartoesVirados[1]].onclick=function() {virarCartao(this);};
                    cartoes[cartoesVirados[0]].src='img/interrogation.png';
                    cartoes[cartoesVirados[1]].src='img/interrogation.png';
                    cartoesVirados[0] = -1;
                    cartoesVirados[1] = -1;
                    acaoPermitida = true;
                }, 1000);
            }
        }
    }
}

function fim(){
    if (jogadores[0].jogador.pv <= 0 || jogadores[1].jogador.pv <= 0) {
        document.getElementById("vencedor").innerHTML="Jogador "+jogadorDaVez+" venceu!"
        document.getElementById("jogo").style.display='none';
        document.getElementById("fim").style.display='';
    }
}

function atacar(id) {
    if (acaoPermitida) {
        if (id.value == jogadorDaVez-1) {
            if (id.value == 0) {
                if (jogadores[1].jogador.def) {
                    dano = jogadores[0].jogador.atq - (jogadores[1].jogador.esc + jogadores[1].jogador.arm);
                    if (dano > 0) {
                        jogadores[1].jogador.pv -= dano;
                    }
                    jogadores[1].jogador.def = false;
                } else {
                    dano = jogadores[0].jogador.atq - jogadores[1].jogador.arm;
                    if (dano > 0) {
                        jogadores[1].jogador.pv -= dano;
                    }
                }
                jogadores[jogadorDaVez-1].jogador.def=false;
                document.getElementById("j2_pv").innerHTML='Vida: '+jogadores[1].jogador.pv+'/10';
                jogadorDaVez = 2;
            } else {
                if (jogadores[0].jogador.def) {
                    dano = jogadores[1].jogador.atq - (jogadores[0].jogador.esc + jogadores[0].jogador.arm);
                    if (dano > 0) {
                        jogadores[0].jogador.pv -= dano;
                    }
                    jogadores[0].jogador.def = false
                } else {
                    dano = jogadores[1].jogador.atq - jogadores[0].jogador.arm;
                    if (dano > 0) {
                        jogadores[0].jogador.pv -= dano;
                    }
                }
                
                jogadores[jogadorDaVez-1].jogador.def=false;
                document.getElementById("j1_pv").innerHTML='Vida: '+jogadores[0].jogador.pv+'/10';
                jogadorDaVez = 1;
            }
            danoVeneno();
            fim();
            resetarCartoes();
            acaoPermitida = false
            cartasBloqueadas = false
            oea.innerHTML='Vez do Jogador '+jogadorDaVez;
        } else {
            return;
        }
    } else {
        return;
    }
}

function defender(id) {
    if (acaoPermitida) {
        if (id.value == jogadorDaVez-1) {
            jogadores[jogadorDaVez-1].jogador.def=true;
            if (jogadorDaVez == 1) {
                jogadorDaVez = 2;
            } else {
                jogadorDaVez = 1;
            }
            oea.innerHTML='Vez do Jogador '+jogadorDaVez;
            danoVeneno();
            fim();
            resetarCartoes();
            acaoPermitida = false
            cartasBloqueadas = false
        } else {
            return;
        }
    } else {
        return;
    }
}

function danoVeneno() {
    if (jogadores[jogadorDaVez-1].jogador.sta.includes('Envenenado')) {
        jogadores[jogadorDaVez-1].jogador.pv -= 1;
        document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_pv').innerHTML='Vida: '+jogadores[jogadorDaVez-1].jogador.pv+'/10';
    }
}

function resetarCartoes() {
    if (paresEncontrados == 10) {
        while (document.getElementById("cartas").firstChild) {
            document.getElementById("cartas").removeChild(document.getElementById("cartas").firstChild);
        }
        embaralhar(imgs);
        criarCartões(imgs);
    } else {
        return;
    }
}