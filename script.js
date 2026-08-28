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

    if (itemTocando === item && !audio.paused) {
        audio.pause();
        pararVisual(item);
        return;
    }

    pararVisual(itemTocando);

    if (itemTocando !== item) {
        audio.src = arquivo;
        itemTocando = item;
    }

    try {
        await audio.play();
        vinil.classList.add("girando");
        botao.textContent = "❚❚ PAUSAR";
    } catch {
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

const botoesMenu = document.querySelectorAll(".menu button");
const blocos = document.querySelectorAll(".bloco");
const paginaInicial = document.querySelector(".hero");

// A página inicial antiga fica escondida.
if (paginaInicial) {
    paginaInicial.classList.add("escondido");
}

// Esconde todas as seções.
blocos.forEach(bloco => {
    bloco.classList.remove("ativo");
});

// Ao abrir o site, mostra somente "Sobre você".
const sobre = document.getElementById("sobre");
if (sobre) {
    sobre.classList.add("ativo");
}

// Ao clicar no menu, mostra somente a seção escolhida.
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

const presente = document.getElementById("presente");
const surpresa = document.getElementById("surpresa");

presente.addEventListener("click", () => {
    presente.classList.toggle("aberto");
    surpresa.classList.toggle("mostrar");
});

document.getElementById("envelope").addEventListener("click", function() {
    this.classList.toggle("aberto");
});

document.querySelectorAll(".vale").forEach(vale => {
    vale.addEventListener("click", () => vale.classList.toggle("aberto"));
});
