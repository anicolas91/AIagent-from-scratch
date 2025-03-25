import 'dotenv/config'
import { runAgent } from './src/agent'
import { tools } from './src/tools'

// you get the actual user message from 'npm start xxxxxx'
const userMessage = process.argv[2]

// failsafe check, if input is empty, it will error out
if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// run the llm agent
const response = runAgent({ userMessage, tools})

//console.log(response)