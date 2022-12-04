import { readFileSync } from 'fs'

const itemTypes = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
    'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z'
]

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')
const parsedData = rawData.split('\n')
const resultFirstPart = parsedData.flatMap(rucksack => {
    const splittedItems = rucksack.split('')
    const halfOfItems = splittedItems.length / 2
    const firstCompartment = splittedItems.slice(0, halfOfItems)
    const lastCompartment = splittedItems.slice(halfOfItems)
    const commonItems = [...new Set(lastCompartment.filter(item => firstCompartment.includes(item)))]
    return commonItems.map(commonItem => itemTypes.findIndex(itemType => itemType === commonItem) + 1)
}).reduce((sum, item) => sum + item)

console.log(`The sum of priorities of those item types is: ${resultFirstPart}`);

/***** Last part of the challenge *****/
const elfGroups = []
const groupSize = 3;

while (parsedData.length > 0) elfGroups.push(parsedData.splice(0, groupSize))

const resultLastPart = elfGroups.flatMap(group => {
    const splittedItemsByElf = group.map(elfItems => elfItems.split(''))
    const [firstElfItems, secondElfItems, thirdElfItems] = splittedItemsByElf
    const initialIntersection = secondElfItems.filter(item => firstElfItems.includes(item))
    const finalIntersection = thirdElfItems.filter(item => initialIntersection.includes(item))
    const uniqueCommonItems = [...new Set(finalIntersection)]
    return uniqueCommonItems.map(commonItem => itemTypes.findIndex(itemType => itemType === commonItem) + 1)
}).reduce((sum, item) => sum + item)
console.log('- - - - - Second challenge - - - - -');
console.log(`The sum of priorities of those item types is: ${resultLastPart}`);
