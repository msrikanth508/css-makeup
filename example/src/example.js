import cssMakeup from "css-makeup";

const createExample = (root, exampleObj, pre) => {
  const { title: exampleName, preview, desc } = exampleObj;
  const description = cssMakeup.p``;
  description.innerHTML = desc;

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

  const title = cssMakeup.h3`
    margin-bottom: 0;
  `;
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
  example.appendChild(description);
  flex.appendChild(codeTag);

  if (preview) {
    previewElement.appendChild(preview);
    flex.appendChild(previewElement);
  }

  example.appendChild(flex);
  root.appendChild(example);
};

export default (contentContainer, examples) => {
  const [
    exampleTemplate,
    readmeTemplate,
    lastTemplate
  ] = document.querySelectorAll("template");
  const preTags = exampleTemplate.content.querySelectorAll("pre");
  const readMe = cssMakeup.section`
      pre {
        padding: 20px;
      }
    `;
  readMe.innerHTML = readmeTemplate.innerHTML;
  contentContainer.appendChild(readMe);

  examples.forEach((example, i) => {
    createExample(contentContainer, example, preTags[i]);
  });

  const last = cssMakeup.section``;
  last.innerHTML = lastTemplate.innerHTML;
  contentContainer.appendChild(last);
};
