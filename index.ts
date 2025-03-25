import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'

// you get the actual user message from 'npm start xxxxxx'
const userMessage = process.argv[2]

// failsafe check, if input is empty, it will error out
if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// hardcode a tool
const weatherTool = {
  name: 'get_weather',
  description: 'use this to get the weather', // only add a couple of sentences otherwise it goes mad
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'), // to get an idea why model chose what
  })
}

// run the llm agent
const response = runAgent({ userMessage, tools: [weatherTool] })

//console.log(response)