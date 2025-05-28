function jogar(){
    document.getElementById("menu").style.display='none';
    document.getElementById("jogo").style.display='';
    pontos = 0;
    embaralhar(imgs);
    criarCartões(imgs);
}


let imgs = [
    'bg3.avif','bg3.avif',
    'ds3.webp','ds3.webp',
    'er.avif','er.avif',
    'gta5.png','gta5.png',
    'lf1.avif','lf1.avif',
    'lf2.jpg','lf2.jpg',
    'musedash.jpg','musedash.jpg',
    'nioh2.avif','nioh2.avif',
    'ronin.avif','ronin.avif',
    'skyrim.png','skyrim.png'
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
        document.getElementById("jogo").appendChild(cartoes[cartoes.length-1]);
        i++;
    });
}

let pontos = 0;
let pontosTentativa = 10;
let paresEncontrados = 0;
let numeroCartoes = 0;
let cartoesVirados = [-1,-1];
function virarCartao(cartao){
    numeroCartoes++;
    cartoes[parseInt(cartao.alt)].src='img/'+imgs[parseInt(cartao.alt)];
    if (cartoesVirados[0] == -1) {
        cartoesVirados[0] = parseInt(cartao.alt);
    } else if (cartoesVirados[1] == -1) {
        cartoesVirados[1] = parseInt(cartao.alt);
    }
    if (numeroCartoes > 1) {
        numeroCartoes = 0;
        if (imgs[cartoesVirados[0]] == imgs[cartoesVirados[1]]) {
            cartoes[cartoesVirados[0]].onclick=null;
            cartoes[cartoesVirados[1]].onclick=null;
            paresEncontrados++;
            pontos = pontos + pontosTentativa;
            pontosTentativa = 10;
            cartoesVirados[0] = -1;
            cartoesVirados[1] = -1;
            paresEncontrados++;
        } else {
            setTimeout(() => {
                cartoes[cartoesVirados[0]].src='img/interrogation.png';
                cartoes[cartoesVirados[1]].src='img/interrogation.png';
                pontosTentativa--;
                cartoesVirados[0] = -1;
                cartoesVirados[1] = -1;
            }, 500);
        }
    }
}

function fim(){
    document.getElementById("pontuacao").innerHTML=pontos;
    document.getElementById("jogo").style.display='none';
    document.getElementById("fim").style.display='';
}

const finalizar = setInterval(() => {
    if (paresEncontrados === 20) {
        fim();
        clearInterval(finalizar);
    }
}, 1000);
