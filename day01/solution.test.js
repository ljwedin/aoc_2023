const { partOne, partTwo, isCharDigit } = require('./solution');

test("Returns true with input '1'", () => {
    expect(isCharDigit('1')).toBe(true);
});

test("Returns false with input 'a'", () => {
    expect(isCharDigit('a')).toBe(false);
});

test('Returns the sum 55447', () => {
    expect(partOne()).toEqual(55447);
});

/*test('Returns the sum 30', () => {
    expect(partTwo()).toEqual(30);
});*/
