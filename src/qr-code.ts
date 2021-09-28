import { toCanvas } from 'qrcode';

export function paintQrCodeToCanvas(data: string, canvas: HTMLCanvasElement, width?: number) {
  if (!data) {
    return;
  }
  if (!width) {
    const parentRect = canvas.parentElement.getBoundingClientRect() as {
      width: number;
      height: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    width = (parentRect.width > parentRect.height) ? parentRect.height : parentRect.width;
  }
  return toCanvas(canvas, data, { margin: 0, width, errorCorrectionLevel: 'M' }, (error) => {
    if (error) { console.error(error); }
    // console.log('success!');
  });
}