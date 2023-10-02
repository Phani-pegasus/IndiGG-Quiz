document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What is the capital city of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Bangalore"],
      answer: "New Delhi",
    },
    {
      question: 'Which river is often referred to as the "holy river" in India?',
      options: ["Ganga", "Yamuna", "Krishna", "Godavari"],
      answer: "Ganga",
    },
    {
      question: 'Who is considered the "Father of the Nation" in India for his leadership in the Indian independence movement?',
      options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Sardar Vallabhbhai Patel", "Mahatma Gandhi"],
      answer: "Mahatma Gandhi",
    },
    {
      question: "What is the national emblem of India?",
      options: ["Lotus", "Peacock", "Ashoka Chakra", "Lion Capital of Ashoka"],
      answer: "Ashoka Chakra",
    },
    {
      question: 'Which famous monument in India is often described as the "Symbol of Love" and is a UNESCO World Heritage Site?',
      options: ["Taj Mahal", "Hawa Mahal", "Qutub Minar", "Red Fort"],
      answer: "Taj Mahal",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  const userAnswers = {};

  const quizForm = document.getElementById("quiz-form");
  const questionText = document.getElementById("question-text");
  const answerOptions = document.getElementById("answer-options");
  const nextButton = document.getElementById("next-button");
  const submitButton = document.getElementById("submit-button");
  const quizResult = document.getElementById("quiz-result");
  const restartButton = document.createElement("button");

  function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionText.textContent = currentQuestion.question;
    answerOptions.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index + 1}`;
      input.value = option; 
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${option}`));
      li.appendChild(label);
      answerOptions.appendChild(li);
    });

    if (index === questions.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "block";
    } else {
      nextButton.style.display = "block";
      submitButton.style.display = "none";
    }

    startTimer();
  }

  function startTimer() {
    let timeLeft = 15;
    const timerElement = document.getElementById("timer");

    const timerInterval = setInterval(() => {
      timerElement.textContent = `Time left: ${timeLeft} seconds`;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        const selectedAnswer = document.querySelector(`input[name='q${currentQuestionIndex + 1}']:checked`);
        if (!selectedAnswer) {
          userAnswers[`q${currentQuestionIndex + 1}`] = "Timed Out";
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
          }
        }
      }

      timeLeft--;
    }, 1000);
  }

  nextButton.addEventListener("click", () => {
    const selectedAnswer = document.querySelector(`input[name='q${currentQuestionIndex + 1}']:checked`);

    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    const userAnswer = selectedAnswer.value;
    userAnswers[`q${currentQuestionIndex + 1}`] = userAnswer;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      displayQuestion(currentQuestionIndex);
    }
  });

 

submitButton.addEventListener("click", () => {
  quizForm.style.display = "none";
  quizResult.style.display = "block";
  quizResult.style.color = "#ffffff";

  for (let i = 0; i < questions.length; i++) {
    const questionNumber = i + 1;
    const correctAnswer = questions[i].answer;
    const userAnswer = userAnswers[`q${questionNumber}`];

    const resultMessage = document.createElement("p");
    resultMessage.textContent = `Question ${questionNumber}: ${
      userAnswer === correctAnswer ? "Correct" : "Incorrect"
    }`;
    quizResult.appendChild(resultMessage);

    if (userAnswer === correctAnswer) {
      score++;
    }
  }

  const scoreMessage = document.createElement("p");
  scoreMessage.textContent = `Your score: ${score} out of ${questions.length}`;
  quizResult.appendChild(scoreMessage);

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Quiz";
  restartButton.id = "restart-button";
  restartButton.style.backgroundColor = "#007BFF"; 
  restartButton.style.color = "#ffffff"; 
  restartButton.style.border = "none";
  restartButton.style.padding = "10px 20px";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";

  restartButton.addEventListener("click", () => {
  
    location.reload();
  });

  quizResult.appendChild(restartButton);
});
  displayQuestion(currentQuestionIndex);
});
