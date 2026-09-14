const quizData = {

    general: [
        {
            question: "What is the capital of India?",
            options: [
                "Mumbai",
                "New Delhi",
                "Chennai",
                "Kolkata"
            ],
            answer: "New Delhi"
        },

        {
            question: "Which planet is known as the Red Planet?",
            options: [
                "Earth",
                "Mars",
                "Jupiter",
                "Venus"
            ],
            answer: "Mars"
        },

        {
            question: "How many days are there in a leap year?",
            options: [
                "365",
                "366",
                "364",
                "367"
            ],
            answer: "366"
        },

        {
            question: "Which is the largest ocean?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Pacific Ocean",
                "Arctic Ocean"
            ],
            answer: "Pacific Ocean"
        },

        {
            question: "Which gas do humans need for respiration?",
            options: [
                "Oxygen",
                "Carbon dioxide",
                "Nitrogen",
                "Hydrogen"
            ],
            answer: "Oxygen"
        }
    ],


    computer: [

        {
            question: "Which language is mainly used to structure a webpage?",
            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "Python"
            ],
            answer: "HTML"
        },

        {
            question: "Which language is used to style webpages?",
            options: [
                "HTML",
                "CSS",
                "Java",
                "C++"
            ],
            answer: "CSS"
        },

        {
            question: "Which language makes webpages interactive?",
            options: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],
            answer: "JavaScript"
        },

        {
            question: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Computer Processing User"
            ],
            answer: "Central Processing Unit"
        },

        {
            question: "Which one is an operating system?",
            options: [
                "Windows",
                "HTML",
                "Google",
                "Python"
            ],
            answer: "Windows"
        }
    ],


    web: [

        {
            question: "Which HTML tag is used to create a paragraph?",
            options: [
                "<p>",
                "<h1>",
                "<div>",
                "<br>"
            ],
            answer: "<p>"
        },

        {
            question: "Which symbol is used for an ID selector in CSS?",
            options: [
                "#",
                ".",
                "@",
                "*"
            ],
            answer: "#"
        },

        {
            question: "Which HTML tag creates a hyperlink?",
            options: [
                "<a>",
                "<link>",
                "<href>",
                "<url>"
            ],
            answer: "<a>"
        },

        {
            question: "Which file extension is commonly used for JavaScript?",
            options: [
                ".html",
                ".css",
                ".js",
                ".java"
            ],
            answer: ".js"
        },

        {
            question: "Which CSS property changes text color?",
            options: [
                "background",
                "font-size",
                "color",
                "text-style"
            ],
            answer: "color"
        }
    ]
};


// Elements

const startScreen = document.getElementById("start-screen");

const quizScreen = document.getElementById("quiz-screen");

const resultScreen = document.getElementById("result-screen");

const playerName = document.getElementById("player-name");

const category = document.getElementById("category");

const startBtn = document.getElementById("start-btn");

const questionNumber = document.getElementById("question-number");

const timerDisplay = document.getElementById("timer");

const progressBar = document.getElementById("progress-bar");

const questionElement = document.getElementById("question");

const optionsElement = document.getElementById("options");

const nextBtn = document.getElementById("next-btn");

const restartBtn = document.getElementById("restart-btn");

const resultName = document.getElementById("result-name");

const scoreElement = document.getElementById("score");

const percentageElement = document.getElementById("percentage");

const resultMessage = document.getElementById("result-message");


// Variables

let questions = [];

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let timer;

let timeLeft = 30;


// Start Quiz

startBtn.addEventListener("click", startQuiz);


function startQuiz() {

    const name = playerName.value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;
    }

    questions = quizData[category.value];

    currentQuestion = 0;

    score = 0;

    startScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();
}


// Show Question

function showQuestion() {

    selectedAnswer = null;

    nextBtn.disabled = true;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = current.question;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";

    current.options.forEach(option => {

        const button = document.createElement("button");

        button.classList.add("option");

        button.textContent = option;

        button.addEventListener(
            "click",
            () => selectAnswer(button, option)
        );

        optionsElement.appendChild(button);
    });

    startTimer();
}


// Select Answer

function selectAnswer(button, option) {

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = option;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(optionButton => {

        optionButton.disabled = true;

        if (
            optionButton.textContent === correctAnswer
        ) {

            optionButton.classList.add("correct");

        }

    });


    if (option === correctAnswer) {

        score++;

        button.classList.add("correct");

    } else {

        button.classList.add("wrong");
    }

    nextBtn.disabled = false;
}


// Timer

function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            if (selectedAnswer === null) {

                selectedAnswer = "TIMEOUT";

                nextBtn.disabled = false;

                const correctAnswer =
                    questions[currentQuestion].answer;

                document
                    .querySelectorAll(".option")
                    .forEach(button => {

                        button.disabled = true;

                        if (
                            button.textContent === correctAnswer
                        ) {

                            button.classList.add("correct");
                        }
                    });
            }
        }

    }, 1000);
}


// Next Question

nextBtn.addEventListener("click", nextQuestion);


function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
}


// Result

function showResult() {

    clearInterval(timer);

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    const name = playerName.value.trim();

    resultName.textContent = `Well done, ${name}!`;

    scoreElement.textContent =
        `${score} / ${questions.length}`;

    const percentage =
        Math.round((score / questions.length) * 100);

    percentageElement.textContent =
        `${percentage}%`;

    if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent! You have a great knowledge.";

    } else if (percentage >= 50) {

        resultMessage.textContent =
            "Good job! Keep practicing to improve.";

    } else {

        resultMessage.textContent =
            "Keep learning and try again!";
    }
}


// Restart

restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

});