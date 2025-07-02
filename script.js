// Lista de cards (skins) disponíveis com nome, ataque, defesa e imagem
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

// Função para criar e exibir os cards de skin na tela
function gerarCards() {
    const areaCards = document.getElementById('area-cards');
    areaCards.innerHTML = ""; // Limpa a área antes de gerar

    cards.forEach((card, index) => {
        // Cria um novo elemento de card
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('draggable', true); // Permite arrastar
        cardDiv.setAttribute('data-index', index); // Salva o índice do card

        // Define o conteúdo HTML do card
        cardDiv.innerHTML = `
            <img src="${card.imagem}" alt="${card.nome}" />
            <h3>${card.nome}</h3>
            <div class="stats">Ataque: ${card.ataque}</div>
            <div class="stats">Defesa: ${card.defesa}</div>
        `;

        // Evento que ocorre quando o usuário começa a arrastar o card
        cardDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', index); // Salva o índice arrastado
        });

        areaCards.appendChild(cardDiv); // Adiciona o card na tela
    });
}

// Prepara os campos da arena para aceitar o drop (soltar)
function setupDropAreas() {
    const campos = document.querySelectorAll('.campo'); // Seleciona os dois campos da arena

    campos.forEach(campo => {
        // Permite arrastar sobre o campo (evita bloqueio padrão)
        campo.addEventListener('dragover', (e) => {
            e.preventDefault();
            campo.style.background = '#333'; // Feedback visual
        });

        // Volta à cor original ao sair do campo
        campo.addEventListener('dragleave', () => {
            campo.style.background = '#1e1e1e';
        });

        // Evento de soltar o card dentro da arena
        campo.addEventListener('drop', (e) => {
            e.preventDefault();
            campo.style.background = '#1e1e1e';

            const index = e.dataTransfer.getData('text/plain'); // Recupera o índice do card
            const card = cards[index]; // Pega os dados do card

            // Atualiza o conteúdo da arena com os dados da skin
            campo.innerHTML = `
                <img src="${card.imagem}" alt="${card.nome}" style="width:100px; border-radius: 6px;" />
                <h3>${card.nome}</h3>
                <div class="stats">Ataque: ${card.ataque}</div>
                <div class="stats">Defesa: ${card.defesa}</div>
            `;

            campo.dataset.index = index; // Salva qual card foi colocado nesse campo
        });
    });
}

// Função que executa a batalha entre os dois cards escolhidos
function lutar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    // Remove destaque visual anterior
    p1.classList.remove("vencedor");
    p2.classList.remove("vencedor");

    // Verifica se os dois jogadores escolheram uma skin
    if (!p1.dataset.index || !p2.dataset.index) {
        resultado.textContent = "Selecione as duas skins para lutar!";
        return;
    }

    // Pega os dados das duas skins
    const card1 = cards[p1.dataset.index];
    const card2 = cards[p2.dataset.index];

    // Calcula o "poder" total de cada skin
    const poder1 = card1.ataque + card1.defesa;
    const poder2 = card2.ataque + card2.defesa;

    // Compara os poderes para determinar o vencedor
    if (poder1 > poder2) {
        resultado.textContent = `${card1.nome} venceu a batalha!`;
        p1.classList.add("vencedor");
    } else if (poder2 > poder1) {
        resultado.textContent = `${card2.nome} venceu a batalha!`;
        p2.classList.add("vencedor");
    } else {
        resultado.textContent = "Empate!";
    }
}

// Função que reseta o jogo para o estado inicial
function resetar() {
    const p1 = document.getElementById('player1');
    const p2 = document.getElementById('player2');
    const resultado = document.getElementById('resultado');

    // Restaura os textos padrão das arenas
    p1.innerHTML = "Arena 1";
    p2.innerHTML = "Arena 2";

    // Remove os dados de índice armazenados
    delete p1.dataset.index;
    delete p2.dataset.index;

    // Mensagem inicial de resultado
    resultado.textContent = "Loja de Luta";
}

// Inicializa a página criando os cards e preparando a arena
gerarCards();
setupDropAreas();

// Adiciona eventos aos botões de lutar e resetar
document.getElementById('lutar').addEventListener('click', lutar);
document.getElementById('resetar').addEventListener('click', resetar);
