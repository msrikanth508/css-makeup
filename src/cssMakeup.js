import stylis from "stylis";
import uniqid from "uniqid";
import htmlTags from "./htmlTags";
import { getTheme } from "./theme";

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
  style.appendChild(
    document.createTextNode(`${stylis(className ? `.${className}` : "", css)}`)
  );

  // attach to head
  document.head.appendChild(style);
};

/**
 * CSS Makeup util to create HTML elements and add styles
 * @param {string} element
 */
const cssMakeup = element => (cssStyles, ...expressions) => {
  let css = cssStyles[0];
  let domElement = element;

  // Get theme
  const theme = getTheme();

  // Replace expressions with theme values
  try {
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
  } catch (e) {
    console.error(e);
  }

  // Create HTML element
  if (typeof element === "string") {
    switch (element) {
      case "body":
        domElement = document.body;
        break;
      case "global": {
        createStyleTag("", css);
        return null;
      }
      default:
        domElement = document.createElement(element);
        break;
    }
  } else {
    try {
      domElement = domElement.cloneNode(true);
    } catch (e) {
      console.error(e);
    }
  }

  // Generate unique class name
  const className = uniqid("style-");
  // Add to the element
  domElement.classList.add(className);
  // create style tag
  createStyleTag(className, css);
  // Return element
  return domElement;
};

// assign cssMakeup util
htmlTags.forEach(elementName => {
  cssMakeup[elementName] = cssMakeup(elementName);
});

// Global styles
cssMakeup["global"] = cssMakeup("global");

export default cssMakeup;
