const CAREERS = [
  "TECNICO EN ACUACULTURA",
  "TECNICO EN MECANICA NAVAL",
  "TECNICO EN PREPARACION DE ALIMENTOS Y BEBIDAS",
  "TECNICO EN RECREACIONES ACUATICAS",
  "TECNICO EN AIRE ACONDICIONADO",
  "TECNICO LABORATORISTA AMBIENTAL",
];

const DATASET = [
  {
    Estudiante: "Est_01",
    Horas_Uso_Celular: 2,
    Nivel_Fatiga_1a10: 3,
    Consumo_Energia_Apps_kWh: 0.28,
  },
  {
    Estudiante: "Est_02",
    Horas_Uso_Celular: 3,
    Nivel_Fatiga_1a10: 4,
    Consumo_Energia_Apps_kWh: 0.32,
  },
  {
    Estudiante: "Est_03",
    Horas_Uso_Celular: 4,
    Nivel_Fatiga_1a10: 5,
    Consumo_Energia_Apps_kWh: 0.41,
  },
  {
    Estudiante: "Est_04",
    Horas_Uso_Celular: 5,
    Nivel_Fatiga_1a10: 5,
    Consumo_Energia_Apps_kWh: 0.48,
  },
  {
    Estudiante: "Est_05",
    Horas_Uso_Celular: 6,
    Nivel_Fatiga_1a10: 6,
    Consumo_Energia_Apps_kWh: 0.56,
  },
  {
    Estudiante: "Est_06",
    Horas_Uso_Celular: 7,
    Nivel_Fatiga_1a10: 7,
    Consumo_Energia_Apps_kWh: 0.63,
  },
  {
    Estudiante: "Est_07",
    Horas_Uso_Celular: 1,
    Nivel_Fatiga_1a10: 2,
    Consumo_Energia_Apps_kWh: 0.22,
  },
  {
    Estudiante: "Est_08",
    Horas_Uso_Celular: 8,
    Nivel_Fatiga_1a10: 8,
    Consumo_Energia_Apps_kWh: 0.71,
  },
  {
    Estudiante: "Est_09",
    Horas_Uso_Celular: 2,
    Nivel_Fatiga_1a10: 3,
    Consumo_Energia_Apps_kWh: 0.29,
  },
  {
    Estudiante: "Est_10",
    Horas_Uso_Celular: 9,
    Nivel_Fatiga_1a10: 9,
    Consumo_Energia_Apps_kWh: 0.82,
  },
  {
    Estudiante: "Est_11",
    Horas_Uso_Celular: 5,
    Nivel_Fatiga_1a10: 6,
    Consumo_Energia_Apps_kWh: 0.54,
  },
  {
    Estudiante: "Est_12",
    Horas_Uso_Celular: 4,
    Nivel_Fatiga_1a10: 4,
    Consumo_Energia_Apps_kWh: 0.43,
  },
  {
    Estudiante: "Est_13",
    Horas_Uso_Celular: 3,
    Nivel_Fatiga_1a10: 4,
    Consumo_Energia_Apps_kWh: 0.35,
  },
  {
    Estudiante: "Est_14",
    Horas_Uso_Celular: 6,
    Nivel_Fatiga_1a10: 7,
    Consumo_Energia_Apps_kWh: 0.59,
  },
  {
    Estudiante: "Est_15",
    Horas_Uso_Celular: 7,
    Nivel_Fatiga_1a10: 7,
    Consumo_Energia_Apps_kWh: 0.66,
  },
  {
    Estudiante: "Est_16",
    Horas_Uso_Celular: 8,
    Nivel_Fatiga_1a10: 8,
    Consumo_Energia_Apps_kWh: 0.75,
  },
  {
    Estudiante: "Est_17",
    Horas_Uso_Celular: 2,
    Nivel_Fatiga_1a10: 3,
    Consumo_Energia_Apps_kWh: 0.27,
  },
  {
    Estudiante: "Est_18",
    Horas_Uso_Celular: 10,
    Nivel_Fatiga_1a10: 9,
    Consumo_Energia_Apps_kWh: 0.88,
  },
  {
    Estudiante: "Est_19",
    Horas_Uso_Celular: 5,
    Nivel_Fatiga_1a10: 6,
    Consumo_Energia_Apps_kWh: 0.52,
  },
  {
    Estudiante: "Est_20",
    Horas_Uso_Celular: 4,
    Nivel_Fatiga_1a10: 5,
    Consumo_Energia_Apps_kWh: 0.44,
  },
];

let studentInfo = null;
const findings = [];

function addFinding(text) {
  if (!findings.includes(text)) {
    findings.push(text);
  }
}

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
  document
    .querySelectorAll(".panel")
    .forEach((panel) => panel.classList.remove("active"));
  document.getElementById(`step-${stepNumber}`).classList.add("active");
}

function renderDataset() {
  const body = document.getElementById("dataset-body");
  body.innerHTML = "";
  DATASET.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.Estudiante}</td>
      <td>${row.Horas_Uso_Celular}</td>
      <td>${row.Nivel_Fatiga_1a10}</td>
      <td>${row.Consumo_Energia_Apps_kWh.toFixed(2)}</td>
    `;
    body.appendChild(tr);
  });
}

function createIntroMessage() {
  const intro = document.getElementById("intro-message");
  intro.innerHTML =
    "Hola, equipo CETMAR 18. Bienvenidos al Simulador de Laboratorio Estadistico. Aqui tienen su base ficticia de 20 filas lista para copiar y analizar en el proyecto Respiramos lo que sembramos.";
}

function mean(values) {
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function mode(values) {
  const counts = new Map();
  values.forEach((v) => {
    counts.set(v, (counts.get(v) || 0) + 1);
  });

  let maxCount = 0;
  counts.forEach((count) => {
    if (count > maxCount) maxCount = count;
  });

  if (maxCount === 1) {
    return "Sin moda";
  }

  const modes = [];
  counts.forEach((count, key) => {
    if (count === maxCount) modes.push(key);
  });

  return modes.join(", ");
}

function drawCentralTendencyChart(columnName, stats) {
  const canvas = document.getElementById("chart-canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  const media = Number(stats.Media);
  const mediana = Number(stats.Mediana);
  const modaRaw = String(stats.Moda).split(",")[0].trim();
  const moda = Number(modaRaw);

  const items = [
    { label: "Media", value: media, color: "#0284c7" },
    { label: "Mediana", value: mediana, color: "#0ea5e9" },
    {
      label: "Moda",
      value: Number.isFinite(moda) ? moda : 0,
      color: "#38bdf8",
    },
  ];

  const maxVal = Math.max(...items.map((i) => i.value), 1);
  const margin = 40;
  const plotW = w - margin * 2;
  const plotH = h - margin * 2;
  const barWidth = 90;
  const gap = (plotW - barWidth * items.length) / (items.length + 1);

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, h - margin);
  ctx.lineTo(w - margin, h - margin);
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 14px Outfit";
  ctx.fillText(`Grafico de barras - ${columnName}`, margin, 24);

  items.forEach((item, index) => {
    const x = margin + gap + index * (barWidth + gap);
    const barH = (item.value / maxVal) * (plotH - 10);
    const y = h - margin - barH;

    ctx.fillStyle = item.color;
    ctx.fillRect(x, y, barWidth, barH);

    ctx.fillStyle = "#0f172a";
    ctx.font = "13px Outfit";
    ctx.fillText(item.label, x + 16, h - margin + 18);
    ctx.fillText(item.value.toFixed(2), x + 10, y - 8);
  });
}

function renderCentralTendency(columnName) {
  const values = DATASET.map((row) => row[columnName]);
  const stats = {
    Media: mean(values),
    Mediana: median(values),
    Moda: mode(values),
  };

  const media =
    typeof stats.Media === "number" ? stats.Media.toFixed(2) : stats.Media;
  const mediana =
    typeof stats.Mediana === "number"
      ? stats.Mediana.toFixed(2)
      : stats.Mediana;

  const resultArea = document.getElementById("result-area");
  resultArea.innerHTML = `
    <h3>Resultados: Tendencia Central (${columnName})</h3>
    <table class="result-table">
      <thead>
        <tr><th>Medida</th><th>Valor</th></tr>
      </thead>
      <tbody>
        <tr><td>Media</td><td>${media}</td></tr>
        <tr><td>Mediana</td><td>${mediana}</td></tr>
        <tr><td>Moda</td><td>${stats.Moda}</td></tr>
      </tbody>
    </table>
  `;

  addFinding(
    `Se calcularon medidas de tendencia central para ${columnName}: media ${media}, mediana ${mediana}, moda ${stats.Moda}.`,
  );

  drawCentralTendencyChart(columnName, stats);
  updateEvidence();
}

function drawScatterPlot() {
  const canvas = document.getElementById("chart-canvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  const margin = 40;
  const plotW = w - margin * 2;
  const plotH = h - margin * 2;

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, margin);
  ctx.lineTo(margin, h - margin);
  ctx.lineTo(w - margin, h - margin);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = "13px Outfit";
  ctx.fillText("Horas_Uso_Celular", w / 2 - 60, h - 10);
  ctx.save();
  ctx.translate(10, h / 2 + 50);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Nivel_Fatiga_1a10", 0, 0);
  ctx.restore();

  const xValues = DATASET.map((d) => d.Horas_Uso_Celular);
  const yValues = DATASET.map((d) => d.Nivel_Fatiga_1a10);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  DATASET.forEach((row) => {
    const x = margin + ((row.Horas_Uso_Celular - xMin) / (xMax - xMin)) * plotW;
    const y =
      h - margin - ((row.Nivel_Fatiga_1a10 - yMin) / (yMax - yMin)) * plotH;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#0ea5e9";
    ctx.fill();
    ctx.strokeStyle = "#0369a1";
    ctx.stroke();
  });

  const resultArea = document.getElementById("result-area");
  resultArea.innerHTML = `
    <h3>Grafico de Dispersion: Horas de Uso vs Fatiga</h3>
    <p>Descripcion: Se observa una tendencia positiva; a mayor uso del celular, mayor nivel de fatiga reportado en el grupo ficticio.</p>
  `;

  addFinding(
    "Se genero grafico de dispersion entre Horas_Uso_Celular y Nivel_Fatiga_1a10 con tendencia positiva.",
  );
  updateEvidence();
}

function clearResults() {
  const canvas = document.getElementById("chart-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.getElementById("result-area").innerHTML =
    '<p class="muted">Selecciona una accion para comenzar.</p>';
}

function updateEvidence() {
  if (!studentInfo) return;

  const today = new Date();
  const dateText = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const integrantes =
    studentInfo.teamMembers.length > 0
      ? studentInfo.teamMembers.join("; ")
      : `${studentInfo.name} ${studentInfo.lastname}`;

  const summary =
    findings.length > 0 ? findings.join(" ") : "Aun sin hallazgos registrados.";

  const block = [
    "BLOQUE DE EVIDENCIA EN TEXTO - PROYECTO RESPIRAMOS LO QUE SEMBRAMOS",
    `Fecha: ${dateText}`,
    `Alumno responsable: ${studentInfo.name} ${studentInfo.lastname}`,
    `Carrera y grupo: ${studentInfo.career} - Grupo ${studentInfo.group}`,
    `Integrantes: ${integrantes}`,
    `Resumen de hallazgos: ${summary}`,
  ].join("\n");

  document.getElementById("evidence-output").value = block;
}

function handleStart(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const career = document.getElementById("career").value;
  const group = document.querySelector('input[name="group"]:checked').value;
  const teamRaw = document.getElementById("team-members").value;

  studentInfo = {
    name,
    lastname,
    career,
    group,
    teamMembers: teamRaw
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean),
  };

  showStep(2);
  createIntroMessage();
  renderDataset();
  updateEvidence();
}

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

function showEvidenceFeedback(message) {
  const feedback = document.getElementById("evidence-feedback");
  feedback.textContent = message;
  setTimeout(() => {
    feedback.textContent = "";
  }, 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  populateCareers();

  document
    .getElementById("student-form")
    .addEventListener("submit", handleStart);

  document
    .getElementById("analyze-hours")
    .addEventListener("click", () =>
      renderCentralTendency("Horas_Uso_Celular"),
    );
  document
    .getElementById("analyze-fatigue")
    .addEventListener("click", () =>
      renderCentralTendency("Nivel_Fatiga_1a10"),
    );
  document
    .getElementById("analyze-energy")
    .addEventListener("click", () =>
      renderCentralTendency("Consumo_Energia_Apps_kWh"),
    );
  document
    .getElementById("show-scatter")
    .addEventListener("click", drawScatterPlot);
  document
    .getElementById("clear-results")
    .addEventListener("click", clearResults);

  document.getElementById("copy-evidence").addEventListener("click", async () => {
    await copyText(document.getElementById("evidence-output").value);
    showEvidenceFeedback("Texto copiado correctamente.");
  });
});
