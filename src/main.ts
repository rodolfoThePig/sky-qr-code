import 'chota';
import './main.css';
import { paintQrCodeToCanvas, qrCodeToBlob } from './utils/qr-code';
import { downloadBlob, shareBlobImage } from './utils/blob';
import { debounce } from './utils/time';
import { initializeScanner } from './utils/qr-scanner';
import QrScanner from 'qr-scanner';

let queryParams = new URLSearchParams(location.search);
type Mode = 'generate' | 'scan';
let mode: Mode = queryParams.get('mode') as Mode || 'generate';
let scanner: QrScanner;

const updateMode = (newMode: Mode) => {
  mode = newMode;
  const generate = (mode === 'generate');
  const scan = (mode === 'scan');

  const toggleElementClass = (selector: string, enabled: boolean, className = 'hidden',) => {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) {
      if (!enabled) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }

  toggleElementClass('#mode-generate-button', !generate, 'primary');
  toggleElementClass('#mode-scan-button', !scan, 'primary');

  toggleElementClass('.input-row', generate);
  toggleElementClass('.qr-code-container', generate);
  toggleElementClass('.qr-scanner-container', scan);
  toggleElementClass('#button-download', generate);

  if (scan) {
    scanner = initializeScanner(document.querySelector('#qr-scanner-video') as HTMLVideoElement, (result) => console.log(result));
  } else {
    scanner?.stop();
    scanner?.destroy();
  }
}
updateMode(mode);

const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
let canvasTimeout;
const updateQrCode = () => {
  // const input = document.querySelector('#url-input') as HTMLInputElement;
  debounce(canvasTimeout, 400, () => paintQrCodeToCanvas(input.value, canvas,));
}

const body = document.querySelector('body') as HTMLBodyElement;
body.onresize = updateQrCode;

const input = document.querySelector('#url-input') as HTMLInputElement;
input.oninput = updateQrCode;

const modeGenerateButton = document.querySelector('#mode-generate-button') as HTMLAnchorElement;
modeGenerateButton.onclick = () => {
  updateMode('generate');
}
const modeScanButton = document.querySelector('#mode-scan-button') as HTMLAnchorElement;
modeScanButton.onclick = () => {
  updateMode('scan');
}

const githubButton = document.querySelector('#button-github') as HTMLImageElement;
githubButton.onclick = () => {
  window.open('https://github.com/rodolfoThePig/easy-qr-code');
}

const pasteButton = document.querySelector('#button-paste') as HTMLImageElement;
pasteButton.onclick = async () => {
  const clipboard = await navigator.clipboard.readText();
  if (typeof clipboard === 'string') {
    input.value = clipboard;
    updateQrCode();
  }
}

const clearButton = document.querySelector('#button-clear') as HTMLImageElement;
clearButton.onclick = () => {
  input.value = '';
  updateQrCode();
}

const copyButton = document.querySelector('#button-copy') as HTMLImageElement;
copyButton.onclick = async () => {
  const blob = await qrCodeToBlob(input.value, canvas);
  navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}

const downloadButton = document.querySelector('#button-download') as HTMLImageElement;
downloadButton.onclick = async () => {
  const blob = await qrCodeToBlob(input.value, canvas);
  downloadBlob(blob, 'Qr-code.png');
}

const shareButton = document.querySelector('#button-share') as HTMLImageElement;
shareButton.onclick = async () => {
  const blob = await qrCodeToBlob(input.value, canvas);
  shareBlobImage(blob, 'Qr-code.png')
}