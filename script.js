// ===============================
// Abrir convite
// ===============================

const botao = document.getElementById("abrirConvite");
const convite = document.getElementById("convite");

botao.addEventListener("click", () => {

    convite.style.display = "block";
    botao.style.display = "none";

    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

});


// ===============================
// Contagem regressiva
// ===============================

const dataCasamento = new Date("September 4, 2026 13:00:00").getTime();

function atualizarContagem() {

    const agora = new Date().getTime();
    const distancia = dataCasamento - agora;

    if (distancia <= 0) {

        document.getElementById("tempo").innerHTML =
            "<strong>Chegou o grande dia!</strong>";

        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("tempo").innerHTML = `

        <div class="contador-grid">

            <div class="bloco">
                <span class="numero">${dias}</span>
                <span class="legenda">DIAS</span>
            </div>

            <div class="bloco">
                <span class="numero">${String(horas).padStart(2,"0")}</span>
                <span class="legenda">HORAS</span>
            </div>

            <div class="bloco">
                <span class="numero">${String(minutos).padStart(2,"0")}</span>
                <span class="legenda">MIN</span>
            </div>

            <div class="bloco">
                <span class="numero">${String(segundos).padStart(2,"0")}</span>
                <span class="legenda">SEG</span>
            </div>

        </div>

    `;

}

atualizarContagem();

setInterval(atualizarContagem,1000);


// ===============================
// Nome do convidado (Google Sheets)
// ===============================

// URL do Google Apps Script
const API =
"https://script.google.com/macros/s/AKfycby9YSx_9bDBFdixHO8SHftWknEIcGCv3CD3DjBAjue9y_AJI96ifd3U3g8TRpFj7v0c/exec";

// Lê o ID da URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Elemento onde será mostrado o nome
const campoNome = document.getElementById("nomeConvidado");

// Se existir um ID e o elemento
if (id && campoNome) {

    fetch(`${API}?id=${id}`)
        .then(resposta => resposta.json())
        .then(dados => {

            if (dados.nome) {

                campoNome.textContent = dados.nome;

                // Guarda o número de pessoas para usar futuramente
                window.numeroPessoas = dados.pessoas;

            } else {

                campoNome.textContent = "Convidado Especial";

            }

        })
        .catch(() => {

            campoNome.textContent = "Convidado Especial";

        });

}

}