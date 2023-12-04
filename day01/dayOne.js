const { readFileSync } = require('fs');

function addNumberStringsTogether() {
    let finalSum = 0;
    const numbersToAddTogether = convertInputFile();

    for (i = 0; i < numbersToAddTogether.length; i++) {
        finalSum += findFirstAndLastNumber(numbersToAddTogether[i]);
    }

    return finalSum;
}

function convertInputFile() {
    const inputFile = readFile('./input.txt');
    const numberStrings = createNumberStringsArray(inputFile);

    return numberStrings;
}

function createNumberStringsArray(inputArray) {
    let numberStringsToReturn = [];

    for (i = 0; i < inputArray.length; i++) {
        numberStringsToReturn.push(createNumberString(inputArray[i]));
    }

    return numberStringsToReturn;
}

function findFirstAndLastNumber(numberString) {
    const firstNumber = numberString[0];
    const lastNumber = numberString[numberString.length - 1];
    const numberToReturn = parseInt(firstNumber + lastNumber);

    return numberToReturn;
}

function readFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function createNumberString(inputString) {
    const numbers = inputString.match(/[1-9]/g);
    const numberString = numbers ? numbers.join('') : '';

    return numberString;
}

console.log(addNumberStringsTogether());
