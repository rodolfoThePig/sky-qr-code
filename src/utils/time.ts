
export const debounce = (timeout, duration: number, func: () => void) => {
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