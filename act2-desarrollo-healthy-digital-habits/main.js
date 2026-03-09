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
        categoryLabel: "🌱 Environmental",
        sentence: "To reduce my digital carbon footprint, I _______ turn off my monitor when not in use.",
        correctAnswer: "always",
        options: ["always", "never", "sometimes"],
        effect: { air: 10, digital: 5, energy: 10 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Digital Health",
        sentence: "I _______ take breaks from screen time to protect my eyes.",
        correctAnswer: "always",
        options: ["never", "always", "sometimes"],
        effect: { air: 0, digital: 10, energy: 0 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Environmental",
        sentence: "At CETMAR, we _______ plant trees to improve air quality.",
        correctAnswer: "always",
        options: ["never", "sometimes", "always"],
        effect: { air: 10, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Digital Health",
        sentence: "I _______ use blue light filters when working at night.",
        correctAnswer: "usually",
        options: ["never", "usually", "always"],
        effect: { air: 0, digital: 8, energy: 0 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energy",
        sentence: "I _______ unplug devices when not in use to save energy.",
        correctAnswer: "usually",
        options: ["sometimes", "always", "usually"],
        effect: { air: 5, digital: 0, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Environmental",
        sentence: "Students _______ recycle paper at CETMAR to reduce waste.",
        correctAnswer: "sometimes",
        options: ["always", "never", "sometimes"],
        effect: { air: 8, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Digital Health",
        sentence: "I _______ organize my digital files to reduce energy consumption.",
        correctAnswer: "sometimes",
        options: ["never", "always", "sometimes"],
        effect: { air: 0, digital: 5, energy: 8 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energy",
        sentence: "I _______ use sleep mode on my computer to save electricity.",
        correctAnswer: "always",
        options: ["sometimes", "never", "always"],
        effect: { air: 0, digital: 0, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Environmental",
        sentence: "We _______ use reusable containers instead of plastic at school.",
        correctAnswer: "usually",
        options: ["never", "usually", "sometimes"],
        effect: { air: 8, digital: 0, energy: 0 }
    },
    {
        category: "digital",
        categoryLabel: "💻 Digital Health",
        sentence: "I _______ back up my files to reduce digital waste.",
        correctAnswer: "sometimes",
        options: ["always", "never", "sometimes"],
        effect: { air: 0, digital: 8, energy: 0 }
    },
    {
        category: "energy",
        categoryLabel: "⚡ Energy",
        sentence: "I _______ adjust screen brightness to save energy.",
        correctAnswer: "usually",
        options: ["never", "always", "usually"],
        effect: { air: 0, digital: 5, energy: 10 }
    },
    {
        category: "environmental",
        categoryLabel: "🌱 Environmental",
        sentence: "At CETMAR, we _______ turn off lights when leaving classrooms.",
        correctAnswer: "always",
        options: ["sometimes", "never", "always"],
        effect: { air: 10, digital: 0, energy: 10 }
    }
];

const FREQUENCY_INFO = {
    "always": { meaning: "100% of the time / Siempre", percentage: 100 },
    "usually": { meaning: "Most of the time / La mayoría del tiempo", percentage: 75 },
    "sometimes": { meaning: "Occasionally / Algunas veces", percentage: 50 },
    "never": { meaning: "0% of the time / Nunca", percentage: 0 }
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
    
    document.getElementById('scenario-number').textContent = `Desafío #${studentData.currentQuestion + 1}`;
    document.getElementById('scenario-category').textContent = scenario.categoryLabel;
    document.getElementById('scenario-text').textContent = scenario.sentence;
    
    const wordToComplete = "_______";
    const parts = scenario.sentence.split(wordToComplete);
    document.getElementById('sentence-start').textContent = parts[0].trim();
    
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
        optionEl.onclick = () => selectOption(option);
        
        if (studentData.answers[studentData.currentQuestion]) {
            const selected = studentData.answers[studentData.currentQuestion];
            if (selected.selected === option) {
                optionEl.classList.add('selected');
            }
            if (option === scenario.correctAnswer) {
                optionEl.classList.add('correct-answer');
            }
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
    
    if (isCorrect) {
        studentData.meters.air = Math.min(100, studentData.meters.air + scenario.effect.air);
        studentData.meters.digital = Math.min(100, studentData.meters.digital + scenario.effect.digital);
        studentData.meters.energy = Math.min(100, studentData.meters.energy + scenario.effect.energy);
    } else {
        studentData.meters.air = Math.max(0, studentData.meters.air - 3);
        studentData.meters.digital = Math.max(0, studentData.meters.digital - 3);
        studentData.meters.energy = Math.max(0, studentData.meters.energy - 3);
    }
    
    updateMeters();
    renderScenario();
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
        feedbackHTML += `<p class="improvement">🌬️ La calidad del aire necesita mejora. ¡Sigue effortando!</p>`;
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
