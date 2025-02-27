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
    image: "",
    imageAlt: "",
    category: "Music 🎵",
  },
  {
    question: "Which boy band released the hit song Bye Bye Bye in 2000?",
    choices: ["NSYNC", "Backstreet Boys", "98 Degrees", "Jonas Brothers"],
    answer: "NSYNC",
    image: "images/bye-bye-bye.webp",
    imageAlt: "Boy band dressed up as puppets",
    category: "Music 🎵",
  },
  {
    question: "In 'The Matrix' what color pill did Neo take?",
    choices: ["Blue", "Yellow", "Red", "Green"],
    answer: "Red",
    image: "images/the-matrix.jpg",
    imageAlt: "Morpheus sitting in a big red chair",
    category: "Movies 🍿",
  },
  {
    question:
      "In Home Alone (1990), Which city does the McCallister family fly to for their Christmas vacation?",
    choices: ["Miami", "New York", "Paris", "Chicago"],
    answer: "Paris",
    image: "images/home-alone-gingers.jpg",
    imageAlt: "Group picture of all of the McCallister siblings in pajamas",
    category: "Movies 🍿",
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
    image: "images/friends-cafe.avif",
    imageAlt: "Cast of friends hanging out at coffee shop",
    category: "TV Shows 📺",
  },
  {
    question: "What early 2000 Disney Channel show is this sound from?",
    choices: [
      "Lizzie McGuire",
      "Kim Possible",
      "That's So Raven",
      "Even Stevens",
    ],
    answer: "Kim Possible",
    image: "images/Disney_Channel_(2010).svg.png",
    imageAlt: "Disney Channel logo",
    audio: "/audio/kim_possible_tone.mp3",
    category: "TV Shows 📺",
  },
  {
    question:
      "In Super Smash Bros. Melee (2001), which character was not part of the original Super Smash Bros. (1999) roster?",
    choices: ["Bowser", "Captain Falcon", "Pikachu", "Ness"],
    answer: "Bowser",
    image: "images/super-smash-bros-GIF.gif",
    imageAlt: "",
    category: "Games 🎮",
  },
  {
    question: 'What game introduced the phrase "Finish Him!"?',
    choices: ["Street Fighter", "Tekken", "Grand Theft Auto", "Mortal Kombat"],
    answer: "Mortal Kombat",
    image: "images/mortal-kombat.jpg",
    imageAlt: "Finish Him game screen",
    category: "Games 🎮",
  },
  {
    question:
      "What was the name of the virtual pet craze that took over the late 90s?",
    choices: ["Nano Baby", "Tamagotchi", "Chia Pets", "Neopets"],
    answer: "Tamagotchi",
    image: "images/upside-down-tamagotchi-Sticker.gif",
    imageAlt: "Purple and Pink Tomagotchi Toy with upside down pet.",
    category: "Games 🎮",
  },
  {
    question: "What was the first reality TV show to air on MTV in 1992?",
    choices: ["The Real World", "The Challenge", "Real TV", "The Cut"],
    answer: "The Real World",
    image: "images/mtv.jpg",
    imageAlt: "MTV logo",
    category: "TV Shows 📺",
  },
];
/*---------------------------- Variables (state) ----------------------------*/
let currentQuestion;
let questionsLeft = [...questions]; // an array of the questions that has'nt been answered.
let score = 0;
let displayScreen = "welcome page";

/*------------------------ Cached Element References ------------------------*/

const questionText = document.querySelector(".questions");
const choicesContainer = document.querySelector(".answers");
const finalScore = document.querySelector(".final-score");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart");
const finalMessage = document.querySelector(".final-message");
const questionContainer = document.querySelector(".container");
const scoreContainer = document.querySelector(".score");
const welcomeMessage = document.getElementById("welcome-message");
const questionAudio = document.getElementById("questions-audio");
const questionImage = document.getElementById("questions-image");
const scoreImage = document.getElementById("score-image");
const gameCategory = document.getElementById("category")

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

    updateFinalMessage();
    finalScore.textContent = `Your Final Score is ${score}/${questions.length}`;
  }
}

function updateFinalMessage() {
  if (score <= 4) {
    finalMessage.textContent = "Try harder... 🙄";
    scoreImage.src = "images/Epic-Fail-Lol-Sticker-by-Demic.gif";
    scoreImage.style.display = "block";
  } else if (score > 4 && score <= 7) {
    finalMessage.textContent = "You're Alright 🙂";
    scoreImage.src = "images/Not-Bad-Sticker-by-Beverley-Mitchell.gif";
    scoreImage.style.display = "block";
  } else {
    finalMessage.textContent = "Totally Cool! 💯";
    scoreImage.src = "images/90S-1990S-Sticker-by-Ruck-Rover.gif";
    scoreImage.style.display = "block";
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
  gameCategory.textContent = `${currentQuestion.category}`
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

  if (currentQuestion.audio) {
    questionAudio.src = currentQuestion.audio;
    questionAudio.style.display = "block";
  } else {
    questionAudio.style.display = "none";
  }

  if (currentQuestion.image) {
    questionImage.src = currentQuestion.image;
    questionImage.alt = currentQuestion.imageAlt;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }
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

restartButton.addEventListener("click", function () {
  displayScreen = "welcome page";
  score = 0;
  questionsLeft = [...questions];
  render();
});

render();
