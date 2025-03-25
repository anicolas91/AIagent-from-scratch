import type OpenAI from "openai";

// create actual function for the weather
// we are forcing an answer right now because the other way around is using an api
// that requires authentification and we have no time for that
const getWeather = () => 'very hot. 100000 degrees.'

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
        case 'get_weather':
            return getWeather(input) //doesnt really care for the input lol
        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`)
    }


    }
