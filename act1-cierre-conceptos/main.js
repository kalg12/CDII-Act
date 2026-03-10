const CAREERS = [
    "TÉCNICO EN ACUACULTURA",
    "TÉCNICO EN MECÁNICA NAVAL",
    "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
    "TÉCNICO EN RECREACIONES ACUÁTICAS",
    "TÉCNICO EN AIRE ACONDICIONADO",
    "TÉCNICO LABORATORISTA AMBIENTAL",
];

const CONCEPTS = [
    {
        concept: "Ciberetnografía",
        correctDefinition: "Técnicas y métodos de investigación digital",
        options: [
            "Técnicas y métodos de investigación digital",
            "Herramientas para procesar datos y generar gráficos",
            "Reflexión sobre dilemas morales y el impacto social de la tecnología",
            "Relación entre el uso de TICC y el impacto ambiental"
        ]
    },
    {
        concept: "Software Estadístico",
        correctDefinition: "Herramientas para procesar datos y generar gráficos",
        options: [
            "Técnicas y métodos de investigación digital",
            "Herramientas para procesar datos y generar gráficos",
            "Reflexión sobre dilemas morales y el impacto social de la tecnología",
            "Relación entre el uso de TICC y el impacto ambiental"
        ]
    },
    {
        concept: "Ética Digital",
        correctDefinition: "Reflexión sobre dilemas morales y el impacto social de la tecnología",
        options: [
            "Técnicas y métodos de investigación digital",
            "Herramientas para procesar datos y generar gráficos",
            "Reflexión sobre dilemas morales y el impacto social de la tecnología",
            "Relación entre el uso de TICC y el impacto ambiental"
        ]
    },
    {
        concept: "Consumo Energético",
        correctDefinition: "Relación entre el uso de TICC y el impacto ambiental",
        options: [
            "Técnicas y métodos de investigación digital",
            "Herramientas para procesar datos y generar gráficos",
            "Reflexión sobre dilemas morales y el impacto social de la tecnología",
            "Relación entre el uso de TICC y el impacto ambiental"
        ]
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
    
    showStep(2);
    renderQuestion();
}

function renderQuestion() {
    const item = CONCEPTS[studentData.currentQuestion];
    
    document.getElementById('concept-text').textContent = item.concept;
    
    const progress = ((studentData.currentQuestion + 1) / CONCEPTS.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Relación ${studentData.currentQuestion + 1} de ${CONCEPTS.length}`;
    
    document.getElementById('correct-count').textContent = studentData.correctCount;
    
    const optionsContainer = document.getElementById('definition-options');
    optionsContainer.innerHTML = '';
    
    const shuffledOptions = shuffleArray([...item.options]);
    
    shuffledOptions.forEach((option) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'definition-option';
        optionEl.textContent = option;
        optionEl.onclick = () => selectOption(option, item);
        
        optionsContainer.appendChild(optionEl);
    });
}

function selectOption(selectedOption, item) {
    const isCorrect = selectedOption === item.correctDefinition;
    
    studentData.answers[studentData.currentQuestion] = {
        selected: selectedOption,
        isCorrect: isCorrect,
        concept: item.concept,
        correctDefinition: item.correctDefinition
    };
    
    if (isCorrect) {
        studentData.correctCount++;
    }
    
    const optionsContainer = document.getElementById('definition-options');
    const options = optionsContainer.querySelectorAll('.definition-option');
    
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        opt.classList.remove('selected');
        
        if (opt.textContent === item.correctDefinition) {
            opt.classList.add('correct');
        } else if (opt.textContent === selectedOption && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    document.getElementById('correct-count').textContent = studentData.correctCount;
    
    setTimeout(() => {
        if (studentData.currentQuestion < CONCEPTS.length - 1) {
            studentData.currentQuestion++;
            renderQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const percent = Math.round((studentData.correctCount / CONCEPTS.length) * 100);
    
    if (percent === 100) {
        const evidenceHTML = `[${studentData.name} ${studentData.lastname}], [${studentData.career}], Grupo ${studentData.group}, Puntaje: 100%, Resultado: Éxito`;
        document.getElementById('evidence-block').textContent = evidenceHTML;
        document.getElementById('success-message').style.display = 'block';
    } else {
        document.getElementById('success-message').style.display = 'none';
    }
    
    document.getElementById('final-score').textContent = `${percent}%`;
    
    let summaryHTML = '<h4>Resumen de Respuestas:</h4>';
    studentData.answers.forEach((answer, index) => {
        const status = answer.isCorrect ? '<span class="correct">✓ Correcto</span>' : '<span class="incorrect">✗ Incorrecto</span>';
        summaryHTML += `
            <div class="result-item">
                <span>${answer.concept}</span>
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
