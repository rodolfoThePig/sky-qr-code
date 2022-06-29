import 'chota';
import './main.css';
import { paintQrCodeToCanvas, qrCodeToBlob } from './utils/qr-code';
import { downloadBlob, shareBlobImage } from './utils/blob';
import { debounce } from './utils/time';

const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
let canvasTimeout;
function updateQrCode() {
  // const input = document.querySelector('#url-input') as HTMLInputElement;
  debounce(canvasTimeout, 400, () => paintQrCodeToCanvas(input.value, canvas,));
}

const body = document.querySelector('body') as HTMLBodyElement;
body.onresize = updateQrCode;

const input = document.querySelector('#url-input') as HTMLInputElement;
input.oninput = updateQrCode;

// const installButton = document.querySelector('#button-install') as HTMLImageElement;
// installButton.onclick = async () => {
//   // todo: implement install button and manifest
// }

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

const fullscreenButton = document.querySelector('#button-fullscreen') as HTMLImageElement;
fullscreenButton.onclick = () => {
  canvas.requestFullscreen();
}