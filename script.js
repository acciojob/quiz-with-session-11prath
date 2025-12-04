// ---------------------------
// Restore selections (session)
// ---------------------------
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Reference to questions container
const questionsElement = document.getElementById("questions");

// ---------------------------
// Override renderQuestions()
// ---------------------------
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear container

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Create radio options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");

      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Pre-fill from session storage
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Update session storage when changed
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));

      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Call renderQuestions
renderQuestions();

// ---------------------------
// Submit Button Handler
// ---------------------------
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  document.getElementById("score").textContent =
    `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});

// ---------------------------
// Show saved score on refresh
// ---------------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  document.getElementById("score").textContent =
    `Your score is ${savedScore} out of 5.`;
}

