/**
 * 
 * @param inputString 
 * Given input string by processor functions.
 * 
 * @returns 
 * Array of strings (words), here each token is an individual word.
 */

export const wordTokenizeInput = (inputString : string) : Array<string> => {
    return inputString.match(/\b\w+\b/g) || [];
}