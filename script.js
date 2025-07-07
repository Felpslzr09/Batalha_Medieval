// Lista de skins Fortnite com raridade
const cards = [
    { nome: "Cavaleiro Negro", ataque: 150, defesa: 80, imagem: "img/cavaleiro.webp", historia: "Guerreiro lendário da Temporada 2. Força sombria, respeito eterno.", raridade: "lendario" },
    { nome: "Drift", ataque: 135, defesa: 60, imagem: "img/drift 2.webp", historia: "De grafiteiro a mestre da eletricidade. Estilo e poder em cada passo.", raridade: "epico" },
    { nome: "Jonesy", ataque: 125, defesa: 110, imagem: "img/jonesy.jpg", historia: "Presente em todas as realidades. O agente que nunca falha.", raridade: "comum" },
    { nome: "Omega", ataque: 160, defesa: 65, imagem: "img/omega.jpg", historia: "Ciborgue do caos. Quanto mais luta, mais forte fica.", raridade: "epico" },
    { nome: "Skull Trooper", ataque: 145, defesa: 35, imagem: "img/skull_tropper.jpg", historia: "Assombração viva. Volta todo Halloween para aterrorizar.", raridade: "raro" },
    { nome: "Renegade Raider", ataque: 115, defesa: 100, imagem: "img/renegade.jpg", historia: "Veterana raiz. Não precisa provar nada pra ninguém.", raridade: "incomum" },
    { nome: "Midas", ataque: 175, defesa: 40, imagem: "img/midas.jpg", historia: "Gênio estratégico. Um toque e tudo vira ouro (inclusive você).", raridade: "lendario" },
    { nome: "Corvo", ataque: 105, defesa: 120, imagem: "img/corvo.webp", historia: "Sombrio e silencioso. Quando aparece, a derrota é certa.", raridade: "epico" },
    { nome: "Banana", ataque: 165, defesa: 130, imagem: "img/banana.webp", historia: "Engraçado, mas imortal. Já venceu até agentes secretos.", raridade: "raro" },
    { nome: "Marshmello", ataque: 140, defesa: 75, imagem: "img/marshmello.jpg", historia: "DJ guerreiro. Sua música é arma e escudo ao mesmo tempo.", raridade: "raro" }
];

// Mapeia cores de raridade
const coresRaridade = {
    comum: "#9d9d9d",
    incomum: "#1eff00",
    raro: "#0070dd",
    epico: "#a335ee",
    lendario: "#ff8000"
};

// Gera os cards com borda de raridade
function gerarCards() {
    const areaCards = document.getElementById('area-cards');
    areaCards.innerHTML = "";

    cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('draggable', true);
        cardDiv.setAttribute('data-index', index);

        const cor = coresRaridade[card.raridade];

        // Apenas borda colorida de raridade
        cardDiv.style.border = `2px solid ${cor}`;

        // Conteúdo do card
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${card.imagem}" alt="${card.nome}" style="width:100%; border-radius:6px; margin-bottom:5px;">
                    <h3 style="color:${cor}; font-size:0.95em;">${card.nome}</h3>
                    <div class="stats">Ataque: ${card.ataque}</div>
                    <div class="stats">Defesa: ${card.defesa}</div>
                </div>
                <div class="card-back">
                    <p>${card.historia}</p>
                </div>
            </div>
        `;

        // Permitir arrastar
        cardDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        areaCards.appendChild(cardDiv);
    });
}

// Configuração dos drop areas
function setupDropAreas() {
    const campos = document.querySelectorAll('.campo');

    campos.forEach(campo => {
        campo.addEventListener('dragover', (e) => {
            e.preventDefault();
            campo.style.background = '#3b1700';
        });

        campo.addEventListener('dragleave', () => {
            campo.style.background = '#2d1200';
        });

        campo.addEventListener('drop', (e) => {
            e.preventDefault();
            campo.style.background = '#2d1200';

            const index = e.dataTransfer.getData('text/plain');
            const card = cards[index];
            const cor = coresRaridade[card.raridade];

            // Exibir skin na arena com cor de raridade no nome
            campo.innerHTML = `
                <img src="${card.imagem}" alt="${card.nome}" />
                <h3 style="color:${cor}; font-size:1em;">${card.nome}</h3>
                <div class="stats">Ataque: ${card.ataque}</div>
                <div class="stats">Defesa: ${card.defesa}</div>
            `;
            campo.dataset.index = index;
        });
    });
}

// Lógica de batalha
function lutar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    p1.classList.remove("vencedor");
    p2.classList.remove("vencedor");

    if (!p1.dataset.index || !p2.dataset.index) {
        resultado.textContent = "⚠️ Selecione as duas skins antes de lutar!";
        resultado.style.color = "#ff5555";
        return;
    }

    const card1 = cards[p1.dataset.index];
    const card2 = cards[p2.dataset.index];

    const poder1 = card1.ataque + card1.defesa;
    const poder2 = card2.ataque + card2.defesa;

    if (poder1 > poder2) {
        resultado.textContent = `🏆 ${card1.nome} venceu com estilo Fortnite!`;
        resultado.style.color = coresRaridade[card1.raridade];
        p1.classList.add("vencedor");
    } else if (poder2 > poder1) {
        resultado.textContent = `🏆 ${card2.nome} venceu com estilo Fortnite!`;
        resultado.style.color = coresRaridade[card2.raridade];
        p2.classList.add("vencedor");
    } else {
        resultado.textContent = "⚔️ Empate épico!";
        resultado.style.color = "#ffaa00";
    }
}

// Resetar o jogo
function resetar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    p1.innerHTML = "<p>Arraste uma skin aqui</p>";
    p2.innerHTML = "<p>Arraste uma skin aqui</p>";

    delete p1.dataset.index;
    delete p2.dataset.index;

    resultado.textContent = "🛡️ Aguardando Guerreiros 🛡️";
    resultado.style.color = "#ffffff";

    p1.classList.remove("vencedor");
    p2.classList.remove("vencedor");
}

// Inicialização do jogo
gerarCards();
setupDropAreas();
document.getElementById('lutar').addEventListener('click', lutar);
document.getElementById('resetar').addEventListener('click', resetar);
