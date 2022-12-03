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
        console.log(rockCase[transformedSecondPlayerChoice])
    } else if (firstPlayerChoice === 'B') {
        matchResult = determineEachPlayerScore(paperCase[transformedSecondPlayerChoice])
        console.log(paperCase[transformedSecondPlayerChoice])
    } else if (firstPlayerChoice === 'C') {
        matchResult = determineEachPlayerScore(scissorsCase[transformedSecondPlayerChoice])
        console.log(scissorsCase[transformedSecondPlayerChoice])
    }
    firstPlayerScore  += matchResult.firstPlayer
    firstPlayerScore  += choicesScore[transformedFirstPlayerChoice]
    secondPlayerScore += matchResult.secondPlayer
    secondPlayerScore += choicesScore[transformedSecondPlayerChoice]
    console.log(firstPlayerScore, secondPlayerScore);
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