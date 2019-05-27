  
import cssMakeup from "css-makeup";

const createExample = (root, exampleObj, pre) => {
  const { title: exampleName, preview } = exampleObj;
  const codeTag = cssMakeup(pre)`
    @media only screen and (min-width: 600px) {
      flex-grow: 1;
      flex-basis: 0;
    }
  `;

  const previewElement = cssMakeup.div`
    @media only screen and (min-width: 600px) {
      flex-grow: 1;
      flex-basis: 0;
    }
    background: black;
  `;

  const title = cssMakeup.h2``;
  const example = cssMakeup.section`
      display: flex;
      flex-direction: column;
    `;
  const flex = cssMakeup.section`
      display: flex;
      flex-direction: column;
      @media only screen and (min-width: 600px) {
        flex-direction: row;
      }
    `;

  title.innerText = exampleName;
  example.appendChild(title);
  flex.appendChild(codeTag);

  if (preview) {
    previewElement.appendChild(preview);
    flex.appendChild(previewElement);
  }

  example.appendChild(flex);
  root.appendChild(example);
};


export default (contentContainer, examples) => {
    const template = document.querySelector("template");
    const preTags = template.content.querySelectorAll("pre");
    
    examples.forEach((example, i) => {
      console.log(example);
      createExample(contentContainer, example, preTags[i]);
    });
};
