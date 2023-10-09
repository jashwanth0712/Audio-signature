const express = require("express");
const { OpenAI } = require("openai");
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
app.use(cors());
  app.use(express.json());

  app.post("/temp", async (req, res) => {
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
// List of tags
const tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"];
const Inputs = ["email","emails","name","names","phone","phones"];

app.post("/", (req, res) => {
  // Generate a random index to select a random tag from the list
  const randomIndex = Math.floor(Math.random() * tags.length);
  const randomTag = tags[randomIndex];
  const randominputIndex = Math.floor(Math.random() * tags.length);
  const randomInput=Inputs[randominputIndex]
  // Create a response object with the random tag and emails array
  const response = {
    tag: randomTag,
    input:randomInput,
    emails: ["j@gmail.com", "c@gmail.com"]
  };

  // Send the response as JSON
  res.json(response);
});

  app.get("/", (req, res) => {
    res.send("Hi i am working");
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
