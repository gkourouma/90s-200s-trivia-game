/*-------------------------------- Constants --------------------------------*/
const questions = [
  {
    question: "What was Britney Spears debut single released in 1998?",
    choices: [
      "You Drive Me Crazy",
      "Baby One More Time",
      "Lucky",
      "Oops!... I Did It Again",
    ],
    answer: "Baby One More Time",
  },
  {
    question: "Which boy band released the hit song Bye Bye Bye in 2000?",
    choices: ["NSYNC", "Backstreet Boys", "98 Degrees", "Jonas Brothers"],
    answer: "NSYNC",
  },
  {
    question: "In 'The Matrix' what color pill did Neo take?",
    choices: ["Blue", "Yellow", "Red", "Green"],
    answer: "Red",
  },
  {
    question:
      "In Home Alone (1990), Which city does the McCallister family fly to for their Christmas vacation?",
    choices: ["Miami", "New York", "Paris", "Chicago"],
    answer: "Paris",
  },
  {
    question:
      "What was the name of the coffee shop where the Friends characters hung out?",
    choices: [
      "Monk's Cafe",
      "Cafe Nervosa",
      "The Drunken Clam",
      "Central Perk",
    ],
    answer: "Central Perk",
  },
  {
    question: "What early 2000 Disney Channel show is this sound from?",
    choices: [],
    answer: "",
  },
  {
    question:
      "In Super Smash Bros. Melee (2001), which character was not part of the original Super Smash Bros. (1999) roster?",
    choices: ["Bowser", "Captain Falcon", "Pikachu", "Ness"],
    answer: "Bowser",
  },
  {
    question: 'What game introduced the phrase "Finish Him!"?',
    choices: ["Street Fighter", "Tekken", "Grand Theft Auto", "Mortal Kombat"],
    answer: "Mortal Kombat",
  },
  {
    question:
      "What was the name of the virtual pet craze that took over the late 90s?",
    choices: ["Nano Baby", "Tamagotchi", "Chia Pets", "Neopets"],
    answer: "Tamagotchi",
  },
  {
    question: "What was the first reality TV show to air on MTV in 1992?",
    choices: ["The Real Word", "The Challenge", "Real TV", "The Cut"],
    answer: "The Real World",
  },
];
/*---------------------------- Variables (state) ----------------------------*/
let currentQuestion;
let questionsLeft = [...questions]; // an array of the questions that has'nt been answered.
let score = 0;
let displayScreen = "welcome page";
/*------------------------ Cached Element References ------------------------*/
const nextButton = document.querySelector(".next-button");
const questionText = document.querySelector(".questions");
const choicesContainer = document.querySelector(".answers");
const finalScore = document.querySelector(".final-score");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart");
const finalMessage = document.querySelector(".final-message");
const questionContainer = document.querySelector(".container");
const scoreContainer = document.querySelector(".score");
const welcomeMessage = document.getElementById("welcome-message");

console.log(finalScore);
/*-------------------------------- Functions --------------------------------*/
// First hide screens that are not needed
function render() {
  if (displayScreen === "welcome page") {
    welcomeMessage.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    scoreContainer.classList.add("hidden");
  } else if (displayScreen === "questions") {
    welcomeMessage.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    scoreContainer.classList.add("hidden");
  } else if (displayScreen === "score page") {
    welcomeMessage.classList.add("hidden");
    questionContainer.classList.add("hidden");
    scoreContainer.classList.remove("hidden");

    if (finalScore <= 3) {
      finalMessage.textContent = "Try harder";
    } else if (finalScore > 3 && finalScore <= 7) {
      finalMessage.textContent = "You're Alight ";
    } else {
      finalMessage.textContent = "Totally Cool!";
    }

    finalScore.textContent = `Your Final Score is ${score}/${questions.length}`;
  }
}

//looping through random questions

function getQuestions() {
  if (questionsLeft.length === 0) {
    displayScreen = "score page";
    render();
    return;
  }
  let index = Math.floor(Math.random() * questionsLeft.length); // select a random question that has'nt been selected yet
  currentQuestion = questionsLeft.splice(index, 1)[0];

  displayQuestion();
}

// Displaying the answers

function displayQuestion() {
  questionText.textContent = currentQuestion.question;
  choicesContainer.innerHTML = " ";

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.classList.add("button-choices");
    button.textContent = choice;
    button.onclick = function () {
      showAnswer(choice);
    };
    choicesContainer.appendChild(button);
  });
}

// Checking Answers and getting next question

function showAnswer(selectedAnswer) {
  if (selectedAnswer === currentQuestion.answer) {
    score++;
  }
  getQuestions();
}
/*----------------------------- Event Listeners -----------------------------*/
//event listeners that will move through the different screens
startButton.addEventListener("click", function () {
  displayScreen = "questions";
  render();
  getQuestions();
});

nextButton.addEventListener("click", function () {
  getQuestions();
});

restartButton.addEventListener("click", function () {
  displayScreen = "welcome page";
  score = 0;
  questionsLeft = [...questions];
  render();
});

render();
