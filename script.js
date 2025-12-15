// ---------------------------
// Quiz Data (5 Questions)
// ---------------------------
const questions = [
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperTool Multi Language",
      "HyperText Multiple Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which HTML tag is used for JavaScript?",
    choices: ["<js>", "<javascript>", "<script>", "<code>"],
    answer: "<script>",
  },
  {
    question: "Which company developed JavaScript?",
    choices: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: "Netscape",
  },
];

// ---------------------------
// Restore progress from sessionStorage
// ---------------------------
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// DOM references
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// ---------------------------
// Render Questions
// ---------------------------
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = choice;

      // Restore checked state
      if (userAnswers[qIndex] === choice) {
        radio.checked = true;
      }

      // Save progress to sessionStorage
      radio.addEventListener("change", () => {
        userAnswers[qIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Initial render
renderQuestions();

// ---------------------------
// Submit Quiz
// ---------------------------
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
});

// ---------------------------
// Restore score from localStorage
// ---------------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
}

