import stylis from "stylis";
import htmlTags from "./htmlTags";

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

let styleClassCounter = 0;
let theme = {};

/**
 * Create style tag dynamically
 * @param {string} className 
 * @param {string} css 
 */
const createStyleTag = (className, css) => {
   // Create Style Tag
   const style = document.createElement("style");
   style.type = "text/css";
   // Create text node to add css content
   // style.appendChild(document.createTextNode(`.${className} { ${css} }`));
   style.appendChild(
     document.createTextNode(`${stylis(className ? `.${className}` : '', css)}`)
   );
   // attach to head
   document.head.appendChild(style);
}
/**
 * CSS Makeup util to create HTML elements and add styles
 * @param {string} element 
 */
const cssMakeup = element => {
  return (cssStyles, ...expressions) => {
    let css = cssStyles[0];
    let domElement = element;
    // Replace expressions with theme values
    if (expressions.length) {
      css = expressions
        .reduce(
          (acc, exp, position) => {
            const stylePlaceholderValue =
              typeof exp === "function" ? exp(theme) : exp;
            acc.push(stylePlaceholderValue, cssStyles[position + 1]);
            return acc;
          },
          [css]
        )
        .join("");
    }
    // Create HTML element
    if (typeof element === "string") {
      switch(element) {
        case 'body': domElement = document.body; break;
        case 'global': {
          createStyleTag('', css);
          return null;
        }
        case 'button': {
          domElement = document.createElement("input");
          domElement.type = "button";
          break;
        }
        default: domElement = document.createElement(element); break;
      }
    } else {
      domElement = domElement.cloneNode(true);
    }
    // Generate unique class name
    const className = `css_makeup89_${styleClassCounter++}`;
    // Add to the element
    domElement.classList.add(className);
    // create style tag
    createStyleTag(className, css);
    // Return element
    return domElement;
  };
};

// assign cssMakeup util
htmlTags.forEach(elementName => {
  cssMakeup[elementName] = cssMakeup(elementName);
});

// Global styles
cssMakeup['global'] = cssMakeup('global');

/**
 * set application theme
 * @param {object} themeObj 
 */
export const setTheme = themeObj => {
  if (Object.prototype.toString.call(themeObj) === "[object Object]") {
    theme = deepCopy(themeObj);
  } else {
    throw TypeError('theme should be object');
  }
};

/**
 * Get theme value
 */
export const getTheme = () => theme;

export default cssMakeup;