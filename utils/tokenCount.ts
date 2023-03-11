export default function countTokens(str: string): number {
    const lengthInChars = str.trim().length;
    const lengthInWords = str.trim().split(/\s+/).filter(word => word.length > 0).length;
    const numTokensPerChar = 0.25;
    const numTokensPerWord = 1.33;
    const estimatedNumTokens = lengthInChars * numTokensPerChar + lengthInWords * numTokensPerWord;
    return Math.round(estimatedNumTokens);
}