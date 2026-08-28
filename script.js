const audio = document.getElementById("audio");
const vinil = document.getElementById("vinil");
const vitrola = document.querySelector(".vitrola");
const botaoPlay = document.getElementById("botaoPlay");
const statusTexto = document.getElementById("status");
const progresso = document.getElementById("progresso");
const tempoAtual = document.getElementById("tempoAtual");
const duracao = document.getElementById("duracao");

function formatarTempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60).toString().padStart(2, "0");
    return `${minutos}:${segundosRestantes}`;
}

function mudarEstado(tocando) {
    vinil.classList.toggle("girando", tocando);
    vitrola.classList.toggle("tocando", tocando);
    botaoPlay.textContent = tocando ? "⏸ PAUSAR DISCO" : "▶ TOCAR DISCO";
    statusTexto.textContent = tocando ? "Vitrola tocando" : "Vitrola parada";
}

async function tocarOuPausar() {
    if (audio.paused) {
        try {
            await audio.play();
            mudarEstado(true);
        } catch {
            // Se não houver música, não mostra nenhuma mensagem.
        }
    } else {
        audio.pause();
        mudarEstado(false);
    }
}

vinil.addEventListener("click", tocarOuPausar);
botaoPlay.addEventListener("click", tocarOuPausar);

audio.addEventListener("loadedmetadata", () => {
    duracao.textContent = formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    tempoAtual.textContent = formatarTempo(audio.currentTime);
    progresso.value = (audio.currentTime / audio.duration) * 100;
});

progresso.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (progresso.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    mudarEstado(false);
    progresso.value = 0;
    tempoAtual.textContent = "0:00";
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
