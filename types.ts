import OpenAI from 'openai'

// This is a generic open AI message type to manage all kinds of user inputs
export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

  
// who knows what this is
export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}
