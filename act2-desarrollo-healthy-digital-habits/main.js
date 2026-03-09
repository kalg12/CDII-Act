const CAREERS = [
    "TÉCNICO EN ACUACULTURA",
    "TÉCNICO EN MECÁNICA NAVAL",
    "TÉCNICO EN PREPARACIÓN DE ALIMENTOS Y BEBIDAS",
    "TÉCNICO EN RECREACIONES ACUÁTICAS",
    "TÉCNICO EN AIRE ACONDICIONADO",
    "TÉCNICO LABORATORISTA AMBIENTAL",
];

const SCENARIOS = [
    {
        category: "environmental",
        categoryLabel: "🌱 Ambiental",
        sentence: "To reduce my digital carbon footprint, I _______ turn off my monitor when not in use.",
        translation: "Para reducir mi huella digital de carbono, yo _______ apago mi monitor cuando no lo uso.",
        correctAnswer: "always",
        options: ["always", "never", "sometimes"],
        effect: { air: 10, digital: 5, energy: 10 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Salud Digital",
        sentence: "I _______ take breaks from screen time to protect my eyes.",
        translation: "Yo _______ tomo descansos de la pantalla para proteger mis ojos.",
        correctAnswer: "always",
        options: ["never", "always", "sometimes"],
        effect: { air: 0, digital: 10, energy: 0 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Ambiental",
        sentence: "At CETMAR, we sometimes do cleanup activities to help the environment.",
        translation: "En CETMAR, a veces hacemos actividades de limpieza para ayudar al medio ambiente.",
        correctAnswer: "sometimes",
        options: ["always", "never", "sometimes"],
        effect: { air: 10, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Salud Digital",
        sentence: "I _______ use blue light filters when working at night.",
        translation: "Yo _______ uso filtros de luz azul cuando trabajo de noche.",
        correctAnswer: "usually",
        options: ["never", "usually", "always"],
        effect: { air: 0, digital: 8, energy: 0 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energía",
        sentence: "I _______ unplug devices when not in use to save energy.",
        translation: "Yo _______ desconecto los dispositivos cuando no los uso para ahorrar energía.",
        correctAnswer: "usually",
        options: ["sometimes", "always", "usually"],
        effect: { air: 5, digital: 0, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Ambiental",
        sentence: "Students at CETMAR _______ recycle paper to reduce waste.",
        translation: "Los estudiantes de CETMAR _______ recyclean papel para reducir residuos.",
        correctAnswer: "sometimes",
        options: ["always", "never", "sometimes"],
        effect: { air: 8, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Salud Digital",
        sentence: "I _______ organize my digital files to reduce energy consumption.",
        translation: "Yo _______ organizo mis archivos digitales para reducir el consumo de energía.",
        correctAnswer: "sometimes",
        options: ["never", "always", "sometimes"],
        effect: { air: 0, digital: 5, energy: 8 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energía",
        sentence: "I _______ use sleep mode on my computer to save electricity.",
        translation: "Yo _______ uso el modo de suspensión en mi computadora para ahorrar electricidad.",
        correctAnswer: "always",
        options: ["sometimes", "never", "always"],
        effect: { air: 0, digital: 0, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Ambiental",
        sentence: "We _______ use reusable containers instead of plastic at school.",
        translation: "Nosotros _______ usamos recipientes reutilizables en lugar de plástico en la escuela.",
        correctAnswer: "sometimes",
        options: ["never", "usually", "sometimes"],
        effect: { air: 8, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Salud Digital",
        sentence: "I _______ back up my files to reduce digital waste.",
        translation: "Yo _______ hago respaldo de mis archivos para reducir el desperdicio digital.",
        correctAnswer: "sometimes",
        options: ["always", "never", "sometimes"],
        effect: { air: 0, digital: 8, energy: 0 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energía",
        sentence: "I _______ adjust screen brightness to save energy.",
        translation: "Yo _______ ajusto el brillo de la pantalla para ahorrar energía.",
        correctAnswer: "usually",
        options: ["never", "always", "usually"],
        effect: { air: 0, digital: 5, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Ambiental",
        sentence: "At CETMAR, we always turn off lights when leaving classrooms.",
        translation: "En CETMAR, siempre apagamos las luces al salir de las aulas.",
        correctAnswer: "always",
        options: ["sometimes", "never", "always"],
        effect: { air: 10, digital: 0, energy: 10 }
    }
];

const FREQUENCY_INFO = {
    "always": { meaning: "Siempre - 100% del tiempo", translation: "100% of the time" },
    "usually": { meaning: "Usualmente - La mayoría del tiempo", translation: "Most of the time" },
    "sometimes": { meaning: "A veces - Ocasionalmente", translation: "Sometimes - Occasionally" },
    "never": { meaning: "Nunca - 0% del tiempo", translation: "0% of the time" }
};

let studentData = {
    name: "",
    lastname: "",
    career: "",
    group: "",
    answers: [],
    currentQuestion: 0,
    meters: {
        air: 50,
        digital: 50,
        energy: 50
    }
};

function toggleFrequencyHelp() {
    const helpContent = document.getElementById('frequency-help-content');
    helpContent.classList.toggle('show');
}

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

function updateMeters() {
    const meters = ['air', 'digital', 'energy'];
    const meterIds = ['air-meter', 'digital-meter', 'energy-meter'];
    const valueIds = ['air-value', 'digital-value', 'energy-value'];
    
    meters.forEach((meter, index) => {
        const value = Math.max(0, Math.min(100, studentData.meters[meter]));
        document.getElementById(meterIds[index]).style.width = `${value}%`;
        document.getElementById(valueIds[index]).textContent = `${value}%`;
        
        const meterFill = document.getElementById(meterIds[index]);
        meterFill.classList.remove('healthy', 'warning', 'danger');
        
        if (value >= 70) {
            meterFill.classList.add('healthy');
        } else if (value >= 40) {
            meterFill.classList.add('warning');
        } else {
            meterFill.classList.add('danger');
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    studentData.name = document.getElementById('name').value.trim();
    studentData.lastname = document.getElementById('lastname').value.trim();
    studentData.career = document.getElementById('career').value;
    studentData.group = document.querySelector('input[name="group"]:checked').value;
    
    showStep(2);
    renderScenario();
}

function renderScenario() {
    const scenario = SCENARIOS[studentData.currentQuestion];
    const hasAnswered = studentData.answers[studentData.currentQuestion] !== undefined;
    
    document.getElementById('scenario-number').textContent = `Desafío #${studentData.currentQuestion + 1}`;
    document.getElementById('scenario-category').textContent = scenario.categoryLabel;
    
    const sentenceWithBlank = scenario.sentence.replace("_______", "__________");
    document.getElementById('scenario-text').innerHTML = `<strong>${sentenceWithBlank}</strong>`;
    document.getElementById('scenario-translation').textContent = scenario.translation;
    
    const progress = ((studentData.currentQuestion + 1) / SCENARIOS.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Desafío ${studentData.currentQuestion + 1} de ${SCENARIOS.length}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const shuffledOptions = shuffleArray([...scenario.options]);
    
    shuffledOptions.forEach((option) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'frequency-option';
        optionEl.textContent = option.charAt(0).toUpperCase() + option.slice(1);
        
        if (!hasAnswered) {
            optionEl.onclick = () => selectOption(option);
        }
        
        optionsContainer.appendChild(optionEl);
    });
    
    updateNavigation();
}

function selectOption(selectedOption) {
    const scenario = SCENARIOS[studentData.currentQuestion];
    const isCorrect = selectedOption === scenario.correctAnswer;
    
    studentData.answers[studentData.currentQuestion] = {
        selected: selectedOption,
        isCorrect: isCorrect,
        correct: scenario.correctAnswer
    };
    
    const bonusAir = scenario.effect.air;
    const bonusDigital = scenario.effect.digital;
    const bonusEnergy = scenario.effect.energy;
    
    if (isCorrect) {
        studentData.meters.air = Math.min(100, studentData.meters.air + bonusAir);
        studentData.meters.digital = Math.min(100, studentData.meters.digital + bonusDigital);
        studentData.meters.energy = Math.min(100, studentData.meters.energy + bonusEnergy);
    } else {
        studentData.meters.air = Math.min(100, studentData.meters.air + Math.floor(bonusAir * 0.3));
        studentData.meters.digital = Math.min(100, studentData.meters.digital + Math.floor(bonusDigital * 0.3));
        studentData.meters.energy = Math.min(100, studentData.meters.energy + Math.floor(bonusEnergy * 0.3));
    }
    
    updateMeters();
    
    if (studentData.currentQuestion < SCENARIOS.length - 1) {
        studentData.currentQuestion++;
        renderScenario();
    } else {
        showResults();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = studentData.currentQuestion === 0;
    nextBtn.disabled = studentData.answers[studentData.currentQuestion] === undefined;
    
    if (studentData.currentQuestion === SCENARIOS.length - 1) {
        nextBtn.textContent = 'Ver Resultados →';
    } else {
        nextBtn.textContent = 'Siguiente →';
    }
}

function handleNavigation(action) {
    if (action === 'next') {
        if (studentData.currentQuestion === SCENARIOS.length - 1) {
            showResults();
            return;
        }
        studentData.currentQuestion++;
    } else {
        studentData.currentQuestion--;
    }
    renderScenario();
}

function calculateResults() {
    let correct = 0;
    let incorrect = 0;
    
    studentData.answers.forEach(answer => {
        if (answer && answer.isCorrect) {
            correct++;
        } else if (answer) {
            incorrect++;
        }
    });
    
    const total = SCENARIOS.length;
    const percent = Math.round((correct / total) * 100);
    
    return {
        correct,
        incorrect,
        total,
        percent,
        air: studentData.meters.air,
        digital: studentData.meters.digital,
        energy: studentData.meters.energy
    };
}

function showResults() {
    const results = calculateResults();
    
    document.getElementById('student-name').textContent = `${studentData.name} ${studentData.lastname} - ${studentData.career} - Grupo ${studentData.group}`;
    
    document.getElementById('final-air').style.width = `${results.air}%`;
    document.getElementById('final-air-value').textContent = `${results.air}%`;
    document.getElementById('final-digital').style.width = `${results.digital}%`;
    document.getElementById('final-digital-value').textContent = `${results.digital}%`;
    document.getElementById('final-energy').style.width = `${results.energy}%`;
    document.getElementById('final-energy-value').textContent = `${results.energy}%`;
    
    document.getElementById('score-text').textContent = `${results.percent}%`;
    
    let feedbackHTML = `<p>Hola <strong>${studentData.name}</strong>, aquí está tu análisis:</p>`;
    feedbackHTML += `<p>Respuestas correctas: <span class="strength">${results.correct}</span> / ${results.total}</p>`;
    
    if (results.air >= 70) {
        feedbackHTML += `<p class="strength">🌬️ ¡Excelente! La calidad del aire en CETMAR está muy bien.</p>`;
    } else if (results.air >= 50) {
        feedbackHTML += `<p class="improvement">🌬️ La calidad del aire necesita mejora. ¡Sigue esforzando!</p>`;
    } else {
        feedbackHTML += `<p class="improvement">🌬️ Es importante tomar acciones para mejorar el aire.</p>`;
    }
    
    if (results.digital >= 70) {
        feedbackHTML += `<p class="strength">💻 ¡Muy buenos hábitos de salud digital!</p>`;
    } else if (results.digital >= 50) {
        feedbackHTML += `<p class="improvement">💻 Tu salud digital puede mejorar.</p>`;
    } else {
        feedbackHTML += `<p class="improvement">� Recuerda tomar descansos de pantalla.</p>`;
    }
    
    if (results.energy >= 70) {
        feedbackHTML += `<p class="strength">⚡ ¡Excelente consumo de energía!</p>`;
    } else if (results.energy >= 50) {
        feedbackHTML += `<p class="improvement">⚡ Puedes reducir tu consumo de energía.</p>`;
    } else {
        feedbackHTML += `<p class="improvement">⚡ Apaga dispositivos cuando no los uses.</p>`;
    }
    
    document.getElementById('feedback-content').innerHTML = feedbackHTML;
    
    let achievementsHTML = '';
    
    if (results.percent >= 90) {
        achievementsHTML += '<div class="achievement">🏆 Master of Digital Habits</div>';
    }
    if (results.air >= 80) {
        achievementsHTML += '<div class="achievement">🌱 Eco Warrior</div>';
    }
    if (results.digital >= 80) {
        achievementsHTML += '<div class="achievement">💻 Screen Health Expert</div>';
    }
    if (results.energy >= 80) {
        achievementsHTML += '<div class="achievement">⚡ Energy Saver</div>';
    }
    if (results.correct === results.total) {
        achievementsHTML += '<div class="achievement">⭐ Perfect Score</div>';
    }
    
    document.getElementById('achievements').innerHTML = achievementsHTML || '<p style="color: var(--text-light);">¡Sigue practicando para ganar logros!</p>';
    
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
        meters: {
            air: 50,
            digital: 50,
            energy: 50
        }
    };
    
    document.getElementById('student-form').reset();
    updateMeters();
    showStep(1);
}

document.addEventListener('DOMContentLoaded', () => {
    populateCareers();
    updateMeters();
    
    document.getElementById('student-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('prev-btn').addEventListener('click', () => handleNavigation('prev'));
    document.getElementById('next-btn').addEventListener('click', () => handleNavigation('next'));
    document.getElementById('restart-btn').addEventListener('click', restartQuiz);
});
