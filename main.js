const defaultMaterialsDB = [
  // MARRONS (Carbono)
  {
    name: "Agulhas de pinheiro",
    type: "Marrom",
    cnRatio: 70,
    info: "Decompõem-se lentamente e podem acidificar. Use com moderação.",
    dryMatter: 0.7,
    phEffect: -0.5,
    decompTime: "Lento",
  },
  {
    name: "Bagaço de cana",
    type: "Marrom",
    cnRatio: 150,
    info: "Excelente para estrutura e aeração, mas muito rico em carbono. Use com muitos verdes.",
    dryMatter: 0.85,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Caixas de ovos de papelão",
    type: "Marrom",
    cnRatio: 300,
    info: "Fantástico para aeração. Rasgue em pedaços para criar bolsões de ar.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Casca de arroz",
    type: "Marrom",
    cnRatio: 120,
    info: "Melhora a aeração e a drenagem. Decompõe-se lentamente.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Casca de nozes/amendoim",
    type: "Marrom",
    cnRatio: 90,
    info: "Muito duras, demoram a decompor. Triture-as se possível.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Fibra de coco seco",
    type: "Marrom",
    cnRatio: 100,
    info: "Ótimo para aeração e retenção de umidade. Decompõe-se lentamente.",
    dryMatter: 0.85,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Feno velho",
    type: "Marrom",
    cnRatio: 50,
    info: "Bom material estruturante, mas pode conter sementes de ervas daninhas.",
    dryMatter: 0.85,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Filtro de café (papel)",
    type: "Marrom",
    cnRatio: 20,
    info: "Decompõe-se junto com a borra. É considerado marrom, mas tem C:N baixo.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Folhas secas",
    type: "Marrom",
    cnRatio: 60,
    info: "A base da compostagem. Triture para acelerar.",
    dryMatter: 0.85,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Galhos finos e secos",
    type: "Marrom",
    cnRatio: 100,
    info: "Perfeitos para a camada de base (drenagem). Quebre em pedaços menores.",
    dryMatter: 0.8,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Guardanapos de papel (sem cor)",
    type: "Marrom",
    cnRatio: 200,
    info: "Fonte de carbono. Evite os que estiverem engordurados.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Palha",
    type: "Marrom",
    cnRatio: 80,
    info: "Ótima para manter a pilha fofa e evitar compactação.",
    dryMatter: 0.85,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Papelão / Papel (sem tinta)",
    type: "Marrom",
    cnRatio: 350,
    info: "Excelente carbono. Rasgue em pedaços pequenos e umedeça.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Podas de arbustos (secas)",
    type: "Marrom",
    cnRatio: 60,
    info: "Material lenhoso que ajuda na estrutura e aeração da pilha.",
    dryMatter: 0.75,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Rolos de papel (higiênico/toalha)",
    type: "Marrom",
    cnRatio: 350,
    info: "Excelente fonte de carbono. Pique ou rasgue antes de adicionar.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Serragem / Aparas de madeira",
    type: "Marrom",
    cnRatio: 400,
    info: "Riquíssimo em carbono. Use em camadas finas. Evite madeira tratada.",
    dryMatter: 0.8,
    phEffect: -0.2,
    decompTime: "Lento",
  },
  // VERDES (Nitrogênio)
  {
    name: "Aparas de grama (verde)",
    type: "Verde",
    cnRatio: 19,
    info: "Fonte poderosa de nitrogênio. Adicione em camadas finas e misture com marrons.",
    dryMatter: 0.2,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Borra de café",
    type: "Verde",
    cnRatio: 20,
    info: "Rica em nitrogênio e amada pelas minhocas. Levemente ácida.",
    dryMatter: 0.3,
    phEffect: -0.2,
    decompTime: "Rápido",
  },
  {
    name: "Cabelo / Pêlos de animais",
    type: "Verde",
    cnRatio: 12,
    info: "Nitrogênio de liberação lenta. Espalhe bem para não formar tufos.",
    dryMatter: 0.9,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Casca de abacate",
    type: "Verde",
    cnRatio: 35,
    info: "É dura e se decompõe lentamente. Pique em pedaços bem pequenos para ajudar no processo.",
    dryMatter: 0.2,
    phEffect: 0,
    decompTime: "Lento",
  },
  {
    name: "Casca de abóbora/abobrinha",
    type: "Verde",
    cnRatio: 15,
    info: "Ricas em água e nutrientes. Pique para acelerar a decomposição.",
    dryMatter: 0.1,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de banana",
    type: "Verde",
    cnRatio: 25,
    info: "Excelente fonte de potássio. Pique bem para acelerar.",
    dryMatter: 0.12,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de batata/doce",
    type: "Verde",
    cnRatio: 25,
    info: "Fonte de potássio. Pique bem para não brotarem na pilha.",
    dryMatter: 0.2,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de cenoura",
    type: "Verde",
    cnRatio: 18,
    info: "Decompõe-se rapidamente e adiciona umidade e nutrientes.",
    dryMatter: 0.12,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de chuchu/pepino",
    type: "Verde",
    cnRatio: 14,
    info: "Altíssimo teor de água. Ótimas para umedecer a pilha.",
    dryMatter: 0.05,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de frutas cítricas (pouco)",
    type: "Verde",
    cnRatio: 35,
    info: "Use com moderação, pois podem ser ácidas e contêm óleos que retardam a decomposição.",
    dryMatter: 0.15,
    phEffect: -1.0,
    decompTime: "Médio",
  },
  {
    name: "Casca de mamão/manga",
    type: "Verde",
    cnRatio: 20,
    info: "Ricas em açúcares, aceleram a atividade microbiana.",
    dryMatter: 0.15,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Casca de mandioca",
    type: "Verde",
    cnRatio: 40,
    info: "Rica em amido, mas fibrosa. Pique em pedaços bem pequenos para acelerar a decomposição.",
    dryMatter: 0.25,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Casca de maracujá",
    type: "Verde",
    cnRatio: 25,
    info: "Rica em fibras e umidade. Pique bem para evitar que vire uma massa compacta.",
    dryMatter: 0.15,
    phEffect: -0.3,
    decompTime: "Médio",
  },
  {
    name: "Casca de melão / Melancia",
    type: "Verde",
    cnRatio: 15,
    info: "Muito ricas em água. Corte em pedaços para não atrair muitas moscas.",
    dryMatter: 0.08,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Erva-mate usada",
    type: "Verde",
    cnRatio: 22,
    info: "Ótima fonte de nitrogênio, similar às folhas de chá.",
    dryMatter: 0.25,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Ervas daninhas (sem sementes)",
    type: "Verde",
    cnRatio: 30,
    info: "Ótima fonte de nutrientes. Adicione antes de formarem sementes.",
    dryMatter: 0.15,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Esterco de coelho",
    type: "Verde",
    cnRatio: 12,
    info: "Excelente ativador, rico em N e P. Pode ser usado com mais segurança que o de galinha.",
    dryMatter: 0.3,
    phEffect: 0,
    keywords: ["cocô", "bosta", "merda"],
    decompTime: "Médio",
  },
  {
    name: "Esterco de galinha (curtido)",
    type: "Verde",
    cnRatio: 7,
    info: 'Extremamente rico. Use com moderação para não "queimar" a pilha.',
    dryMatter: 0.35,
    phEffect: 0.5,
    keywords: ["cocô", "bosta", "merda"],
    decompTime: "Médio",
  },
  {
    name: "Esterco de gado/cavalo",
    type: "Verde",
    cnRatio: 20,
    info: "Ativador mais balanceado. Ótimo para iniciar o aquecimento.",
    dryMatter: 0.25,
    phEffect: 0,
    keywords: ["cocô", "bosta", "merda"],
    decompTime: "Médio",
  },
  {
    name: "Flores murchas",
    type: "Verde",
    cnRatio: 30,
    info: "Adicionam nitrogênio e se decompõem facilmente.",
    dryMatter: 0.2,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Folhas de alface / Couve / Repolho",
    type: "Verde",
    cnRatio: 12,
    info: "Ricas em nitrogênio e água. Ótimas para ativar a pilha.",
    dryMatter: 0.05,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Folhas de chá (soltas)",
    type: "Verde",
    cnRatio: 22,
    info: "Boa fonte de nitrogênio e taninos benéficos.",
    dryMatter: 0.25,
    phEffect: -0.2,
    decompTime: "Rápido",
  },
  {
    name: "Grãos crus (feijão, arroz)",
    type: "Verde",
    cnRatio: 15,
    info: "Fonte de N e minerais. Podem atrair roedores, então enterre bem no meio da pilha.",
    dryMatter: 0.88,
    phEffect: 0,
    decompTime: "Médio",
  },
  {
    name: "Miolo / Casca de maçã",
    type: "Verde",
    cnRatio: 20,
    info: "Adicionam umidade e açúcares que alimentam os microrganismos.",
    dryMatter: 0.15,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Restos de pão / Grãos cozidos",
    type: "Verde",
    cnRatio: 17,
    info: "Use com muita moderação. Podem atrair pragas e criar uma massa compacta.",
    dryMatter: 0.4,
    phEffect: 0,
    decompTime: "Rápido",
  },
  {
    name: "Restos de tomate/pimentão",
    type: "Verde",
    cnRatio: 16,
    info: "Boa fonte de nutrientes. Remova as sementes se não quiser que germinem.",
    dryMatter: 0.08,
    phEffect: -0.2,
    decompTime: "Rápido",
  },
  {
    name: "Sacos de chá (sem plástico)",
    type: "Verde",
    cnRatio: 25,
    info: "Fácil de compostar. Verifique se o saquinho não contém plástico.",
    dryMatter: 0.25,
    phEffect: -0.2,
    decompTime: "Rápido",
  },
  {
    name: "Talos de brócolis / Couve-flor",
    type: "Verde",
    cnRatio: 20,
    info: "Decompõem-se mais lentamente. Pique em pedaços bem pequenos.",
    dryMatter: 0.1,
    phEffect: 0,
    decompTime: "Médio",
  },
  // NEUTROS (Funções Específicas)
  {
    name: "Biochar / Carvão ativado",
    type: "Neutro",
    cnRatio: 150,
    info: "Não adiciona muitos nutrientes, mas melhora a estrutura, aeração e retenção de água. Use pouco.",
    dryMatter: 0.95,
    phEffect: 0.5,
    decompTime: "Lento",
  },
  {
    name: "Casca de ovo (triturada)",
    type: "Neutro",
    cnRatio: 15,
    info: "Fonte de cálcio de liberação lenta. Triture até virar pó para ser eficaz.",
    dryMatter: 0.95,
    phEffect: 1.0,
    decompTime: "Lento",
  },
  {
    name: "Cinzas de madeira (pouco)",
    type: "Neutro",
    cnRatio: 25,
    info: "Rica em potássio e cálcio, mas é alcalina. Use uma camada muito fina.",
    dryMatter: 1.0,
    phEffect: 2.5,
    decompTime: "Rápido",
  },
  {
    name: "Pó de rocha",
    type: "Neutro",
    cnRatio: 0,
    info: "Não tem C ou N, mas adiciona uma vasta gama de minerais e micronutrientes ao composto final.",
    dryMatter: 1.0,
    phEffect: 0.2,
    decompTime: "Lento",
  },
  {
    name: "Terra de jardim (um punhado)",
    type: "Neutro",
    cnRatio: 10,
    info: 'Funciona como um "inoculante", adicionando microrganismos benéficos para acelerar o processo.',
    dryMatter: 0.7,
    phEffect: 0,
    decompTime: "Rápido",
  },
];

let materialsDB = [...defaultMaterialsDB];
let materialRowCount = 0;
let currentUnit = "kg";
let lastCalculatedCNRatio = 0;

function changeTab(tabName) {
  document.getElementById("content-compost-calculator").classList.toggle("hidden", tabName !== "compost-calculator");
  document.getElementById("tab-compost-calculator").classList.toggle("active", tabName === "compost-calculator");
  document.getElementById("content-ph-calculator").classList.toggle("hidden", tabName !== "ph-calculator");
  document.getElementById("tab-ph-calculator").classList.toggle("active", tabName === "ph-calculator");
  document.getElementById("content-database").classList.toggle("hidden", tabName !== "database");
  document.getElementById("tab-database").classList.toggle("active", tabName === "database");
  document.getElementById("content-maintenance-calculator").classList.toggle("hidden", tabName !== "maintenance-calculator");
  document.getElementById("tab-maintenance-calculator").classList.toggle("active", tabName === "maintenance-calculator");
}

document.addEventListener("click", function (event) {
  const searchContainers = document.querySelectorAll(".search-input");
  let isClickInside = false;
  searchContainers.forEach((container) => {
    if (container.contains(event.target) || container.nextElementSibling.contains(event.target)) {
      isClickInside = true;
    }
  });

  if (!isClickInside) {
    document.querySelectorAll(".search-results").forEach((results) => {
      results.classList.add("hidden");
    });
  }
});

window.onload = () => {
  const customMaterials = JSON.parse(localStorage.getItem("customMaterialsDB")) || [];
  customMaterials.forEach((customMat) => {
    const existingIndex = materialsDB.findIndex((dbMat) => dbMat.name === customMat.name);
    if (existingIndex > -1) {
      materialsDB[existingIndex] = customMat;
    } else {
      materialsDB.push(customMat);
    }
  });

  addMaterialRow();
  addMaterialRow();
  addMaterialRow();
  changeUnit("kg");
  populateDatabaseTable();
};
