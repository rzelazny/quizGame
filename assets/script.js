//List of questions and answers
var quizSet = [
    {
      "question": "What is my favorite number?",
      "answer": "opt1",
      "choices": [
          1,
          2,
          3,
          4
        ]
    },
    {
      "question": "What is my favorite letter?",
      "answer": "opt2",
      "choices": [
          "a",
          "b",
          "c",
          "d"
        ]
    },
    {
    "question": "What is my favorite color?",
    "answer": "opt4",
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
var enterScoreBoard = document.getElementById("enter-score");
var scoreBoard = document.getElementById("high-score");
var pastScores = document.getElementById("pastScores");

var enteredName = document.getElementById("nameEntry");
var enteredScore = document.getElementById("yourScore");

var btnNextQuestion = document.getElementById("submitBtn");
var btnSave = document.getElementById("save");

//Set initial time, quesition, and score
var timeLeft = 60;
var questionNumber = 0;
var currentScore = 0;

var highScores = [];

function init() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  // If todos were retrieved from localStorage, update the score array to it
  if (storedScores !== null) {
    highScores = storedScores;
  }
}

//Store high scores for future use
function storeScores() {
    var newScore = {
      name: enteredName.value.trim(),
      score: currentScore
    }

    //see if new score is a high score
    highScores.splice(0, 0, newScore);
    
  // Stringify and set "scores" key in localStorage to scores array
  localStorage.setItem("scores", JSON.stringify(highScores));
  showLeaderboard();
}

//Function starts the timer and shows name entry once time runs out
function setTime() {
    
  var timerInterval = setInterval(function() {
      timeLeft--;
      timerEle.textContent = "Time Left: " + timeLeft;
  
    if(timeLeft < 1 ) {
      clearInterval(timerInterval); //if not removed timer contines and goes negative
      timerEle.textContent = " ";
      enterScoreBoard.style.display = "block";
      quizBoard.style.display = "none";
      enteredScore.textContent = currentScore;
    }
  
  }, 1000);
}

//Displays leader board when time runs out
function showLeaderboard(){
  enterScoreBoard.style.display = "none";
  scoreBoard.style.display = "block";

  console.log(highScores.length);

  for (var i = 0; i < highScores.length; i++) {
    var name = highScores[i].name;

    var li = document.createElement("li");
    li.textContent = name;

    var score = document.createElement("p");
    score.textContent = highScores[i].score;

    li.appendChild(score);
    pastScores.appendChild(li);
  }
}

//On submit button press checks answer and pulls next question
btnNextQuestion.addEventListener("click", function(){

  var choosenAnswer = document.querySelector('input[name="OptRadio"]:checked').getAttribute("id"); 

  if (choosenAnswer === quizSet[questionNumber].answer){
    currentScore++;
  }
  else{
    timeLeft = timeLeft - 10;
  }
  
  //Increment for next quesion
  questionNumber++

  //If there isn't another question go to the leaderboard
  if(questionNumber === quizSet.length){
    timeLeft = 0;
    return;
  }
  nextQuestion();
});

//Function gets the next question from the quizSet
function nextQuestion(){
  //set question and answers from list
  questionNum.textContent = "Question " + Number(questionNumber + 1);
  questionEle.textContent = quizSet[questionNumber].question;
  optionOne.innerHTML = quizSet[questionNumber].choices[0];
  optionTwo.innerHTML = quizSet[questionNumber].choices[1];
  optionThree.innerHTML = quizSet[questionNumber].choices[2];
  optionFour.innerHTML = quizSet[questionNumber].choices[3];
}

btnSave.addEventListener("click", storeScores)

//Run the code
init();
setTime();
nextQuestion();
