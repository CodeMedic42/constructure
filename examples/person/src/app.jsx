import React, { useState } from "react";
import Structure from "../../example-01/src/node_modules/constructure";

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

export default function App() {
  const [result, setResult] = useState(null);

  const verify = () => {
    structure.run(testValue).then((verifyResult) => {
      setResult(verifyResult);
    });
  };

  return (
    <div className="App">
      <h1>Example 1: Person</h1>
      <button onClick={verify}>Execute</button>
      <pre>{result != null ? JSON.stringify(result, null, 4) : ""}</pre>
    </div>
  );
}
