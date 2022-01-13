
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');
const list = document.querySelector('.list');
const quizIntro = document.querySelector('.quiz-intro');
const result = document.getElementById('result');
let timerEl = document.querySelector('.timer');
// array index 0 
let currentQuiz = 0;
let score = 0;
let timerCount = 100;

startBtn.addEventListener("click", loadQuiz)

const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "d",
    },
    {
        question: "What does css stand for ",
        a: "cascading style sheets",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "a",
    },
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "d",

    },

    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "c",
    }

]

function loadQuiz() {
    // start button and game instructions are set to hidden
    startBtn.classList.add('hide')
    quizIntro.classList.add('hide')
    quiz.classList.remove('hide')
    // when quiz is loaded, deselect answers
    deselectAnswers()
    startTimer();
    // get currentQuizData by accessing quizdata array at the first index
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    console.log(currentQuizData)
}

function deselectAnswers() {
    // for each answer element, deselect answer checked option
    answerEls.forEach(answerEls => answerEls.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEls => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    })
    return answer
}

submitBtn.addEventListener("click", function () {
    const answer = getSelected();
    // check if answer is correct 
    // if(answer) {
    if (answer === quizData[currentQuiz].correct) {
        score++
        result.textContent = 'Correct'
        setTimeout(() => {
            result.textContent = ""
        }, 700);
    } else /*if (answer != quizData[currentQuiz].correct) */{
        timerCount - 10;
        result.textContent = 'Incorrect'
        setTimeout(() => {
            result.textContent = ""
        }, 700);

    }
    currentQuiz++
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        calcScore();
        // quiz.innerHTML = `
        // <h2> You answered ${score}/${quizData.length} questions correctly.
        // <p>Your score: ${score}</p> </h2>

        // <button onclick ="location.reload()">Reload</button>`
        // add an add name option form here
    }

    // }
})

// if timer times out, it will call calcScore
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount < 1) {
            clearInterval(timer);
            calcScore();
        }
    }, 1000);
}

// calculate the final score
function calcScore() {
    quiz.innerHTML = `
    <h2> You answered ${score}/${quizData.length} questions correctly.
    <p>Your score: ${score}</p> </h2>
    
    <button onclick ="location.reload()">Reload</button>`
}



// function startTimer() {
//     var timeLeft = 100;
//     var timeInterval = setInterval(function(){
//         timeLeft--
//         if (timeLeft > 1) {
//             timerEl.textContent = `${timeLeft} seconds remaining`
//         } else if(timeLeft === 0) {
//             clearInterval(timeInterval);
//             // displayMessage();
//         }
//     }, 1000)

// }