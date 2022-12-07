import { readFileSync } from 'fs'

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')
const splittedData = rawData.split('\n')

/**
 * Iterates over the signal array until it finds a combination which length
 * matches the number of different chars given, then returns the index of
 * the last item of that combination
 * @param {number} numberOfDifferentChars 
 * @param {array} signal 
 * @returns {number}
 */
const findLastProcessedChar = (numberOfDifferentChars, signal) => {
    let firstCharIndex = 0
    let lastCharIndex  = numberOfDifferentChars
    while (lastCharIndex <= signal.length) {
        const group = signal.slice(firstCharIndex, lastCharIndex)
        const groupSize = [...new Set(group)].length
        if (groupSize === numberOfDifferentChars) break;
        firstCharIndex++
        lastCharIndex++
    }
    return lastCharIndex
}

const charactersProcessedFirstPart = splittedData.map(signal => findLastProcessedChar(4, signal.split('')))
console.log(`The number of characters processed before first start-of-packet marker is detected is: ${charactersProcessedFirstPart}`);

console.log('- - - - - Part two of the challenge - - - - -');

const charactersProcessedLastPart = splittedData.map(signal => findLastProcessedChar(14, signal.split('')))
console.log(`The number of characters processed before first start-of-packet marker is detected is: ${charactersProcessedLastPart}`);
