//List of questions and answers
var quizSet = [
    {
        "question": "What is my favorite number?",
        "answer": [
            1,
            2,
            3,
            4
    ]
    },
    {
        "question": "What is my favorite letter?",
        "answer": [
            "a",
            "b",
            "c",
            "d"
    ]
    }
] 

//Elements that get updated
var timerEle = document.getElementById("timer");
var questionNum = document.getElementById("qNum");
var questionEle = document.getElementById("quizQuestion")
var optionOne = document.getElementById("opt1");
var optionTwo = document.getElementById("opt2");
var optionTHree = document.getElementById("opt3");
var optionFour = document.getElementById("opt4");
var btnNextQuestion = document.getElementById("submitBtn");

//Set initial time and quesition
var timeLeft = 60;
var questionNumber = 1;

//Function starts the timer and calls showLeaderboard when time runs out
function setTime() {
    
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEle.textContent = "Time Left: " + timeLeft;
  
      if(timeLeft === 0) {
        clearInterval(timerInterval); //if not removed timer contines and goes negative
        showLeaderboard();
      }
  
    }, 1000);
  }

//Displays leader board when time runs out
function showLeaderboard(){
    timerEle.textContent = " ";

    alert("Time's up!");
}

//Generates the next question when submitting an answer
btnNextQuestion.addEventListener("click", nextQuestion)

//Function gets the next question from the quizSet
function nextQuestion(){
  //set question and answers from list
  questionNum.textContent = "Question " + questionNumber;
  questionEle.textContent = quizSet[questionNumber].question;
  console.log(optionOne.getElementsByTagName("label"));
  //optionOne[0].innerHTML = quizSet[questionNumber].answer[0];

}

//Run the code
nextQuestion();
setTime();
