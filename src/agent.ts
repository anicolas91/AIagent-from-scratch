import type { AIMessage } from '../types'
import { runLLM } from './llm'
import { z } from 'zod'
//import { runTool } from './toolRunner'
import { addMessages, getMessages } from './memory'
import { logMessage, showLoader } from './ui'

// create a fcn that runs an agent with a tool given a user convo history
export const runAgent = async ({
  userMessage,
  tools
}: {
  userMessage: string,
  tools: any[]
}) => {
  // add the message to the history db
  await addMessages([
    {
      role: 'user',
      content: userMessage,
    },
  ])

  // put a message to show the agent is working on it
  const loader = showLoader('Let me think about it...')

  // retrieve the entire convo history
  const history = await getMessages()

  // run the LLM, passing all the msg history and the tool
  const response = await runLLM({
    messages: history,
    tools,
  })

  // log it so we can see it
  if (response.tool_calls){
    console.log(response.tool_calls)
  }

  // add the resulting msg to the history
  await addMessages([response])

  // log msg and stop the loading animation
  logMessage(response)
  loader.stop()

  // give back the response
  return getMessages()
}
