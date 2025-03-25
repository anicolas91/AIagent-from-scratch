import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

// create a type with the ai message & some metadata
export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

// create fcn that takes the AI message and adds the unique id and date created
export const addMetadata = (message: AIMessage): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})

// create a fcn that removes the metadata (id and date)
export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
    const { id, createdAt, ...messageWithoutMetadata } = message
    return messageWithoutMetadata
  }
  
// create a type just to work with lowDB
type Data = {
    messages: MessageWithMetadata[]
  }

// initialize your default database
const defaultData: Data = { messages: [] }

// create cfn to generate your db as a json file
// basically you write in your 'defaultData' that you generated above and ask
// lowDB to write it inside 'db.json'.
// the bit <Data> is just a generic bit where you plug in what type you got
export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)

  return db
}

// create fcn that takes ai messages, adds metadata, and saves them into the db
export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

// create fcn that gets the ai message from the db, and removes metadata
export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}

// create fcn to save agent tool response
export const saveToolResponse =  async (
  toolCallId: string,
  toolResponse: string,
) => {
  return addMessages([
    {
      role: 'tool',
      content: toolResponse,
      tool_call_id: toolCallId,
    }
  ])



}