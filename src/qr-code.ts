import { toCanvas } from 'qrcode';

export function paintQrCodeToCanvas(data: string, canvas: HTMLCanvasElement, width?: number) {
  if (!width) {
    const parentRect = canvas.parentElement.getBoundingClientRect() as {
      width: number;
      height: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    width = parentRect.width;
  }
  return toCanvas(canvas, data, { margin: 0, width, errorCorrectionLevel: 'M' }, (error) => {
    if (error) { console.error(error); }
    // console.log('success!');
  });
}