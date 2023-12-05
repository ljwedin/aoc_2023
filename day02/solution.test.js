const { parseId, returnGameStringWithoutId, partOne } = require('./solution');

test("That the game id 1 is parsed from the string 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'", () => {
    expect(
        parseId('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toEqual('1');
});

test("That the game id 11 is parsed from the string 'Game 11: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'", () => {
    expect(
        parseId('Game 11: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toEqual('11');
});

test("That the game id 111 is parsed from the string 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'", () => {
    expect(
        parseId('Game 111: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toEqual('111');
});

test("That the game without the game id prefix is returned from the string 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'", () => {
    expect(
        returnGameStringWithoutId(
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        )
    ).toEqual('3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green');
});

test('That the dayOne function creates an array of two objects with their id, max red, max green and max blue cube score', () => {
    expect(
        partOne([
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 9 green, 1 blue, 12 red; 1 blue, 18 green, 8 red; 2 blue, 6 green, 13 red; 3 blue, 13 red, 7 green; 5 blue, 4 red, 4 green; 6 blue, 7 green, 4 red',
        ])
    ).toEqual([
        {
            id: 1,
            red: 4,
            green: 2,
            blue: 6,
        },
        {
            id: 2,
            red: 13,
            green: 18,
            blue: 6,
        },
    ]);
});

test('That the function returns 4 as the highest red cube count', () => {
    expect(
        findLargestCubeCount(
            'red',
            '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        )
    ).toEqual(4);
});
