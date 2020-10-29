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

var timerEle = document.getElementById("timer");
var timeLeft = 60;

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
setTime();