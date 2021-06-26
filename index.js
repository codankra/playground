const { rotateTextThroughAlphabet } = require('./algo')
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Type some lowercase text to encode: ", (inputText) => {
    let ceaser = rotateTextThroughAlphabet(inputText);
    console.log(ceaser);
    rl.close();
  });
  
  rl.on("close", () => {
    process.exit(0);
});
