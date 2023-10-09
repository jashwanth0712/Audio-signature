const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  app.use(express.json());

  app.post("/", async (req, res) => {
    try {
      var prompt = req.body.prompt; // You can pass the prompt as a JSON object in the request body
      console.log(prompt);
     const rules="ih hrllo gm"
     prompt=prompt+rules

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt,
      });
  
      res.json(completion);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  app.get("/", (req, res) => {
    res.send("Hi i am working");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });