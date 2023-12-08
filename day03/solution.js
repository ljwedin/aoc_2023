const { readFileSync } = require('fs');
const inputLines = readFile('input.txt');

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function isDigit(char) {
    if (char.match(/[0-9]/g)) {
        return true;
    } else {
        return false;
    }
}

function isSymbol(char) {
    if (!isDigit(char)) {
        if (char !== '.') {
            return true;
        }
    }

    return false;
}

function extractDigits(inputString, lineIndex) {
    const result = [];
    let sum = 0;
    let currentDigits = '';
    let startingIndex = null;
    let endingIndex = null;
    const isFirstLine = lineIndex === 0 ? true : false;
    const isLastLine = lineIndex === inputLines.length - 1 ? true : false;

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (i === 28 && lineIndex === 137) {
            console.log('28 char: ', char);
        }
        if (i === 29 && lineIndex === 137) {
            console.log('29 char is digit: ', isDigit(char));
        }

        if (isDigit(char)) {
            if (currentDigits === '') {
                startingIndex = i;
            }
            currentDigits += char;
        } else {
            if (currentDigits.length > 0) {
                endingIndex = i - 1;
                if (
                    isValidEnginePart(
                        lineIndex,
                        startingIndex,
                        endingIndex,
                        isFirstLine,
                        isLastLine
                    )
                ) {
                    result.push(parseInt(currentDigits));
                }
                currentDigits = '';
            }
        }
    }

    if (currentDigits.length > 0) {
        endingIndex = inputString.length - 1;
        startingIndex = endingIndex - (currentDigits.length - 1);

        if (
            isValidEnginePart(
                lineIndex,
                startingIndex,
                endingIndex,
                isFirstLine,
                isLastLine
            )
        ) {
            result.push(parseInt(currentDigits));
        }
        currentDigits = '';
    }

    for (let number of result) {
        sum += number;
    }

    return sum;
}

function isValidEnginePart(
    lineIndex,
    numberStartIndex,
    numberStopIndex,
    isFirstLine,
    isLastLine
) {
    let thisLine = inputLines[lineIndex];
    const startIndexExtended = numberStartIndex == 0 ? 0 : numberStartIndex - 1;
    const stopIndexExtended =
        numberStopIndex == thisLine.length - 1
            ? thisLine.length - 1
            : numberStopIndex + 1;
    const previousLineIndex = isFirstLine ? 0 : lineIndex - 1;
    const nextLineIndex = isLastLine ? inputLines.length - 1 : lineIndex + 1;
    const previousLineSlice = inputLines[previousLineIndex].slice(
        startIndexExtended,
        stopIndexExtended + 1
    );
    const nextLineSlice = inputLines[nextLineIndex].slice(
        startIndexExtended,
        stopIndexExtended + 1
    );

    if (
        isSymbol(thisLine[startIndexExtended]) ||
        isSymbol(thisLine[stopIndexExtended])
    ) {
        return true;
    }

    for (let char of previousLineSlice) {
        if (isSymbol(char)) {
            return true;
        }
    }

    for (let char of nextLineSlice) {
        if (isSymbol(char)) {
            return true;
        }
    }

    return false;
}

function partOne() {
    const result = [];
    let sum = 0;

    for (i = 0; i < inputLines.length; i++) {
        result.push(extractDigits(inputLines[i], i));
    }

    for (let number of result) {
        sum += number;
    }

    return sum;
}

console.log(partOne());
