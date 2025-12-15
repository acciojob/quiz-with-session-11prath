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
// Retrieve answers. Use an empty array as the default if 'progress' is not found.
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
    questionDiv.style.marginBottom = "20px"; // Add some spacing for clarity

    const questionText = document.createElement("p");
    questionText.textContent = `${qIndex + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = choice;
      radio.id = `q${qIndex}-${choice.replace(/\s/g, '-')}`; // Unique ID for Cypress/Accessibility

      // Restore checked state based on userAnswers array
      if (userAnswers[qIndex] === choice) {
        radio.checked = true;
      }

      // Save progress to sessionStorage on change
      radio.addEventListener("change", () => {
        // Only update if the radio is checked
        if (radio.checked) {
          userAnswers[qIndex] = choice;
          // Store the updated array in sessionStorage
          sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        }
      });

      label.htmlFor = radio.id;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${choice}`));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Initial render of questions and answers
renderQuestions();

// ---------------------------
// Submit Quiz functionality
// ---------------------------
submitButton.addEventListener("click", () => {
  let score = 0;

  // 1. Calculate the score
  questions.forEach((q, index) => {
    // Check if the stored answer for this question matches the correct answer
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  // 2. Display the score
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // 3. Save score to localStorage
  localStorage.setItem("score", score);
  
  // Optional: Clear session storage progress after submission
  sessionStorage.removeItem("progress");
});

// ---------------------------
// Restore score from localStorage on page load
// ---------------------------
// This handles the edge case: User submits and refreshes the page
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your last submitted score is ${savedScore} out of 5.`;
}

