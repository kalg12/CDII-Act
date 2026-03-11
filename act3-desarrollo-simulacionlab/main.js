const CAREERS = [
  "TECNICO EN ACUACULTURA",
  "TECNICO EN MECANICA NAVAL",
  "TECNICO EN PREPARACION DE ALIMENTOS Y BEBIDAS",
  "TECNICO EN RECREACIONES ACUATICAS",
  "TECNICO EN AIRE ACONDICIONADO",
  "TECNICO LABORATORISTA AMBIENTAL",
];

const COLUMN_LABELS = {
  Horas_Uso_Celular: "Horas de uso del celular (por dia)",
  Nivel_Fatiga_1a10: "Nivel de fatiga al terminar el dia (1 a 10)",
  Consumo_Energia_Apps_kWh: "Consumo de energia en apps (kWh/dia)",
};

const BASE_DATASET = [
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
let dataset = [];
let recordNames = [];

function resetDataset(n) {
  const count = n != null ? Math.max(0, 20 - n) : 20;
  dataset = BASE_DATASET.slice(0, count).map((row) => ({ ...row }));
}

function getDataset() {
  return dataset;
}

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
  getDataset().forEach((row) => {
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
  const n = studentInfo?.memberCount || 0;
  const demoCount = 20 - n;
  intro.innerHTML = `Hola, equipo CETMAR 18. Han registrado <strong>${n} integrante(s)</strong>. La base de referencia muestra <strong>${demoCount} filas ficticias</strong>. Completen la FASE 2 con sus datos reales para que el simulador pueda activar el analisis completo.`;
}

function mean(values) {
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function estimateEnergyKwh(hours, fatigue) {
  const x = BASE_DATASET.map((r) => r.Horas_Uso_Celular);
  const y = BASE_DATASET.map((r) => r.Consumo_Energia_Apps_kWh);
  const xMean = mean(x);
  const yMean = mean(y);

  let num = 0;
  let den = 0;
  for (let i = 0; i < x.length; i++) {
    num += (x[i] - xMean) * (y[i] - yMean);
    den += (x[i] - xMean) ** 2;
  }

  const slope = den === 0 ? 0 : num / den;
  const intercept = yMean - slope * xMean;
  const fatigueAdjust = (fatigue - 5) * 0.008;
  const estimate = intercept + slope * hours + fatigueAdjust;

  return Math.max(0.12, Number(estimate.toFixed(2)));
}

function renderStudentRecordRows(n) {
  const body = document.getElementById("student-records-body");
  body.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i}</td>
      <td><input class="mini-input row-name" type="text" data-row="${i}" /></td>
      <td><input class="mini-input row-hours" type="number" min="0" max="16" step="1" data-row="${i}" /></td>
      <td><input class="mini-input row-fatigue" type="number" min="1" max="10" step="1" data-row="${i}" /></td>
      <td><span class="auto-kwh" data-row="${i}">--</span></td>
    `;
    body.appendChild(tr);
  }

  document.querySelectorAll(".row-hours, .row-fatigue").forEach((input) => {
    input.addEventListener("input", () => {
      updateAutoKwhForRow(input.dataset.row);
    });
  });
}

function updateAutoKwhForRow(row) {
  const hoursInput = document.querySelector(`.row-hours[data-row="${row}"]`);
  const fatigueInput = document.querySelector(
    `.row-fatigue[data-row="${row}"]`,
  );
  const out = document.querySelector(`.auto-kwh[data-row="${row}"]`);

  const hours = Number(hoursInput.value);
  const fatigue = Number(fatigueInput.value);

  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(fatigue) ||
    hours <= 0 ||
    fatigue <= 0
  ) {
    out.textContent = "--";
    return;
  }

  out.textContent = estimateEnergyKwh(hours, fatigue).toFixed(2);
}

function setAnalysisEnabled(enabled) {
  [
    "analyze-hours",
    "analyze-fatigue",
    "analyze-energy",
    "show-scatter",
    "clear-results",
  ].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = !enabled;
  });
  const hint = document.getElementById("locked-hint");
  if (hint) hint.style.display = enabled ? "none" : "block";
}

function applyStudentRecords() {
  const n = studentInfo?.memberCount || 1;
  const records = [];
  const newNames = [];

  for (let i = 1; i <= n; i++) {
    const nameVal =
      (
        document.querySelector(`.row-name[data-row="${i}"]`)?.value || ""
      ).trim() || `Integrante ${i}`;
    const hours = Number(
      document.querySelector(`.row-hours[data-row="${i}"]`).value,
    );
    const fatigue = Number(
      document.querySelector(`.row-fatigue[data-row="${i}"]`).value,
    );

    if (
      !Number.isFinite(hours) ||
      !Number.isFinite(fatigue) ||
      hours <= 0 ||
      fatigue <= 0
    ) {
      document.getElementById("records-feedback").textContent =
        `Completa correctamente los ${n} registros antes de activar el analisis.`;
      return;
    }

    newNames.push(nameVal);
    records.push({
      Estudiante: nameVal,
      Horas_Uso_Celular: hours,
      Nivel_Fatiga_1a10: fatigue,
      Consumo_Energia_Apps_kWh: estimateEnergyKwh(hours, fatigue),
    });
  }

  const demoCount = 20 - n;
  dataset = [
    ...BASE_DATASET.slice(0, demoCount).map((row) => ({ ...row })),
    ...records,
  ];
  recordNames = newNames;
  renderDataset();
  clearResults();
  setAnalysisEnabled(true);

  document.getElementById("records-feedback").textContent =
    `Se registraron ${n} integrante(s). El analisis esta listo para ejecutarse.`;

  addFinding(
    `Se capturaron ${n} registros reales del equipo integrados con ${demoCount} datos de referencia.`,
  );
  updateEvidence();
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
  ctx.fillText(`Grafico de barras - ${COLUMN_LABELS[columnName] || columnName}`, margin, 24);

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
  const values = getDataset().map((row) => row[columnName]);
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
  const label = COLUMN_LABELS[columnName] || columnName;
  resultArea.innerHTML = `
    <h3>Resultados: Tendencia Central</h3>
    <p class="muted">${label}</p>
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
    `Se calcularon medidas de tendencia central para ${COLUMN_LABELS[columnName] || columnName}: media ${media}, mediana ${mediana}, moda ${stats.Moda}.`,
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
  ctx.fillText("Horas de uso del celular (por dia)", w / 2 - 90, h - 10);
  ctx.save();
  ctx.translate(10, h / 2 + 70);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Fatiga al final del dia (1-10)", 0, 0);
  ctx.restore();

  const xValues = getDataset().map((d) => d.Horas_Uso_Celular);
  const yValues = getDataset().map((d) => d.Nivel_Fatiga_1a10);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);

  getDataset().forEach((row) => {
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
    <h3>Grafico de Dispersion: Horas de uso por dia vs Nivel de fatiga</h3>
    <p>Descripcion: Se observa una tendencia positiva; a mayor cantidad de horas diarias de uso del celular, mayor nivel de fatiga reportado al terminar el dia.</p>
  `;

  addFinding(
    "Se genero grafico de dispersion entre horas de uso diario del celular y nivel de fatiga al final del dia, con tendencia positiva.",
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
    recordNames.length > 0
      ? recordNames.join("; ")
      : `${studentInfo.name} ${studentInfo.lastname} (${studentInfo.memberCount || 1} integrante(s))`;

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
  const memberCount = parseInt(
    document.getElementById("member-count").value,
    10,
  );

  studentInfo = {
    name,
    lastname,
    career,
    group,
    memberCount,
  };

  recordNames = [];
  showStep(2);
  resetDataset(memberCount);
  createIntroMessage();
  renderDataset();
  renderStudentRecordRows(memberCount);
  setAnalysisEnabled(false);
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

  document
    .getElementById("apply-records")
    .addEventListener("click", applyStudentRecords);

  document
    .getElementById("copy-evidence")
    .addEventListener("click", async () => {
      await copyText(document.getElementById("evidence-output").value);
      showEvidenceFeedback("Texto copiado correctamente.");
    });
});
