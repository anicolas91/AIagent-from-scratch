import type { AIMessage } from '../types'
import { openai } from './ai'
import { zodFunction } from 'openai/helpers/zod'

// this basically sets up the LLM function, where it sets the inputs
// for the openAI query, sets the var type for all 3 inputs,
// and chucks that into a response objct it seems
export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction) // openai list of tools

  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    tools : formattedTools,
    tool_choice : 'auto',
    parallel_tool_calls : false,

  })

  return response.choices[0].message
}
