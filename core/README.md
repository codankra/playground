## Caeser Ψ4 Core Functions

Simple utility functions that implement the encryption technique of rotating or shifting text a fixed number of positions. [Learn more!](https://en.wikipedia.org/wiki/Caesar_cipher)

```javascript
import {
  getShiftedChar,
  rotateText,
  rotateTextThroughAlphabet,
} from "just-modulo";

/* Shift alphabetic characters right or left. */
getShiftedChar("a", 2); // "c"
getShiftedChar("b", -2); // "z"

/* Numbers and symbols are not shifted */
getShiftedChar(")", 5); // ")"
getShiftedChar(3, 2); // 3

/* Shift blocks of text by a fixed amount */
rotateText("hello", 7); // "olssv"
rotateText("hello", 26); // "hello"

/* Generate a map of 26 shift possibilities throughout the English alphabet */
rotateTextThroughAlphabet("a"); // { 0: "a", 1: "b", ... }
```
