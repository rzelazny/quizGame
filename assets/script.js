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

//var 
var timerEle = document.getElementById("timer");
var btnNextQuestion = document.getElementById("submitBtn");
var timeLeft = 60;

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

}

//Run the code
nextQuestion();
setTime();
