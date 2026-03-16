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

// restore answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Render Questions
function renderQuestions(){

questionsElement.innerHTML = "";

questions.forEach((q,index)=>{

const questionDiv=document.createElement("div");

const questionText=document.createElement("p");
questionText.textContent=q.question;
questionDiv.appendChild(questionText);

q.choices.forEach(choice=>{

const label=document.createElement("label");

const radio=document.createElement("input");
radio.type="radio";
radio.name=`question-${index}`;
radio.value=choice;

// restore checked state
if(userAnswers[index]===choice){
radio.checked=true;
radio.setAttribute("checked","true");
}

// change event
radio.addEventListener("change",()=>{

const radios=document.getElementsByName(`question-${index}`);

radios.forEach(r=>{
r.removeAttribute("checked");
});

radio.checked=true;
radio.setAttribute("checked","true");

userAnswers[index]=choice;
sessionStorage.setItem("progress",JSON.stringify(userAnswers));

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

// Submit button
submitButton.addEventListener("click",()=>{

let score=0;

questions.forEach((q,i)=>{
if(userAnswers[i]===q.answer){
score++;
}
});

scoreElement.textContent=`Your score is ${score} out of 5`;

localStorage.setItem("score",score);

sessionStorage.removeItem("progress");

});

// restore score if page reloads
const savedScore=localStorage.getItem("score");

if(savedScore!==null){
scoreElement.textContent=`Your last submitted score is ${savedScore} out of 5`;
}

