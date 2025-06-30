const cards = [
    {
        nome: "Cavaleiro Negro",
        ataque: 120,
        defesa: 80,
        imagem: "img/cavaleiro.webp"
    },
    {
        nome: "Drift",
        ataque: 110,
        defesa: 85,
        imagem: "img/drift.jpg"
    },
    {
        nome: "Jonesy",
        ataque: 90,
        defesa: 100,
        imagem: "img/jonesy.jpg"
    },
    {
        nome: "Omega",
        ataque: 130,
        defesa: 70,
        imagem: "img/omega.jpg"
    },
    {
        nome: "Skull Trooper",
        ataque: 100,
        defesa: 90,
        imagem: "img/skull_tropper.jpg"
    }
];

// Função para gerar os cards na tela
function gerarCards() {
    const areaCards = document.getElementById('area-cards');
    areaCards.innerHTML = ""; // limpa antes de adicionar

    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        cardDiv.innerHTML = `
            <img src="${card.imagem}" alt="${card.nome}" />
            <h3>${card.nome}</h3>
            <div class="stats">Ataque: ${card.ataque}</div>
            <div class="stats">Defesa: ${card.defesa}</div>
        `;

        areaCards.appendChild(cardDiv);
    });
}

// Chama ao carregar
gerarCards();
