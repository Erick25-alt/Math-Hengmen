let currentLevel = 'easy';
let currentQuestionIndex = 0;
let wrongAnswers = 0;
let score = 0;
let currentQuestion;
const maxQuestions = {
    easy: 10,
    medium: 20,
    hard: 40
};

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const hangmanParts = document.querySelectorAll('.part');
const gameElement = document.getElementById('game');
const playAgainButton = document.getElementById('play-again');

document.getElementById('submit').addEventListener('click', () => {
    checkAnswer();
});

playAgainButton.addEventListener('click', () => {
    resetGame();
});

function startGame() {
    currentQuestionIndex = 0;
    wrongAnswers = 0;
    score = 0;
    generateQuestion();
    hangmanParts.forEach(part => part.style.display = 'none');
}

function generateQuestion() {
    if (currentLevel === 'easy') {
        currentQuestion = generateRandomCalculation(1, 10);  // Números de 1 a 10
    } else if (currentLevel === 'medium') {
        currentQuestion = generateRandomCalculation(10, 50);  // Números de 10 a 50
    } else if (currentLevel === 'hard') {
        currentQuestion = generateRandomCalculation(50, 100);  // Números de 50 a 100
    }

    questionElement.textContent = currentQuestion.question;
    answerElement.value = '';
}

function generateRandomCalculation(min, max) {
    const operations = ['+', '-', '*', '/'];
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let question;
    let answer;

    if (operation === '+') {
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
    } else if (operation === '-') {
        question = `${num1} - ${num2}`;
        answer = num1 - num2;
    } else if (operation === '*') {
        question = `${num1} * ${num2}`;
        answer = num1 * num2;
    } else if (operation === '/') {
        question = `${num1} / ${num2}`;
        answer = Math.floor(num1 / num2); // Mantém a divisão inteira
    }

    return { question, answer };
}

function checkAnswer() {
    const userAnswer = parseInt(answerElement.value);
    const correctAnswer = currentQuestion.answer;

    if (userAnswer === correctAnswer) {
        score++;
        currentQuestionIndex++;
        if (currentQuestionIndex < maxQuestions[currentLevel]) {
            generateQuestion();
        } else {
            advanceLevel();
        }
    } else {
        wrongAnswers++;
        if (wrongAnswers <= hangmanParts.length) {
            hangmanParts[wrongAnswers - 1].style.display = 'block';
        }
        if (wrongAnswers === hangmanParts.length) {
            setTimeout(() => askPlayAgain("Você perdeu! Deseja tentar novamente?"), 200);
        }
    }
}

function advanceLevel() {
    if (currentLevel === 'easy') {
        alert('Parabéns! Você concluiu o nível Fácil!');
        currentLevel = 'medium';
        resetGame();
    } else if (currentLevel === 'medium') {
        alert('Parabéns! Você concluiu o nível Médio!');
        currentLevel = 'hard';
        resetGame();
    } else if (currentLevel === 'hard') {
        alert('Parabéns! Você concluiu o nível Difícil e o jogo!');
        resetGame();
    }
}

function askPlayAgain(message) {
    playAgainButton.classList.remove('hidden');
    alert(message);
}

function resetGame() {
    currentQuestionIndex = 0;
    wrongAnswers = 0;
    score = 0;
    hangmanParts.forEach(part => part.style.display = 'none');
    playAgainButton.classList.add('hidden');
    startGame();
}

startGame();
