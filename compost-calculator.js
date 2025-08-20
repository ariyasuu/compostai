function changeUnit(unit) {
  currentUnit = unit;
  document.getElementById("unit-parts").classList.toggle("active", unit === "parts");
  document.getElementById("unit-parts").classList.toggle("bg-gray-100", unit !== "parts");
  document.getElementById("unit-kg").classList.toggle("active", unit === "kg");
  document.getElementById("unit-kg").classList.toggle("bg-gray-100", unit !== "kg");

  const placeholderText = unit === "parts" ? "Quantidade (partes)" : "Quantidade (kg)";
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.placeholder = placeholderText;
  });
  calculateAll();
}

function calculateAll() {
  const rows = document.querySelectorAll(".material-row");
  let totalCarbon = 0;
  let totalNitrogen = 0;
  let totalPhScore = 0;
  let totalDecompScore = 0;
  let totalEffectiveQuantity = 0;
  const selectedMaterials = [];

  rows.forEach((row) => {
    const selectedMaterialName = row.dataset.materialName;
    const quantityInput = row.querySelector(".quantity-input");
    const quantity = parseFloat(quantityInput.value) || 0;

    if (quantity > 0 && selectedMaterialName) {
      const materialData = materialsDB.find((m) => m.name === selectedMaterialName);
      if (materialData) {
        let effectiveQuantity = quantity;
        if (currentUnit === "kg") {
          effectiveQuantity = quantity * materialData.dryMatter;
        }

        if (effectiveQuantity > 0) {
          const cn = materialData.cnRatio;
          totalCarbon += (effectiveQuantity * cn) / (cn + 1);
          totalNitrogen += effectiveQuantity / (cn + 1);
          totalPhScore += (materialData.phEffect || 0) * effectiveQuantity;

          let decompValue = 0;
          if (materialData.decompTime === "Rápido") decompValue = -1;
          if (materialData.decompTime === "Lento") decompValue = 1;
          totalDecompScore += decompValue * effectiveQuantity;

          totalEffectiveQuantity += effectiveQuantity;
        }
        selectedMaterials.push({ ...materialData, quantity });
      }
    }
  });

  const finalCNRatio = totalNitrogen > 0 ? totalCarbon / totalNitrogen : 0;
  lastCalculatedCNRatio = finalCNRatio;
  const averagePhEffect = totalEffectiveQuantity > 0 ? totalPhScore / totalEffectiveQuantity : 0;
  let estimatedPh = 7.0 + averagePhEffect;
  estimatedPh = Math.max(5.0, Math.min(8.5, estimatedPh));

  const averageDecompScore = totalEffectiveQuantity > 0 ? totalDecompScore / totalEffectiveQuantity : 0;

  updateResults(finalCNRatio, estimatedPh, selectedMaterials, averageDecompScore);
  updateSelectedMaterialsList(selectedMaterials);
  generateAssemblyGuide(selectedMaterials);
}

function updateResults(cnRatio, estimatedPh, selectedMaterials, decompScore) {
  const cnResultEl = document.getElementById("cn-ratio-result");
  cnResultEl.textContent = cnRatio > 0 ? `${cnRatio.toFixed(1)}:1` : "--:1";
  const phResultEl = document.getElementById("ph-result");
  phResultEl.textContent = cnRatio > 0 ? `~${estimatedPh.toFixed(1)}` : "~7.0";

  const diagnosisEl = document.getElementById("diagnosis-result");
  const currentMaterialNames = selectedMaterials.map((m) => m.name);

  if (cnRatio === 0) {
    diagnosisEl.innerHTML = "Adicione materiais para começar.";
    diagnosisEl.className = "text-lg font-semibold text-center h-12";
  } else if (cnRatio > 35) {
    const suggestions = materialsDB
      .filter((m) => m.type === "Verde" && !currentMaterialNames.includes(m.name))
      .slice(0, 2)
      .map((m) => `<strong>${m.name}</strong>`)
      .join(" ou ");
    diagnosisEl.innerHTML = `Lento! Tente adicionar 'Verdes' como: ${suggestions || "restos de cozinha"}.`;
    diagnosisEl.className = "text-lg font-semibold text-center h-12 text-yellow-200";
  } else if (cnRatio < 20) {
    const suggestions = materialsDB
      .filter((m) => m.type === "Marrom" && !currentMaterialNames.includes(m.name))
      .slice(0, 2)
      .map((m) => `<strong>${m.name}</strong>`)
      .join(" ou ");
    diagnosisEl.innerHTML = `Úmido! Tente adicionar 'Marrons' como: ${suggestions || "folhas secas"}.`;
    diagnosisEl.className = "text-lg font-semibold text-center h-12 text-orange-200";
  } else {
    diagnosisEl.innerHTML = "Equilíbrio Ideal! Ótima mistura.";
    diagnosisEl.className = "text-lg font-semibold text-center h-12 text-green-200";
  }
  const aeration = document.getElementById("aeration").value;
  const turning = document.getElementById("turning").value;
  const moisture = document.getElementById("moisture").value;
  let efficiencyScore = 0;
  let timeModifier = 0;
  if (cnRatio >= 25 && cnRatio <= 30) {
    efficiencyScore += 40;
  } else if (cnRatio > 20 && cnRatio < 35) {
    efficiencyScore += 25;
  } else {
    efficiencyScore += 10;
  }
  timeModifier += Math.abs(cnRatio - 27.5) * 2;
  if (aeration === "high") {
    efficiencyScore += 20;
    timeModifier -= 30;
  } else if (aeration === "medium") {
    efficiencyScore += 10;
    timeModifier -= 15;
  }
  if (turning === "weekly") {
    efficiencyScore += 25;
    timeModifier -= 40;
  } else if (turning === "biweekly") {
    efficiencyScore += 15;
    timeModifier -= 20;
  }
  if (moisture === "yes") {
    efficiencyScore += 15;
    timeModifier -= 15;
  }

  timeModifier += decompScore * 20;

  const finalEfficiency = cnRatio > 0 ? Math.min(100, Math.round(efficiencyScore)) : 0;
  const baseTime = 120;
  const finalTime = cnRatio > 0 ? Math.max(30, Math.round(baseTime + timeModifier)) : "--";
  document.getElementById("efficiency-bar").style.width = `${finalEfficiency}%`;
  document.getElementById("efficiency-text").textContent = `${finalEfficiency}%`;
  document.getElementById("time-result").textContent = finalTime;

  const cnPointer = document.getElementById("cn-pointer");
  if (cnRatio > 0) {
    const minRatio = 10,
      maxRatio = 50;
    const percent = ((Math.max(minRatio, Math.min(maxRatio, cnRatio)) - minRatio) / (maxRatio - minRatio)) * 100;
    cnPointer.style.left = `calc(${percent}% - 10px)`;
  } else {
    cnPointer.style.left = "calc(50% - 10px)";
  }

  const phPointer = document.getElementById("ph-pointer");
  if (cnRatio > 0) {
    const minPh = 5.0,
      maxPh = 8.5;
    const percent = ((Math.max(minPh, Math.min(maxPh, estimatedPh)) - minPh) / (maxPh - minPh)) * 100;
    phPointer.style.left = `calc(${percent}% - 10px)`;
  } else {
    phPointer.style.left = "calc(50% - 10px)";
  }
}

function updateSelectedMaterialsList(selectedMaterials) {
  const summaryBox = document.getElementById("selected-materials-summary");
  if (selectedMaterials.length === 0) {
    summaryBox.innerHTML = `<p class="italic text-gray-500">As dicas dos materiais que você escolher aparecerão aqui...</p>`;
    summaryBox.classList.add("bg-gray-100");
    summaryBox.classList.remove("bg-green-100");
    return;
  }
  summaryBox.classList.remove("bg-gray-100");
  summaryBox.classList.add("bg-green-100");
  let html = '<ul class="space-y-2 text-sm">';
  selectedMaterials.forEach((item) => {
    html += `<li><strong class="text-gray-800">${item.name}:</strong> ${item.info}</li>`;
  });
  html += "</ul>";
  summaryBox.innerHTML = html;
}

function generateAssemblyGuide(selectedMaterials) {
  const guideBox = document.getElementById("assembly-guide");
  if (selectedMaterials.length === 0) {
    guideBox.innerHTML = '<p class="text-center">Preencha os materiais para gerar seu guia.</p>';
    return;
  }
  const browns =
    selectedMaterials
      .filter((m) => m.type === "Marrom")
      .map((m) => m.name.toLowerCase())
      .join(", ") || "nenhum selecionado";
  const greens =
    selectedMaterials
      .filter((m) => m.type === "Verde")
      .map((m) => m.name.toLowerCase())
      .join(", ") || "nenhum selecionado";
  const turningFrequency = document.getElementById("turning").options[document.getElementById("turning").selectedIndex].text.toLowerCase();
  let html = '<dl class="space-y-3">';
  html += `<div><dt class="font-bold">1. A Base para Drenagem:</dt><dd class="pl-4 text-sm">Comece com uma camada de 5-10cm de galhos finos ou papelão grosso no fundo da sua composteira.</dd></div>`;
  html += `<div><dt class="font-bold">2. Montando as Camadas:</dt><dd class="pl-4 text-sm">Alterne camadas como uma lasanha: uma generosa de marrons (${browns}), depois uma mais fina de verdes (${greens}). Repita.</dd></div>`;
  html += `<div><dt class="font-bold">3. A Umidade Ideal:</dt><dd class="pl-4 text-sm">A cada duas ou três camadas, borrife água. A pilha deve ficar úmida como uma esponja torcida, sem escorrer.</dd></div>`;
  html += `<div><dt class="font-bold">4. Revirando a Pilha:</dt><dd class="pl-4 text-sm">Com uma frequência ${turningFrequency}, use um garfo para revirar a pilha, movendo o material das bordas para o centro.</dd></div>`;

  const fastDecompMaterials = selectedMaterials.filter((m) => m.decompTime === "Rápido").map((m) => m.name.toLowerCase());
  if (fastDecompMaterials.length > 0) {
    html += `<div><dt class="font-bold text-yellow-200">⭐ Dica de Mestre:</dt><dd class="pl-4 text-sm">Materiais como ${fastDecompMaterials.join(
      ", "
    )} decompõem-se rápido e perdem volume. Fique de olho para reabastecer a pilha com mais 'Verdes' e 'Marrons' para manter o processo ativo.</dd></div>`;
  }

  html += "</dl>";
  guideBox.innerHTML = html;
}

function addMaterialRow(materialName = null, quantity = null) {
  materialRowCount++;
  const container = document.getElementById("materials-container");
  const newRow = document.createElement("div");
  newRow.className = "material-row grid grid-cols-12 gap-2 mb-2 items-start";
  newRow.id = `row-${materialRowCount}`;
  newRow.dataset.materialName = materialName || "";

  const placeholderText = currentUnit === "parts" ? "Quantidade (partes)" : "Quantidade (kg)";

  const searchHTML = `
                <div class="col-span-6 relative">
                    <input type="text" placeholder="Pesquisar material..." value="${
                      materialName || ""
                    }" oninput="filterMaterials(this)" onfocus="filterMaterials(this)" class="search-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <div class="search-results hidden absolute w-full bg-white border border-gray-300 rounded-b-lg shadow-lg"></div>
                </div>
            `;
  const inputHTML = `<div class="col-span-4"><input type="number" min="0" step="0.5" value="${
    quantity || ""
  }" placeholder="${placeholderText}" oninput="calculateAll()" class="quantity-input w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></div>`;
  const buttonHTML = `<div class="col-span-2"><button onclick="removeMaterialRow(${materialRowCount})" class="w-full h-10 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300">X</button></div>`;

  newRow.innerHTML = searchHTML + inputHTML + buttonHTML;
  container.appendChild(newRow);
}

function clearMaterialRows() {
  const container = document.getElementById("materials-container");
  container.innerHTML = "";
  materialRowCount = 0;
}

function generateRecipe() {
  clearMaterialRows();
  const recipes = [
    [
      { name: "Folhas secas", quantity: 2 },
      { name: "Borra de café", quantity: 1 },
      { name: "Casca de banana", quantity: 1 },
      { name: "Casca de batata/doce", quantity: 1 },
      { name: "Casca de ovo (triturada)", quantity: 0.2 },
    ],
    [
      { name: "Aparas de grama (verde)", quantity: 1.5 },
      { name: "Folhas secas", quantity: 3 },
      { name: "Galhos finos e secos", quantity: 0.5 },
      { name: "Terra de jardim (um punhado)", quantity: 0.1 },
    ],
    [
      { name: "Palha", quantity: 2 },
      { name: "Esterco de gado/cavalo", quantity: 1 },
      { name: "Folhas de alface / Couve / Repolho", quantity: 1 },
      { name: "Papelão / Papel (sem tinta)", quantity: 0.2 },
    ],
  ];

  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

  randomRecipe.forEach((item) => {
    addMaterialRow(item.name, item.quantity);
  });

  calculateAll();
}

function filterMaterials(inputElement) {
  const searchTerm = inputElement.value.toLowerCase();
  const resultsContainer = inputElement.nextElementSibling;
  const parentRow = inputElement.closest(".material-row");

  resultsContainer.innerHTML = "";
  let materialsToShow;
  const currentMaterialNames = Array.from(document.querySelectorAll(".material-row"))
    .map((row) => row.dataset.materialName)
    .filter(Boolean);

  if (searchTerm.length === 0) {
    if (lastCalculatedCNRatio > 35) {
      materialsToShow = materialsDB.filter((m) => m.type === "Verde" && !currentMaterialNames.includes(m.name)).slice(0, 8);
    } else if (lastCalculatedCNRatio > 0 && lastCalculatedCNRatio < 20) {
      materialsToShow = materialsDB.filter((m) => m.type === "Marrom" && !currentMaterialNames.includes(m.name)).slice(0, 8);
    } else {
      materialsToShow = materialsDB.filter((m) => !currentMaterialNames.includes(m.name)).slice(0, 8);
    }
  } else {
    const cleanSearchTerm = searchTerm.replace(/s$/, "");
    const categories = ["verde", "marrom", "neutro"];

    materialsToShow = materialsDB.filter((m) => {
      const nameMatch = m.name.toLowerCase().includes(searchTerm);
      const typeMatch = categories.some((cat) => cat.startsWith(cleanSearchTerm)) && m.type.toLowerCase().startsWith(cleanSearchTerm);
      const keywordMatch = m.keywords && m.keywords.some((k) => k.includes(searchTerm));
      return nameMatch || typeMatch || keywordMatch;
    });
  }

  if (materialsToShow.length > 0) {
    materialsToShow.forEach((material) => {
      const item = document.createElement("div");
      item.textContent = `${material.name} (${material.type})`;
      item.className = "p-2 hover:bg-green-100 cursor-pointer";
      item.onclick = () => selectMaterial(parentRow.id, material.name);
      resultsContainer.appendChild(item);
    });
    resultsContainer.classList.remove("hidden");
  } else {
    resultsContainer.classList.add("hidden");
  }
}

function selectMaterial(rowId, materialName) {
  const row = document.getElementById(rowId);
  const searchInput = row.querySelector(".search-input");
  const resultsContainer = row.querySelector(".search-results");

  searchInput.value = materialName;
  row.dataset.materialName = materialName;
  resultsContainer.classList.add("hidden");
  calculateAll();
}

function removeMaterialRow(id) {
  const rowToRemove = document.getElementById(`row-${id}`);
  rowToRemove.remove();
  calculateAll();
}
