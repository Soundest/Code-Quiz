const quizQuestions = [
    {
      question: "Commonly used data types DO Not include:",
      answers: ["strings", "booleans", "alerts", "numbers"],
      correctAnswerIndex: 2
    },
    {
      question: "Arrays in JavaScript can be used to store _____",
      answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      correctAnswerIndex: 3
    },
    {
        question: "The condition in an else/if statement is enclosed with _____ ",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswerIndex: 1
      },
      {
        question: "String values must be included within _____ when being assigned to variables ",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswerIndex: 2
      },
      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:  ",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswerIndex: 3
      },

  ];
  
  let currentQuestionIndex = 0;
  let timeRemaining = 60;
  let score = 0;
  let timerInterval;
  
  function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = "block";
  
    timerInterval = setInterval(updateTimer, 1000);
  
    displayQuestion();
  }
  
  function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const answerButtons = document.getElementById("answer-buttons");
    questionContainer.textContent = quizQuestions[currentQuestionIndex].question;
  
    answerButtons.innerHTML = "";
  
    quizQuestions[currentQuestionIndex].answers.forEach((answer, index) => {
      const answerButton = document.createElement("button");
      answerButton.textContent = answer;
      answerButton.addEventListener("click", () => {
        checkAnswer(index);
      });
      answerButtons.appendChild(answerButton);
    });
  }
  
  function checkAnswer(answerIndex) {
    if (answerIndex === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
      score++;
    } else {
      timeRemaining -= 10; 
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function updateTimer() {
    const timerContainer = document.getElementById("timer-container");
    timerContainer.textContent = `Time: ${timeRemaining}`;
  
    if (timeRemaining <= 0) {
      endQuiz();
    }
  
    timeRemaining--;
  }

  const highScoresKey = "codeQuizHighScores";
  let highScores = [];

  window.addEventListener("load", () => {
    const storedHighScores = localStorage.getItem(highScoresKey);
    if (storedHighScores) {
      highScores = JSON.parse(storedHighScores);
      displayHighScores();
    }
  });

  function saveScore() {
  const initialsInput = document.getElementById("initials-input");
  const initials = initialsInput.value.trim();

  
  if (initials !== "") {
    const scoreEntry = {
      initials: initials,
      score: score + timeRemaining 
    };

    highScores.push(scoreEntry);
    initialsInput.value = "";
    highScores.sort((a, b) => b.score - a.score);

    displayHighScores();

    localStorage.setItem(highScoresKey, JSON.stringify(highScores));
  }
}

function displayHighScores() {
  const highScoresContainer = document.getElementById("high-scores-container");
  highScoresContainer.innerHTML = "";

  const highScoresTitle = document.createElement("h2");
  highScoresTitle.textContent = "High Scores";
  highScoresContainer.appendChild(highScoresTitle);

  const highScoresList = document.createElement("ul");
  highScores.forEach((scoreEntry) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
    highScoresList.appendChild(scoreItem);
  });

  highScoresContainer.appendChild(highScoresList);
}
  
  function endQuiz() {
    clearInterval(timerInterval);
  
    const finalScore = score + timeRemaining;
    document.getElementById("question-container").style.display = "none";
    document.getElementById("timer-container").style.display = "none";
    document.getElementById("score-container").textContent = `Score: ${finalScore}`;
    document.getElementById("game-over-container").style.display = "block";

    displayHighScores();
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    timeRemaining = 60;
    score = 0;
  
    document.getElementById("game-over-container").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("timer-container").style.display = "block";
    document.getElementById("score-container").textContent = "";
    
    startQuiz();
  }
  
  document.getElementById("start-button").addEventListener("click", startQuiz);
  document.getElementById("save-score-button").addEventListener("click", saveScore);
  document.getElementById("restart-button").addEventListener("click", restartQuiz);
