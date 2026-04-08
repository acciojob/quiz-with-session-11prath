// Quiz Questions
const questions = [
{
question: "What is the capital of France?",
choices: ["Berlin","Madrid","Paris","Rome"],
answer: "Paris"
},
{
question: "Which planet is known as the Red Planet?",
choices: ["Earth","Mars","Jupiter","Venus"],
answer: "Mars"
},
{
question: "Who wrote 'Hamlet'?",
choices: ["Charles Dickens","William Shakespeare","Leo Tolstoy","Mark Twain"],
answer: "William Shakespeare"
},
{
question: "What is the largest ocean on Earth?",
choices: ["Atlantic Ocean","Indian Ocean","Pacific Ocean","Arctic Ocean"],
answer: "Pacific Ocean"
},
{
question: "Which element has the chemical symbol O?",
choices: ["Gold","Oxygen","Osmium","Silver"],
answer: "Oxygen"
}
];

// Get stored progress
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Render Questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach(choice => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = choice;

      // Restore checked state
      if (userAnswers[index] === choice) {
        radio.checked = true;
      }

      // Save progress
      radio.addEventListener("change", () => {
        userAnswers[index] = choice;
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

renderQuestions();

// Submit Quiz
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  // Show score
  scoreElement.textContent = `Your score is ${score} out of 5`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});

// Restore score after refresh
const savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of 5`;
}