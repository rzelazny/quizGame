//List of questions and answers
var quizSet = [
    {
      "question": "What is my favorite number?",
      "answer": 2,
      "choices": [
          1,
          2,
          3,
          4
        ]
    },
    {
      "question": "What is my favorite letter?",
      "answer": "b",
      "choices": [
          "a",
          "b",
          "c",
          "d"
        ]
    },
    {
    "question": "What is my favorite color?",
    "answer": "cyan",
    "choices": [
        "red",
        "blue",
        "cyan",
        "purple"
      ]
  }
] 

//HTML Elements that get referenced
var timerEle = document.getElementById("timer");
var questionNum = document.getElementById("qNum");
var questionEle = document.getElementById("quizQuestion")
var optionOne = document.getElementsByClassName("choice")[0];
var optionTwo = document.getElementsByClassName("choice")[1];
var optionThree = document.getElementsByClassName("choice")[2];
var optionFour = document.getElementsByClassName("choice")[3];

var quizBoard = document.getElementById("quiz-container");
var enterScoreBoard = document.getElementById("enter-score-container");
var scoreBoard = document.getElementById("high-score-container");

var btnNextQuestion = document.getElementById("submitBtn");

//Set initial time, quesition, and score
var timeLeft = 60;
var questionNumber = 0;
var currentScore = 0;
var highScores = [];

function init() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedScores !== null) {
    highScores = storedScores;
  }
}

//Store high scores for future use
function storeScores() {
   // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("scores", JSON.stringify(highScores));
}

//Function starts the timer and calls showLeaderboard when time runs out
function setTime() {
    
  var timerInterval = setInterval(function() {
      timeLeft--;
      timerEle.textContent = "Time Left: " + timeLeft;
  
    if(timeLeft < 1 ) {
      clearInterval(timerInterval); //if not removed timer contines and goes negative
      enterScore();
    }
  
  }, 1000);
}

function enterScore(){

  timerEle.textContent = " ";
  enterScoreBoard.style.display = "block";
  quizBoard.style.display = "none";
  storeScores();
}

//Displays leader board when time runs out
function showLeaderboard(){
  enterScoreBoard.style.display = "none";
  scoreBoard.style.display = "block";

  //alert("Time's up!");

  
}

function close() {
  modalEl.style.display = "none";
}


//On submit button press checks answer and pulls next question
btnNextQuestion.addEventListener("click", function(){


  nextQuestion();
})

//Function gets the next question from the quizSet
function nextQuestion(){
  
  //If there isn't another question go to the leaderboard
  if(questionNumber === quizSet.length){
    timeLeft = 0;
    return;
  }

  //set question and answers from list
  questionNum.textContent = "Question " + Number(questionNumber + 1);
  questionEle.textContent = quizSet[questionNumber].question;
  optionOne.innerHTML = quizSet[questionNumber].choices[0];
  optionTwo.innerHTML = quizSet[questionNumber].choices[1];
  optionThree.innerHTML = quizSet[questionNumber].choices[2];
  optionFour.innerHTML = quizSet[questionNumber].choices[3];
  
//Increment for next loop
  if(questionNumber < quizSet.length){
    questionNumber++;
  }
}

//Run the code
init();
setTime();
nextQuestion();
