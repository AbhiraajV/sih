const { OpenAI } = require("openai");

let API_KEY = "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";
const openai = new OpenAI({
  apiKey: API_KEY,
});

async function gpt_call(userInput) {
  userInput = `first remove all words which are not in english and then extract all this 
BidEndDate,BidStartDate,BidNumber,Ministry,Organisation,OfficeName,Quantity,MinAvgAnTurnover,BidderYox,MseExemptionOnTurnoverAndYox,DocumentsRequiredFromBidder,TenderInformation,TenderInformationDoc.
and covert it into json format \n\n ${userInput}`;
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
    console.log("Output:", full);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
