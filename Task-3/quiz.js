const allQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: 2,
      explanation: "Paris is the capital of France."
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: 3,
      explanation: "JavaScript is the only one that natively runs in the browser."
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats"
      ],
      answer: 1,
      explanation: "CSS stands for Cascading Style Sheets."
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      options: ["style", "script", "css", "design"],
      answer: 0,
      explanation: "The <style> tag is used for internal CSS."
    },
    {
      question: "What year was JavaScript created?",
      options: ["1991", "1995", "2001", "2005"],
      answer: 1,
      explanation: "JavaScript was created by Brendan Eich in 1995."
    },
    {
      question: "Who invented the World Wide Web?",
      options: ["Tim Berners-Lee", "Alan Turing", "Bill Gates", "Steve Jobs"],
      answer: 0,
      explanation: "Tim Berners-Lee invented the WWW in 1989."
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Facebook", "Twitter", "Microsoft"],
      answer: 1,
      explanation: "React was developed by Facebook (now Meta)."
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Program Interaction", "Applied Programming Interface", "Application Process Interface"],
      answer: 0,
      explanation: "API stands for Application Programming Interface."
    }
  ];
  
  function getRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  const form = document.getElementById('quizForm');
  const submitBtn = document.getElementById('submitBtn');
  const scoreDisplay = document.getElementById('scoreDisplay');
  
  let selectedQuestions = getRandomQuestions(allQuestions, 5);
  
  function renderQuiz() {
    form.innerHTML = '';
    selectedQuestions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
  
      const qTitle = document.createElement('h3');
      qTitle.textContent = `Q${index + 1}. ${q.question}`;
      questionDiv.appendChild(qTitle);
  
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');
  
      q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.innerHTML = `
          <input type="radio" name="q${index}" value="${i}" />
          ${opt}
        `;
        optionsDiv.appendChild(label);
      });
  
      questionDiv.appendChild(optionsDiv);
      form.appendChild(questionDiv);
    });
  }
  
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let score = 0;
  
    const answers = new FormData(form);
  
    selectedQuestions.forEach((q, index) => {
      const selected = answers.get(`q${index}`);
      const questionDiv = form.children[index];
      const labels = questionDiv.querySelectorAll('label');
  
      labels.forEach((label, i) => {
        label.classList.remove('correct', 'wrong');
        if (Number(selected) === i && i === q.answer) {
          label.classList.add('correct');
          score++;
        } else if (Number(selected) === i && i !== q.answer) {
          label.classList.add('wrong');
        } else if (i === q.answer) {
          label.classList.add('correct');
        }
      });
  
      const exp = document.createElement('div');
      exp.classList.add('explanation');
      exp.textContent = `Explanation: ${q.explanation}`;
      questionDiv.appendChild(exp);
    });
  
    scoreDisplay.textContent = `Your Score: ${score} / ${selectedQuestions.length}`;
    submitBtn.disabled = true;
  });

  const toggleBtn = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleIcon.classList.replace('bx-moon', 'bx-sun');
  } else {
    toggleIcon.classList.replace('bx-sun', 'bx-moon');
  }
  toggleIcon.classList.add('animate');
  toggleIcon.addEventListener('animationend', () => {
    toggleIcon.classList.remove('animate');
  }, { once: true });
});
  
  // Initial render
  renderQuiz();  