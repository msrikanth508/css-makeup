import cssMakeup, { setTheme, getTheme } from "../src";

describe("cssMakeup test.", () => {
  afterEach(() => {
    if (document.styleSheets) {
      for (let prop in document.styleSheets) {
        delete document.styleSheets[prop];
      }
    }
    document.body.innerHTML = "";
    // [].prototype.slice.call(document.styleSheets).
  });

  it("should set theme value", () => {
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
    // set application Theme
    setTheme(theme);
    expect(getTheme()).toMatchObject(theme);
  });

  it("should create style tag with class name", () => {
    const p = cssMakeup.p`
      color: ${theme => theme.colors.tomato};
      border: 1px solid #c4c4c4;
      font-size: ${theme => `${theme.fontSizes.l}px`};
      padding: ${theme => `${theme.spaces[5]}px`};
        &::first-letter {
          color: black;
          text-transform: uppercase;
          font-size: ${theme => `${theme.fontSizes.xl}px`};
        }
    `;
    p.innerText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`;
    document.body.appendChild(p);

    const [className] = p.classList;
    expect(className).toContain("style-");
    expect(p.innerText).toBe(
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`
    );

    const [first] = document.styleSheets;
    expect(first.cssRules[0].selectorText).toBe(`.${className}`);
  });

  it("should create button", () => {
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

    btn.value = "Normal Button";
    document.body.appendChild(btn);

    const [className] = btn.classList;
    expect(className).toContain("style-");

    const [first] = document.styleSheets;
    const css = first.cssRules[0].style.cssText;
    expect(css).toBe(
      `color: palevioletred; font-size: 1em; margin: 1em; padding: 0.25em 1em; border: 2px solid palevioletred; border-radius: 3px;`
    );
    expect(first.cssRules[0].selectorText).toBe(`.${className}`);
  });

  it("should extend styles", () => {
    const color = "tomoto";
    const btn = cssMakeup.button`
      color: palevioletred;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
      &:hover {
        border: 2px solid ${color};
        cursor: pointer;
      }
    `;

    const TomatoButton = cssMakeup(btn)`
      color: tomato;
      border-color: tomato;
    `;
    TomatoButton.value = "Normal Button";
    document.body.appendChild(TomatoButton);

    const [className1, className2] = TomatoButton.classList;
    expect(className1).toContain("style-");
    expect(className2).toContain("style-");
  });

  it("should throw error", () => {
    const t = () => setTheme("");
    expect(t).toThrow(TypeError);
  });

  it("should add global styles", () => {
    cssMakeup.global`
      * {
        box-sizing: border-box;
      }
    `;

    const [first] = document.styleSheets;
    const css = first.cssRules[0].style.cssText;
    expect(css).toBe("box-sizing: border-box;");
  });

  it("should add body styles", () => {
    cssMakeup.body`
      background: #cdcdcd;
    `;
    const className = document.body.classList[0];
    expect(className).toContain("style-");
  });
});
