function pageRun(){
    function makeTimer(){
    var createTimerDiv = document.createElement("div");
    document.body.appendChild(createTimerDiv);
    createTimerDiv.setAttribute("id", "count");
    var count = 45;
    var interval = setInterval(function(){
        document.getElementById("count").innerHTML="TIME REMAINING: " + count;
        count--;
        if (count < 0){
            clearInterval(interval);
            document.getElementById("count").innerHTML="";
            showResults();
            createButtonPrevious.setAttribute("style", "display:none");
            createButtonNext.setAttribute("style", "display:none");
            createButtonSubmit.setAttribute("style", "display:none");
        }
    }, 1000);
}; 
    makeTimer();
    var startBtn = document.getElementById("start");
    var createButtonPrevious = document.createElement("button");
    var createButtonNext = document.createElement("button");
    var createButtonSubmit = document.createElement("button");
    startBtn.style.display="none";
    document.body.appendChild(createButtonPrevious);
    document.body.appendChild(createButtonNext);
    document.body.appendChild(createButtonSubmit);
    createButtonPrevious.textContent = "Previous Question";
    createButtonNext.textContent = "Next Question";
    createButtonSubmit.textContent = "Submit Quiz";
    createButtonPrevious.setAttribute("style", "padding-right:20px");
    createButtonPrevious.setAttribute("id", "previous");
    createButtonNext.setAttribute("style", "padding-right:20px");
    createButtonNext.setAttribute("id", "next");
    createButtonSubmit.setAttribute("style", "padding-right:20px");
    createButtonSubmit.setAttribute("id", "submit");

function runQuiz(){
    const output = [];
    questions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
                output.push(
                    `<div class="page">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
        }
    );
    quizContainer.innerHTML = output.join("");
}

function showResults(){
    document.getElementById("count").setAttribute("style", "display:none");
    document.getElementById("quiz").setAttribute("style", "display:none");
    createButtonPrevious.setAttribute("style", "display:none");
    createButtonSubmit.setAttribute("style", "display:none");
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
        }
    });
    var percentage = Math.round(100*((numCorrect/questions.length) * 100))/100;
    if(percentage > 89) {
        var letterGrade = "an A! You are a pro!"
    }
    else if(percentage > 79 && percentage < 90) {
        var letterGrade = "a B! Not bad!"
    }
    else if(percentage > 69 && percentage < 80) {
        var letterGrade = "a C. Consider brushing up on your coding knowledge a little!"
    }
    else if(percentage > 59 && percentage < 69) {
        var letterGrade = "a D. You seriously need to study..."
    }
    else if(percentage > 0 && percentage < 59) {
        var letterGrade = "an F. You haven't paid for the course already, have you...?"
    }
    else if(percentage < 1) {
        var letterGrade = "actually incredible. Statistically, it's kind of difficult to get this score."
    }
    resultsContainer.innerHTML = `You answered ${numCorrect} out of ${questions.length} questions correctly! You scored a ${percentage}%. That's ${letterGrade}`
}

function getQuestion(n){
    pages[currentPage].classList.remove("active-question");
    pages[n].classList.add("active-question");
    currentPage = n;
    if (currentPage === 0){
        previousBtn.style.display = "none";
    }
    else{
        previousBtn.style.display = "inline-block";
    }
    if(currentPage === pages.length - 1){
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    }
    else{
        nextBtn.style.display="inline-block";
        submitBtn.style.display="none";
    }
}

function showNextPage() {
    getQuestion(currentPage + 1);
}
function showPreviousPage() {
    getQuestion(currentPage - 1);
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitBtn = document.getElementById("submit");
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "Elements with <code>js</code> tags",
            b: "Elements with <code>script</code> tags",
            c: "Elements with <code>scripting</code> tags",
            d: "Elements with <code>javaScript</code> tags"
        },
        correctAnswer: "b",
    },
    {
        question: "How to write an IF statement for executing some code if <code>i</code> is NOT equal to 5?",
        answers: {
            a: "if i <> 5",
            b: "if (i != 5)",
            c: "if (i <> 5)",
            d: "if i =! 5 then"
        },
        correctAnswer: "b", 
    },
    {
        question: "How does a WHILE loop start?",
        answers: {
            a: "while (i <= 10; i++)",
            b: "while i = 1 to 10",
            c: "while (i <= 10)",
            d: "while (i is a string)"
        },
        correctAnswer: "c",
    },
    {
        question: "How can you add a comment in a JavaScript?",
        answers: {
            a: "//This is a comment",
            b: "!--This is a comment--",
            c: "'This is a comment",
            d: "comment here--->"
        },
        correctAnswer: "a",
    },
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: {
            a: "rnd(7.25)",
            b: "Math.rnd(7.25)",
            c: "Math.round(7.25)",
            d: "round(7.25)"
        },
        correctAnswer: "c",
    },
];

runQuiz();

const start = document.getElementById("start");

const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const pages = document.querySelectorAll(".page");
let currentPage = 0;
getQuestion(currentPage);

submitBtn.addEventListener('click', showResults);
previousBtn.addEventListener("click", showPreviousPage);
nextBtn.addEventListener("click", showNextPage);
}
start.addEventListener("click", pageRun);

// I was in too deep to make the timer lose time for every wrong answer. I gave up.