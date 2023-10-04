const express = require("express");
require("dotenv").config();
const {  OpenAI } = require("openai");

const app = express();

app.use(express.json());

const openai = new OpenAI({
  apiKey: "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"// This is also the default, can be omitted
});;

app.post("/find-complexity", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
      
              how are you
              ###
            `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));