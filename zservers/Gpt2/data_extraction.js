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

// Read input from a text file
const inputFile = "K:/SIH 2023/sih/zservers/Gpt2/test_data.txt";

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Perform OpenAI API call with the entire content of the file
  gpt_call(data);
});
