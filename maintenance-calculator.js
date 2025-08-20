function toggleMachineFields() {
  const machineType = document.getElementById("machine-type").value;
  const hoursField = document.getElementById("hours-field");
  const totalHoursField = document.getElementById("total-hours-field");
  const dailyUsageField = document.getElementById("daily-usage-field");
  const fuelField = document.getElementById("fuel-field");
  const seasonField = document.getElementById("season-field");

  const hasMotor = !(machineType === "Plantadeira" || machineType === "Pulverizador Arrasto");

  hoursField.style.display = hasMotor ? "block" : "none";
  totalHoursField.style.display = hasMotor ? "block" : "none";
  dailyUsageField.style.display = hasMotor ? "block" : "none";
  fuelField.style.display = hasMotor ? "block" : "none";
  seasonField.style.display = hasMotor ? "none" : "block";
}

function calculateMaintenance() {
  const type = document.getElementById("machine-type").value;
  const model = document.getElementById("machine-model").value;
  const year = parseInt(document.getElementById("machine-year").value);
  const hoursSinceChange = parseInt(document.getElementById("machine-hours-since-change").value);
  const lastMaintenanceDateStr = document.getElementById("last-maintenance-date").value;
  const isNewSeason = document.getElementById("new-season").checked;
  const resultsBox = document.getElementById("maintenance-results");

  // Coleta dos dados para a etiqueta também
  const totalHours = document.getElementById("machine-total-hours").value;
  const dailyUsage = document.getElementById("machine-daily-usage").value;
  const oil = document.getElementById("oil-type").value;
  const fuel = document.getElementById("fuel-type").value;

  if (!model || !lastMaintenanceDateStr) {
    resultsBox.innerHTML = `<p class="italic text-center text-gray-500">Por favor, preencha o modelo e a data da última manutenção.</p>`;
    return;
  }

  const lastMaintenanceDate = new Date(lastMaintenanceDateStr + "T00:00:00");
  const today = new Date();
  const monthsSince = (today.getFullYear() - lastMaintenanceDate.getFullYear()) * 12 + (today.getMonth() - lastMaintenanceDate.getMonth());

  let recommendation = "";
  let statusColor = "bg-green-100 text-green-800"; // Verde por padrão (OK)
  const hasMotor = !(type === "Plantadeira" || type === "Pulverizador Arrasto");

  switch (type) {
    case "Trator":
      const tractorHoursLimit = year <= 2010 ? 250 : 400;
      if (isNaN(hoursSinceChange)) {
        resultsBox.innerHTML = `<p class="italic text-center text-gray-500">Por favor, insira as horas de uso desde a última troca.</p>`;
        return;
      }
      if (hoursSinceChange >= tractorHoursLimit || monthsSince >= 6) {
        recommendation = `Troca de óleo recomendada! Atingiu ${hoursSinceChange}h (limite: ${tractorHoursLimit}h) ou ${monthsSince} meses (limite: 6).`;
        statusColor = "bg-red-100 text-red-800";
      } else {
        const remainingHours = tractorHoursLimit - hoursSinceChange;
        const nextDate = new Date(lastMaintenanceDate);
        nextDate.setMonth(nextDate.getMonth() + 6);
        recommendation = `Manutenção em dia. Próxima troca em ${remainingHours}h ou em ${nextDate.toLocaleDateString("pt-BR")}.`;
      }
      break;
    case "Colheitadeira":
      const harvesterHoursLimit = year <= 2010 ? 200 : 300;
      if (isNaN(hoursSinceChange)) {
        resultsBox.innerHTML = `<p class="italic text-center text-gray-500">Por favor, insira as horas de uso desde a última troca.</p>`;
        return;
      }
      if (hoursSinceChange >= harvesterHoursLimit || monthsSince >= 12) {
        recommendation = `Troca de óleo recomendada! Atingiu ${hoursSinceChange}h (limite: ${harvesterHoursLimit}h) ou ${monthsSince} meses (limite: 12).`;
        statusColor = "bg-red-100 text-red-800";
      } else {
        const remainingHours = harvesterHoursLimit - hoursSinceChange;
        const nextDate = new Date(lastMaintenanceDate);
        nextDate.setMonth(nextDate.getMonth() + 12);
        recommendation = `Manutenção em dia. Próxima troca em ${remainingHours}h ou em ${nextDate.toLocaleDateString("pt-BR")}.`;
      }
      break;
    case "Pulverizador Autopropelido":
      const sprayerHoursLimit = year <= 2010 ? 200 : 300;
      if (isNaN(hoursSinceChange)) {
        resultsBox.innerHTML = `<p class="italic text-center text-gray-500">Por favor, insira as horas de uso desde a última troca.</p>`;
        return;
      }
      if (hoursSinceChange >= sprayerHoursLimit || monthsSince >= 6) {
        recommendation = `Troca de óleo recomendada! Atingiu ${hoursSinceChange}h (limite: ${sprayerHoursLimit}h) ou ${monthsSince} meses (limite: 6).`;
        statusColor = "bg-red-100 text-red-800";
      } else {
        const remainingHours = sprayerHoursLimit - hoursSinceChange;
        const nextDate = new Date(lastMaintenanceDate);
        nextDate.setMonth(nextDate.getMonth() + 6);
        recommendation = `Manutenção em dia. Próxima troca em ${remainingHours}h ou em ${nextDate.toLocaleDateString("pt-BR")}.`;
      }
      break;
    case "Pulverizador Arrasto":
    case "Plantadeira":
      if (monthsSince >= 12 || isNewSeason) {
        let reason = [];
        if (monthsSince >= 12) reason.push("atingiu 12 meses");
        if (isNewSeason) reason.push("início de nova safra");
        recommendation = `Manutenção recomendada! Motivo: ${reason.join(" e ")}.`;
        statusColor = "bg-red-100 text-red-800";
      } else {
        const nextDate = new Date(lastMaintenanceDate);
        nextDate.setMonth(nextDate.getMonth() + 12);
        recommendation = `Manutenção em dia. Próxima revisão em ${nextDate.toLocaleDateString("pt-BR")} ou na próxima safra.`;
      }
      break;
  }

  // Monta o resumo das informações da máquina para exibir na tela
  let machineInfoHTML = `
        <p><strong>Máquina:</strong> ${type} - ${model} (${year || "N/A"})</p>
        <p><strong>Última Manutenção:</strong> ${lastMaintenanceDate.toLocaleDateString("pt-BR")}</p>`;

  if (hasMotor) {
    machineInfoHTML += `
            <p><strong>Tipo de Óleo:</strong> ${oil || "N/A"}</p>
            <p><strong>Combustível:</strong> ${fuel || "N/A"}</p>
            <p><strong>Horas Totais (aprox.):</strong> ${totalHours ? totalHours + "h" : "N/A"}</p>
            <p><strong>Uso Diário (aprox.):</strong> ${dailyUsage ? dailyUsage + "h" : "N/A"}</p>
            <p><strong>Horas desde a troca:</strong> ${hoursSinceChange ? hoursSinceChange + "h" : "N/A"}</p>
        `;
  }

  resultsBox.innerHTML = `
        <div class="p-3 bg-white rounded-md text-gray-800 text-sm">
            ${machineInfoHTML}
        </div>
        <div class="p-3 ${statusColor} rounded-md text-center">
            <p class="font-bold">Status da Manutenção:</p>
            <p class="text-lg font-bold">${recommendation}</p>
        </div>
    `;

  document.getElementById("print-label-btn").classList.remove("hidden");
}

function printMaintenanceLabel() {
  const type = document.getElementById("machine-type").value;
  const model = document.getElementById("machine-model").value;
  const year = document.getElementById("machine-year").value;
  const lastDate = new Date(document.getElementById("last-maintenance-date").value + "T00:00:00").toLocaleDateString("pt-BR");
  const recommendation = document.querySelector("#maintenance-results .text-lg").innerText;

  // Coleta dos dados adicionais para a etiqueta
  const oil = document.getElementById("oil-type").value;
  const fuel = document.getElementById("fuel-type").value;
  const totalHours = document.getElementById("machine-total-hours").value;
  const dailyUsage = document.getElementById("machine-daily-usage").value;
  const hoursSinceChange = document.getElementById("machine-hours-since-change").value;
  const hasMotor = !(type === "Plantadeira" || type === "Pulverizador Arrasto");

  const labelWindow = window.open("", "PRINT", "height=500,width=600");
  labelWindow.document.write("<html><head><title>Etiqueta de Manutenção</title>");
  labelWindow.document.write(
    "<style>body { font-family: sans-serif; padding: 10px; border: 2px dashed #000; } h2, p { margin: 5px 0; } .details { font-size: 0.9em; }</style>"
  );
  labelWindow.document.write("</head><body>");
  labelWindow.document.write(`<h2>Manutenção - ${type}</h2>`);
  labelWindow.document.write(`<p><strong>Modelo:</strong> ${model} (${year || "N/A"})</p>`);
  labelWindow.document.write(`<p><strong>Última Manutenção:</strong> ${lastDate}</p>`);
  labelWindow.document.write('<hr class="my-2">');

  if (hasMotor) {
    labelWindow.document.write(`<div class="details">`);
    labelWindow.document.write(`<p><strong>Tipo de Óleo:</strong> ${oil || "N/A"}</p>`);
    labelWindow.document.write(`<p><strong>Combustível:</strong> ${fuel || "N/A"}</p>`);
    labelWindow.document.write(`<p><strong>Horas Totais (aprox.):</strong> ${totalHours ? totalHours + "h" : "N/A"}</p>`);
    labelWindow.document.write(`<p><strong>Uso Diário (aprox.):</strong> ${dailyUsage ? dailyUsage + "h" : "N/A"}</p>`);
    labelWindow.document.write(`<p><strong>Horas desde a troca:</strong> ${hoursSinceChange ? hoursSinceChange + "h" : "N/A"}</p>`);
    labelWindow.document.write(`</div><hr class="my-2">`);
  }

  labelWindow.document.write(`<p style="font-size: 1.2em;"><strong>Recomendação:</strong><br>${recommendation}</p>`);
  labelWindow.document.write(`<p><small>Etiqueta gerada em: ${new Date().toLocaleDateString("pt-BR")}</small></p>`);
  labelWindow.document.write("</body></html>");

  labelWindow.document.close();
  labelWindow.focus();
  labelWindow.print();
  labelWindow.close();
}
