import { useState } from 'react';
import { Button, Card, Form, Toast } from 'react-bootstrap';
import './App.scss';

let listOfNegativeNumbers = '';
const addDelimiterSeparatedNumbers = (numbers: string, delimiter = ','): number => {
    let result = 0;
    const arrayOfNumbers = numbers.split(delimiter);

    arrayOfNumbers.forEach((value) => {
        if (!Number.isNaN(parseInt(value)) && /^[-]?\d+$/.test(value)) {
            if (parseInt(value) < 0) {
                listOfNegativeNumbers === ''
                    ? (listOfNegativeNumbers += value)
                    : (listOfNegativeNumbers += ', ' + value);
            }
            if (parseInt(value) <= 1000) {
                result += parseInt(value);
            }
        } else {
            throw new Error('Invalid Input!');
        }
    });
    return result;
};

export const add = (numbers: string): number => {
    listOfNegativeNumbers = '';
    if (numbers === '') {
        return 0;
    }
    let result = 0;
    if (numbers.includes('\n')) {
        const arrayOfNumbers = numbers.split('\n');
        let delimiter = ',';
        if (arrayOfNumbers[0].includes('//')) {
            const indexOfStartingSquareBrace = arrayOfNumbers[0].indexOf('[');
            const indexOfEndingSquareBrace = arrayOfNumbers[0].indexOf(']');
            if (
                arrayOfNumbers[0].includes('[') &&
                arrayOfNumbers[0].includes(']') &&
                indexOfStartingSquareBrace < indexOfEndingSquareBrace
            ) {
                delimiter = arrayOfNumbers[0].substring(indexOfStartingSquareBrace + 1, indexOfEndingSquareBrace);
            } else if (arrayOfNumbers[0].length === 3) {
                delimiter = arrayOfNumbers[0].charAt(arrayOfNumbers[0].length - 1);
            } else {
                throw new Error('Invalid Input!');
            }
            arrayOfNumbers.shift();
        }
        arrayOfNumbers.forEach((value) => {
            result += addDelimiterSeparatedNumbers(value, delimiter);
        });
    } else {
        result = addDelimiterSeparatedNumbers(numbers);
    }
    if (listOfNegativeNumbers !== '') {
        throw new Error('Negative numbers not allowed ' + listOfNegativeNumbers);
    }
    return result;
};

function App() {
    const [stringOfNumbers, setStringOfNumbers] = useState('');
    const [resultOfAddition, setResultOfAddition] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showResultAsToast = () => {
        try {
            setShowError(false);
            setResultOfAddition(add(stringOfNumbers));
            setShowResult(true);
        } catch (error) {
            setShowResult(false);
            setShowError(true);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="app-container">
            <header className="app-container-header">String Calculator Developed using TDD</header>
            <div className="app-container-body">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>String Calculator</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Type A Numerical Expression Here:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        size="lg"
                                        type="text"
                                        placeholder="Example: '1,2,3,4'"
                                        value={stringOfNumbers}
                                        onChange={(e) => setStringOfNumbers(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Text>
                        <Button
                            className="calculate-result-button"
                            onClick={() => showResultAsToast()}
                            variant="primary"
                        >
                            Calculate Result!
                        </Button>
                        <Toast bg="success" show={showResult} onClose={() => setShowResult(false)}>
                            <Toast.Header>
                                <strong className="me-auto">Result:</strong>
                            </Toast.Header>
                            <Toast.Body className="text-white">Sum Of Numbers is {resultOfAddition}</Toast.Body>
                        </Toast>
                        <Toast bg="danger" show={showError} onClose={() => setShowError(false)}>
                            <Toast.Header>
                                <strong className="me-auto">ERROR:</strong>
                            </Toast.Header>
                            <Toast.Body className="text-white">{errorMessage}</Toast.Body>
                        </Toast>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
