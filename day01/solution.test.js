const { isCharDigit, returnDigits } = require('./solution');

test("Returns true with input '1'", () => {
    expect(isCharDigit('1')).toBe(true);
});

test("Returns false with input 'a'"),
    () => {
        expect(isCharDigit('a')).toBe(false);
    };

test("Returns the array ['1', '2',  '3', '4'] from the string 'sdfko1lk2lkj3nl4s'", () => {
    expect(returnDigits('sdfko1lk2lkj3nl4s')).toEqual(['1', '2', '3', '4']);
});
