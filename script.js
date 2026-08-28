const audio = document.getElementById("audio");
const vinil = document.querySelector(".vinil");
const botaoPlay = document.getElementById("botaoPlay");
const itemVinil = document.querySelector(".item-vinil");

function pararVisual() {
    vinil.classList.remove("girando");
    itemVinil.classList.remove("tocando");
    botaoPlay.textContent = "▶ TOCAR";
}

async function tocarMusica() {
    const arquivo = itemVinil.dataset.musica;

    if (!audio.src) {
        audio.src = arquivo;
    }

    if (!audio.paused) {
        audio.pause();
        pararVisual();
        return;
    }

    try {
        await audio.play();
        vinil.classList.add("girando");
        itemVinil.classList.add("tocando");
        botaoPlay.textContent = "❚❚ PAUSAR";
    } catch {
        pararVisual();
    }
}

botaoPlay.addEventListener("click", tocarMusica);
vinil.addEventListener("click", tocarMusica);

vinil.addEventListener("keydown", evento => {
    if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        tocarMusica();
    }
});

audio.addEventListener("ended", pararVisual);
