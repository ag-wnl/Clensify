import { wordTokenizeInput } from "../tokenizers/wordTokenizer";



class PartOfSpeechTags {
    tag(text: string) : [string, string][] {
        const words = wordTokenizeInput(text);
        return words.map(word => [word, this.tagWord(word)]);
    }

}

// class SimplePOSTagger {
//     tag(text: string): [string, string][] {
//       const words = this.tokenize(text);
//       return words.map(word => [word, this.tagWord(word)]);
//     }
  
//     private tokenize(text: string): string[] {
//       return text.toLowerCase().match(/\b\w+\b/g) || [];
//     }
  
//     private tagWord(word: string): string {
//       // Simple rule-based tagging
//       if (this.isNoun(word)) {
//         return 'NN'; // Noun
//       } else if (this.isVerb(word)) {
//         return 'VB'; // Verb
//       } else if (this.isAdjective(word)) {
//         return 'JJ'; // Adjective
//       } else {
//         return 'NN'; // Default to Noun
//       }
//     }
  
//     private isNoun(word: string): boolean {
//       return word.endsWith('s') || word.endsWith('es') || word.endsWith('ion');
//     }
  
//     private isVerb(word: string): boolean {
//       return word.endsWith('ed') || word.endsWith('ing') || word.endsWith('s');
//     }
  
//     private isAdjective(word: string): boolean {
//       return word.endsWith('y') || word.endsWith('ful') || word.endsWith('ish');
//     }
//   }
  
//   // Example usage:
//   const posTagger = new SimplePOSTagger();
//   const sentence = "The quick brown fox jumps over the lazy dog.";
//   const taggedWords = posTagger.tag(sentence);
//   console.log(taggedWords);
  