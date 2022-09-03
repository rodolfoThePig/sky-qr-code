import QrScanner from 'qr-scanner';

export const initializeScanner = (videoEl: HTMLVideoElement, onScan: (result) => void | undefined) => {
  const scanner = new QrScanner(videoEl, result => onScan?.(result), {
    maxScansPerSecond: 20,
  });

  const parentRect = videoEl.parentElement?.getBoundingClientRect() as {
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  const width = (parentRect.width > parentRect.height) ? parentRect.height : parentRect.width;
  videoEl.setAttribute('style', `width: ${width.toFixed}px`);

  return scanner;
}