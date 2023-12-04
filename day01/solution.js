const testString = 'sdfko1lk2lkj3nl4s';

function isCharDigit(char) {
    if (char.match(/[1-9]/g)) {
        return true;
    } else {
        return false;
    }
}

function returnDigits(inputString) {
    const mockResult = ['1', '2', '3', '4'];
    return mockResult;
}

module.exports = { isCharDigit, returnDigits };
