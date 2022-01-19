// question/answer array
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
        question: "What does css stand for?",
        a: "cascading style sheets",
        b: "C",
        c: "Python",
        d: "Javascript",
        correct: "a",
    },
    {
        question: "When was Javascript created?",
        a: "1989",
        b: "2001",
        c: "1995",
        d: "1997",
        correct: "c",

    },
    {
        question: "What tag can be used to insert a line break or blank line in an HTML document?",
        a: "<title>",
        b: "<br>",
        c: "<body>",
        d: "<head>",
        correct: "b",
     },
    {
        question: "What tag is required in all HTML documents, and is used to define the title?",
        a: "<title></title>",
        b: "<body></body>",
        c: "<br></br>",
        d: "<head></head>",
        correct: "d",
    },
    {
        question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        a: "string",
        b: "function",
        c: "declaration",
        d: "variable",
        correct: "b",
    }


]
// create necessary elements
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
let highScoreBtn = document.getElementById('initials-entry')
let scoreBtn = document.createElement("button")
let scoreTextContainer = document.createElement("h2")
let paragraph = document.createElement("p")
let initials = document.getElementById('initials')
let highScoresInitial = document.getElementById('highScoresInitial')
// currentQuiz is set to 0 to index the first element of quizData array
let currentQuiz = 0;
let score = 0;
let timerCount = 100;

// when start button is clicked, loadQuiz is called
startBtn.addEventListener("click", loadQuiz)

function loadQuiz() {
    // start button and game instructions are set to hidden
    startBtn.classList.add('hide')
    quizIntro.classList.add('hide')
    // hidden class is removed from question body to display the quiz
    quiz.classList.remove('hide')
    // when quiz is loaded, deselect answers and start timer
    deselectAnswers()
    startTimer();
    // currentQuiz is set to 0, get currentQuizData by accessing quizData array at the first index
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

// get selected answer, answer = answer element id to compare it to correct answer
function getSelected() {
    let answer
    answerEls.forEach(answerEls => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    })
    console.log(answer)
    return answer
}
// clicking submit runs getSelected() to get the id of selected answer
submitBtn.addEventListener("click", function () {
    let answer = getSelected();
    // check if answer is correct 
    if (answer === quizData[currentQuiz].correct) {
        score++
        result.textContent = 'Correct'
        setTimeout(() => {
            result.textContent = ""
        }, 2000);
    } else {
        // incorrect answer displays incorrect at bottom of quiz and deducts 10 seconds from the timercount
        timerCount = timerCount - 10;
        result.textContent = 'Incorrect'
        setTimeout(() => {
            result.textContent = ""
        }, 2000);

    }
    // load next question in the array by incrementing currentQuiz by 1
    currentQuiz++
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        // if currenQuiz index > quizData.length, game ends as there are no more questions, calcScore is called.
        calcScore();
    }
})

// if time runs out, calcScore is called
function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            calcScore();
        }
    }, 1000);
}

// calculate the final score
function calcScore() {
    quiz.setAttribute('class', 'hide')
    quizIntro.classList.remove('hide')
    quizIntro.innerHTML = `
    <h2> You answered ${score}/${quizData.length} questions correctly.
    <p>Your score: ${score}</p> 
    <button onclick ="location.reload()">Reload</button>`
    quizIntro.appendChild(highScoreBtn);
    highScoresInitial.classList.remove('hide')
    initials.classList.remove('hide')
}


highScoresInitial.addEventListener("click", function(event) {
    event.preventDefault();
    // preventing unwanted input
        if (initials.value == "") {
            alert("Enter your initials");
            initials.focus();
            return;
        }
        if (!/^[a-zA-Z]*$/g.test(initials.value)) {
            alert("Invalid characters, enter your initials");
            initials.value = "";
            return;
        }
    
    var allScores;

    console.log(localStorage.getItem("allScores"));
    //sets to empty array if nothing currently in local storage
     if (localStorage.getItem("allScores") === null) {
         allScores = [];
     }
    //if there is   data in local storage, retrieves it, puts into object
     else {
         allScores = JSON.parse(localStorage.getItem("allScores"));
         console.log(allScores)};
    //puts new data into allScores 
    function saveAllScores (event) {
        event.preventDefault(event);

        var userScore = {
        score: score,
        initials: initials.value
        };

        allScores.push(userScore);
        //sorts user scores from highest to lowest
        allScores.sort( (a, b) => {
            return b.score - a.score;
        });
        //puts allScores back into string and into local storage
        localStorage.setItem("allScores", JSON.stringify(allScores));
        console.log(allScores);
    }

    saveAllScores(event);
    console.log('score saved')
});


