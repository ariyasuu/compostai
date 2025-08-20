function getPhDescription(phEffect) {
  if (phEffect <= -0.5) return `Ácido (${phEffect.toFixed(1)})`;
  if (phEffect < 0) return `Levemente Ácido (${phEffect.toFixed(1)})`;
  if (phEffect == 0) return "Neutro (0.0)";
  if (phEffect <= 0.5) return `Levemente Alcalino (+${phEffect.toFixed(1)})`;
  if (phEffect > 0.5) return `Alcalino (+${phEffect.toFixed(1)})`;
  return "Neutro (0.0)";
}

function getMoistureDescription(dryMatter) {
  const moisture = (1 - dryMatter) * 100;
  let description = "";
  if (moisture >= 80) description = "Muito Úmido";
  else if (moisture >= 50) description = "Úmido";
  else if (moisture > 20) description = "Moderado";
  else description = "Seco";
  return `${description} (${moisture.toFixed(0)}%)`;
}

function populateDatabaseTable() {
  const tbody = document.getElementById("database-table-body");
  tbody.innerHTML = "";
  materialsDB
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((m) => {
      const row = `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${m.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${m.type}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${m.cnRatio}:1</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${getPhDescription(m.phEffect)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${getMoistureDescription(m.dryMatter)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button onclick="editMaterial('${m.name}')" class="text-indigo-600 hover:text-indigo-900">Editar</button>
                    </td>
                </tr>
              `;
      tbody.innerHTML += row;
    });
}

function downloadXLSX() {
  const dataToExport = materialsDB.map((m) => ({
    Material: m.name,
    Tipo: m.type,
    "Relação C:N": `${m.cnRatio}:1`,
    "Potencial de pH": getPhDescription(m.phEffect),
    Umidade: getMoistureDescription(m.dryMatter),
    Descrição: m.info,
    "Tempo de Decomposição": m.decompTime || "Médio",
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Materiais de Compostagem");
  XLSX.writeFile(workbook, "Compostai_Glossario_Materiais.xlsx");
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    processUploadedData(json);
  };
  reader.readAsArrayBuffer(file);
}

function processUploadedData(data) {
  const statusEl = document.getElementById("upload-status");
  try {
    let newMaterialsCount = 0;
    let updatedMaterialsCount = 0;

    data.forEach((row) => {
      const materialName = row["Material"];
      if (!materialName) return;

      const existingMaterialIndex = materialsDB.findIndex((m) => m.name === materialName);

      const parseValue = (str) => {
        if (typeof str !== "string") return str;
        const match = str.match(/-?[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      };

      const newMaterial = {
        name: materialName,
        type: row["Tipo"] || "Neutro",
        cnRatio: parseValue(row["Relação C:N"]) || 0,
        info: row["Descrição"] || "",
        dryMatter: (100 - parseValue(row["Umidade"])) / 100 || 0.5,
        phEffect: parseValue(row["Potencial de pH"]) || 0,
        decompTime: row["Tempo de Decomposição"] || "Médio",
      };

      if (existingMaterialIndex > -1) {
        materialsDB[existingMaterialIndex] = { ...materialsDB[existingMaterialIndex], ...newMaterial };
        updatedMaterialsCount++;
      } else {
        materialsDB.push(newMaterial);
        newMaterialsCount++;
      }
    });

    localStorage.setItem("customMaterialsDB", JSON.stringify(materialsDB.filter((m) => !defaultMaterialsDB.find((dm) => dm.name === m.name))));
    populateDatabaseTable();
    calculateAll();

    statusEl.innerHTML = `<p class="text-green-600 font-semibold">Planilha carregada com sucesso! ${newMaterialsCount} materiais adicionados e ${updatedMaterialsCount} atualizados.</p>`;
  } catch (error) {
    statusEl.innerHTML = `<p class="text-red-600 font-semibold">Erro ao processar a planilha. Verifique se as colunas estão no formato correto.</p>`;
    console.error("Erro ao processar XLSX:", error);
  }

  setTimeout(() => {
    statusEl.innerHTML = "";
  }, 5000);
}

function updatePhLabel(value) {
  document.getElementById("new-mat-ph-label").textContent = getPhDescription(parseFloat(value));
}

function updateMoistureLabel(value) {
  document.getElementById("new-mat-moisture-label").textContent = getMoistureDescription(1 - parseFloat(value) / 100);
}

function addCustomMaterial() {
  const newMaterial = {
    name: document.getElementById("new-mat-name").value,
    type: document.getElementById("new-mat-type").value,
    cnRatio: parseFloat(document.getElementById("new-mat-cn").value) || 0,
    phEffect: parseFloat(document.getElementById("new-mat-ph").value) || 0,
    dryMatter: 1 - parseFloat(document.getElementById("new-mat-moisture").value) / 100 || 0.5,
    decompTime: document.getElementById("new-mat-decomp").value,
    info: document.getElementById("new-mat-info").value,
  };

  if (!newMaterial.name) {
    alert("O nome do material é obrigatório.");
    return;
  }

  const existingIndex = materialsDB.findIndex((m) => m.name.toLowerCase() === newMaterial.name.toLowerCase());
  if (existingIndex > -1) {
    materialsDB[existingIndex] = newMaterial;
  } else {
    materialsDB.push(newMaterial);
  }

  const customMaterials = materialsDB.filter((m) => !defaultMaterialsDB.find((dm) => dm.name === m.name));
  localStorage.setItem("customMaterialsDB", JSON.stringify(customMaterials));

  populateDatabaseTable();
  cancelEdit(); // Limpa o formulário
  alert("Material salvo com sucesso!");
}

function editMaterial(materialName) {
  const material = materialsDB.find((m) => m.name === materialName);
  if (!material) return;

  document.getElementById("form-title").textContent = "Editando Material";
  document.getElementById("new-mat-name").value = material.name;
  document.getElementById("new-mat-name").readOnly = true;
  document.getElementById("new-mat-type").value = material.type;
  document.getElementById("new-mat-cn").value = material.cnRatio;
  document.getElementById("new-mat-ph").value = material.phEffect;
  document.getElementById("new-mat-moisture").value = (1 - material.dryMatter) * 100;
  document.getElementById("new-mat-decomp").value = material.decompTime;
  document.getElementById("new-mat-info").value = material.info;

  updatePhLabel(material.phEffect);
  updateMoistureLabel((1 - material.dryMatter) * 100);

  const formButtons = document.getElementById("form-buttons");
  formButtons.innerHTML = `
              <button onclick="addCustomMaterial()" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Salvar Alterações</button>
              <button onclick="cancelEdit()" class="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button>
          `;

  document.getElementById("new-mat-name").scrollIntoView({ behavior: "smooth" });
}

function cancelEdit() {
  document.getElementById("form-title").textContent = "Adicionar Material Personalizado";
  document.getElementById("new-mat-name").value = "";
  document.getElementById("new-mat-name").readOnly = false;
  document.getElementById("new-mat-cn").value = "";
  document.getElementById("new-mat-info").value = "";
  document.getElementById("new-mat-ph").value = 0;
  document.getElementById("new-mat-moisture").value = 50;
  updatePhLabel(0);
  updateMoistureLabel(50);

  const formButtons = document.getElementById("form-buttons");
  formButtons.innerHTML = `
              <button onclick="addCustomMaterial()" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Adicionar à Base de Dados</button>
          `;
}
