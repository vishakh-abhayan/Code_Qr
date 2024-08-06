const generateButton = document.getElementById("generate-button");
const downloadButton = document.getElementById("download-button");
const inputField = document.getElementById("text-input");
const inputWarning = document.getElementById("input-warning");
const qrCode = new QRCode(document.getElementById("qr-code"), {
  width: 300,
  height: 300,
});

generateButton.addEventListener("click", () => {
  const textInput = inputField.value;
  if (textInput.length < 15) {
    inputWarning.textContent = "Invalid input";
    return;
  } else {
    inputWarning.textContent = "";
  }
  qrCode.clear();
  qrCode.makeCode(textInput);
  downloadButton.style.display = "block";
});

downloadButton.addEventListener("click", (e) => {
  e.preventDefault();
  const qrCodeImg = document
    .getElementById("qr-code")
    .getElementsByTagName("img")[0];
  const qrCodeDataUrl = qrCodeImg.src;

  // Create a temporary anchor element
  const tempLink = document.createElement("a");
  tempLink.href = qrCodeDataUrl;
  tempLink.download = "qrcode.png";

  // Programmatically click the link to trigger the download
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);

  // For iOS devices
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    window.open(qrCodeDataUrl);
  }
});
