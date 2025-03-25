import {z} from 'zod'
import type { ToolFn } from '../../types' // looks at main vars
import fetch from 'node-fetch'

//makes the dad joke tool definition

export const dadJokeToolDefinition = {
    name: 'dad_joke',
    parameters: z.object({}), // even if its empty its good practice to give something as a parameter
    description: 'gets a dad joke',
}

// make a type by having zod infer it
type Args = z.infer<typeof dadJokeToolDefinition.parameters>

// actually make the fcn

export const dadJoke: ToolFn<Args,string> = async ({toolArgs}) => {
    const res = await fetch('https://icanhazdadjoke.com/', {
        headers : {
            Accept: 'application/json', // ask response to be on json format
        },
    })

    // get the joke
    return (await res.json()).joke

}