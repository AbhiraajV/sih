const fs = require("fs");
const { OpenAI } = require("openai");

let API_KEY = "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";
const openai = new OpenAI({
  apiKey: API_KEY,
});

async function gpt_call(userInput) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userInput }],
      model: 'gpt-3.5-turbo',
      stream: true,
    });

    let full = '';
    for await (const part of completion) {
      let text = part.choices[0].delta.content ?? '';
      full += text;
    }

    // Output the final result
    console.log("Output:", full);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Fixed file paths
const classificationFilePath = "K:/SIH 2023/sih/zservers/Gpt2/classification_test_data.txt";
const dataExtractionFilePath = "K:/SIH 2023/sih/zservers/Gpt2/extraction_test_data.txt";

// Read input from the classification text file
fs.readFile(classificationFilePath, "utf8", (err, classificationData) => {
  if (err) {
    console.error("Error reading the classification file:", err);
    return;
  }

  // Perform OpenAI API call for Classification
  gpt_call(classificationData);
});

// Read input from the data extraction text file
fs.readFile(dataExtractionFilePath, "utf8", (err, dataExtractionData) => {
  if (err) {
    console.error("Error reading the data extraction file:", err);
    return;
  }

  // Perform OpenAI API call for Data Extraction
  gpt_call(dataExtractionData);
});
