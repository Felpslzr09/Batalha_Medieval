// Lista de skins Fortnite disponíveis com nome, ataque, defesa e imagem
const cards = [
    { nome: "Cavaleiro Negro", ataque: 160, defesa: 40, imagem: "img/cavaleiro.webp" },
    { nome: "Drift", ataque: 100, defesa: 50, imagem: "img/drift 2.webp" },
    { nome: "Jonesy", ataque: 120, defesa: 95, imagem: "img/jonesy.jpg" },
    { nome: "Omega", ataque: 130, defesa: 70, imagem: "img/omega.jpg" },
    { nome: "Skull Trooper", ataque: 150, defesa: 20, imagem: "img/skull_tropper.jpg" },
    { nome: "Renegade Raider", ataque: 110, defesa: 90, imagem: "img/renegade.jpg" },
    { nome: "Midas", ataque: 170, defesa: 30, imagem: "img/midas.jpg" },
    { nome: "Corvo", ataque: 95, defesa: 105, imagem: "img/corvo.webp" },
    { nome: "Banana", ataque: 180, defesa: 120, imagem: "img/banana.webp" },
    { nome: "Marshmello", ataque: 140, defesa: 60, imagem: "img/marshmello.jpg" }
];

// Função para gerar os cards
function gerarCards() {
    const areaCards = document.getElementById('area-cards');
    areaCards.innerHTML = "";

    cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('draggable', true);
        cardDiv.setAttribute('data-index', index);

        cardDiv.innerHTML = `
            <img src="${card.imagem}" alt="${card.nome}" />
            <h3>${card.nome}</h3>
            <div class="stats">Ataque: ${card.ataque}</div>
            <div class="stats">Defesa: ${card.defesa}</div>
        `;

        cardDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        areaCards.appendChild(cardDiv);
    });
}

// Configuração das arenas para drop
function setupDropAreas() {
    const campos = document.querySelectorAll('.campo');

    campos.forEach(campo => {
        campo.addEventListener('dragover', (e) => {
            e.preventDefault();
            campo.style.background = '#001f2a';
        });

        campo.addEventListener('dragleave', () => {
            campo.style.background = 'rgba(10, 10, 30, 0.85)';
        });

        campo.addEventListener('drop', (e) => {
            e.preventDefault();
            campo.style.background = 'rgba(10, 10, 30, 0.85)';

            const index = e.dataTransfer.getData('text/plain');
            const card = cards[index];

            campo.innerHTML = `
                <img src="${card.imagem}" alt="${card.nome}" />
                <h3>${card.nome}</h3>
                <div class="stats">Ataque: ${card.ataque}</div>
                <div class="stats">Defesa: ${card.defesa}</div>
            `;

            campo.dataset.index = index;
        });
    });
}

// Função da batalha
function lutar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    p1.classList.remove("vencedor");
    p2.classList.remove("vencedor");

    if (!p1.dataset.index || !p2.dataset.index) {
        resultado.textContent = "Selecione as duas skins antes de lutar!";
        resultado.style.color = "#ff5555";
        return;
    }

    const card1 = cards[p1.dataset.index];
    const card2 = cards[p2.dataset.index];

    const poder1 = card1.ataque + card1.defesa;
    const poder2 = card2.ataque + card2.defesa;

    if (poder1 > poder2) {
        resultado.textContent = `🏆 ${card1.nome} venceu a batalha!`;
        resultado.style.color = "#00aeef";
        p1.classList.add("vencedor");
    } else if (poder2 > poder1) {
        resultado.textContent = `🏆 ${card2.nome} venceu a batalha!`;
        resultado.style.color = "#00aeef";
        p2.classList.add("vencedor");
    } else {
        resultado.textContent = "⚔️ Empate!";
        resultado.style.color = "#ffaa00";
    }
}

// Reset da arena
function resetar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    p1.innerHTML = "<p>Arraste uma skin aqui</p>";
    p2.innerHTML = "<p>Arraste uma skin aqui</p>";

    delete p1.dataset.index;
    delete p2.dataset.index;

    resultado.textContent = "🏆 Loja de Luta Fortnite 🏆";
    resultado.style.color = "#00aeef";

    p1.classList.remove("vencedor");
    p2.classList.remove("vencedor");
}

// Inicializa o jogo
gerarCards();
setupDropAreas();
document.getElementById('lutar').addEventListener('click', lutar);
document.getElementById('resetar').addEventListener('click', resetar);
