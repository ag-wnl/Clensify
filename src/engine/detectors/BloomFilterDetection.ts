import { googleBadWords } from "../../dataset/googleBadWords";
import { BloomFilter } from "../filters/bloomFilter/bloom";
import { optimalFilterSize } from "../filters/bloomFilter/formulas/optimalBloomDimension";
import { wordTokenizeInput } from "../tokenizers/wordTokenizer";


export const bloomFilterCheck = (inputString : string) : boolean => {
    
    const wordsToAdd = googleBadWords;
    const [filterSize, numberOfHashFunctions] : [number, number] = optimalFilterSize({
        n : wordsToAdd.length,
        p : 0.00001
    })

    const bloomFilter = new BloomFilter(filterSize, numberOfHashFunctions);
    wordsToAdd.forEach(word => bloomFilter.add(word));
    
    const inputWords : Array<string> = wordTokenizeInput(inputString);    


    let isProfanity : boolean = false;

    for(let word in inputWords) {
        const currentWordIsProfanity : boolean = bloomFilter.has(word);
        
        if(currentWordIsProfanity) {
            isProfanity = true;
            break; // breaks when even when one profanity detected
        }
    }
    // const isProfanity = bloomFilter.has(wordToCheck);

    
    console.log(`Contains profanity? ${isProfanity ? 'Yes' : 'No'}`);
    return isProfanity;
}
