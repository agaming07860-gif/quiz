// Sample Quiz Data
const quizData = [
  {
    question: "1. What is the SI unit of Electric Charge?",
    options: ["Volt", "Coulomb", "Ampere", "Ohm"],
    correct: 1 // Index of the correct answer ("Coulomb")
  },
  {
    question: "2. The force between two static point charges is governed by which law?",
    options: ["Ohm's Law", "Coulomb's Law", "Gauss's Law", "Faraday's Law"],
    correct: 1
  },
  {
    question: "3. What is the direction of an Electric Field around a positive charge?",
    options: ["Radially Outwards", "Radially Inwards", "Circular", "Zero"],
    correct: 0
  }
];

// App State Variables
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timeLeft = 120; // 2 minutes countdown (in seconds)
let timerInterval;

// DOM Element References
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

// Start & Update Timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    // Format timer to 00:00 structure
    timerElement.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Auto-submit when time reaches zero
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}

// Render Current Question
function loadQuestion() {
  selectedOption = null; // Reset selection for the new question
  const currentQuiz = quizData[currentQuestion];
  
  questionText.textContent = currentQuiz.question;
  optionsContainer.innerHTML = ""; // Clear old options

  // Dynamically generate option list items
  currentQuiz.options.forEach((optionText, index) => {
    const li = document.createElement("li");
    li.className = "option-item";
    li.textContent = optionText;
    
    // Handle option click
    li.onclick = () => selectOption(li, index);
    
    optionsContainer.appendChild(li);
  });

  // Change button label on the last question
  if (currentQuestion === quizData.length - 1) {
    nextBtn.textContent = "Submit Test";
  } else {
    nextBtn.textContent = "Next Question";
  }
}

// Handle Option Selection
function selectOption(element, index) {
  // Remove 'selected' styling from all options
  document.querySelectorAll(".option-item").forEach(el => el.classList.remove("selected"));
  
  // Highlight the selected option
  element.classList.add("selected");
  selectedOption = index;
}

// Handle 'Next Question' / 'Submit' Click
function nextQuestion() {
  // Prevent skipping without choosing an option
  if (selectedOption === null) {
    alert("Please select an option before proceeding!");
    return;
  }

  // Check if chosen answer is correct
  if (selectedOption === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// Display Result & Leaderboard Screen
function finishQuiz() {
  clearInterval(timerInterval); // Stop timer
  
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  
  // Update final scores
  document.getElementById("final-score").textContent = `Your Score: ${score} / ${quizData.length}`;
  document.getElementById("user-rank-score").textContent = `${score} / ${quizData.length}`;
}

// Restart Quiz State
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 120;
  
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  
  startTimer();
  loadQuestion();
}

// Initialize Application
loadQuestion();
startTimer();
