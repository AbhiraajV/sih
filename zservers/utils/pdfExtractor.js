const fs = require("fs");
const pdfParse = require("pdf-parse");

const DEFAULT_OPTIONS = {
  pagerender: render_page,
  max: 2,
  //   version: "v1.10.100",
};
function render_page(pageData) {
  let render_options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  };

  return pageData.getTextContent(render_options).then(function (textContent) {
    let lastY,
      text = "";
    for (let item of textContent.items) {
      if (lastY == item.transform[5] || !lastY) {
        text += item.str;
      } else {
        text += "\n" + item.str;
      }
      lastY = item.transform[5];
    }
    return text;
  });
}

async function extractPdfData(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer, DEFAULT_OPTIONS);

    return data.text;
  } catch (error) {
    throw new Error(`Error extracting data from PDF: ${error.message}`);
  }
}

// Replace 'your-pdf-file.pdf' with the actual path to your PDF file
const pdfPath = "K:/SIH 2023/sih/zservers/utils/GeM-Bidding-5622750.pdf";

extractPdfData(pdfPath, 2)
  .then((extractedText) => {
    console.log("Extracted Data:\n", extractedText);
  })
  .catch((error) => console.error(error));
