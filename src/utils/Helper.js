export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};