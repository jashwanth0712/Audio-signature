// This code is for v4 of the openai package: npmjs.com/package/openai
const { OpenAI} = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
    try {
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: 'Write a poem on rabindranath tagore ,include his achievements his beliefs and his contributio towards indian something movement '
        });
  
      console.log(completion);
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  
  
  
  
  