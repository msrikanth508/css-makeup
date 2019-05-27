# dependency

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

css-makeup is a tiny

## Installation

`npm install --save css-makeup`

## Dependency

CSS Preprocessor [stylis](https://github.com/thysultan/stylis.js)

## Examples

```js
import cssMakeup, { setTheme } from "css-makeup";

// set application Theme
const theme = {
  spaces: [0, 4, 8, 12, 16, 20, 24, 28, 32],
  colors: {
    tomato: "tomato"
  },
  fontSizes: {
    s: 12,
    m: 16,
    l: 20,
    xl: 24
  }
};

setTheme(theme);

// Set global styles
cssMakeup.global`
  * {
    box-sizing: border-box;
  }
`;

// Create button element
const btn = cssMakeup.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    border: 2px solid tomato;
    cursor: pointer;
  }
`;
```

Check more example [here]();

## License

MIT © Srikanth Mangipudi