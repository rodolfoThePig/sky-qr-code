import { toCanvas, toDataURL } from 'qrcode';
import { dataURItoBlob } from './blob';

export const paintQrCodeToCanvas = (data: string, canvas: HTMLCanvasElement, width?: number) => {
  if (!data) {
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    return;
  }
  if (!width) {
    const parentRect = canvas.parentElement?.getBoundingClientRect() as {
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

export const qrCodeToBlob = async (data: string, canvas: HTMLCanvasElement, width?: number) => {
  if (!data) {
    throw new Error('No data');
  }
  if (!width) {
    const parentRect = canvas.parentElement?.getBoundingClientRect() as {
      width: number;
      height: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
    width = (parentRect.width > parentRect.height) ? parentRect.height : parentRect.width;
  }
  const dataUrl = await new Promise((resolve, reject) => {
    toDataURL(canvas, data, { margin: 0, width, errorCorrectionLevel: 'M' }, (error, url) => error ? reject(error) : resolve(url));
  })
  return dataURItoBlob(dataUrl);
}
