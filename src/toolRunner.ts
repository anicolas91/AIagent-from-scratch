import type OpenAI from "openai";
import { generateImage, generateImageToolDefinition } from "./tools/generateImage"
import { reddit, redditToolDefinition } from "./tools/reddit"
import { dadJoke, dadJokeToolDefinition } from "./tools/dadjoke"

// create actual function for the weather
// we are forcing an answer right now because the other way around is using an api
// that requires authentification and we have no time for that
// const getWeather = () => 'very hot. 100000 degrees.' // not needed anymore

// create fcn that actually runs the tool
export const runTool = async (
    // inputs
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string,
) => 
    {

    // setup input
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
    }

    // checks for tool call fcn name, and if matching does something
    switch (toolCall.function.name) {
        // case 'get_weather':
        //     return getWeather() //doesnt really care for an input lol
        case generateImageToolDefinition.name:
            return generateImage(input)
        
        case redditToolDefinition.name:
            return reddit(input)

        case dadJokeToolDefinition.name:
            return dadJoke(input)
            
        default:
            return `Never run: ${toolCall.function.name} again.`
    }


    }
