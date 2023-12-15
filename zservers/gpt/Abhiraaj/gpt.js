const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 8083;

app.use(bodyParser.json());
app.use(cors());

const genPrompt = (tenderInfo) => {
  return (
    "Given tender information:" +
    tenderInfo +
    " \n, and categories that this tender must belong to (at least one and up to 5) \n Here are the categories: FeasibilityStudies ElectricalMaintenance InfrastructureMaintenance SecurityInfrastructureConstruction ResidentialConstruction CivilAndHydroMechanicalWorks SupplyAndEquipmentProcurement MultifunctionalEquipmentSupply RailAndCableProcurement WaterPurificationSystemProcurement CarAndTaxiHiringServices FloorCoatingAndPaintingService GabionWallConstruction RenovationAndModernization SurveyAndTopographicalServices \n m respond only with a json object {categories:[CategoryA,CategoryB,...]}"
  );
};

async function generateChatGPTResponse(prompt) {
  const apiKey = "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"; // Replace with your actual OpenAI API key

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].text.trim();
    return generatedResponse;
  } catch (error) {
    console.error(
      "Error generating response:",
      error.response ? error.response.data : error.message
    );
    return "Error generating response";
  }
}

app.post("/tender-info", async (req, res) => {
  const tenderInfo = req.body.tenderInfo;

  try {
    const gptOutput = await generateChatGPTResponse(genPrompt(tenderInfo));
    res.json({ categories: gptOutput });
  } catch (error) {
    console.error("Error processing tender info:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
