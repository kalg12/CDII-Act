const CAREERS = [
  "TÉCNICO EN ACUACULTURA",
  "TÉCNICO EN MECÁNICA NAVAL",
  "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
  "TÉCNICO EN RECREACIONES ACUÁTICAS",
  "TÉCNICO EN AIRE ACONDICIONADO",
  "TÉCNICO LABORATORISTA AMBIENTAL",
];

const QUESTIONS = [
  {
    category: "tools",
    question:
      "¿Con qué frecuencia utilizas herramientas digitales (computadora, tablet, smartphone) para tus actividades escolares?",
    options: [
      { text: "Nunca o casi nunca", score: 0 },
      { text: "Solo ocasionalmente (alguna vez por semana)", score: 2 },
      { text: "Frecuentemente (diario pero pocas horas)", score: 4 },
      { text: "Diariamente por varias horas para estudiar y tareas", score: 5 },
    ],
  },
  {
    category: "tools",
    question:
      "¿Qué herramientas digitales usas principalmente para tus tareas escolares?",
    options: [
      { text: "Solo el celular", score: 1 },
      { text: "Computadora básica para escribir documentos", score: 2 },
      {
        text: "Combinación de computadora y celular con aplicaciones",
        score: 4,
      },
      {
        text: "Uso diversas herramientas: ofimática, almacenamiento en la nube, plataformas educativas",
        score: 5,
      },
    ],
  },
  {
    category: "organization",
    question: "¿Cómo organizas tus archivos y materiales de estudio digitales?",
    options: [
      { text: "No los organizo, los dejo donde se guardan", score: 0 },
      { text: "Tengo algunas carpetas básicas", score: 2 },
      { text: "Uso carpetas organizadas por materia y fecha", score: 4 },
      {
        text: "Utilizo sistema de carpetas, etiquetas y sincronización en la nube",
        score: 5,
      },
    ],
  },
  {
    category: "organization",
    question: "¿Realizas copias de seguridad de tu información escolar?",
    options: [
      { text: "Nunca", score: 0 },
      { text: "Solo cuando pierdo algo importante", score: 2 },
      { text: "De forma ocasional", score: 3 },
      { text: "Regularmente (sincronización automática o semanal)", score: 5 },
    ],
  },
  {
    category: "organization",
    question: "¿Cómo gestionas tus tareas y fechas de entrega?",
    options: [
      { text: "No llevo registro, solo recuerdo mentalmente", score: 0 },
      { text: "Uso recordatorios en el celular", score: 2 },
      { text: "Uso agenda o lista de tareas", score: 3 },
      {
        text: "Utilizo aplicaciones de gestión de tareas con recordatorios y fechas",
        score: 5,
      },
    ],
  },
  {
    category: "ethics",
    question: "¿Consideras el impacto ambiental de la tecnología que usas?",
    options: [
      { text: "No lo había pensado", score: 0 },
      { text: "A veces trato de reducir el consumo", score: 2 },
      { text: "Sí, trato de apagar dispositivos cuando no los uso", score: 4 },
      {
        text: "Conscientemente reduzco consumo, reciclo dispositivos y elijo opciones sostenibles",
        score: 5,
      },
    ],
  },
  {
    category: "ethics",
    question:
      "¿Qué tan consciente eres sobre el uso ético de la información digital (plagio, fuentes confiables)?",
    options: [
      { text: "No me importa, solo necesito completar la tarea", score: 0 },
      { text: "A veces verifico las fuentes", score: 2 },
      { text: "Siempre cito mis fuentes y evito el plagio", score: 4 },
      {
        text: "Soy muy cuidadoso: verifico fuentes, cito correctamente y promuevo la información verificada",
        score: 5,
      },
    ],
  },
  {
    category: "ethics",
    question:
      "¿Qué haces con tus dispositivos electrónicos cuando ya no los usas?",
    options: [
      { text: "Los tiro a la basura", score: 0 },
      { text: "Los guardo en casa sin usar", score: 2 },
      { text: "Los dono o los vendo", score: 4 },
      { text: "Los llevo a puntos de reciclaje especializados", score: 5 },
    ],
  },
  {
    category: "tools",
    question:
      "¿Qué tan familiarizado estás con herramientas de productividad (procesadores de texto, hojas de cálculo, presentaciones)?",
    options: [
      { text: "No sé usarlas", score: 0 },
      { text: "Solo sé lo básico de un procesador de texto", score: 2 },
      { text: "Sé usar varias herramientas de productividad", score: 4 },
      {
        text: "Dominо múltiples herramientas y sus funciones avanzadas",
        score: 5,
      },
    ],
  },
  {
    category: "decision",
    question:
      "¿Cómo influye la tecnología en tus decisiones personales diarias?",
    options: [
      { text: "No influye mucho, prefiero lo tradicional", score: 0 },
      { text: "La uso para comunicación básica", score: 2 },
      { text: "Me influye para informarme antes de decidir", score: 4 },
      {
        text: "La uso activamente para investigar, comparar opciones y tomar mejores decisiones",
        score: 5,
      },
    ],
  },
];

let studentData = {
  name: "",
  lastname: "",
  career: "",
  group: "",
  answers: [],
  currentQuestion: 0,
};

function populateCareers() {
  const select = document.getElementById("career");
  CAREERS.forEach((career) => {
    const option = document.createElement("option");
    option.value = career;
    option.textContent = career;
    select.appendChild(option);
  });
}

function showStep(stepNumber) {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });
  document.getElementById(`step-${stepNumber}`).classList.add("active");
}

function handleFormSubmit(e) {
  e.preventDefault();
  studentData.name = document.getElementById("name").value.trim();
  studentData.lastname = document.getElementById("lastname").value.trim();
  studentData.career = document.getElementById("career").value;
  studentData.group = document.querySelector(
    'input[name="group"]:checked',
  ).value;

  showStep(2);
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[studentData.currentQuestion];
  document.getElementById("question-text").textContent = q.question;

  const progress = ((studentData.currentQuestion + 1) / QUESTIONS.length) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
  document.getElementById("progress-text").textContent =
    `Pregunta ${studentData.currentQuestion + 1} de ${QUESTIONS.length}`;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, index) => {
    const optionEl = document.createElement("div");
    optionEl.className = "option";
    optionEl.textContent = opt.text;
    optionEl.onclick = () => selectOption(index);

    if (studentData.answers[studentData.currentQuestion] === index) {
      optionEl.classList.add("selected");
    }

    optionsContainer.appendChild(optionEl);
  });

  updateNavigation();
}

function selectOption(index) {
  studentData.answers[studentData.currentQuestion] = index;

  document.querySelectorAll(".option").forEach((opt, i) => {
    opt.classList.remove("selected");
    if (i === index) opt.classList.add("selected");
  });

  updateNavigation();
}

function updateNavigation() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = studentData.currentQuestion === 0;
  nextBtn.disabled =
    studentData.answers[studentData.currentQuestion] === undefined;

  if (studentData.currentQuestion === QUESTIONS.length - 1) {
    nextBtn.textContent = "Ver Resultados →";
  } else {
    nextBtn.textContent = "Siguiente →";
  }
}

function handleNavigation(action) {
  if (action === "next") {
    if (studentData.currentQuestion === QUESTIONS.length - 1) {
      showResults();
      return;
    }
    studentData.currentQuestion++;
  } else {
    studentData.currentQuestion--;
  }
  renderQuestion();
}

function calculateResults() {
  let totalScore = 0;
  let maxScore = QUESTIONS.length * 5;
  let toolsScore = 0;
  let toolsMax = 0;
  let orgScore = 0;
  let orgMax = 0;
  let ethicsScore = 0;
  let ethicsMax = 0;
  let decisionScore = 0;
  let decisionMax = 0;

  QUESTIONS.forEach((q, index) => {
    const answerIndex = studentData.answers[index];
    if (answerIndex !== undefined) {
      const score = q.options[answerIndex].score;
      totalScore += score;

      if (q.category === "tools") {
        toolsScore += score;
        toolsMax += 5;
      } else if (q.category === "organization") {
        orgScore += score;
        orgMax += 5;
      } else if (q.category === "ethics") {
        ethicsScore += score;
        ethicsMax += 5;
      } else if (q.category === "decision") {
        decisionScore += score;
        decisionMax += 5;
      }
    }
  });

  return {
    totalPercent: Math.round((totalScore / maxScore) * 100),
    toolsPercent: Math.round((toolsScore / toolsMax) * 100),
    orgPercent: Math.round((orgScore / orgMax) * 100),
    ethicsPercent: Math.round((ethicsScore / ethicsMax) * 100),
    decisionPercent: Math.round((decisionScore / decisionMax) * 100),
  };
}

function generateFeedback(results) {
  let feedback = `<p>Hola <strong>${studentData.name}</strong>, gracias por completar el diagnóstico. Aquí está tu análisis:</p>`;

  feedback += `<p><span class="strength">✓ Tu nivel general es: ${results.totalPercent}%</span></p>`;

  feedback += `<p><strong>Herramientas Digitales:</strong> ${results.toolsPercent}%</p>`;
  feedback += `<p><strong>Organización de Información:</strong> ${results.orgPercent}%</p>`;
  feedback += `<p><strong>Conciencia Ética y Ambiental:</strong> ${results.ethicsPercent}%</p>`;
  feedback += `<p><strong>Tecnología en Toma de Decisiones:</strong> ${results.decisionPercent}%</p>`;

  if (results.toolsPercent >= 70) {
    feedback += `<p class="strength">¡Excelente! Tienes un buen dominio de herramientas digitales.</p>`;
  } else if (results.toolsPercent >= 40) {
    feedback += `<p class="improvement">Tienes conocimientos básicos, puedes profundizar más.</p>`;
  } else {
    feedback += `<p class="improvement">Te，建议 explorar más herramientas digitales para tus estudios.</p>`;
  }

  if (results.orgPercent >= 70) {
    feedback += `<p class="strength">¡Muy buena organización de tu información escolar!</p>`;
  } else if (results.orgPercent >= 40) {
    feedback += `<p class="improvement">Tu organización necesita mejora. Crea un sistema de carpetas.</p>`;
  } else {
    feedback += `<p class="improvement">Es importante mejorar cómo organizas tus materiales de estudio.</p>`;
  }

  if (results.ethicsPercent >= 70) {
    feedback += `<p class="strength">¡Muy consciente del impacto ético y ambiental de la tecnología!</p>`;
  } else if (results.ethicsPercent >= 40) {
    feedback += `<p class="improvement">Reflexiona más sobre el impacto de la tecnología en el medio ambiente.</p>`;
  } else {
    feedback += `<p class="improvement">Te invitamos a reflexionar sobre el uso responsable de la tecnología.</p>`;
  }

  return feedback;
}

function generateDetailedFeedback(results) {
  let html = "<h4>📈 Recomendaciones Personalizadas:</h4><ul>";

  if (results.toolsPercent < 70) {
    html +=
      "<li>Explora herramientas como Google Docs, Sheets y presentaciones</li>";
    html +=
      "<li>Practica el uso de almacenamiento en la nube (Google Drive, OneDrive)</li>";
  }

  if (results.orgPercent < 70) {
    html += "<li>Crea una estructura de carpetas por materia y fecha</li>";
    html += "<li>Activa la sincronización automática de tus archivos</li>";
  }

  if (results.ethicsPercent < 70) {
    html += "<li>Infórmate sobre el impacto ambiental de la tecnología</li>";
    html +=
      "<li>Considera reciclar dispositivos electrónicos en puntos adecuados</li>";
    html += "<li>Aprende sobre derechos de autor y cite tus fuentes</li>";
  }

  if (results.decisionPercent < 70) {
    html +=
      "<li>Usa la tecnología para investigar antes de tomar decisiones</li>";
    html += "<li>Compara opciones y verifica información antes de actuar</li>";
  }

  if (
    results.toolsPercent >= 70 &&
    results.orgPercent >= 70 &&
    results.ethicsPercent >= 70
  ) {
    html +=
      "<li>¡Felicidades! Tienes muy buenos hábitos digitales. Comparte tu conocimiento.</li>";
  }

  html += "</ul>";
  return html;
}

function showResults() {
  const results = calculateResults();

  document.getElementById("score-text").textContent =
    `${results.totalPercent}%`;
  document.getElementById("student-name").textContent =
    `${studentData.name} ${studentData.lastname} - ${studentData.career} - Grupo ${studentData.group}`;

  document.getElementById("feedback-content").innerHTML =
    generateFeedback(results);
  document.getElementById("detailed-feedback").innerHTML =
    generateDetailedFeedback(results);

  showStep(3);
}

function restartQuiz() {
  studentData = {
    name: "",
    lastname: "",
    career: "",
    group: "",
    answers: [],
    currentQuestion: 0,
  };

  document.getElementById("student-form").reset();
  showStep(1);
}

document.addEventListener("DOMContentLoaded", () => {
  populateCareers();

  document
    .getElementById("student-form")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("prev-btn")
    .addEventListener("click", () => handleNavigation("prev"));
  document
    .getElementById("next-btn")
    .addEventListener("click", () => handleNavigation("next"));
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
});
