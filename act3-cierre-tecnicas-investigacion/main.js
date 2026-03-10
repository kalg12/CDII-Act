const CAREERS = [
    "TÉCNICO EN ACUACULTURA",
    "TÉCNICO EN MECÁNICA NAVAL",
    "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
    "TÉCNICO EN RECREACIONES ACUÁTICAS",
    "TÉCNICO EN AIRE ACONDICIONADO",
    "TÉCNICO LABORATORISTA AMBIENTAL",
];

const TECHNIQUES = [
    "Ciberetnografía",
    "Entrevista",
    "Grupo Focal"
];

const SCENARIOS = [
    {
        scenario: "Los estudiantes de acuacultura pasan demasiado tiempo en redes sociales durante las clases prácticas.",
        correctTechnique: "Ciberetnografía",
        explanation: "Permite observar el comportamiento digital de los estudiantes en sus espacios virtuales."
    },
    {
        scenario: "Un investigador necesita conocer las opiniones detalladas de un maestro sobre el uso de tecnología en sus clases.",
        correctTechnique: "Entrevista",
        explanation: "La entrevista permite obtener información profunda y detallada de una persona específica."
    },
    {
        scenario: "Se quiere conocer cómo interactúan los estudiantes de preparatoria en el grupo de WhatsApp de su generación.",
        correctTechnique: "Ciberetnografía",
        explanation: "La ciberetnografía estudia el comportamiento de grupos en entornos digitales y redes sociales."
    },
    {
        scenario: "El director quiere recolectar opiniones de varios docentes sobre el nuevo reglamento escolar de forma simultánea.",
        correctTechnique: "Grupo Focal",
        explanation: "El grupo focal reúne a múltiples participantes para discutir y obtener diversas perspectivas."
    },
    {
        scenario: "Un estudiante quiere comprender los patrones de consumo de contenido en TikTok entre los jóvenes de CETMAR.",
        correctTechnique: "Ciberetnografía",
        explanation: "Permite observar y analizar comportamientos digitales en plataformas de redes sociales."
    },
    {
        scenario: "Se necesita obtener la historia de vida y experiencia laboral de un trabajador administrativo que se jubila.",
        correctTechnique: "Entrevista",
        explanation: "La entrevista es ideal para obtener testimonios personales y narrativas individuales."
    },
    {
        scenario: "Los psicólogos escolares desean explorar cómo se sienten los estudiantes sobre el bullying en el plantel.",
        correctTechnique: "Grupo Focal",
        explanation: "Permite crear un espacio seguro donde los participantes comparten experiencias y opiniones."
    },
    {
        scenario: "Un investigador quiere observar las dinámicas de comunicación en el foro virtual de una materia.",
        correctTechnique: "Ciberetnografía",
        explanation: "Estudia las interacciones que ocurren en espacios digitales asíncronos."
    },
    {
        scenario: "El departamento de servicios escolares quiere conocer la experiencia de 5 estudiantes con las Becas.",
        correctTechnique: "Entrevista",
        explanation: "Permite profundizar en las experiencias individuales de cada estudiante."
    },
    {
        scenario: "Se quiere generar un espacio de diálogo entre padres de familia, maestros y directores sobre la educación híbrida.",
        correctTechnique: "Grupo Focal",
        explanation: "Facilita la conversación entre diferentes actores educativos."
    },
    {
        scenario: "Un investigador busca analizar los memes que circulan en los grupos de WhatsApp de los estudiantes.",
        correctTechnique: "Ciberetnografía",
        explanation: "Permite estudiar la cultura digital y expresiones humorísticas de grupos en línea."
    },
    {
        scenario: "El coordinador de carrera necesita evaluar la satisfacción de los egresados de los últimos 3 años.",
        correctTechnique: "Entrevista",
        explanation: "Permite obtener retroalimentación detallada y profunda de cada egresado."
    }
];

let studentData = {
    name: "",
    lastname: "",
    career: "",
    group: "",
    answers: [],
    currentQuestion: 0,
    correctCount: 0
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
    
    const shuffledScenarios = shuffleArray([...SCENARIOS]).slice(0, 8);
    window.scenarios = shuffledScenarios;
    
    showStep(2);
    renderQuestion();
}

function renderQuestion() {
    const item = window.scenarios[studentData.currentQuestion];
    
    document.getElementById('scenario-text').textContent = item.scenario;
    
    const progress = ((studentData.currentQuestion + 1) / 8) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Desafío ${studentData.currentQuestion + 1} de 8`;
    
    document.getElementById('correct-count').textContent = studentData.correctCount;
    
    const buttonsContainer = document.getElementById('technique-buttons');
    buttonsContainer.innerHTML = '';
    
    const shuffledTechniques = shuffleArray([...TECHNIQUES]);
    
    shuffledTechniques.forEach((technique) => {
        const btn = document.createElement('div');
        btn.className = 'technique-btn';
        btn.textContent = technique;
        btn.onclick = () => selectOption(technique, item);
        
        buttonsContainer.appendChild(btn);
    });
}

function selectOption(selectedTechnique, item) {
    const isCorrect = selectedTechnique === item.correctTechnique;
    
    studentData.answers[studentData.currentQuestion] = {
        selected: selectedTechnique,
        isCorrect: isCorrect,
        scenario: item.scenario,
        correct: item.correctTechnique
    };
    
    if (isCorrect) {
        studentData.correctCount++;
    }
    
    const buttonsContainer = document.getElementById('technique-buttons');
    const buttons = buttonsContainer.querySelectorAll('.technique-btn');
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.classList.remove('selected');
        
        if (btn.textContent === item.correctTechnique) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedTechnique && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    document.getElementById('correct-count').textContent = studentData.correctCount;
    
    setTimeout(() => {
        if (studentData.currentQuestion < 7) {
            studentData.currentQuestion++;
            renderQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const percent = Math.round((studentData.correctCount / 8) * 100);
    
    if (percent >= 75) {
        const evidenceHTML = `[${studentData.name} ${studentData.lastname}], [${studentData.career}], Grupo ${studentData.group}, Puntaje: ${percent}%, Resultado: Éxito`;
        document.getElementById('evidence-block').textContent = evidenceHTML;
        document.getElementById('success-message').style.display = 'block';
    } else {
        document.getElementById('success-message').style.display = 'none';
    }
    
    document.getElementById('final-score').textContent = `${percent}%`;
    
    let summaryHTML = '<h4>Resumen de Respuestas:</h4>';
    studentData.answers.forEach((answer, index) => {
        const status = answer.isCorrect ? '<span class="correct">✓ ' + answer.correct + '</span>' : '<span class="incorrect">✗ Tu respuesta: ' + answer.selected + '</span>';
        const scenarioShort = answer.scenario.substring(0, 60) + '...';
        summaryHTML += `
            <div class="result-item">
                <span>${scenarioShort}</span>
                ${status}
            </div>
        `;
    });
    document.getElementById('feedback-summary').innerHTML = summaryHTML;
    
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
        correctCount: 0
    };
    
    document.getElementById('student-form').reset();
    showStep(1);
}

document.addEventListener('DOMContentLoaded', () => {
    populateCareers();
    
    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
});
