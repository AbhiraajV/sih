const express = require("express");
const axios = require("axios");

const cors = require("cors");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 8081;
app.use(cors());
app.use(express.json());

// PDF extraction function
const extractPdfData = async (pdfLink, maxPages = 2) => {
  try {
    console.log("Downloading PDF...");
    // Download PDF from the link
    const { data: pdfBuffer } = await axios.get(pdfLink, {
      responseType: "arraybuffer",
    });
    console.log({ pdfBuffer });

    // Parse PDF data
    const options = {
      pagerender: render_page,
      max: maxPages,
    };
    console.log("Parsing PDF data...");
    const data = await pdfParse(pdfBuffer, options);

    return data.text;
  } catch (error) {
    throw new Error(`Error extracting data from PDF: ${error.message}`);
  }
};

// PDF rendering function for extracting text
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

// Express route to handle PDF extraction from a link
app.post("/extract-pdf", async (req, res) => {
  try {
    const { pdfLink } = req.body;
    console.log({ pdfLink });
    if (!pdfLink) {
      return res
        .status(400)
        .json({ error: "Missing 'pdfLink' in the request body" });
    }

    const extractedText = await extractPdfData(pdfLink);
    axios
      .post("http://localhost:8083/tender-info", { tenderInfo: extractedText })
      .then((res) => console.log(res));
    res.json({ res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
