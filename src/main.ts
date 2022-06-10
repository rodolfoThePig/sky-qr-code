import 'chota';
import { paintQrCodeToCanvas } from './qr-code';

const body = document.querySelector('body') as HTMLBodyElement;
body.onresize = updateQrCode;

const input = document.querySelector('#url-input') as HTMLInputElement;
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
  // const input = document.querySelector('#url-input') as HTMLInputElement;
  const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
  debounce(canvasTimeout, 400, () => paintQrCodeToCanvas(input.value, canvas,));
}
