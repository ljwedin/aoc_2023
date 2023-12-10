let total = 0;
let secondTotal = 0;
let finalGearNumbers = [];

const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const textByLine = text.split(/\r\n|(?<!\r)\n|\r/);

textByLine.forEach((line, lineIndex) => {
    let number = '';
    let startIndex = 0;

    for (let i = 0; i <= line.length; i++) {
        if (/\d/.test(line[i])) {
            if (number === '') {
                startIndex = i;
            }
            number += line[i];
        } else {
            if (number !== '') {
                let valid = false;

                for (let j = lineIndex - 1; j <= lineIndex + 1; j++) {
                    if (textByLine[j] !== undefined) {
                        for (
                            let k = startIndex - 1;
                            k <= startIndex + number.length;
                            k++
                        ) {
                            if (textByLine[j][k] !== undefined) {
                                if (/[^0-9.]/.test(textByLine[j][k])) {
                                    valid = true;
                                }
                            }
                        }
                    }
                }

                if (valid) {
                    total += parseInt(number);
                }
            }
            number = '';
        }
    }
});

textByLine.forEach((line, lineIndex) => {
    for (let i = 0; i <= line.length; i++) {
        if (line[i] === '*') {
            let numbers = [];

            for (let j = lineIndex - 1; j <= lineIndex + 1; j++) {
                if (textByLine[j] !== undefined) {
                    for (let k = i - 1; k <= i + 1; k++) {
                        if (textByLine[j][k] !== undefined) {
                            if (/\d/.test(textByLine[j][k])) {
                                let number = '';
                                while (/\d/.test(textByLine[j][k])) {
                                    k--;
                                }
                                k++;
                                while (/\d/.test(textByLine[j][k])) {
                                    number += textByLine[j][k];
                                    k++;
                                }
                                numbers.push(parseInt(number));
                            }
                        }
                    }
                }
            }
            if (numbers.length === 2) {
                finalGearNumbers.push(numbers[0] * numbers[1]);
            }
        }
    }
});

finalGearNumbers.forEach((number) => {
    secondTotal += number;
});

console.log(`First solution: ${total}`);
console.log(`Second solution: ${secondTotal}`);
