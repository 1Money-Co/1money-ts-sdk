import { logger } from './logger';

export const clipboard = async (text: string | number): Promise<boolean> => {
  // Handle invalid cases
  if (typeof window === 'undefined' || typeof text === 'undefined' || String(text) === 'null') {
    return Promise.resolve(false);
  }
  
  const textValue = String(text);
  let succeeded = false;

  // Try the modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textValue);
      succeeded = true;
    } catch (err) {
      // Fall back to the legacy approach
      succeeded = fallbackCopyToClipboard(textValue);
    }
  } else {
    // Use fallback for non-secure contexts or older browsers
    succeeded = fallbackCopyToClipboard(textValue);
  }

  return Promise.resolve(succeeded);
};

// Legacy fallback method using execCommand
const fallbackCopyToClipboard = (text: string): boolean => {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  const fakeElem = document.createElement('textarea');
  
  // Set textarea styles
  Object.assign(fakeElem.style, {
    fontSize: '12pt',
    border: '0',
    padding: '0',
    margin: '0',
    position: 'absolute',
    [isRTL ? 'right' : 'left']: '-9999px',
    top: `${window.scrollY || document.documentElement.scrollTop}px`,
  });

  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;
  document.body.appendChild(fakeElem);

  // Select text
  fakeElem.select();
  fakeElem.setSelectionRange(0, text.length);

  let succeeded = false;
  try {
    succeeded = document.execCommand('copy');
  } catch (error) {
    logger.warn('Copy to clipboard failed:', error);
  }

  // Clean up
  const selection = window.getSelection();
  selection?.removeAllRanges();
  document.body.removeChild(fakeElem);

  return succeeded;
};

export default clipboard;