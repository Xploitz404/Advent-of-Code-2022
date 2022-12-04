import { readFileSync } from 'fs'

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')

const generateRangeNumbers = (range) => {
    const [min, max] = range.split('-').map(number => parseInt(number))
    const numbersOnRange = []
    for (let number = min; number <= max; number++) numbersOnRange.push(number)
    return numbersOnRange
}

const areBothRangesEqual = (rangeOne, rangeTwo) => (
    rangeOne[0] === rangeTwo[0] && rangeOne[rangeOne.length - 1] === rangeTwo[rangeTwo.length - 1]
)

const findRangeSizes = (rangeOne, rangeTwo) => {
    const rangeOneSize = rangeOne.length
    const rangeTwoSize = rangeTwo.length
    if (rangeOneSize === rangeTwoSize) {
        return areBothRangesEqual(rangeOne, rangeTwo) ? { bigger: rangeOne, smaller: rangeTwo } : null
    }
    return rangeOneSize > rangeTwoSize 
        ? { bigger: rangeOne, smaller: rangeTwo }
        : { bigger: rangeTwo, smaller: rangeOne }
}

const oneRangeConstainsAnotherOne = (biggerRange, smallerRange) => {
    const smallerRangeMinNumber = smallerRange[0]
    const smallerRangeMaxNumber = smallerRange[smallerRange.length - 1]
    return biggerRange.includes(smallerRangeMinNumber) && biggerRange.includes(smallerRangeMaxNumber)
}

const resultFirstPart = rawData.split('\n').flatMap(group => {
    const splittedGroup = group.split(',')
    const [elfOneSections, elfTwoSections] = splittedGroup.map(elfSectionsRange => generateRangeNumbers(elfSectionsRange))
    const rangesSizes = findRangeSizes(elfOneSections, elfTwoSections)
    if (!rangesSizes) return false
    return oneRangeConstainsAnotherOne(rangesSizes.bigger, rangesSizes.smaller)
}).filter(group => Boolean(group)).length

console.log(`The number of ranges that fully contain the other range is: ${resultFirstPart}`);

console.log('- - - - - Second part of the challenge - - - - -');

const areRangesOverlapped = (rangeOne, rangeTwo) => rangeTwo.filter(section => rangeOne.includes(section)).length > 0

const resultSecondPart = rawData.split('\n').flatMap(group => {
    const splittedGroup = group.split(',')
    const [elfOneSections, elfTwoSections] = splittedGroup.map(elfSectionsRange => generateRangeNumbers(elfSectionsRange))
    return areRangesOverlapped(elfOneSections, elfTwoSections)
}).filter(item => Boolean(item)).length

console.log(`The number of overlapped ranges is: ${resultSecondPart}`);