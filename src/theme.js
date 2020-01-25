let theme = {};

/**
 * Deepcopy
 * @param {object} src
 */
const deepCopy = src => {
  let dest = {};

  for (let prop in src) {
    if (Object.prototype.toString.call(src[prop]) === "[object Object]") {
      dest[prop] = deepCopy(src[prop]);
    } else {
      dest[prop] = src[prop];
    }
  }

  return dest;
};

/**
 * set application theme
 * @param {object} themeObj
 */
export const setTheme = themeObj => {
  if (Object.prototype.toString.call(themeObj) === "[object Object]") {
    theme = deepCopy(themeObj);
  } else {
    throw TypeError("theme should be object");
  }
};

/**
 * Get theme value
 */
export const getTheme = () => theme;
