import OpenAI from "openai";


const openAIChatWrapper = async (promptValue: string) => {
    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "assistant", "content": "You are a helpful assistant." },
            { role: "user", content: promptValue }],
    });

    return completion.choices[0].message.content;
};

export default openAIChatWrapper