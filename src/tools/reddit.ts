import {z} from 'zod'
import type { ToolFn } from '../../types' // looks at main vars
import fetch from 'node-fetch'

//makes the reddit tool definition

export const redditToolDefinition = {
    name: 'reddit',
    parameters: z.object({}), // even if its empty its good practice to give something as a parameter
    description: 'gets the latest posts from the subreddit',
}

// make a type by having zod infer it
type Args = z.infer<typeof redditToolDefinition.parameters>

// actually make the fcn

export const reddit: ToolFn<Args,string> = async ({toolArgs}) => {
    const {data} = await fetch('https://www.reddit.com/r/todayilearned/.json').then(
        (res) => res.json()
    )

    // format the output with some specific bits
    const relevantInfo = data.children.map((child: any) => ({
        title: child.data.title,
        link: child.data.url,
        subreddit: child.data.subreddit_name_prefixed,
    })
    )

    // stringify it (2 spaces everywhere)
    return JSON.stringify(relevantInfo, null, 2)

}