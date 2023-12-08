const { readFileSync } = require('fs');
const inputLines = readFile('input.txt');

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

const mockData = [
    '.679....*662....71............................805..........862.680...................................................................687....',
    '............*....-..811..........846..855......*.............*..$........230.92@............................=.....................92........',
    '35/.......360..........#....664.....=.*...881...677...934.780.......426.*..........8......654.....*959.....539..........21.........*........',
    '.%...................+.........*......379..*.........*.........=.........969........*........*.976..............872....*....../....579......',
    '......*566......652...809....482.394......492..303.650..../...38....%...............106...385..................#.....793..484.865...........',
    '..................*................*..347.......*.........220.....349...691...392*..................18..797.......................+.........',
    '.679.....662....71............................805..........862.680...................................................................687..87',
];
// Line 0 should return 662 + 71 + 805 + 680 = 2218

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
    const isLastLine = lineIndex === 139 ? true : false;

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
        result.push(parseInt(currentDigits));
        endingIndex = inputString.length - 1;

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
        numberStopIndex == 140 ? 140 : numberStopIndex + 1;
    const previousLineIndex = isFirstLine ? 0 : lineIndex - 1;
    const nextLineIndex = isLastLine ? 8 : lineIndex + 1;
    const previousLineSlice = inputLines[previousLineIndex].slice(
        startIndexExtended,
        stopIndexExtended
    );
    const nextLineSlice = inputLines[nextLineIndex].slice(
        startIndexExtended,
        stopIndexExtended
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

function isValidEnginePartOld(
    lineIndex,
    numberStartIndex,
    numberStopIndex,
    isFirstLine,
    isLastLine
) {
    let previousLine, previousLineSlice, nextLine, nextLineSlice;
    let thisLine = inputLines[lineIndex];

    if (numberStartIndex > 0 && isSymbol(thisLine[numberStartIndex - 1])) {
        return true;
    }

    if (numberStopIndex > 0 && isSymbol(thisLine[numberStopIndex + 1])) {
        return true;
    }

    if (isFirstLine) {
        nextLine = inputLines[lineIndex + 1];
        nextLineSlice = nextLine.slice(
            numberStartIndex == 0 ? numberStartIndex - 1 : numberStartIndex,
            numberStopIndex == 8 /* 140 */
                ? numberStopIndex + 1
                : numberStopIndex
        );

        for (let char of nextLineSlice) {
            if (isSymbol(char)) {
                return true;
            }
        }
    } else if (isLastLine) {
        previousLine = inputLines[lineIndex - 1];
        previousLineSlice = previousLine.slice(
            numberStartIndex == 0 ? numberStartIndex - 1 : numberStartIndex,
            numberStopIndex == 8 /* 140 */
                ? numberStopIndex + 1
                : numberStopIndex
        );

        for (let char of previousLineSlice) {
            if (isSymbol(char)) {
                return true;
            }
        }
    } else {
        nextLine = inputLines[lineIndex + 1];
        previousLine = inputLines[lineIndex - 1];

        nextLineSlice = nextLine.slice(
            numberStartIndex == 0 ? numberStartIndex - 1 : numberStartIndex,
            numberStopIndex == 8 /* 140 */
                ? numberStopIndex + 1
                : numberStopIndex
        );

        previousLineSlice = previousLine.slice(
            numberStartIndex == 0 ? numberStartIndex - 1 : numberStartIndex,
            numberStopIndex == 8 /* 140 */
                ? numberStopIndex + 1
                : numberStopIndex
        );

        for (let char of nextLineSlice) {
            if (isSymbol(char)) {
                return true;
            }
        }

        for (let char of previousLineSlice) {
            if (isSymbol(char)) {
                return true;
            }
        }
    }

    return false;
}

function partOne() {
    const result = [];
    let sum = 0;

    for (i = 0; i < inputLines.length; i++) {
        console.log(`Index: ${i}, result: ${extractDigits(inputLines[i], i)}`);
        result.push(extractDigits(mockData[i], i));
    }

    for (let number of result) {
        sum += number;
    }

    return sum;
}

console.log(partOne());
