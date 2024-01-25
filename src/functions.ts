// Main entry point for input string by user, this function initiats the process and finnally returns the value/flags.

export const clensifyText = (inp : userInput) => {
    
    let badString = inp.inputString;    // making a copy of input string

    badString = badString.replace(/\s/g, "");  // removing all white spaces in string

    
}

interface userInput {
    inputString : string;   // the string the we need to Clensify
    mode? : string;         // mode to operate in, 'strict' is an option
}