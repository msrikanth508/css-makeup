
import "prismjs/themes/prism.css";
import "./styles.css";
import cssMakeup, { setTheme } from "css-makeup";
import 'prismjs';
import createExamples from './example';

const theme = {
  spaces: [0, 4, 8, 12, 16, 20, 24, 28, 32],
  colors: {
    primary: "#009688",
  },
  fontSizes: {
    s: 12,
    m: 16,
    l: 20,
    xl: 24
  }
};

// set application Theme
setTheme(theme);

// set Global styles
cssMakeup.global`
  * {
    box-sizing: border-box;
  }
`;

// Set body styles
cssMakeup.body`
  font-family: sans-serif;
  background-color: #fff;
  padding: 0;
  margin: 0;
  font-size: 16px;
`;

const header = cssMakeup.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  background: ${theme => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contentContainer = cssMakeup.section`
  max-width: 1080px;
  margin: 60px auto 20px;
  padding: 20px 10px;
`;

const btn = cssMakeup.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 10px 20px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    border: 2px solid tomato;
    cursor: pointer;
  }
`;
btn.value = "Normal Button";

const TomatoButton = cssMakeup(btn)`
  color: tomato;
  border-color: tomato;
`;
TomatoButton.value = "Tomato Button";


const p = cssMakeup.p`
  color: ${theme => theme.colors.primary};
  font-size: ${theme => `${theme.fontSizes.l}px`};
  padding: ${theme => `${theme.spaces[5]}px`};
    &::first-letter {
      color: tomato;
      text-transform: uppercase;
      font-size: ${theme => `${theme.fontSizes.xl}px`};
    }
`;
p.innerText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

const Extended = cssMakeup.div`
  display: flex;
  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

Extended.appendChild(btn.cloneNode(true));
Extended.appendChild(TomatoButton);

const examples = [
  {
    title: "Global styles",
    preview: null,
    desc: 'Add styles to entire page, this will create style tag and add styles dynamically.'
  },
  {
    title: "Body",
    preview: null,
    desc: 'Add styles HTML body tag.',
  },
  {
    title: "Paragraph",
    preview: p,
    desc: 'Paragraph styles.',
  },
  {
    title: "Button",
    preview: btn,
    desc: 'Button styles.',
  },
  {
    title: "Extended Button",
    preview: Extended,
    desc: `Why can't we just reuse existing code? Extend from existing elements.`,
  },
];

const app = document.getElementById('app');

const title = cssMakeup.h3`
  text-align: center;
  
`;
title.innerText = 'css-makeup';

const githubLogo = cssMakeup.a`
  text-decoration: none;
  position: absolute;
  right: 10px;
  color: #fff;
  &:hover {
    text-decoration: underline;
    color: black;
  }
`;
githubLogo.setAttribute('href', 'https://github.com/msrikanth508/css-makeup');
githubLogo.innerText = 'GitHub';
githubLogo.target = "_blank";
header.appendChild(title);
header.appendChild(githubLogo);

app.appendChild(header);
app.appendChild(contentContainer);

createExamples(contentContainer, examples);