//#region jest setup
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const indexFile = fs.readFileSync(path.join(__dirname, "./index.html"), {
  encoding: "utf-8"
});

let window;
let document;
let virtualDOM;

beforeEach(() => {
  const resourceLoader = new jsdom.ResourceLoader({
    userAgent: "jsDom"
  });

  virtualDOM = new jsdom.JSDOM(indexFile, {
    runScripts: "dangerously",
    resources: resourceLoader
  });

  window = virtualDOM.window;
  document = window.document;
});

//#endregion

const {
  getByPlaceholderText,
  getByLabelText,
  getByText
} = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;

describe("Todo App", () => {
  test("Should reject empty input", () => {
    expect(getByPlaceholderText(document, "Add a Todo")).not.toBeNull();
  });
});
