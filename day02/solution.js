const { readFileSync } = require('fs');
const inputLines = readFile('input.txt');

const mockData = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 9 green, 1 blue, 12 red; 1 blue, 18 green, 8 red; 2 blue, 6 green, 13 red; 3 blue, 13 red, 7 green; 5 blue, 4 red, 4 green; 6 blue, 7 green, 4 red',
];

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function findColonIndex(inputString) {
    return inputString.search(/:/);
}

function returnGameStringWithoutId(inputString) {
    return inputString.slice(findColonIndex(inputString) + 2);
}

function parseId(inputString) {
    return inputString.slice(5, findColonIndex(inputString));
}

function partOne(inputArray) {
    let result = [];

    for (let line of inputArray) {
        let gameObject = {
            id: parseInt(parseId(line)),
            red: 0,
            green: 0,
            blue: 0,
        };

        result.push(gameObject);
    }

    return result;
}

function findLargestCubeCount(inputColor, inputString) {
    for ()
}

function isCharDigit(char) {
    if (char.match(/[1-9]/g)) {
        return true;
    } else {
        return false;
    }
}

console.log(partOne(mockData));

module.exports = { parseId, returnGameStringWithoutId, partOne };
