const { readFileSync } = require('fs');

const stringsArray = readFile('./input.txt');
const numberStrings = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];
const resultsArray = [];
let sum = 0;

function readFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function replaceWrittenNumbers(input) {
    const numberWords = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };

    let result = '';
    let currentNumber = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (/[a-zA-Z]/.test(char)) {
            // If the character is a letter, build the currentNumber string
            currentNumber += char.toLowerCase();

            // Check if the currentNumber matches any number words
            if (currentNumber in numberWords) {
                result += numberWords[currentNumber];
                currentNumber = ''; // Reset currentNumber after replacement
            } else {
                result += char;
            }
        } else {
            // If the character is not a letter, append it to the result
            result += char;
        }
    }

    return result;
}

replaceWrittenNumbers();

function extractDigits(inputStringTest) {
    const inputString = replaceWrittenNumbers(inputStringTest);

    console.log(inputString);
    const digitMatches = inputString.match(/\d/g);
    /*const SebbesMatches = inputString.match(
        /(one|two|three|four|five|six|seven|eight|nine)|\d/g
    );*/

    if (digitMatches) {
        const resultString = digitMatches.join('');
        return resultString;
    } else {
        return '';
    }
}

function getFirstAndLastDigits(inputString) {
    const numbers = extractDigits(inputString);

    const firstNumber = numbers[0];
    const lastNumber = numbers[numbers.length - 1];
    const numberString = firstNumber + lastNumber;

    if (parseInt(numberString)) {
        return parseInt(numberString);
    } else {
        return 0;
    }
}

for (i = 0; i < stringsArray.length; i++) {
    resultsArray.push(parseInt(getFirstAndLastDigits(stringsArray[i])));
}

for (i = 0; i < resultsArray.length; i++) {
    sum += resultsArray[i];
}

console.log(sum);
