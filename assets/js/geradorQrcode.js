function crc16ccitt(pData) {
  let wCrc = 0xffff;
  for (let i = 0; i < pData.length; i++) {
    wCrc ^= pData.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      wCrc = wCrc & 0x8000 ? (wCrc << 1) ^ 0x1021 : wCrc << 1;
    }
  }
  return wCrc & 0xffff;
}

document.getElementById("gerar").addEventListener("click", function () {
  const casas = sessionStorage.getItem('casas');
  const valor = parseFloat(sessionStorage.getItem('total'));
  const qrc = `00020126450014BR.GOV.BCB.PIX0123kellyjsborges@gmail.com520400005303986540${casas}${valor}5802BR5924Kelly Jaqueline Siqueira6011Sete Lagoas62070503***6304`;

  const crc = crc16ccitt(qrc).toString(16).toUpperCase();
  const resultado = qrc + crc;

  document.getElementById("texto").innerHTML = "";
  const resultadoElement = document.getElementById("texto");
  resultadoElement.textContent = resultado;

  console.log("Final string:", resultado);

  // Adiciona um evento de clique ao parágrafo para copiar seu conteúdo
  resultadoElement.addEventListener("click", function () {
    copiarParaAreaDeTransferencia(resultado);
  });

  // Função para copiar o texto para a área de transferência
  function copiarParaAreaDeTransferencia(texto) {
    const areaDeTransferencia = document.createElement("textarea");
    areaDeTransferencia.value = texto;
    document.body.appendChild(areaDeTransferencia);
    areaDeTransferencia.select();
    document.execCommand("copy");
    document.body.removeChild(areaDeTransferencia);
    console.log("Texto copiado para a área de transferência:", texto);
  }

  const comprovante = document.getElementById("comprovante");
  document.createElement("p");
  comprovante.textContent = "Lembre-se que para confirmar o pedido e necessário enviar o comprovante do pix e clicar no botão de 'Confirmar pagamento'.";

  const qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = '';

// Crie um novo QR Code
const qrcode = new QRCode(qrcodeContainer, {
  text: resultado,
  width: 400,
  height: 400,
});

});
