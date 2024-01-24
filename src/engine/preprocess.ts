import { confusables } from "./mappings/confusion";
import { leetSpeakMap } from "./mappings/leetspeakMap";

// Used to preprocess given input string to help with

export const leetspeakDecode = (givenString : string) => {
    let cleanString = '';

    for(let char of givenString) {

        if(leetSpeakMap.has(char)) {
            cleanString += char;
        } else {
            let found = 0;
            for(const [key, value] of leetSpeakMap) {
                if(value.includes(char)) {
                    cleanString += key;
                    found = 1;
                    break;
                }
            }
            
            if(found == 0) cleanString += char;
        }
    }

    return cleanString;
}





export const preProcess = (givenString : string) => {

    // let resultingString = givenString.replace(/\s/g, ""); // removes black spaces, not doing currently

    let cleanString = '';

    // Replacing any confusable characters in the string:
    for(let char of givenString) {

        if(confusables.has(char)) {
            //if char is a key in confusables map, then it's clean character: no need to search 
            cleanString += char;       
        } else {
            let found = 0;
            for(const [key, value] of confusables) {
                if(value.includes(char)) {
                    found = 1;
                    cleanString += key;
                    break;
                } 
            }
            if(found == 0) cleanString += char;
        }
    }  


    //Converting string to lowercase:
    cleanString = cleanString.toLowerCase();


    //now in This stage of preprocessing, we intend to map leet-speak:
    
    return cleanString;
}