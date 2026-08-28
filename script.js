const audio = document.getElementById("audio");
const itensVinil = document.querySelectorAll(".item-vinil");

let itemTocando = null;

function pararVisual(item) {
    if (!item) return;

    item.querySelector(".vinil").classList.remove("girando");
    item.querySelector(".botao-vinil").textContent = "▶ TOCAR";
}

async function tocarVinil(item) {
    const arquivo = item.dataset.musica;
    const vinil = item.querySelector(".vinil");
    const botao = item.querySelector(".botao-vinil");

    // Se clicar no mesmo vinil que está tocando, pausa.
    if (itemTocando === item && !audio.paused) {
        audio.pause();
        pararVisual(item);
        return;
    }

    // Para a animação do vinil anterior.
    pararVisual(itemTocando);

    // Se escolheu outro vinil, troca a música.
    if (itemTocando !== item) {
        audio.src = arquivo;
        itemTocando = item;
    }

    try {
        await audio.play();
        vinil.classList.add("girando");
        botao.textContent = "❚❚ PAUSAR";
    } catch {
        // Se o arquivo não existir, não mostra mensagem.
        pararVisual(item);
    }
}

itensVinil.forEach(item => {
    const botao = item.querySelector(".botao-vinil");
    const vinil = item.querySelector(".vinil");

    botao.addEventListener("click", () => tocarVinil(item));
    vinil.addEventListener("click", () => tocarVinil(item));

    vinil.addEventListener("keydown", evento => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            tocarVinil(item);
        }
    });
});

audio.addEventListener("ended", () => {
    pararVisual(itemTocando);
});


// NAVEGAÇÃO ENTRE MÚSICAS E SOBRE VOCÊ

const botoesMenu = document.querySelectorAll(".menu button");
const blocos = document.querySelectorAll(".bloco");

// Esconde todas as páginas.
blocos.forEach(bloco => {
    bloco.classList.remove("ativo");
});

// Ao abrir o site, mostra "Sobre você".
const sobre = document.getElementById("sobre");

if (sobre) {
    sobre.classList.add("ativo");
}

// Ao clicar em um botão, mostra somente a página escolhida.
botoesMenu.forEach(botao => {
    botao.addEventListener("click", () => {
        const pagina = document.getElementById(botao.dataset.alvo);

        blocos.forEach(bloco => {
            bloco.classList.remove("ativo");
        });

        if (pagina) {
            pagina.classList.add("ativo");
        }

        window.scrollTo(0, 0);
    });
});
