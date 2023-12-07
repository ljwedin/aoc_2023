const { readFileSync } = require('fs');
const inputLines = readFile('input.txt');

function readFile(filename) {
    const contents = readFileSync(`${__dirname}/${filename}`, 'utf-8');
    const arr = contents.split(/\r?\n/);

    return arr;
}

function isDigit(char) {
    if (char.match(/[1-9]/g)) {
        return true;
    } else {
        return false;
    }
}

function extractMaxScores() {
    let games = [];

    for (let line of inputLines) {
        const gameObject = {
            id: 0,
            maxRed: 0,
            maxGreen: 0,
            maxBlue: 0,
        };

        let redResults = [];
        let greenResults = [];
        let blueResults = [];

        gameObject.id = parseInt(line.slice(5, line.search(/:/)));
        const gameStringWithoutId = line.slice(line.search(/:/) + 1);

        for (i = 0; i < gameStringWithoutId.length; i++) {
            const char = gameStringWithoutId[i];
            if (char === ' ' && isDigit(gameStringWithoutId[i + 1])) {
                const gameSubstring = gameStringWithoutId.substring(i + 1);
                const stopIndex = gameSubstring.search(/ /);

                switch (gameSubstring[stopIndex + 1]) {
                    case 'r':
                        redResults.push(
                            parseInt(gameSubstring.substring(0, stopIndex))
                        );
                        break;
                    case 'g':
                        greenResults.push(
                            parseInt(gameSubstring.substring(0, stopIndex))
                        );
                        break;
                    case 'b':
                        blueResults.push(
                            parseInt(gameSubstring.substring(0, stopIndex))
                        );
                        break;
                    default:
                        break;
                }
            }
        }

        redResults.sort(function (a, b) {
            return b - a;
        });
        greenResults.length > 1 &&
            greenResults.sort(function (a, b) {
                return b - a;
            });
        blueResults.sort(function (a, b) {
            return b - a;
        });

        gameObject.maxRed = redResults[0];
        gameObject.maxGreen = greenResults[0];
        gameObject.maxBlue = blueResults[0];

        games.push(gameObject);
    }

    return games;
}

function partOne() {
    const games = extractMaxScores();
    let results = [];
    let sum = 0;

    const redCubes = 12;
    const greenCubes = 13;
    const blueCubes = 14;

    for (let game of games) {
        if (
            game.maxRed <= redCubes &&
            game.maxGreen <= greenCubes &&
            game.maxBlue <= blueCubes
        ) {
            results.push(game.id);
        }
    }

    for (i = 0; i < results.length; i++) {
        sum += results[i];
    }

    return sum;
}

function partTwo() {
    const games = extractMaxScores();
    let results = [];
    let sum = 0;

    for (let gameObject of games) {
        let powerSum =
            gameObject.maxRed * gameObject.maxGreen * gameObject.maxBlue;
        results.push(powerSum);
    }

    for (let number of results) {
        sum += number;
    }

    return sum;
}

console.log(partTwo());
