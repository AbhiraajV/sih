const express = require("express");
const axios = require("axios");
const { OpenAI } = require("openai");

const cors = require("cors");
const pdfParse = require("pdf-parse");

const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

let API_KEY = "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";
const openai = new OpenAI({
  apiKey: API_KEY,
});

async function gpt_call(userInput) {
  userInput = `first remove all words which are not in english and then extract all this 
BidEndDate (ISO-8601 Formated Date),BidStartDate (ISO-8601 Formated Date),BidNumber,Ministry,Organisation,OfficeName,Quantity,MinAvgAnTurnover (this is the minimum average anual turnover),BidderYox (required years of experience),MseExemptionOnTurnoverAndYox (return true or false if yes or no respectively if not available return false),DocumentsRequiredFromBidder (additional docs).
and covert it into json format (keep in mind I receive string and not json so format the json so that I can use JSON.parse to convert it to JSON, JSON Should be parseable please keep it mind)\n If any data is not found or is unavailable put as null\n\n ${userInput}`;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput }],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    console.log({ completion });
    let full = "";
    for await (const part of completion) {
      // console.log({ part, content: part.choices[0].delta.content });
      let text = part.choices[0].delta.content ?? "";
      full += text;
    }

    // Output the final result
    // console.log(full);
    console.log({ full });
    full = JSON.parse(full);
    console.log({ full });

    return full;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

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
    const out = await gpt_call(extractedText);
    res.json({ out });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
