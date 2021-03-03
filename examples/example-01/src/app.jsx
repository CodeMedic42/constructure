import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import Structure from 'constructure';
import logic from './logic';

function App() {
    const [result, setResult] = useState(null);
    const [flatten, setFlatten] = useState(false);

    const handleExecuteClick = () => {
        logic(Structure).then((verifyResult) => {
            setResult(verifyResult);
        }).catch((error) => {
            console.error(error);
        });
    };

    const handleFlattenChange = (event) => {
        setFlatten(event.target.checked);
    };

    return (
        <div className="App">
            <h1>Example 1: Person</h1>
            <div>
                <label htmlFor="flatten-check">
                    <input id="flatten-check" type="checkbox" onChange={handleFlattenChange} />
                    Flatten
                </label>
            </div>
            <button type="button" onClick={handleExecuteClick}>Execute</button>
            <pre>{result != null ? JSON.stringify(result.toJS(flatten), null, 4) : ''}</pre>
        </div>
    );
}

const rootElement = document.getElementById('root');

ReactDOM.render((
    <StrictMode>
        <App />
    </StrictMode>
),
rootElement);
