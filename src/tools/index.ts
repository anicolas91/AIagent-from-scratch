import { generateImageToolDefinition } from "./generateImage"
import { redditToolDefinition } from "./reddit"
import { dadJokeToolDefinition } from "./dadjoke"

export const tools = [generateImageToolDefinition, redditToolDefinition, dadJokeToolDefinition]