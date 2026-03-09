const CAREERS = [
    "TÉCNICO EN ACUACULTURA",
    "TÉCNICO EN MECÁNICA NAVAL",
    "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
    "TÉCNICO EN RECREACIONES ACUÁTICAS",
    "TÉCNICO EN AIRE ACONDICIONADO",
    "TÉCNICO LABORATORISTA AMBIENTAL",
];

const MATCHING_QUESTIONS = [
    {
        concept: "Google Docs",
        correctAnswer: "Procesador de texto en línea y gratuito",
        options: [
            { text: "Procesador de texto en línea y gratuito", correct: true },
            { text: "Almacenamiento en la nube para archivos", correct: false },
            { text: "Herramienta para crear presentaciones", correct: false },
            { text: "Planilla de cálculo en línea", correct: false }
        ]
    },
    {
        concept: "Google Drive",
        correctAnswer: "Almacenamiento en la nube para archivos",
        options: [
            { text: "Plataforma de video llamadas", correct: false },
            { text: "Almacenamiento en la nube para archivos", correct: true },
            { text: "Red social profesional", correct: false },
            { text: "Editor de imágenes gratuito", correct: false }
        ]
    },
    {
        concept: "Google Slides",
        correctAnswer: "Herramienta para crear presentaciones",
        options: [
            { text: "Procesador de texto en línea", correct: false },
            { text: "Herramienta para crear presentaciones", correct: true },
            { text: "Base de datos en línea", correct: false },
            { text: "Aplicación de mapas", correct: false }
        ]
    },
    {
        concept: "Google Sheets",
        correctAnswer: "Planilla de cálculo en línea",
        options: [
            { text: "Planilla de cálculo en línea", correct: true },
            { text: "Herramienta de dibujo vectorial", correct: false },
            { text: "Editor de video", correct: false },
            { text: "Correo electrónico", correct: false }
        ]
    },
    {
        concept: "Canva",
        correctAnswer: "Diseño gráfico fácil y gratuito",
        options: [
            { text: "Navegador web", correct: false },
            { text: "Diseño gráfico fácil y gratuito", correct: true },
            { text: "Programación de tareas", correct: false },
            { text: "Almacenamiento de contraseñas", correct: false }
        ]
    },
    {
        concept: "Notion",
        correctAnswer: "Organizador de notas y proyectos",
        options: [
            { text: "Juego educativo", correct: false },
            { text: "Organizador de notas y proyectos", correct: true },
            { text: "Traductor de idiomas", correct: false },
            { text: "Reproductor de música", correct: false }
        ]
    },
    {
        concept: "Trello",
        correctAnswer: "Gestión de proyectos con tableros Kanban",
        options: [
            { text: "Gestión de proyectos con tableros Kanban", correct: true },
            { text: "Editor de código fuente", correct: false },
            { text: "Plataforma de streaming", correct: false },
            { text: "Calculadora científica", correct: false }
        ]
    },
    {
        concept: "OpenShot",
        correctAnswer: "Editor de video de código abierto",
        options: [
            { text: "Navegador web", correct: false },
            { text: "Editor de video de código abierto", correct: true },
            { text: "Sistema operativo", correct: false },
            { text: "Base de datos", correct: false }
        ]
    },
    {
        concept: "GIMP",
        correctAnswer: "Editor de imágenes gratuito",
        options: [
            { text: "Editor de imágenes gratuito", correct: true },
            { text: "Reproductor de video", correct: false },
            { text: "Gestor de correo", correct: false },
            { text: "Herramienta de diagrama", correct: false }
        ]
    },
    {
        concept: "Zotero",
        correctAnswer: "Gestor de referencias bibliográficas",
        options: [
            { text: "Red social académica", correct: false },
            { text: "Gestor de referencias bibliográficas", correct: true },
            { text: "Traductor automático", correct: false },
            { text: "Calendario digital", correct: false }
        ]
    }
];

let studentData = {
    name: "",
    lastname: "",
    career: "",
    group: "",
    answers: [],
    currentQuestion: 0
};

function populateCareers() {
    const select = document.getElementById('career');
    CAREERS.forEach(career => {
        const option = document.createElement('option');
        option.value = career;
        option.textContent = career;
        select.appendChild(option);
    });
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    studentData.name = document.getElementById('name').value.trim();
    studentData.lastname = document.getElementById('lastname').value.trim();
    studentData.career = document.getElementById('career').value;
    studentData.group = document.querySelector('input[name="group"]:checked').value;
    
    showStep(2);
    renderQuestion();
}

function renderQuestion() {
    const q = MATCHING_QUESTIONS[studentData.currentQuestion];
    document.getElementById('concept-text').textContent = q.concept;
    
    const progress = ((studentData.currentQuestion + 1) / MATCHING_QUESTIONS.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Relación ${studentData.currentQuestion + 1} de ${MATCHING_QUESTIONS.length}`;
    
    const optionsContainer = document.getElementById('match-options');
    optionsContainer.innerHTML = '';
    
    const shuffledOptions = shuffleArray(q.options);
    
    shuffledOptions.forEach((opt, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'match-option';
        optionEl.textContent = opt.text;
        optionEl.onclick = () => selectOption(opt.text, opt.correct);
        
        if (studentData.answers[studentData.currentQuestion]) {
            const selected = studentData.answers[studentData.currentQuestion];
            if (selected.selectedText === opt.text) {
                optionEl.classList.add('selected');
                if (selected.isCorrect) {
                    optionEl.classList.add('correct');
                } else {
                    optionEl.classList.add('incorrect');
                }
            }
        }
        
        optionsContainer.appendChild(optionEl);
    });
    
    updateNavigation();
}

function selectOption(selectedText, isCorrect) {
    studentData.answers[studentData.currentQuestion] = {
        selectedText: selectedText,
        isCorrect: isCorrect,
        correctAnswer: MATCHING_QUESTIONS[studentData.currentQuestion].correctAnswer
    };
    
    renderQuestion();
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = studentData.currentQuestion === 0;
    nextBtn.disabled = studentData.answers[studentData.currentQuestion] === undefined;
    
    if (studentData.currentQuestion === MATCHING_QUESTIONS.length - 1) {
        nextBtn.textContent = 'Ver Resultados →';
    } else {
        nextBtn.textContent = 'Siguiente →';
    }
}

function handleNavigation(action) {
    if (action === 'next') {
        if (studentData.currentQuestion === MATCHING_QUESTIONS.length - 1) {
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
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    
    studentData.answers.forEach(answer => {
        if (!answer) {
            unanswered++;
        } else if (answer.isCorrect) {
            correct++;
        } else {
            incorrect++;
        }
    });
    
    const total = MATCHING_QUESTIONS.length;
    const percent = Math.round((correct / total) * 100);
    
    return { correct, incorrect, unanswered, total, percent };
}

function showResults() {
    const results = calculateResults();
    
    document.getElementById('score-text').textContent = `${results.percent}%`;
    document.getElementById('student-name').textContent = `${studentData.name} ${studentData.lastname} - ${studentData.career} - Grupo ${studentData.group}`;
    
    let feedbackHTML = `<p>Hola <strong>${studentData.name}</strong>, aquí están los resultados:</p>`;
    feedbackHTML += `<p>Respuestas correctas: <span class="strength">${results.correct}</span> / ${results.total}</p>`;
    
    if (results.percent >= 70) {
        feedbackHTML += `<p class="strength">¡Excelente! Conoces muy bien las herramientas digitales de libre acceso.</p>`;
    } else if (results.percent >= 50) {
        feedbackHTML += `<p class="improvement">Buen trabajo. Te recomendamos practicar más con estas herramientas.</p>`;
    } else {
        feedbackHTML += `<p class="improvement">Necesitas estudiar más sobre las herramientas digitales gratuitas disponibles.</p>`;
    }
    
    document.getElementById('feedback-content').innerHTML = feedbackHTML;
    
    let detailedHTML = '<h4>📋 Resumen de Respuestas:</h4>';
    studentData.answers.forEach((answer, index) => {
        const q = MATCHING_QUESTIONS[index];
        if (answer) {
            const status = answer.isCorrect ? '<span class="correct">✓ Correcto</span>' : '<span class="incorrect">✗ Incorrecto</span>';
            detailedHTML += `
                <div class="result-item">
                    <span>${q.concept}</span>
                    ${status}
                </div>
            `;
        }
    });
    
    document.getElementById('detailed-results').innerHTML = detailedHTML;
    
    showStep(3);
}

function restartQuiz() {
    studentData = {
        name: "",
        lastname: "",
        career: "",
        group: "",
        answers: [],
        currentQuestion: 0
    };
    
    document.getElementById('student-form').reset();
    showStep(1);
}

document.addEventListener('DOMContentLoaded', () => {
    populateCareers();
    
    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('prev-btn').addEventListener('click', () => handleNavigation('prev'));
    document.getElementById('next-btn').addEventListener('click', () => handleNavigation('next'));
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
});
