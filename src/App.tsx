import { useState } from 'react';
import { Button, Card, Form, Toast } from 'react-bootstrap';
import './App.scss';

export const add = (numbers: string): number => {
    if (numbers === '') {
        return 0;
    }
    let result = 0;
    const arrayOfNumbers = numbers.split(',');
    arrayOfNumbers.forEach((value) => {
        if (!Number.isNaN(parseInt(value))) {
            result += parseInt(value);
        }
    });
    return result;
};

function App() {
    const [stringOfNumbers, setStringOfNumbers] = useState('');
    const [resultOfAddition, setResultOfAddition] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const showResultAsToast = () => {
        setResultOfAddition(add(stringOfNumbers));
        setShowResult(true);
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
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
