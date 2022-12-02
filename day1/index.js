import { readFileSync } from 'fs'

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')
const parsedData = rawData.split('\n\n').map(elf => 
    elf.split('\n').map(food => parseInt(food)).reduce((accumulator, currentValue) => accumulator + currentValue)
)
const sortedData = parsedData.sort((a, b) => b - a)
// This solves the first part of the problem
const maxCalories = sortedData[0]
console.log(`The Elf with the most Calories has a total of: ${new Intl.NumberFormat().format(maxCalories)} Cal.`)
// This solves the last part of the problem
const topThreeSum = sortedData.slice(0, 3).reduce((accumulator, currentValue) => accumulator + currentValue)
console.log(`The sum of the top 3 Elfs with most calories is: ${new Intl.NumberFormat().format(topThreeSum)}`);