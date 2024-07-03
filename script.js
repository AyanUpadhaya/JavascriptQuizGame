// State variables
let currentQuestionIndex = 0;
let currentScore = 0;
let currentQuestionObject = {};
let currentUserName = "";
let inCorrectAnsArray = [];
let feedbacks = ["Great", "Good", "Not bad", "Please practice"];
let seconds;
let minutes;
let interval;
// Element selectors
const parentDiv = document.querySelector(".parent");
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const endScreen = document.getElementById("end");
const resultCard = document.getElementById("result");
const startBtn = document.getElementById("startbtn");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const nextBtn = document.getElementById("next-btn");
const currentQuestion = document.getElementById("quiz-question");
const quizChoicesArea = document.getElementById("quiz-choices");
const username = document.getElementById("username");
const adduserBtn = document.getElementById("add-userBtn");
const startContainer = document.getElementById("start-container");
const userNameContainer = document.getElementById("username-container");
const quizScreenTitle = document.getElementById("quizScreenTitle");
const incorrectContainer = document.getElementById("incorrect-container");

const questions = [
  {
    question:
      "What is the output of the following code?\nconsole.log(typeof null);",
    choices: ["object", "null", "undefined", "number"],
    correctAnswer: 0, // "object"
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    choices: ["String", "Boolean", "Undefined", "Float"],
    correctAnswer: 3, // "Float"
  },
  {
    question:
      "Which method can be used to create a new array with all elements that pass a test implemented by the provided function?",
    choices: ["map()", "filter()", "forEach()", "reduce()"],
    correctAnswer: 1, // "filter()"
  },
  {
    question:
      "Which of the following is the correct way to declare a variable in JavaScript?",
    choices: ["var myVar;", "let myVar;", "const myVar;", "All of the above"],
    correctAnswer: 3, // "All of the above"
  },
  {
    question:
      "What is the correct syntax to output 'Hello World' in an alert box?",
    choices: [
      "msg('Hello World');",
      "alert('Hello World');",
      "msgBox('Hello World');",
      "alertBox('Hello World');",
    ],
    correctAnswer: 1, // "alert('Hello World');"
  },
  {
    question:
      "Which of the following is a correct way to create an object in JavaScript?",
    choices: [
      "var obj = {};",
      "var obj = Object.create();",
      "var obj = new Object();",
      "All of the above",
    ],
    correctAnswer: 3, // "All of the above"
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["*", "=", "-", "+"],
    correctAnswer: 1, // "="
  },
  {
    question: "How can you add a comment in JavaScript?",
    choices: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment */",
      "Both 2 and 3",
    ],
    correctAnswer: 3, // "Both 2 and 3"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    choices: [
      "Math.ceil(x, y)",
      "Math.max(x, y)",
      "Math.floor(x, y)",
      "Math.round(x, y)",
    ],
    correctAnswer: 1, // "Math.max(x, y)"
  },
  {
    question: "How does a 'for' loop start?",
    choices: [
      "for (i = 0; i <= 5; i++)",
      "for i = 1 to 5",
      "for (i <= 5; i++)",
      "for (i = 0; i <= 5)",
    ],
    correctAnswer: 0, // "for (i = 0; i <= 5; i++)"
  },
  {
    question:
      "What is the output of the following code?\nconsole.log([] + []);",
    choices: ["[]", "0", "undefined", '""'],
    correctAnswer: 3, // '""'
  },
  {
    question:
      "What will be the output of the following code?\nconsole.log(2 == '2');",
    choices: ["true", "false", "TypeError", "undefined"],
    correctAnswer: 0, // "true"
  },
  {
    question:
      "Which method can be used to convert a JSON string into a JavaScript object?",
    choices: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.objectify()",
      "JSON.convert()",
    ],
    correctAnswer: 0, // "JSON.parse()"
  },
  {
    question: "Which statement is used to stop a loop?",
    choices: ["exit", "break", "stop", "halt"],
    correctAnswer: 1, // "break"
  },
  {
    question: "What is the result of the following expression?\n'5' + 3",
    choices: ["53", "8", "TypeError", "NaN"],
    correctAnswer: 0, // "53"
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: [
      "function:myFunction()",
      "function myFunction()",
      "create function myFunction()",
      "define function myFunction()",
    ],
    correctAnswer: 1, // "function myFunction()"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onchange", "onclick", "onmouseover", "onmouseclick"],
    correctAnswer: 1, // "onclick"
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
      "var colors = 'red', 'green', 'blue'",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
      "var colors = ['red', 'green', 'blue']",
      "var colors = (1:'red', 2:'green', 3:'blue')",
    ],
    correctAnswer: 2, // "var colors = ['red', 'green', 'blue']"
  },
  {
    question:
      "What is the output of the following code?\nconsole.log(typeof NaN);",
    choices: ["number", "string", "undefined", "NaN"],
    correctAnswer: 0, // "number"
  },
  {
    question:
      "Which method can be used to add one or more elements to the end of an array?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0, // "push()"
  },
];

// Functions
function getUserName() {
  adduserBtn.addEventListener("click", (e) => {
    e.preventDefault();
    currentUserName = username.value;
    if (currentUserName) {
      startContainer.classList.remove("d-none");
      userNameContainer.classList.add("d-none");
    } else {
      alert("Please enter a name");
    }
  });
}

// Timer function to update the time display
function elapse() {
  seconds -= 1;
  if (seconds < 0) {
    seconds = 59;
    minutes -= 1;
  }

  if (minutes < 0) {
    moveToNextQuestion();
    return;
  }

  const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  document.getElementById(
    "time_txt"
  ).innerHTML = `${displayMinutes}:${displaySeconds}`;
}

// Function to handle moving to the next question
function moveToNextQuestion() {
  clearInterval(interval);

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    displayQuestion();
  } else {
    // If it's the last question, show the result page
    showResults();
  }
}

// Function to show the results
function showResults() {
  clearInterval(interval);
  handleSubmitButton();
}

function setParentDivSize() {
  parentDiv.style.width = `${window.innerWidth}px`;
  parentDiv.style.height = `${window.innerHeight}px`;
}

function initializeQuiz() {

  currentQuestionIndex = 0;
  currentScore = 0;
  getUserName();

  displayQuestion();
}

function displayQuestion() {
  // Reset and start the timer
  clearInterval(interval);
  seconds = 60;
  minutes = 0;
  interval = setInterval(elapse, 1000);

  currentQuestionObject = questions[currentQuestionIndex];
  document.getElementById("quiz-question").textContent =
    currentQuestionObject.question;
  const quizChoicesArea = document.getElementById("quiz-choices");
  quizChoicesArea.innerHTML = "";
  document.getElementById("quizScreenTitle").innerHTML = `Quiz ${
    currentQuestionIndex + 1
  }/${questions.length}`;

  currentQuestionObject.choices.forEach((item, index) => {
    quizChoicesArea.innerHTML += `
      <div class="mb-2">
        <input type="radio" id="choice${index}" name="radio" value="${index}">
        <label class="pointer" for="choice${index}">${item}</label>
      </div>`;
  });

  addChoiceListeners();
}

function addChoiceListeners() {
  const radios = document.querySelectorAll('input[name="radio"]');
  radios.forEach((radio) => {
    radio.addEventListener("click", (event) => {
      let selectedValue = radio.value;
      if (
        selectedValue.toString() ==
        currentQuestionObject.correctAnswer.toString()
      ) {
        const index = inCorrectAnsArray.indexOf(currentQuestionObject);

        if (index > -1) {
          inCorrectAnsArray.splice(index, 1);
        }
        currentScore += 1;
      } else {
        const index = inCorrectAnsArray.indexOf(currentQuestionObject);
        if (!(index > -1)) {
          inCorrectAnsArray.push(currentQuestionObject);
        }
      }
    });
  });
}

function showScreen(screenToShow) {
  const screens = [startScreen, quizScreen, endScreen];
  screens.forEach((screen) => screen.classList.add("d-none"));
  screenToShow.classList.remove("d-none");
}

function handleNextButton() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    displayQuestion();
  }
  if (currentQuestionIndex === questions.length - 1) {
    submitBtn.classList.remove("d-none");
    nextBtn.classList.add("d-none");
  }
}

function handleFeedback(score) {
  if (score >= 16 && score <= 20) {
    return feedbacks[0];
  } else if (score >= 12 && score < 16) {
    return feedbacks[1];
  } else if (score > 8 && score < 12) {
    return feedbacks[2];
  } else {
    return feedbacks[3];
  }
}

function handleSubmitButton() {
  showScreen(endScreen);
  resultCard.textContent = `
        ${handleFeedback(parseInt(currentScore))}  ${currentUserName} 
        Your score: ${currentScore} / ${questions.length}
        `;
  if (inCorrectAnsArray.length > 0) {
    inCorrectAnsArray.forEach((item, idx) => {
      incorrectContainer.innerHTML += `
        <div class="text-start">
        <h5> ${idx + 1} . ${
        item.question
      } , <span class="text-primary">correct ans: ${
        item.choices[item.correctAnswer]
      }</span></h5>
        </div>
        `;
    });
  }
}

function handleRestartButton() {
  initializeQuiz();
  showScreen(startScreen);
  nextBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
  startContainer.classList.add("d-none");
  userNameContainer.classList.remove("d-none");
}

// Event Listeners
window.addEventListener("resize", setParentDivSize);
startBtn.addEventListener("click", () => showScreen(quizScreen));
nextBtn.addEventListener("click", handleNextButton);
submitBtn.addEventListener("click", handleSubmitButton);
restartBtn.addEventListener("click", handleRestartButton);

// Initial setup
// setParentDivSize();
initializeQuiz();
