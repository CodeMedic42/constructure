import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import Structure from "constructure";

const structure = Structure.shape({
  exampleString: Structure.string(),
  exampleNumber: Structure.number(),
  exampleBoolean: Structure.boolean(),
  exampleObject: Structure.object(),
  exampleArray: Structure.array()
});

const testValue = {
  exampleString: "test",
  exampleNumber: 42,
  exampleBoolean: true,
  exampleObject: {},
  exampleArray: []
};

function App() {
  const [result, setResult] = useState(null);

  const verify = () => {
    structure.run(testValue).then((verifyResult) => {
      setResult(verifyResult);
    });
  };

  return (
    <div className="App">
      <h1>Example 2: Person</h1>
      <button onClick={verify}>Execute</button>
      <pre>{result != null ? JSON.stringify(result, null, 4) : ""}</pre>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
