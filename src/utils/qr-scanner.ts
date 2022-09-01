import QrScanner from 'qr-scanner';

export const initializeScanner = (videoEl: HTMLVideoElement, onScan: (result) => void | undefined) => {
  return new QrScanner(videoEl, result => onScan?.(result), {
    maxScansPerSecond: 20,
  });
}