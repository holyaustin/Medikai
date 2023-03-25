import { Configuration, OpenAIApi } from 'openai';
console.log("Process api key is : ", process.env.OPENAI_API_KEY )
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("api key is : ",process.env.OPENAI_API_KEY )
const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me research topics in Computer Science with the topic area below. Please make sure the topics goes in-depth and shows that the topics are recent and novel.
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;