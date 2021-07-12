// Generate list of lowercase characters in the English alphabet
/** @type {string[]} */
const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

/**
 * Shifts a character by a given magnitude.
 * @param {string} char Character string of size 1
 * @param {number} shiftSize The amount to shift
 * @returns {string} a shifted character
 */
const getShiftedChar = (char, shiftSize) => {
  if (alphabet.includes(char)) {
    let shiftedCharIndex =
      (alphabet.indexOf(char) + shiftSize) % alphabet.length;
    if (shiftedCharIndex < 0) shiftedCharIndex += alphabet.length;
    return alphabet[shiftedCharIndex];
  }
  return char;
};

/**
 * Rotates given text forward by the given shift size.
 * @param {string} text
 * @param {number} shiftSize
 * @returns {string} The rotated text
 */
const rotateText = (text, shiftSize) => {
  return [...text].map((char) => getShiftedChar(char, shiftSize)).join("");
};

/**
 * ROT[X] function for an alphabet. Rotates/shifts text.
 * @param {string} text Text input from user or program
 * @returns {Map<number, string>} The list of ciphers accross an alphabet
 */
const rotateTextThroughAlphabet = (text) => {
  /** @type {Map<number, string>} */
  const rotatedTextMap = new Map();
  for (let i = 0; i < 26; i += 1) {
    rotatedTextMap.set(i, rotateText(text, i));
  }
  return rotatedTextMap;
};

module.exports = {
  getShiftedChar,
  rotateText,
  rotateTextThroughAlphabet,
  alphabet,
};
