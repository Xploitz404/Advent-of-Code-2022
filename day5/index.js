import { readFileSync } from 'fs'

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')
const [crates, instructions] = rawData.split('\n\n')

const fourSpaces = '   '
const fiveSpaces = '    '
const rowSeparatedCrates = crates.split('\n')
const columns = rowSeparatedCrates.pop().split(fourSpaces).map(n => parseInt(n))
const lastColumn = columns[columns.length - 1]
const columnSeparatedRows = rowSeparatedCrates.map(row => {
    const cols = row.split(fiveSpaces)
    return cols.length === lastColumn ? cols : cols.flatMap(col => col.split(' '))
})

// Organizes values by columns
const columnSeparatedCrates = {}
columns.forEach(column => columnSeparatedCrates[column] = [])
for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columnSeparatedRows.length; j++) {
        if (!columnSeparatedRows[j][i]) continue
        columnSeparatedCrates[columns[i].toString()].push(columnSeparatedRows[j][i])
    }
}
const firstResultCrates = {...columnSeparatedCrates}
const secondResultCrates = JSON.parse(JSON.stringify(columnSeparatedCrates))

const splittedInstructions = instructions.split('\n')
    .map(line => line.split(' ').filter(word => !isNaN(word)))
// Moves the crates according to the instructions
splittedInstructions.forEach(([move, from, to]) => {
    const cratesToMove = firstResultCrates[from].splice(0, parseInt(move))
    cratesToMove.forEach(crate => firstResultCrates[to].unshift(crate))
})

const squareBracketsRegExp = /\[|\]/g
const cratesOnTop = Object.values(firstResultCrates)
    .map(column => column[0].replaceAll(squareBracketsRegExp, ''))
    .join('')

console.log(`The crates on the top are: ${cratesOnTop}`);

console.log('- - - - - Part two of the challenge - - - - -');

splittedInstructions.forEach(([move, from, to]) => {
    const cratesToMove = secondResultCrates[from].splice(0, parseInt(move))
    secondResultCrates[to].unshift(...cratesToMove)
})

const cratesOnTopSecondPart = Object.values(secondResultCrates)
    .map(column => column[0].replaceAll(squareBracketsRegExp, ''))
    .join('')

console.log(`The crates on the top (for the second part) are: ${cratesOnTopSecondPart}`);