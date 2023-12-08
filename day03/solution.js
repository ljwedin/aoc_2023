const { readFileSync } = require('fs');
const { availableParallelism } = require('os');
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

function isGear(char) {
    if (char === '*') {
        return true;
    }

    return false;
}

function extractGears() {
    const gears = [];

    for (let i = 0; i < inputLines.length; i++) {
        const thisLine = inputLines[i];

        for (let j = 0; j < thisLine.length; j++) {
            let char = thisLine[j];

            if (isGear(char)) {
                gears.push({
                    lineIndex: i,
                    charIndex: j,
                });
            }
        }
    }

    return gears;
}

function isValidGear(gear) {
    let adjacentNumberAmount = 0;
    const thisLine = inputLines[gear.lineIndex];
    const previousLineSlice = inputLines[gear.lineIndex - 1].slice(
        gear.charIndex - 1,
        gear.charIndex + 2
    );
    const nextLineSlice = inputLines[gear.lineIndex + 1].slice(
        gear.charIndex - 1,
        gear.charIndex + 2
    );
    let adjacentNumberIndexes = [];

    if (gear.charIndex > 0 && isDigit(thisLine[gear.charIndex - 1])) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex,
            index: gear.charIndex - 1,
        });
    }

    if (
        gear.charIndex < thisLine.length - 1 &&
        isDigit(thisLine[gear.charIndex + 1])
    ) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex,
            index: gear.charIndex + 1,
        });
    }

    if (isDigit(previousLineSlice[0])) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex - 1,
            index: gear.charIndex - 1,
        });
    }

    if (
        isDigit(previousLineSlice[0]) &&
        !isDigit(previousLineSlice[1]) &&
        isDigit(previousLineSlice[2])
    ) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex - 1,
            index: gear.charIndex + 1,
        });
    }

    if (isDigit(nextLineSlice[0])) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex + 1,
            index: gear.charIndex + 1,
        });
    }

    if (
        isDigit(nextLineSlice[0]) &&
        !isDigit(nextLineSlice[1]) &&
        isDigit(nextLineSlice[2])
    ) {
        adjacentNumberAmount++;
        adjacentNumberIndexes.push({
            line: gear.lineIndex + 1,
            index: gear.charIndex + 1,
        });
    }

    if (adjacentNumberAmount == 2) {
        return adjacentNumberIndexes;
    }

    return false;
}

function findWholeNumber(gear) {
    const thisLine = inputLines[gear.line];
    console.log(`Char index: ${gear.index}`);
    const startChar = thisLine[gear.index];
    const startCharIndex = gear.index;
    let number = [startChar];

    for (let i = startCharIndex; i < thisLine.length; i++) {
        if (!isDigit(thisLine[i])) {
            number.push(thisLine[i - 1]);
            break;
        }
    }

    for (let i = startCharIndex; i > 0; i--) {
        if (!isDigit(thisLine[i])) {
            number.unshift(thisLine[i + 1]);
            break;
        }
    }

    console.log(number);
}

function partTwo() {
    const gears = extractGears();
    const result = [];
    let sum = 0;

    for (let gear of gears) {
        const validGear = isValidGear(gear);
        if (validGear) {
            const firstNumber = findWholeNumber(validGear[0]);
            const secondNumber = findWholeNumber(validGear[1]);

            result.push(firstNumber * secondNumber);
        }
    }

    for (let number in result) {
        sum += number;
    }

    return gears;
}

partTwo();
