import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("api key is : ",process.env.OPENAI_API_KEY )
const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write me list of sickness associated with the symptoms provided. Make sure the disease / sickness goes in-depth and shows that the symptom is connected to the ailment.
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 350,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "what are possible sicknesses associated with the following symptoms; headache, shoulder pain, toenails pain, fingernail \n\nPossible sickness associated with the symptoms include:\n1. Migraine\n2. Fibromyalgia\n3. Arthritis\n4. Tendonitis\n5. Gout\n6. Psoriatic Arthritis\n7. Carpal Tunnel Syndrome\n8. Bursitis",
  temperature: 0.7,
  max_tokens: 300,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});