import type { AIMessage } from '../types'
import { runLLM } from './llm'
import { z } from 'zod'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'

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

  // loop the system until the LLM gives back a string response
  while (true) {
    
    // retrieve the entire convo history
    const history = await getMessages()

    // run the LLM, passing all the msg history and the tool
    const response = await runLLM({
      messages: history,
      tools,
    })

    // add the resulting msg to the history and log it
    await addMessages([response])
    logMessage(response)

    // if response is a string, then log the info
    if (response.content){
      // stop the loading animation
      loader.stop()

      // give back the response
      return getMessages()
    }

    // if a tool came back, then run it
    if (response.tool_calls){
      // get the response, whether its a fcn or a string
      const toolCall = response.tool_calls[0] // if many this gets for looped
      loader.update(`executing: ${toolCall.function.name}`)

      // actually run the tool
      const toolResponse = await runTool(toolCall,userMessage)

      // save the resulting msg to the history
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`executed: ${toolCall.function.name}`)

    }

  }  
  
}
