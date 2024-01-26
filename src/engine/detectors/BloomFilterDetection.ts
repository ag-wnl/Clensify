import { googleBadWords } from "../../dataset/googleBadWords";
import { BloomFilter } from "../filters/bloomFilter/bloom";
import { optimalFilterSize } from "../filters/bloomFilter/formulas/optimalBloomDimension";


export const bloomFilterCheck = (inputString : string) => {

    const wordsToAdd = googleBadWords;
    const [filterSize, numberOfHashFunctions] : [number, number] = optimalFilterSize({
        n : wordsToAdd.length,
        p : 0.00001
    })


    const bloomFilter = new BloomFilter(filterSize, numberOfHashFunctions);
    wordsToAdd.forEach(word => bloomFilter.add(word));
    
    
    const wordToCheck = inputString;
    const isProfanity = bloomFilter.has(wordToCheck);
    
    console.log(`Is ${wordToCheck} a profanity? ${isProfanity ? 'Yes' : 'No'}`);
    return isProfanity;
}
