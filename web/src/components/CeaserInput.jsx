import { useState } from "react";
import { rotateTextThroughAlphabet } from "@codankra/caeser";
import ResultsList from "./ResultsList";

function CaeserInput() {
  const [ceaserInput, setCaeserInput] = useState("");
  const [renderResults, setRenderResults] = useState(false);

  return (
    <>
      <input
        className="ceaserInput"
        id="ceaserInput"
        type="text"
        defaultValue=""
        placeholder="Type here to encode text..."
        onChange={(e) => {
          e.preventDefault();
          setCaeserInput(document.getElementById("ceaserInput").value);
          setRenderResults(true);
        }}
      />
      {renderResults && (
        <ResultsList list={rotateTextThroughAlphabet(ceaserInput)} />
      )}
    </>
  );
}

export default CaeserInput;
