function calculatePhCorrection() {
  const currentPh = parseFloat(document.getElementById("current-ph").value);
  const desiredPh = parseFloat(document.getElementById("desired-ph").value);
  const resultBox = document.getElementById("ph-correction-result");

  if (isNaN(currentPh) || isNaN(desiredPh)) {
    resultBox.innerHTML = `<p class="italic text-gray-500">Por favor, insira valores válidos.</p>`;
    return;
  }

  const difference = desiredPh - currentPh;

  if (Math.abs(difference) < 0.2) {
    resultBox.innerHTML = `<p><strong class="text-green-700">O pH está ideal!</strong> Não é necessária nenhuma grande correção. Mantenha o bom trabalho adicionando matéria orgânica (composto) regularmente.</p>`;
  } else if (difference > 0) {
    resultBox.innerHTML = `<p><strong class="text-blue-700">O solo está ácido. Para aumentar o pH:</strong></p>
              <ul class="list-disc list-inside mt-2 text-sm">
                <li>Adicione <strong>calcário dolomítico</strong> ou <strong>calcário calcítico</strong>. É a forma mais comum e segura.</li>
                <li>Incorpore <strong>cinzas de madeira</strong> (com muita moderação, pois é forte).</li>
                <li>Use um composto mais alcalino, com <strong>cascas de ovo</strong> bem trituradas.</li>
              </ul>`;
  } else {
    resultBox.innerHTML = `<p><strong class="text-orange-700">O solo está alcalino. Para diminuir o pH:</strong></p>
              <ul class="list-disc list-inside mt-2 text-sm">
                <li>Incorpore <strong>enxofre elementar</strong> (disponível em lojas de jardinagem).</li>
                <li>Adicione matéria orgânica ácida, como <strong>agulhas de pinheiro</strong> ou <strong>serragem</strong> (use com moderação).</li>
                <li>Use um composto mais ácido, com borra de café e cascas de frutas cítricas.</li>
              </ul>`;
  }
}

function calculatePhMix() {
  const soilPh = parseFloat(document.getElementById("soil-ph").value);
  const compostPh = parseFloat(document.getElementById("compost-ph").value);
  const resultBox = document.getElementById("ph-mix-result");

  if (isNaN(soilPh) || isNaN(compostPh)) {
    resultBox.innerHTML = `<p class="text-3xl font-bold text-gray-500">--</p>`;
    return;
  }

  const finalPh = (soilPh * 3 + compostPh * 1) / 4;

  resultBox.innerHTML = `<p class="text-3xl font-bold text-gray-800">~${finalPh.toFixed(1)}</p>`;
}
