const { log } = require('console');
const { readFileSync } = require('fs');
const { text } = require('stream/consumers');
const inputLines = readFile('input.txt');

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function partOne() {
    let sum = 0;

    for (let line of inputLines) {
        let firstDigit, lastDigit;

        for (let char of line) {
            if (isCharDigit(char)) {
                if (!firstDigit) {
                    firstDigit = char;
                } else {
                    lastDigit = char;
                }
            }
        }

        if (!lastDigit) {
            lastDigit = firstDigit;
        }

        //console.log('Last digit: ' + lastDigit)

        const number = parseInt(firstDigit + lastDigit);
        sum += number;
    }

    return sum;
}

function partTwo() {
    const textDigits = [
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

    let sum = 0;

    for (let line of inputLines) {
        let digits = [];
        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (isCharDigit(char)) {
                digits.push(char);
            }

            const lineSubstring = line.substring(i);

            for (let j = 0; j < textDigits.length; j++) {
                const textDigit = textDigits[j];

                if (lineSubstring.startsWith(textDigit)) {
                    digits.push(j + 1);
                }
            }
        }
        const lastIndex = digits.length - 1;
        const number = `${digits[0]}${digits[lastIndex]}`;

        console.log(number);
        sum += Number(number);
    }
}

function isCharDigit(char) {
    if (char.match(/[1-9]/g)) {
        return true;
    } else {
        return false;
    }
}

partTwo();

module.exports = {
    partOne,
    partTwo,
    isCharDigit,
};
