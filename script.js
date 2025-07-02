// Dados dos cards
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
        imagem: "img/drift 2.webp"
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

// Gera os cards na área de escolha
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

        // Evento de início do arrasto
        cardDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index);
        });

        areaCards.appendChild(cardDiv);
    });
}

// Prepara as áreas da arena para receber os cards
function setupDropAreas() {
    const campos = document.querySelectorAll('.campo');

    campos.forEach(campo => {
        // Permite arrastar sobre a arena
        campo.addEventListener('dragover', (e) => {
            e.preventDefault();
            campo.style.background = '#333'; // feedback visual
        });

        // Remove feedback visual ao sair
        campo.addEventListener('dragleave', () => {
            campo.style.background = '#1e1e1e';
        });

        // Ao soltar o card na arena
        campo.addEventListener('drop', (e) => {
            e.preventDefault();
            campo.style.background = '#1e1e1e';

            const index = e.dataTransfer.getData('text/plain');
            const card = cards[index];

            campo.innerHTML = `
                <img src="${card.imagem}" alt="${card.nome}" style="width:100px; border-radius: 6px;" />
                <h3>${card.nome}</h3>
                <div class="stats">Ataque: ${card.ataque}</div>
                <div class="stats">Defesa: ${card.defesa}</div>
            `;

            campo.dataset.index = index; // guarda o índice do card selecionado
        });
    });
}

// Chama ao carregar a página
gerarCards();
setupDropAreas();
