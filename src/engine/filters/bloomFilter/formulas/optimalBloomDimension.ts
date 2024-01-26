/**
 * 
 * @param bloomSize : interface for optimalFilterSize function
 * 
 * @param bloomSize.n : Number of items to be contained in the filter
 * 
 * @param bloomSize.p : Optional, Probability of false positives. When no value passed defaults to 0.000001 (1 in 1000000)
 * 
 * @returns Number of bits in filter required and number of hash functions required for optimal performance
 * 
 */

export const optimalFilterSize = (bloomSize : filterDimension) : [number,number] => {
    const p = bloomSize.p?? 0.000001; 
    const n = bloomSize.n;

    const m : number = Math.ceil( (n * Math.log(p)) / Math.log(1 / Math.pow(2, Math.log(2))) );
    const k : number = Math.round((m/n) * Math.log(2));

    return [m,k];
}


interface filterDimension {
    n : number,
    p? : number,
}