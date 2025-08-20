function calculateMaintenance() {
  // Coleta de dados dos inputs
  const type = document.getElementById("machine-type").value;
  const model = document.getElementById("machine-model").value;
  const year = parseInt(document.getElementById("machine-year").value);
  const km = parseInt(document.getElementById("machine-km").value);
  const hours = parseInt(document.getElementById("machine-hours").value);
  const lastOilChangeDateStr = document.getElementById("last-oil-change-date").value;
  const oil = document.getElementById("oil-type").value;
  const fuel = document.getElementById("fuel-type").value;
  const resultsBox = document.getElementById("maintenance-results");

  // Validação dos campos essenciais
  if (!model || isNaN(km) || !lastOilChangeDateStr) {
    resultsBox.innerHTML = `<p class="italic text-center text-gray-500">Por favor, preencha o modelo, KM atual e a data da última troca de óleo.</p>`;
    return;
  }

  // --- Lógica de Cálculo ---
  const oilKmInterval = 7500; // Intervalo fixo de 7500 KM para troca de óleo
  const oilMonthsInterval = 9; // Intervalo fixo de 9 meses para troca de óleo

  // 1. Calcula a próxima manutenção por KM
  const nextKmTarget = km + oilKmInterval;

  // 2. Calcula a próxima manutenção por Data
  const lastOilChangeDate = new Date(lastOilChangeDateStr + "T00:00:00"); // Garante que a hora não interfira
  const nextDateTarget = new Date(lastOilChangeDate);
  nextDateTarget.setMonth(nextDateTarget.getMonth() + oilMonthsInterval);

  // --- Montagem do Resultado ---
  resultsBox.innerHTML = `
        <div class="p-3 bg-white rounded-md text-gray-800 text-sm">
            <p><strong>Modelo:</strong> ${model}</p>
            <p><strong>Ano:</strong> ${year || "N/A"}</p>
            <p><strong>KM Atual:</strong> ${km} km</p>
            <p><strong>Horas Utilizadas:</strong> ${!isNaN(hours) ? hours + "h" : "N/A"}</p>
            <p><strong>Tipo de Óleo:</strong> ${oil || "N/A"}</p>
            <p><strong>Combustível:</strong> ${fuel || "N/A"}</p>
        </div>
        <div class="p-3 bg-yellow-100 rounded-md text-yellow-800 text-center">
            <p class="font-bold">Próxima Manutenção Preventiva:</p>
            <p class="text-xl font-bold">Em ${nextKmTarget} km ou até ${nextDateTarget.toLocaleDateString("pt-BR")}</p>
            <p class="text-xs">(O que ocorrer primeiro)</p>
        </div>
    `;

  document.getElementById("print-label-btn").classList.remove("hidden");
}

function printMaintenanceLabel() {
  const model = document.getElementById("machine-model").value;
  const year = document.getElementById("machine-year").value;
  const km = document.getElementById("machine-km").value;
  const oil = document.getElementById("oil-type").value;
  const fuel = document.getElementById("fuel-type").value;
  const nextMaintenance = document.querySelector("#maintenance-results .text-xl").innerText;

  const labelWindow = window.open("", "PRINT", "height=400,width=600");
  labelWindow.document.write("<html><head><title>Etiqueta de Manutenção</title>");
  labelWindow.document.write("<style>body { font-family: sans-serif; padding: 10px; border: 2px dashed #000; } h2, p { margin: 5px 0; }</style>");
  labelWindow.document.write("</head><body>");
  labelWindow.document.write(`<h2>Manutenção - ${model} (${year || "N/A"})</h2>`);
  labelWindow.document.write(`<p><strong>KM na data:</strong> ${km || "N/A"} km</p>`);
  labelWindow.document.write(`<p><strong>Óleo:</strong> ${oil}</p>`);
  labelWindow.document.write(`<p><strong>Combustível:</strong> ${fuel}</p>`);
  labelWindow.document.write("<hr>");
  labelWindow.document.write(`<p style="font-size: 1.2em;"><strong>Próxima Manutenção:</strong><br>${nextMaintenance}</p>`);
  labelWindow.document.write(`<p><small>Data da Impressão: ${new Date().toLocaleDateString("pt-BR")}</small></p>`);
  labelWindow.document.write("</body></html>");

  labelWindow.document.close();
  labelWindow.focus();
  labelWindow.print();
  labelWindow.close();
}
