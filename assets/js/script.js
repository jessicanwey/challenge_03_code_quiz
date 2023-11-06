var win = $('#win');
var lose = $('#lose');
var timerElement = $('#timer-count');
var startButton = $('#start-button');
var quizElement = $('#quiz');
var scoresElement = $('#scores');
var startElement = $('#start');
var initialsElement = $('#initials');
var finalScoreElement = $('#final-score');
var questionElement = $('#question');
var answerButton = $('.answer');
var correctElement = $('#correct');
var wrongElement = $('#wrong');
//var questionOptionsElement = $('#question-options');

var isWin = false;
var timer;
var timerCount;
var answerElement;
var questionNumber;
var questionText = '';
var totalCount;
var pointValue;
var nextQuestion;

// Arrays of questions for the quiz
var questions = [
  {
    index: 1,
    question: 'Which one of these options is not a third party API?',
    options: ['jQuery','Bootstrap','Day.js','Jungle Book'],
    answer: 'Jungle Book',
    points: 3,
  },
  {
    index: 2,
    question: 'Which one of these pseudo-classes represents any element that is user-editable?',
    options: [':read-only',':disabled',':read-write',':enabled'],
    answer: ':read-write',
    points: 4,
  },
  {
    index: 3,
    question: 'Which one of these not a falsy value in JavaScript?',
    options: ['wrong', 'false', 'Nan','null'],
    answer: 'wrong',
    points: 2,
  },
  {
    index: 4,
    question: 'The DOM represents a document with a logical ______.',
    options: ['road','tree','path','text'],
    answer: 'tree',
    points: 1,
  },
  {
    index: 5,
    question: 'Triple equals or === represents what type of equality?',
    options: ['loose','rigid','strict','lenient'],
    answer: 'strict',
    points: 6,
  },

];

// Iterates through the array of questions to get the question to ask
function getQuestion(questionNumber){
  var quizQuestion = '';
  var optionArray = [];
  var answerOption = '';
  var answerElementValue = '';
  
  //make sure the correct and wrong values are hidden if this is not the first question
  $(correctElement).hide();
  $(wrongElement).hide();

 
    for (var i = 0; i < questions.length; i++) {
        quizQuestion = questions[questionNumber].question;
        //Set the question element
        questionElement.text(quizQuestion);
        optionArray = questions[questionNumber].options;
          for(var j= 0; j < optionArray.length; j++){
            answerOption = optionArray[j];
            answerElementValue = '#answer-' + j;
            answerElement = $(answerElementValue);
            answerElement.text(answerOption);
          }
          return quizQuestion;
      }
  
}


// Iterates through the array of questions to get the correct answer
function getCorrectAnswer(questionNumber){
  var correctAnswer = ''; 
  for (var i = 0; i < questions.length; i++) {
    correctAnswer = questions[questionNumber].answer;
  }
 return correctAnswer;
}

function getQuestionPoints(questionNumber){
  var points = 0;
  for (var i = 0; i < questions.length; i++) {
    points = questions[questionNumber].points;
  }
 return points;
}

// The init function is called when the page loads 
function init(){}

// The startGame function is called when the start button is clicked
function startGame() {
 // isWin = false;
  timerCount = 60;
  startTimer();
  displayQuiz();
}

//The displays the quiz for the first time after the start button is clicked
function displayQuiz(){
  getQuestion(0);
  localStorage.setItem("number", 0);
  localStorage.setItem('points', 0);
  $(startElement).hide();
  $(quizElement).show();
}

function checkAnswer(){
  var selectedAnswer = this.innerHTML;
  questionNumber = parseInt(localStorage.getItem("number"));
  totalCount = parseInt(localStorage.getItem("points"));
  console.log('local storage question number ' + questionNumber);
  correctAnswer = getCorrectAnswer(questionNumber);
  pointValue = getQuestionPoints(questionNumber);

    
    if(selectedAnswer === correctAnswer){
      $(correctElement).show();
      console.log('are we getting here? ' + totalCount);
      totalCount = totalCount + pointValue;
      localStorage.setItem("points", totalCount);
    } else {
      $(wrongElement).show();
    }

    //there are only five questions, so check to see if it's the last one
    //if no, get the next question
    //if yes, pull up the page to enter your initials for high score and display score
    if(questionNumber < 4){
      nextQuestion = questionNumber + 1;
      localStorage.setItem("number", nextQuestion);
      getQuestion(nextQuestion);
    } else {
      finalScoreElement.text("Your total score is: " + totalCount);
      quizElement.hide();
      initialsElement.show();
    }
      
}


// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.text(timerCount);
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        //winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      window.alert("YOUR TIME IS UP!");
    }
  }, 1000);
}

// Attach event listener to start button to call startGame function on click
startButton.on('click', startGame);

answerButton.on('click', checkAnswer);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = $('#reset-button');
