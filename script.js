// Banco de dados de perguntas do Quiz
const questions = [
    {
        question: "Qual das seguintes tecnologias ajuda a economizar água na irrigação do campo?",
        options: [
            "Sensores de umidade no solo conectados à internet",
            "Ligar os irrigadores nos horários mais quentes do dia",
            "Aumentar o fluxo de água sem monitoramento",
            "Varrer a terra antes de plantar"
        ],
        answer: 0 // Índice da resposta correta (primeira opção)
    },
    {
        question: "O que é 'Phishing' no ambiente digital?",
        options: [
            "Um tipo de semente modificada geneticamente",
            "Um golpe na internet para roubar dados usando mensagens falsas",
            "Um aplicativo usado para mapear o terreno com drones",
            "O processo de limpar vírus do computador"
        ],
        answer: 1
    },
    {
        question: "Como os drones podem ajudar o produtor rural de forma sustentável?",
        options: [
            "Substituindo os tratores na colheita pesada",
            "Espantando pássaros da plantação o dia todo",
            "Identificando pragas com fotos aéreas, evitando o uso excessivo de defensivos",
            "Transportando sacas de grãos diretamente para a cidade"
        ],
        answer: 2
    },
    {
        question: "Qual atitude ajuda a proteger seus dados e redes sociais na escola ou em casa?",
        options: [
            "Usar a mesma senha simples para todas as contas",
            "Anotar as senhas em um papel e colar no monitor",
            "Criar senhas fortes (com letras, números e símbolos) e não compartilhar",
            "Clicar em qualquer link que promete brindes e jogos grátis"
        ],
        answer: 2
    },
    {
        question: "O que significa o conceito de Agricultura de Precisão?",
        options: [
            "Plantar apenas no dia exato do aniversário da cidade",
            "Usar tecnologia e dados exatos para aplicar recursos no lugar e hora certa",
            "Cortar as árvores com precisão matemática",
            "Produzir apenas alimentos que tenham exatamente o mesmo tamanho"
        ],
        answer: 1
    }
];

// Variáveis de controle de estado
let currentQuestionIndex = 0;
let score = 0;

// Elementos da Interface (DOM)
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const scoreText = document.getElementById('score');

const finalPoints = document.getElementById('final-points');
const badgeIcon = document.getElementById('badge-icon');
const badgeName = document.getElementById('badge-name');

// Ouvintes de Eventos (Cliques)
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', setNextQuestion);
restartBtn.addEventListener('click', startQuiz);

// Inicia o Jogo
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.innerText = score;
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

// Renderiza a pergunta atual
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    
    // Atualiza cabeçalho e barra de progresso
    progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    // Define o texto da pergunta
    questionText.innerText = currentQuestion.question;

    // Cria os botões das alternativas
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Limpa o estado para a próxima pergunta
function resetState() {
    nextBtn.classList.add('hidden');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Valida a resposta escolhida pelo aluno
function selectOption(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    // Desabilita todos os botões após o clique para o usuário não mudar a resposta
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        selectedButton.classList.add('correct');
        score += 20; // Cada acerto vale 20 pontos (total de 100)
        scoreText.innerText = score;
    } else {
        selectedButton.classList.add('wrong');
        // Mostra qual era a correta para o aluno aprender com o erro
        allButtons[correctIndex].classList.add('correct');
    }

    // Exibe o botão de avançar
    nextBtn.classList.remove('hidden');
}

// Controla se vai para a próxima pergunta ou tela final
function setNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Mostra o resultado final e calcula a medalha ganha
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalPoints.innerText = score;

    // Sistema de Gamificação (Medalhas baseadas nos pontos)
    if (score === 100) {
        badgeIcon.innerText = "🥇";
        badgeName.innerText = "Mestre Digital Rural";
    } else if (score >= 60) {
        badgeIcon.innerText = "🥈";
        badgeName.innerText = "Protetor do Campo";
    } else {
        badgeIcon.innerText = "🥉";
        badgeName.innerText = "Aprendiz da Terra";
    }
}
