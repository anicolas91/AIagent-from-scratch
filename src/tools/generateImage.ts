import {z} from 'zod'
import type { ToolFn } from '../../types' // looks at main vars
import { openai } from '../ai'

//makes the gen image tool definition

export const generateImageToolDefinition = {
    name: 'generate_image',
    parameters: z.object({
        prompt: z.string().describe(
            `prompt for the image. Be sure to consider the user original message when making the prompt. If unsure ask user for more details.`
        )
    }), // even if its empty its good practice to give something as a parameter
    description: 'generates an image',
}

// make a type by having zod infer it
type Args = z.infer<typeof generateImageToolDefinition.parameters>

// actually make the fcn

export const generateImage: ToolFn<Args,string> = async ({
    toolArgs, 
    userMessage
}) => {
    const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: toolArgs.prompt,
        n: 1,
        size: '1024x1024',
    })

    // get the joke
    return response.data[0].url!

}