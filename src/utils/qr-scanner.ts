import QrScanner from 'qr-scanner';

export const initializeScanner = (onScan: (result) => void | undefined) => {
  const scannerEl = document.querySelector('#qr-code-canvas') as HTMLVideoElement;

  return new QrScanner(scannerEl, result => onScan?.(result), {
    maxScansPerSecond: 20,
  });
}