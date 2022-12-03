import { readFileSync } from 'fs'

const choicesScore = {
    a: 1,
    b: 2,
    c: 3,
    x: 1,
    y: 2,
    z: 3,
}

const resultPoints = {
    win: 6,
    draw: 3,
    loss: 0,
}

const rockCase = {
    x: 'draw',
    y: 'loss',
    z: 'win'
}

const paperCase = {
    x: 'win',
    y: 'draw',
    z: 'loss'
}

const scissorsCase = {
    x: 'loss',
    y: 'win',
    z: 'draw'
}

const determineEachPlayerScore = (result) => {
    const firstPlayerScore  = resultPoints[result];
    const secondPlayerScore = resultPoints['win'] - firstPlayerScore
    return {
        firstPlayer: firstPlayerScore,
        secondPlayer: secondPlayerScore
    }
}

const calculateScores = ([firstPlayerChoice, secondPlayerChoice]) => {
    const transformedFirstPlayerChoice  = firstPlayerChoice.toLowerCase()
    const transformedSecondPlayerChoice = secondPlayerChoice.toLowerCase()
    let matchResult = null;
    let firstPlayerScore = 0
    let secondPlayerScore = 0
    if (firstPlayerChoice === 'A') {
        matchResult = determineEachPlayerScore(rockCase[transformedSecondPlayerChoice])
    } else if (firstPlayerChoice === 'B') {
        matchResult = determineEachPlayerScore(paperCase[transformedSecondPlayerChoice])
    } else if (firstPlayerChoice === 'C') {
        matchResult = determineEachPlayerScore(scissorsCase[transformedSecondPlayerChoice])
    }
    firstPlayerScore  += matchResult.firstPlayer
    firstPlayerScore  += choicesScore[transformedFirstPlayerChoice]
    secondPlayerScore += matchResult.secondPlayer
    secondPlayerScore += choicesScore[transformedSecondPlayerChoice]
    return [ firstPlayerScore, secondPlayerScore ]
}

const filename = 'prod.txt'
const rawData = readFileSync(filename, 'utf8')
const groupedScores = rawData.split('\n').filter(turn => turn.trim()).map(turn => calculateScores(turn.split(' ')));
const firstPlayerFinalScore  = groupedScores.map(group => group[0]).reduce((sum, score) => sum + score)
const secondPlayerFinalScore = groupedScores.map(group => group[1]).reduce((sum, score) => sum + score)

console.log(`The final score for the first player is: ${firstPlayerFinalScore}`);
console.log(`The final score for the second player is: ${secondPlayerFinalScore}`);
const finalResult = firstPlayerFinalScore > secondPlayerFinalScore 
    ? 'Player one wins' : firstPlayerFinalScore === secondPlayerFinalScore 
    ? "a draw" : 'Player two wins'
console.log(`Therefore, the final result is: ${finalResult}`);

/***** Last part of the challenge *****/

/* The key to obtain these combinations was thinking about the final score of each case,
    e.g.: "A Y" means that we need to make a draw, which gives 3 points and 1 more point using
    the rock, resulting in 4 points. */
const combinations = {
    A: { X: 3, Y: 4, Z: 8 },
    B: { X: 1, Y: 5, Z: 9 },
    C: { X: 2, Y: 6, Z: 7 },
}

const calculateSecondPlayerScore = ([firstPlayerChoice, secondPlayerChoice]) => {
    return combinations[firstPlayerChoice][secondPlayerChoice]
}

const scoreSecondPart = rawData.split('\n').filter(turn => turn.trim())
    .map(turn => calculateSecondPlayerScore(turn.split(' ')))
    .reduce((sum, score) => sum + score)

console.log(`The score for the second player is: ${scoreSecondPart}`);
