import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom';
import Structure from 'constructure';

const personStructure = Structure.shape({
    demographics: Structure.shape({
        firstName: Structure.string(),
        middleName: Structure.string(),
        lastName: Structure.string(),
        dateOfBirth: Structure.string(),
        address: Structure.shape({
            street1: Structure.string(),
            street2: Structure.string(),
            city: Structure.string(),
            state: Structure.string(),
            postalCode: Structure.string(),
        }),
        phones: Structure.objectOf(Structure.string()),
    }),
    relations: Structure.arrayOf(Structure.shape({
        relationship: Structure.string(),
        relation: Structure.lazy(() => personStructure),
    })),
});

const testValue = {
    demographics: {
        firstName: 'John',
        lastName: null,
        dateOfBirth: '13/33/1980',
        address: {
            street1: '237 Example Street',
            city: 'Raleigh',
            state: 'NC',
            postalCode: '145',
        },
        phones: {
            cell: '123-456-7890',
            home: '123-34-AAAA',
        },
    },
    relations: [{
        relationship: 'Wife',
        relation: {
            demographics: {
                firstName: 'Jane',
                lastName: null,
                dateOfBirth: null,
            },
        },
    }],
};

function App() {
    const [result, setResult] = useState(null);
    const [flatten, setFlatten] = useState(false);

    const handleExecuteClick = () => {
        personStructure.run(testValue).then((verifyResult) => {
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
                <label>
                    <input type="checkbox" onChange={handleFlattenChange} />
                    Flatten
                </label>
            </div>
            <button onClick={handleExecuteClick}>Execute</button>
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
    rootElement,
);
