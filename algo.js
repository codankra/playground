// Generate list of lowercase characters in the English alphabet
const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

const getShiftedChar = (char, shiftSize) => {
  if (alphabet.includes(char)) {
    let shiftedCharIndex =
      (alphabet.indexOf(char) + shiftSize) % alphabet.length;
    if (shiftedCharIndex < 0) shiftedCharIndex += alphabet.length;
    return alphabet[shiftedCharIndex];
  }
  return char;
};

const rotateText = (text, shiftSize) => {
  return [...text].map((char) => getShiftedChar(char, shiftSize)).join("");
};

const rotateTextThroughAlphabet = (text) => {
  const rotatedTextMap = {};
  for (let i = 0; i < 26; i += 1) {
    rotatedTextMap[i] = rotateText(text, i);
  }
  return rotatedTextMap;
};

module.exports = {
  getShiftedChar,
  rotateText,
  rotateTextThroughAlphabet,
  alphabet,
};
