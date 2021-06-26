const { getShiftedChar, rotateText, rotateTextThroughAlphabet, alphabet } = require("./algo");

test('shifts a forward 2 to equal c', () => {
    expect(getShiftedChar('a', 2)).toBe('c');
});
test('shifts b backward 2 to equal z', () => {
    expect(getShiftedChar('b', -2)).toBe('z');
});
test('numbers or symbols are not shifted', () => {
    expect(getShiftedChar(')', 5)).toBe(')');
    expect(getShiftedChar(3, 1)).toBe(3);
});


test('rotate \"hello\" 26 times to equal itself', () => {
    expect(rotateText("hello", 26)).toBe("hello");
});

test('rotate \"z\" through alphabet generates alphabet', () => {
    const abc = {...alphabet};
    expect(rotateTextThroughAlphabet('a')).toEqual(abc);
});
