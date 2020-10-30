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
    },
    {
      "question": "What is my favorite color?",
      "answer": [
          "red",
          "blue",
          "cyan",
          "purple"
  ]
  }
] 

//Elements that get updated
var timerEle = document.getElementById("timer");
var questionNum = document.getElementById("qNum");
var questionEle = document.getElementById("quizQuestion")
var optionOne = document.getElementsByClassName("choice")[0];
var optionTwo = document.getElementsByClassName("choice")[1];
var optionThree = document.getElementsByClassName("choice")[2];
var optionFour = document.getElementsByClassName("choice")[3];
var btnNextQuestion = document.getElementById("submitBtn");

//Set initial time and quesition
var timeLeft = 60;
var questionNumber = 0;

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
  
  //If there isn't another question go to the leaderboard
  if(questionNumber === quizSet.length){
    showLeaderboard();
    return(0);
  }

  //set question and answers from list
  questionNum.textContent = "Question " + Number(questionNumber + 1);
  questionEle.textContent = quizSet[questionNumber].question;
  optionOne.innerHTML = quizSet[questionNumber].answer[0];
  optionTwo.innerHTML = quizSet[questionNumber].answer[1];
  optionThree.innerHTML = quizSet[questionNumber].answer[2];
  optionFour.innerHTML = quizSet[questionNumber].answer[3];
  
//Increment for next loop
  if(questionNumber < quizSet.length){
    questionNumber++;
  }
}

//Run the code
nextQuestion();
setTime();
