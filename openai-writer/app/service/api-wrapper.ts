import { getStyledText } from "./api-requester"
import { getToneSuggestion } from "./api-requester"

interface input {
    content: string
    type: string 
    context: string
}

export const getResult = async ({ content, type, context }: input) => {
    switch (type) {
        case "style":
            return getStyledText(content, context);
        case "tone":
            return getToneSuggestion(content, context);
        default:
            return "Invalid type";
    }


}