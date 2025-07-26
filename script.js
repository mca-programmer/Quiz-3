let language = "en"; // en or bn

const quizData = {
  en: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Text Machine Language", "Home Tool Markup Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "What is CSS used for?",
      options: ["Styling websites", "Running apps", "Database storage"],
      answer: "Styling websites"
    },
    {
      question: "JavaScript is a ___",
      options: ["Programming Language", "Markup Language", "Style Sheet"],
      answer: "Programming Language"
    }
  ],
  bn: [
    {
      question: "HTML এর পূর্ণরূপ কী?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "High Text Machine Language"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "CSS কী কাজে ব্যবহৃত হয়?",
      options: ["ওয়েবপেজ ডিজাইন", "অ্যাপ চালানো", "ডেটা সঞ্চয়"],
      answer: "ওয়েবপেজ ডিজাইন"
    },
    {
      question: "JavaScript হল একটি...",
      options: ["প্রোগ্রামিং ভাষা", "স্টাইলিং ভাষা", "মার্কআপ ভাষা"],
      answer: "প্রোগ্রামিং ভাষা"
    }
  ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  questions = shuffle([...quizData[language]]);
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;
  startTimer();

  const data = questions[currentQuestion];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";

  data.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsEl.appendChild(btn);
  });

  resultEl.textContent = "";
}

function checkAnswer(button, selectedOption) {
  clearInterval(timerInterval);
  const correct = questions[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selectedOption) {
      btn.classList.add("wrong");
    }
  });

  if (selectedOption === correct) {
    score++;
    resultEl.textContent = language === "bn" ? "✔️ সঠিক!" : "✔️ Correct!";
  } else {
    resultEl.textContent = language === "bn" ? "❌ ভুল!" : "❌ Wrong!";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  clearInterval(timerInterval);
  questionEl.textContent = language === "bn" ? "🎉 কুইজ শেষ!" : "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  resultEl.innerHTML = `${language === "bn" ? "আপনার স্কোর" : "Your score"}: <strong>${score} / ${questions.length}</strong>`;
  nextBtn.style.display = "none";

  localStorage.setItem("lastQuizScore", score);
}

function startTimer() {
  timerEl.textContent = `⏱️ ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱️ ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer({}, ""); // auto-fail
    }
  }, 1000);
}

function toggleLanguage() {
  language = language === "en" ? "bn" : "en";
  document.getElementById("langBtn").textContent = language.toUpperCase();
  nextBtn.style.display = "block";
  startQuiz();
}

startQuiz();
