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
  name: 'get_stuff',
  description: 'use this to get the weather',
  parameters: z.object({}),
}

// run the llm agent
const response = runAgent({ userMessage, tools: [weatherTool] })

console.log(response)