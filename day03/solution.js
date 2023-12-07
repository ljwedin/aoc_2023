const { readFileSync } = require('fs');
const inputLines = readFile('input.txt');

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

const mockData = [
    '.679.....662....71............................805..........862.680...................................................................687....',
    '............*....-..811..........846..855......*.............*..$........230.92@............................=.....................92........',
    '..........360..........#....664.....=.*...881...677...934.780.......426.*..........8......654.....*959.....539..........21.........*........',
    '.....................+.........*......379..*.........*.........=.........969........*........*.976..............872....*....../....579......',
    '.......566......652...809....482.394......492..303.650..../...38....%...............106...385..................#.....793..484.865...........',
    '..................*................*..347.......*.........220.....349...691...392*..................18..797.......................+.........',
    '.679.....662....71............................805..........862.680...................................................................687....',
];

console.log(isValidEnginePart(4, 7, 9, false, false));

// Line 0 should return 662 + 71 + 805 + 680 = 2218

function isDigit(char) {
    if (char.match(/[1-9]/g)) {
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

function findNumber(inputLine) {
    let testLine = i;
    for (let char of inputLine) {
        if (isDigit(char)) {
        }
    }
}

function isValidEnginePart(
    lineIndex,
    numberStartIndex,
    numberStopIndex,
    isFirstLine,
    isLastLine
) {
    let previousLine, previousLineSlice, nextLine, nextLineSlice;
    let isValidEnginePart = false;

    if (isFirstLine) {
        nextLine = mockData[lineIndex + 1];
        nextLineSlice = nextLine.slice(
            numberStartIndex - 1,
            numberStopIndex + 2
        );

        for (let char of nextLineSlice) {
            if (isSymbol(char)) {
                isValidEnginePart = true;
                return isValidEnginePart;
            }
        }
    } else if (isLastLine) {
        previousLine = inputLines[lineIndex - 1];
        previousLineSlice = previousLine.slice(
            numberStartIndex - 1,
            numberStopIndex + 2
        );

        for (let char of previousLineSlice) {
            if (isSymbol(char)) {
                isValidEnginePart = true;
                return isValidEnginePart;
            }
        }
    } else {
        nextLine = mockData[lineIndex + 1];
        previousLine = inputLines[lineIndex - 1];

        nextLineSlice = nextLine.slice(
            numberStartIndex - 1,
            numberStopIndex + 2
        );

        previousLineSlice = previousLine.slice(
            numberStartIndex - 1,
            numberStopIndex + 2
        );

        for (let char of nextLineSlice) {
            if (isSymbol(char)) {
                isValidEnginePart = true;
                return isValidEnginePart;
            }
        }

        for (let char of previousLineSlice) {
            if (isSymbol(char)) {
                isValidEnginePart = true;
                return isValidEnginePart;
            }
        }
    }

    return isValidEnginePart;
}

// slutindex en över sista char
