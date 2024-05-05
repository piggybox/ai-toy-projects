import { getStyledText } from "./api-requester"
import { getToneSuggestion } from "./api-requester"

export const getResult = async ({ content, type, context }) => {
    switch (type) {
        case "style":
            return getStyledText(content, context);
        case "vocab":
            return getToneSuggestion(content, context);
        default:
            return "Invalid type";
    }


}