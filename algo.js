const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generate list of lowercase characters in the English alphabet
const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 97));

const getShiftedChar = (char, shiftSize) => {
  if (alphabet.includes(char)) {
    let shiftedCharIndex =
      (alphabet.indexOf(char) + shiftSize) % alphabet.length;
    console.log(shiftedCharIndex);
    return alphabet[shiftedCharIndex];
  } else {
    return char;
  }
};

const rotateText = (text, shiftSize) => {
  return [...text].map((char) => getShiftedChar(char, shiftSize)).join("");
};

const rotateTextThroughAlphabet = (text) => {
  let rotatedTextMap = {};
  for (let i = 1; i < 26; i++) {
    rotatedTextMap[i] = rotateText(text, i);
  }
  return rotatedTextMap;
};

rl.question("Type some lowercase text to encode: ", (inputText) => {
  let ceaser = rotateTextThroughAlphabet(inputText);
  console.log(ceaser);
  rl.close();
});

rl.on("close", () => {
  process.exit(0);
});
