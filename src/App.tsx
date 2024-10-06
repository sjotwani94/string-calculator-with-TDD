import { Button, Card, Form } from 'react-bootstrap';
import './App.scss';

function App() {
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
                                    <Form.Control size="lg" type="text" placeholder="Example: '1,2,3,4'" />
                                </Form.Group>
                            </Form>
                        </Card.Text>
                        <Button variant="primary">Calculate Result!</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
