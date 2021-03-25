import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import Structure from 'constructure';
import logic from './logic';

function handleCheckBoxChange(set, event) {
    set(event.target.checked);
}

function App() {
    const [result, setResult] = useState(null);
    const [flatten, setFlatten] = useState(false);
    const [allowNull, setAllowNull] = useState(false);
    const [force, setForce] = useState(false);

    const handleExecuteClick = () => {
        logic(Structure).then((verifyResult) => {
            setResult(verifyResult, {
                allowNull,
                force,
            });
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="App">
            <h1>Example 1: Person</h1>
            <div>
                <label htmlFor="flatten-check">
                    <input id="flatten-check" type="checkbox" onChange={handleCheckBoxChange.bind(this, setFlatten)} />
                    Flatten
                </label>
            </div>
            <div>
                <label htmlFor="allow-null-check">
                    <input id="allow-null-check" type="checkbox" onChange={handleCheckBoxChange.bind(this, setAllowNull)} />
                    Allow Nulls
                </label>
            </div>
            <div>
                <label htmlFor="force-check">
                    <input id="force-check" type="checkbox" onChange={handleCheckBoxChange.bind(this, setForce)} />
                    Force
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
