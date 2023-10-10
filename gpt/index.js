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

  app.post("/prompt", async (req, res) => {
    try {
      var prompt = req.body.prompt; // You can pass the prompt as a JSON object in the request body
      console.log(prompt);
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
      const completion = await openai.chat.completions.create({
        messages: [{
            role: "system",
            content: "I want you to generate a json with tag attribute based on the next message, the tag field is an array of strings containing tag names as detailed next, just return a json as an answer which has tag which is an array of strings, Don't output any code, just the json that you deduce from the message, you can use multiple tags that you deduce from the message:" +
                "tag field has the following tags: Create a new signature->newsig, check if the document is signed or not->checksig,review the unsigned documents->revunsig, get documents based on date range->filtdocdate and remind people for signature->rempeep the tag field should only contain which tag it is, ex tag:[newsig,checksig] etc"
        }, {role: "user", content: prompt}],
        model: "gpt-3.5-turbo",
    }).then((response) => {
        return JSON.parse(response.choices[0].message.content)
    });
      // const completion = await openai.completions.create({
      //   model: "gpt-3.5-turbo-instruct",
      //   prompt,
      // });
  
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
