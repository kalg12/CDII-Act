const CAREERS = [
  "TÉCNICO EN ACUACULTURA",
  "TÉCNICO EN MECÁNICA NAVAL",
  "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
  "TÉCNICO EN RECREACIONES ACUÁTICAS",
  "TÉCNICO EN AIRE ACONDICIONADO",
  "TÉCNICO LABORATORISTA AMBIENTAL",
];

const openingCases = [
  {
    message: '"Si no vas a la fiesta, ni te aparezcas mañana en el salón."',
    hint: "Piensa si el mensaje busca controlar la conducta de otra persona para que pertenezca al grupo.",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Presión social",
    explanation:
      "Correcto. El mensaje condiciona la pertenencia al grupo. Aunque parezca broma, presiona a la persona para actuar de cierta manera.",
  },
  {
    message: "“Si ocupas ayuda con la tarea, dime y la hacemos juntos.”",
    hint: "Observa si el contenido ayuda, apoya o daña la convivencia.",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Broma inofensiva",
    explanation:
      "En este caso no hay agresión ni presión. Es un mensaje de apoyo. Aquí se marca como la opción menos problemática.",
  },
  {
    message: "“Jajaja, era obvio que iba a reprobar, nunca entiende nada.”",
    hint: "Fíjate si alguien queda humillado o ridiculizado frente al grupo.",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Agresión o exclusión",
    explanation:
      "Correcto. El mensaje ridiculiza a una persona y afecta su dignidad. No es solo humor: es agresión verbal.",
  },
  {
    message: "“Sube foto o no cuenta que viniste.”",
    hint: "Pregunta clave: ¿la persona puede decidir libremente o el grupo la empuja a hacerlo?",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Presión social",
    explanation:
      "Correcto. Aquí se presiona a la persona para demostrar algo y encajar en el grupo.",
  },
  {
    message: "Meme burlándose de cómo habla un compañero del grupo.",
    hint: "Recuerda que un meme también comunica valores y puede excluir.",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Agresión o exclusión",
    explanation:
      "Correcto. Aunque se comparta como “broma”, ridiculizar a alguien contribuye a la exclusión.",
  },
  {
    message: "“No le digan nada a Alex, total ni participa.”",
    hint: "Observa si el mensaje deja fuera a una persona del grupo.",
    options: ["Broma inofensiva", "Presión social", "Agresión o exclusión"],
    correct: "Agresión o exclusión",
    explanation:
      "Correcto. El mensaje aísla a una persona del grupo y promueve exclusión.",
  },
];

const developmentCases = [
  {
    message: "“Si no publicas la foto con nosotros, ya no te invitamos.”",
    hint: "Clasifica pensando en la intención del grupo sobre la conducta de la persona.",
    correct: "Presión social",
    explanation:
      "Correcto. La persona recibe una condición para seguir perteneciendo al grupo.",
  },
  {
    message:
      "Historia con indirecta: “Hay gente que solo estorba en el equipo.”",
    hint: "Pregunta orientadora: ¿alguien está siendo dejado fuera o desvalorizado?",
    correct: "Exclusión",
    explanation:
      "Correcto. La indirecta desvaloriza a una persona y la coloca fuera del grupo.",
  },
  {
    message: "“Gracias por compartir los apuntes, me ayudaron mucho.”",
    hint: "Observa si fortalece la colaboración o deteriora la convivencia.",
    correct: "Apoyo",
    explanation:
      "Correcto. La evidencia muestra ayuda y reconocimiento entre compañeros.",
  },
  {
    message: "Comentario: “Qué oso tu exposición, parecía chiste.”",
    hint: "Piensa si el mensaje humilla o ridiculiza públicamente.",
    correct: "Burla",
    explanation:
      "Correcto. El comentario ridiculiza a la persona frente a otros.",
  },
  {
    message: "“Dicen que cambiaron a Sofi de grupo porque tuvo problemas.”",
    hint: "Pregunta clave: ¿el contenido comparte algo confirmado o solo “se dice” sin prueba?",
    correct: "Rumor",
    explanation:
      "Correcto. Se difunde información no confirmada que puede afectar a una persona.",
  },
  {
    message: "“Vamos a organizarnos mejor para que todos participemos.”",
    hint: "Revisa si el contenido promueve respeto, orden y colaboración.",
    correct: "Convivencia sana",
    explanation:
      "Correcto. El mensaje busca integrar y mejorar el trabajo en grupo.",
  },
];

const categoryOptions = [
  "Apoyo",
  "Burla",
  "Presión social",
  "Exclusión",
  "Rumor",
  "Convivencia sana",
];

const state = {
  currentOpeningIndex: 0,
  currentDevelopmentIndex: 0,
  mission1Correct: 0,
  mission2Correct: 0,
  openingAnswered: false,
  developmentAnswered: false,
  studentName: "",
  studentLastname: "",
  studentCareer: "",
  studentGroup: "",
  evidenceId: "",
};

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const mission1Score = document.getElementById("mission1Score");
const mission2Score = document.getElementById("mission2Score");
const missionState = document.getElementById("missionState");

const stepButtons = {
  step1: document.getElementById("openStep1"),
  step2: document.getElementById("openStep2"),
  step3: document.getElementById("openStep3"),
};

const stepSections = {
  step1: document.getElementById("step1"),
  step2: document.getElementById("step2"),
  step3: document.getElementById("step3"),
};

const openingMessage = document.getElementById("openingMessage");
const openingHint = document.getElementById("openingHint");
const openingOptions = document.getElementById("openingOptions");
const openingFeedback = document.getElementById("openingFeedback");
const nextOpeningBtn = document.getElementById("nextOpeningBtn");
const caseCounter = document.getElementById("caseCounter");

const evidenceMessage = document.getElementById("evidenceMessage");
const developmentHint = document.getElementById("developmentHint");
const developmentOptions = document.getElementById("developmentOptions");
const developmentFeedback = document.getElementById("developmentFeedback");
const nextEvidenceBtn = document.getElementById("nextEvidenceBtn");
const evidenceCounter = document.getElementById("evidenceCounter");

const emotionReflection = document.getElementById("emotionReflection");
const effectReflection = document.getElementById("effectReflection");
const analysisConclusion = document.getElementById("analysisConclusion");

const mainPattern = document.getElementById("mainPattern");
const redFinding = document.getElementById("redFinding");
const yellowFinding = document.getElementById("yellowFinding");
const greenFinding = document.getElementById("greenFinding");
const improvementProposal = document.getElementById("improvementProposal");
const finalReport = document.getElementById("finalReport");

const welcomeDialog = document.getElementById("welcomeDialog");
const startActivityBtn = document.getElementById("startActivityBtn");
const restartBtn = document.getElementById("restartBtn");
const generateReportBtn = document.getElementById("generateReportBtn");
const dlgName = document.getElementById("dlgName");
const dlgLastname = document.getElementById("dlgLastname");
const dlgCareer = document.getElementById("dlgCareer");
const dlgGroup = document.getElementById("dlgGroup");
const dlgError = document.getElementById("dlgError");
const studentPills = document.getElementById("studentPills");
const pillStudentName = document.getElementById("pillStudentName");
const pillStudentCareer = document.getElementById("pillStudentCareer");
const pillStudentGroup = document.getElementById("pillStudentGroup");
const evidenceBlock = document.getElementById("evidenceBlock");

function openPhase(key) {
  Object.entries(stepSections).forEach(([name, section]) => {
    section.classList.toggle("is-visible", name === key);
  });

  Object.entries(stepButtons).forEach(([name, button]) => {
    button.classList.toggle("is-active", name === key);
  });
}

function populateCareers() {
  CAREERS.forEach((career) => {
    const option = document.createElement("option");
    option.value = career;
    option.textContent = career;
    dlgCareer.appendChild(option);
  });
}

function generateEvidenceId() {
  const initials =
    `${state.studentName.charAt(0) || "X"}${state.studentLastname.charAt(0) || "X"}`.toUpperCase();
  const group = (state.studentGroup || "X").toUpperCase();
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `EVID-${initials}${group}-${stamp}-${random}`;
}

function updateStudentPills() {
  const fullName = `${state.studentName} ${state.studentLastname}`.trim();
  pillStudentName.textContent = `Alumno: ${fullName}`;
  pillStudentCareer.textContent = `Carrera: ${state.studentCareer}`;
  pillStudentGroup.textContent = `Grupo: ${state.studentGroup}`;
  studentPills.style.display = "flex";
}

function updateProgress() {
  let progress = 0;

  progress += (state.currentOpeningIndex / openingCases.length) * 40;
  progress += (state.currentDevelopmentIndex / developmentCases.length) * 40;

  if (isReflectionComplete()) {
    progress += 10;
  }

  if (finalReport.classList.contains("is-visible")) {
    progress += 10;
  }

  const roundedProgress = Math.min(100, Math.round(progress));
  progressFill.style.width = `${roundedProgress}%`;
  progressText.textContent = `${roundedProgress}% completado`;

  mission1Score.textContent = `${state.mission1Correct} / ${openingCases.length}`;
  mission2Score.textContent = `${state.mission2Correct} / ${developmentCases.length}`;

  if (roundedProgress === 0) {
    missionState.textContent = "Inicio";
  } else if (roundedProgress < 40) {
    missionState.textContent = "Apertura";
  } else if (roundedProgress < 80) {
    missionState.textContent = "Desarrollo";
  } else if (roundedProgress < 100) {
    missionState.textContent = "Cierre";
  } else {
    missionState.textContent = "Completado";
  }
}

function resetFeedback(box) {
  box.className = "feedback-box";
  box.innerHTML = "";
}

function showFeedback(box, isCorrect, text) {
  box.className = `feedback-box is-visible ${isCorrect ? "is-correct" : "is-wrong"}`;
  box.innerHTML = `<strong>${isCorrect ? "Buen análisis." : "Sigue pensando."}</strong> ${text}`;
}

function renderOpeningCase() {
  const item = openingCases[state.currentOpeningIndex];
  state.openingAnswered = false;
  nextOpeningBtn.disabled = true;

  caseCounter.textContent = `Caso ${state.currentOpeningIndex + 1} de ${openingCases.length}`;
  openingMessage.textContent = item.message;
  openingHint.textContent = item.hint;
  resetFeedback(openingFeedback);
  openingOptions.innerHTML = "";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => handleOpeningAnswer(option, button));
    openingOptions.appendChild(button);
  });
}

function handleOpeningAnswer(selectedOption, selectedButton) {
  if (state.openingAnswered) return;

  const current = openingCases[state.currentOpeningIndex];
  const isCorrect = selectedOption === current.correct;

  state.openingAnswered = true;
  if (isCorrect) {
    state.mission1Correct += 1;
  }

  [...openingOptions.children].forEach((button) => {
    button.disabled = true;
    if (button === selectedButton) {
      button.classList.add("is-selected");
    }
  });

  showFeedback(openingFeedback, isCorrect, current.explanation);
  nextOpeningBtn.disabled = false;
  updateProgress();
}

function moveToNextOpening() {
  if (state.currentOpeningIndex < openingCases.length - 1) {
    state.currentOpeningIndex += 1;
    renderOpeningCase();
    updateProgress();
    return;
  }

  stepButtons.step2.disabled = false;
  openPhase("step2");
  updateProgress();
}

function renderDevelopmentCase() {
  const item = developmentCases[state.currentDevelopmentIndex];
  state.developmentAnswered = false;
  nextEvidenceBtn.disabled = true;

  evidenceCounter.textContent = `Evidencia ${state.currentDevelopmentIndex + 1} de ${developmentCases.length}`;
  evidenceMessage.textContent = item.message;
  developmentHint.textContent = item.hint;
  resetFeedback(developmentFeedback);
  developmentOptions.innerHTML = "";

  categoryOptions.forEach((option) => {
    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = option;
    button.addEventListener("click", () =>
      handleDevelopmentAnswer(option, button),
    );
    developmentOptions.appendChild(button);
  });
}

function handleDevelopmentAnswer(selectedOption, selectedButton) {
  if (state.developmentAnswered) return;

  const current = developmentCases[state.currentDevelopmentIndex];
  const isCorrect = selectedOption === current.correct;

  state.developmentAnswered = true;
  if (isCorrect) {
    state.mission2Correct += 1;
  }

  [...developmentOptions.children].forEach((button) => {
    button.disabled = true;
    if (button === selectedButton) {
      button.classList.add("is-selected");
    }
  });

  const feedbackText = `${current.explanation} <br><strong>Categoría correcta:</strong> ${current.correct}.`;
  showFeedback(developmentFeedback, isCorrect, feedbackText);
  nextEvidenceBtn.disabled = false;
  updateProgress();
}

function moveToNextDevelopment() {
  if (state.currentDevelopmentIndex < developmentCases.length - 1) {
    state.currentDevelopmentIndex += 1;
    renderDevelopmentCase();
    updateProgress();
    return;
  }

  if (isReflectionComplete()) {
    stepButtons.step3.disabled = false;
    openPhase("step3");
  } else {
    alert("Antes de pasar al cierre, completa la mini reflexión guiada.");
  }

  updateProgress();
}

function isReflectionComplete() {
  return (
    emotionReflection.value.trim() !== "" &&
    effectReflection.value.trim() !== "" &&
    analysisConclusion.value.trim().length >= 20
  );
}

function tryUnlockStep3() {
  if (
    state.currentDevelopmentIndex === developmentCases.length - 1 &&
    state.developmentAnswered &&
    isReflectionComplete()
  ) {
    stepButtons.step3.disabled = false;
  }
  updateProgress();
}

function escapeHTML(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function generateFinalReport() {
  if (!mainPattern.value) {
    alert("Selecciona el patrón predominante.");
    return;
  }

  if (
    redFinding.value.trim().length < 10 ||
    yellowFinding.value.trim().length < 10 ||
    greenFinding.value.trim().length < 10
  ) {
    alert("Completa los tres apartados del semáforo con ideas más claras.");
    return;
  }

  if (improvementProposal.value.trim().length < 15) {
    alert(
      "Escribe una propuesta un poco más desarrollada para mejorar la convivencia digital.",
    );
    return;
  }

  const fullName = `${state.studentName} ${state.studentLastname}`.trim();
  const reportHTML = `
    <h3>Reporte final del investigador digital</h3>
    <p><strong>Alumno:</strong> ${escapeHTML(fullName)} &nbsp;|&nbsp; <strong>Carrera:</strong> ${escapeHTML(state.studentCareer)} &nbsp;|&nbsp; <strong>Grupo:</strong> ${escapeHTML(state.studentGroup)}</p>
    <p><strong>Técnica utilizada:</strong> análisis de contenido en línea.</p>
    <p><strong>Patrón predominante:</strong> ${escapeHTML(mainPattern.value)}</p>
    <p><strong>Conclusión del análisis:</strong> ${escapeHTML(analysisConclusion.value.trim())}</p>
    <ul>
      <li><strong>Rojo:</strong> ${escapeHTML(redFinding.value.trim())}</li>
      <li><strong>Amarillo:</strong> ${escapeHTML(yellowFinding.value.trim())}</li>
      <li><strong>Verde:</strong> ${escapeHTML(greenFinding.value.trim())}</li>
    </ul>
    <p><strong>Propuesta de mejora:</strong> ${escapeHTML(improvementProposal.value.trim())}</p>
    <p>
      <strong>Interpretación final:</strong> Al observar, clasificar e interpretar contenidos digitales,
      es posible descubrir cómo se relacionan los estudiantes en línea. Esta técnica ayuda a reconocer si predominan
      el apoyo, la burla, la presión, el rumor o la exclusión, y permite proponer acciones para fortalecer una convivencia digital más sana.
    </p>
  `;

  finalReport.innerHTML = reportHTML;
  finalReport.classList.add("is-visible");

  state.evidenceId = generateEvidenceId();
  evidenceBlock.textContent = `[${fullName}], [${state.studentCareer}], Grupo ${state.studentGroup}, Puntaje: ${state.mission1Correct + state.mission2Correct}/${openingCases.length + developmentCases.length}, Evidencia: ${state.evidenceId}`;
  evidenceBlock.classList.add("is-visible");

  updateProgress();
}

function resetActivity() {
  state.currentOpeningIndex = 0;
  state.currentDevelopmentIndex = 0;
  state.mission1Correct = 0;
  state.mission2Correct = 0;
  state.openingAnswered = false;
  state.developmentAnswered = false;

  emotionReflection.value = "";
  effectReflection.value = "";
  analysisConclusion.value = "";
  mainPattern.value = "";
  redFinding.value = "";
  yellowFinding.value = "";
  greenFinding.value = "";
  improvementProposal.value = "";

  finalReport.classList.remove("is-visible");
  finalReport.innerHTML = "";

  evidenceBlock.classList.remove("is-visible");
  evidenceBlock.textContent = "";

  stepButtons.step2.disabled = true;
  stepButtons.step3.disabled = true;

  renderOpeningCase();
  renderDevelopmentCase();
  openPhase("step1");
  updateProgress();
}

nextOpeningBtn.addEventListener("click", moveToNextOpening);
nextEvidenceBtn.addEventListener("click", moveToNextDevelopment);

stepButtons.step1.addEventListener("click", () => openPhase("step1"));
stepButtons.step2.addEventListener("click", () => {
  if (!stepButtons.step2.disabled) openPhase("step2");
});
stepButtons.step3.addEventListener("click", () => {
  if (!stepButtons.step3.disabled) openPhase("step3");
});

emotionReflection.addEventListener("change", tryUnlockStep3);
effectReflection.addEventListener("change", tryUnlockStep3);
analysisConclusion.addEventListener("input", tryUnlockStep3);

startActivityBtn.addEventListener("click", () => {
  const name = dlgName.value.trim();
  const lastname = dlgLastname.value.trim();
  const career = dlgCareer.value;
  const group = dlgGroup.value;

  if (!name) {
    dlgError.textContent = "Por favor, escribe tu nombre.";
    dlgError.className = "feedback-box is-visible is-wrong";
    return;
  }
  if (!lastname) {
    dlgError.textContent = "Por favor, escribe tus apellidos.";
    dlgError.className = "feedback-box is-visible is-wrong";
    return;
  }
  if (!career) {
    dlgError.textContent = "Por favor, selecciona tu carrera.";
    dlgError.className = "feedback-box is-visible is-wrong";
    return;
  }
  if (!group) {
    dlgError.textContent = "Por favor, selecciona tu grupo.";
    dlgError.className = "feedback-box is-visible is-wrong";
    return;
  }

  state.studentName = name;
  state.studentLastname = lastname;
  state.studentCareer = career;
  state.studentGroup = group;
  state.evidenceId = "";

  dlgError.className = "feedback-box";
  dlgError.textContent = "";
  updateStudentPills();
  welcomeDialog.close();
});
restartBtn.addEventListener("click", resetActivity);
generateReportBtn.addEventListener("click", generateFinalReport);

renderOpeningCase();
renderDevelopmentCase();
updateProgress();

populateCareers();
if (typeof welcomeDialog.showModal === "function") {
  welcomeDialog.showModal();
}
