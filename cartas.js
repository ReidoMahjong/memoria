function usarCarta(carta) {
    switch(carta) {
        case "armadilha.png":
            jogadores[jogadorDaVez-1].jogador.pv -= 1;
            cartasBloqueadas = true;
            acaoPermitida = true;
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_pv').innerHTML='Vida: '+jogadores[jogadorDaVez-1].jogador.pv+'/10';
            oea.innerHTML='Você caiu em uma armadilha e perdeu 1 de Vida! Faça uma ação.'
            break;
        case "armadura.png":
            jogadores[jogadorDaVez-1].jogador.arm += 1;
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_arm').innerHTML='Armadura: '+jogadores[jogadorDaVez-1].jogador.arm;
            oea.innerHTML='Você achou uma armadura!'
            break;
        case "escudo.png":
            jogadores[jogadorDaVez-1].jogador.esc += 1;
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_esc').innerHTML='Escudo: '+jogadores[jogadorDaVez-1].jogador.esc;
            oea.innerHTML='Você achou um escudo!'
            break;
        case "espada.png":
            jogadores[jogadorDaVez-1].jogador.atq += 1;
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_atq').innerHTML='Ataque: '+jogadores[jogadorDaVez-1].jogador.atq;
            oea.innerHTML='Você achou uma espada!'
            break;
        case "nada.png":
            oea.innerHTML='Nada acontece... mas você não perde a vez!'
            break;
        case "pao.png":
            if (jogadores[jogadorDaVez-1].jogador.pv < 10) {
                jogadores[jogadorDaVez-1].jogador.pv += 1;
            }
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_pv').innerHTML='Vida: '+jogadores[jogadorDaVez-1].jogador.pv+'/10';
            oea.innerHTML='Você acha e come um pão, +1 de vida!'
            break;
        case "pergaminho.png":
            if (jogadores[jogadorDaVez-1] == jogadores[0]) {
                jogadores[1].jogador.pv -= 3;
                document.getElementById(jogadores[1].jogador.id+'_pv').innerHTML='Vida: '+jogadores[1].jogador.pv+'/10';
            } else {
                jogadores[0].jogador.pv -= 3;
                document.getElementById(jogadores[0].jogador.id+'_pv').innerHTML='Vida: '+jogadores[0].jogador.pv+'/10';
            }
            oea.innerHTML='Você usa o pergaminho e lança uma bola de fogo! Causando 3 de dano!'
            break;
        case "pocao_vida.png":
            jogadores[jogadorDaVez-1].jogador.pv += 3;
            if (jogadores[jogadorDaVez-1].jogador.pv > 10) {
                jogadores[jogadorDaVez-1].jogador.pv = 10;
            }
            oea.innerHTML='Você encontra uma poção de cura e a toma! Recupera 3 de vida!'
            if (jogadores[jogadorDaVez-1].jogador.sta.indexOf('Envenenado') != -1) {
                jogadores[jogadorDaVez-1].jogador.sta.splice(0,jogadores[jogadorDaVez-1].jogador.sta.indexOf('Envenenado'));
                oea.innerHTML='Você encontra uma poção de cura e a toma! Recupera 3 de vida!\nSe curou do envenenamento!'
                document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_status').innerHTML='';
            }
            document.getElementById(jogadores[jogadorDaVez-1].jogador.id+'_pv').innerHTML='Vida: '+jogadores[jogadorDaVez-1].jogador.pv+'/10';
            break;
        case "varinha.png":
            if (jogadores[jogadorDaVez-1] == jogadores[0]) {
                jogadores[1].jogador.arm -= 1;
                if (jogadores[1].jogador.arm < 0) {
                    jogadores[1].jogador.arm = 0;
                }
            } else {
                jogadores[0].jogador.arm -= 1;
                if (jogadores[0].jogador.arm < 0) {
                    jogadores[0].jogador.arm = 0;
                }
            }
            oea.innerHTML='Você encontra e usa uma varinha mágica! O adversário perde parte da armadura!'
            break;
        case "veneno.png":
            if (jogadores[jogadorDaVez-1] == jogadores[0]) {
                if (!jogadores[1].jogador.sta.includes('Envenenado')) {
                    jogadores[1].jogador.sta.push('Envenenado');
                    document.getElementById(jogadores[1].jogador.id+'_status').innerHTML=jogadores[1].jogador.sta[0];
                    oea.innerHTML='Você encontra um frasco de veneno! Você envenena o adversário!'
                } else {    
                    oea.innerHTML='Você encontra um frasco de veneno! Mas o adversário já está envenenado...'
                }
            } else {
                if (!jogadores[1].jogador.sta.includes('Envenenado')) {
                    jogadores[0].jogador.sta.push('Envenenado');
                    document.getElementById(jogadores[0].jogador.id+'_status').innerHTML=jogadores[0].jogador.sta[0];
                    oea.innerHTML='Você encontra um frasco de veneno! Você envenena o adversário!'
                } else {
                    
                oea.innerHTML='Você encontra um frasco de veneno! Mas o adversário já está envenenado...'
                }
            }
            break;
    }
}