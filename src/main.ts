import 'chota';
import { paintQrCodeToCanvas } from './qr-code';

const body: HTMLBodyElement = document.querySelector('body');
body.onresize = updateQrCode;

const input: HTMLInputElement = document.querySelector('#url-input');
input.oninput = updateQrCode;

function debounce(timeout, duration: number, func: () => void) {
  function clear() {
    clearTimeout(timeout);
    timeout = null;
  }
  if (timeout) {
    clear();
  }
  timeout = setTimeout(() => {
    clear();
    func();
  }, duration);
}

let canvasTimeout;
function updateQrCode() {
  const input: HTMLInputElement = document.querySelector('#url-input');
  const canvas: HTMLCanvasElement = document.querySelector('#qr-code-canvas');
  debounce(canvasTimeout, 400, () => paintQrCodeToCanvas(input.value, canvas,));
}
