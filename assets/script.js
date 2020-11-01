//List of questions and answers
var quizSet = [
    {
      "question": "How many pounds of candy corn are produced each year?",
      "answer": "opt1",
      "choices": [
          "35 milion pounds",
          "100 million pounds",
          "250 million pounds",
          "35 billion pounds"
        ]
    },
    {
      "question": "What famous magician died on Halloween?",
      "answer": "opt2",
      "choices": [
          "Apollo Robbins",
          "Harry Houdini",
          "David Copperfield",
          "Penn Jillette"
        ]
    },
    {
    "question": "When is Halloween thought to originate?",
    "answer": "opt4",
    "choices": [
        "1898 AD",
        "1650 AD",
        "500 BC",
        "4000 BC"
      ]
  },
  {
    "question": "Before pumpkins were used, what veggie was commonly carved into Jack-o-Lanterns?",
    "answer": "opt3",
    "choices": [
        "Watermelons",
        "Carrots",
        "Turnips",
        "Canned Peas"
      ]
  },
  {
    "question": "What was The Munsters’ address?",
    "answer": "opt1",
    "choices": [
        "1313 Mockingbird Lane",
        "221B Baker Street",
        "1800 Scare Lane",
        "It was never shown"
      ]
  },
  {
    "question": "In Bram Stoker's novel, was was Dracula's original name?",
    "answer": "opt1",
    "choices": [
        "Count Wampyr",
        "Count Chocula",
        "Lord Belfry",
        "Frank N. Stein"
      ]
  },
  {
    "question": "In which country did Halloween originate?",
    "answer": "opt2",
    "choices": [
        "China",
        "Ireland",
        "France",
        "Romania"
      ]
  },
  {
    "question": "What is the fear of Halloween called?",
    "answer": "opt2",
    "choices": [
        "Triskaidekaphobia",
        "Samhainophobia",
        "Acrophobia",
        "Halloweenieness"
      ]
  },
  {
    "question": "What item is banned 12am October 31st to 12pm November 1st in Hollywood California?",
    "answer": "opt3",
    "choices": [
        "Toilet paper",
        "Fake blood",
        "Silly String",
        "Masks of Ronald Regan"
      ]
  },
  {
    "question": "Which candy is the best?",
    "answer": "opt4",
    "choices": [
        "Candy corn",
        "Skittles",
        "Whoppers",
        "Snickers"
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

// Get stored scores from localStorage
function init() {
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

//Function shifts between showing the quiz board, name entry and leaderboard as needed
function toggleDisplay (show){
  if (show === "nameEntry"){
    quizBoard.style.display = "none";
    enterScoreBoard.style.display = "block";
    scoreBoard.style.display = "none";
  }
  else if (show === "leaderboard"){
    quizBoard.style.display = "none";
    enterScoreBoard.style.display = "none";
    scoreBoard.style.display = "block";
  }
}

//Function starts the timer and shows name entry once time runs out
function setTime() {
    
  var timerInterval = setInterval(function() {
      timeLeft--;
      timerEle.textContent = "Time Left: " + timeLeft;
  
    if(timeLeft < 1 ) {
      clearInterval(timerInterval); //if not removed timer contines and goes negative
      timerEle.textContent = " ";
      enteredScore.textContent = currentScore;
      toggleDisplay("nameEntry");
    }
  
  }, 1000);
}

//Displays leader board after name entry
function showLeaderboard(){
  toggleDisplay("leaderboard");

  //Create list elements to show past names and scores
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

//On submit button press checks answer and call nextQuestion
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
