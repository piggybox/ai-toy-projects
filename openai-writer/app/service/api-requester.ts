import OpenAI from "openai";

const openai = new OpenAI();


const openAIChatWrapper = async (promptValue: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a helpful assistant." },
            { "role": "user", "content": promptValue }],
    });

    console.log(completion.choices[0]);
    return completion.choices[0].message.content;
};

export const getStyledText = async (content: string, context: string) => {
    let promptValue = `Below content is part of a writing article.`
    switch (context) {
        case "summarize":
            promptValue += `Summarize the below content. \n "${content}"`;
            break;
        case "vocab":
            promptValue += `Provide some good vocabulary suggestions for the below content as a list of words with their mapping from existing words in article. \n "${content}"`;
            break;
        case "improve":
            promptValue += `Improve the below content by making it even better. \n "${content}"`;
            break;
        default:
            return content;
    }
    const styledContent = openAIChatWrapper(promptValue);
    return styledContent;
}

export const getToneSuggestion = async (content: string, context: string) => {
    const tonePrompt = `Paraphrase below text in ${context} tone. \n "${content}"`;

    const toneContent = openAIChatWrapper(tonePrompt);
    return toneContent;
}