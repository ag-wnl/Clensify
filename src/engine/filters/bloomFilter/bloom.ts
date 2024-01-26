/**
 * Bloom filter is used to act as a probabilistic determining factor to if a word is profanity/obscene or not.
 * 
 * This file contains implementation of a bloom filter, consisting of a class with various relevant functions.
 * 
 * 
 * 
 * There are the following formula which help calculate optimal dimensions for a bloom filter:
 * 
 * n = ceil(m / (-k / log(1 - exp(log(p) / k))))              where n : Number of items in filter
 * 
 * p = pow(1 - exp(-k / (m / n)), k)                          where p : probability of false positives
 * 
 * m = ceil((n * log(p)) / log(1 / pow(2, log(2))))           where m : number of bits in the filter
 * 
 * k = round((m / n) * log(2));                               where k : Number of hash functions
 * 
 * For finding optimal size of filter, reference : https://hur.st/bloomfilter/?n=4000&p=1.0E-7&m=&k=
 * 
 * @example:
 * 
      const wordsToAdd = googleBadWords;

      const [filterSize, numberOfHashFunctions] : [number, number] = optimalFilterSize({
        n : wordsToAdd.length,
        p : 0.00001
      })

      const bloomFilter = new BloomFilter(filterSize, numberOfHashFunctions);
      wordsToAdd.forEach(word => bloomFilter.add(word));

      const wordToCheck = 'word2';
      const isInSet = bloomFilter.has(wordToCheck);

      console.log(`Is "${wordToCheck}" in the set? ${isInSet ? 'Yes' : 'No'}`);
 * 
 * 
 * 
 * 
 * 
 * 
 */


export class BloomFilter {
  private size: number;
  private hashFunctions: ((value: string) => number)[];
  private filter: boolean[];                                      
  

  //Generating a filter array:
  constructor(size: number, numHashFunctions: number) {
    this.size = size;
    this.filter = new Array(size).fill(false);
    this.hashFunctions = this.generateHashFunctions(numHashFunctions);
  }


  // Generate hash functions based on the current time
  private generateHashFunctions(numFunctions: number): ((value: string) => number)[] {
    
    const seed = Date.now();
    
    // Creating array of hashing functions: 
    return Array.from({ length: numFunctions }, (_, index) => {
      return (value: string) => this.hash(value + seed + index) % this.size;
    });
  }


  // djb2 hash algorithm
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


  // Check if an element is likely in the set
  has(value: string): boolean {
    return this.hashFunctions.every(hashFunction => {
      const index = hashFunction(value);
      return this.filter[index];
    });
  }
}


  