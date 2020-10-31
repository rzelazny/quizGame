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
var scoreEle = document.getElementById("score");
var questionNum = document.getElementById("qNum");
var questionEle = document.getElementById("quizQuestion")
var optionOne = document.getElementsByClassName("choice")[0];
var optionTwo = document.getElementsByClassName("choice")[1];
var optionThree = document.getElementsByClassName("choice")[2];
var optionFour = document.getElementsByClassName("choice")[3];

var quizBoard = document.getElementById("quiz-container");
var enterScoreBoard = document.getElementById("enter-score");
var scoreBoard = document.getElementById("high-score");
var pastNames = document.getElementById("pastNames");
var pastScores = document.getElementById("pastScores");

var enteredName = document.getElementById("nameEntry");
var enteredScore = document.getElementById("yourScore");

var btnNextQuestion = document.getElementById("submitBtn");
var btnSave = document.getElementById("saveBtn");
var btnReload =document.getElementById("reloadBtn");

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
  //Adding to the array size and looping based on an updating array size is an infinite loop
  var curScoreCount = highScores.length; 
  var scoreAdded = false;

  //The first person is always a high score  
  if(curScoreCount === 0){
    highScores.push(newScore);
  }
  else{
    
    for(var i = 0; i < curScoreCount; i++){
      //Add current score above the first score it beats
      if(highScores[i].score < newScore.score){
        if(scoreAdded === false){
          highScores.splice(i, 0, newScore);
          //Only add it once, even if it beats multiple existing scores
          scoreAdded = true;
        }
      }
    }
    //If it doesn't beat a current score but there are less than 5 scores add it to the end
    if (curScoreCount < 5 && scoreAdded === false){
      highScores.push(newScore);
    }
  }
    //delete lowest score if a 6th score has been added
    if(highScores.length === 6){
      highScores.splice(5, 1);
    }

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

  for (var i = 0; i < highScores.length; i++) {
    var name = highScores[i].name;

    var li = document.createElement("ol");
    li.textContent = name;

    var score = document.createElement("ol");
    score.textContent = highScores[i].score;

    pastNames.appendChild(li);
    pastScores.appendChild(score);
  }
}

//On submit button press checks answer and pulls next question
btnNextQuestion.addEventListener("click", function(){

  var choosenAnswer = document.querySelector('input[name="OptRadio"]:checked').getAttribute("id"); 

  if (choosenAnswer === quizSet[questionNumber].answer){
    currentScore++;
    scoreEle.textContent = "Score: " + currentScore;
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

btnReload.addEventListener("click", function(){
  location.reload();
})

//Run the code
init();
setTime();
nextQuestion();
