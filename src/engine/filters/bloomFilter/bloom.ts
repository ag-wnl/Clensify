/**
 * Bloom filter is used to act as a probabilistic determining factor to if a word is profanity/obscene or not.
 */

class BloomFilter {
  private size: number;
  private hashFunctions: ((value: string) => number)[];
  private filter: boolean[];                                      // bloom filter array


  //Generating a filter array:
  constructor(size: number, numHashFunctions: number) {
    this.size = size;
    this.filter = new Array(size).fill(false);
    this.hashFunctions = this.generateHashFunctions(numHashFunctions);
  }


  // Generate hash functions based on the current time
  private generateHashFunctions(numFunctions: number): ((value: string) => number)[] {
    const seed = Date.now();
    return Array.from({ length: numFunctions }, (_, index) => {
      return (value: string) => this.hash(value + seed + index) % this.size;
    });
  }


  // Simple hash function using the djb2 algorithm
  private hash(value: string): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 33) ^ value.charCodeAt(i);
    }
    return hash >>> 0; // Ensure non-negative value
  }


  // Add an element to the Bloom filter
  add(value: string): void {
    this.hashFunctions.forEach(hashFunction => {
      const index = hashFunction(value);
      this.filter[index] = true;
    });
  }


  // Check if an element is likely in the set , TODO: strategy to reduce false positives
  has(value: string): boolean {
    return this.hashFunctions.every(hashFunction => {
      const index = hashFunction(value);
      return this.filter[index];
    });
  }
}
  
// Usage:
const bloomFilter = new BloomFilter(1000, 3);

const wordsToAdd = ['word1', 'word2', 'word3'];
wordsToAdd.forEach(word => bloomFilter.add(word));

const wordToCheck = 'word2';
const isInSet = bloomFilter.has(wordToCheck);

console.log(`Is "${wordToCheck}" in the set? ${isInSet ? 'Yes' : 'No'}`);
  