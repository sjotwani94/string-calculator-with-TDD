import { render, screen } from '@testing-library/react';
import App, { add } from './App';

describe('App.tsx Component', () => {
    describe('render function', () => {
        test('Renders Mentioned Title inside Header', () => {
            render(<App />);
            const linkElement = screen.getByText(/String Calculator Developed using TDD/i);
            expect(linkElement).toBeInTheDocument();
            expect(linkElement.tagName).toBe('HEADER');
        });

        test('Renders A Button to call Calculate Result Function', () => {
            render(<App />);
            const buttonElement = screen.getByText(/Calculate Result!/i);
            expect(buttonElement).toBeInTheDocument();
            expect(buttonElement.tagName).toBe('BUTTON');
        });
    });

    describe('add function', () => {
        test('Sending Empty String as the Parameter should return 0', () => {
            const result = add('');
            expect(result).toEqual(0);
        });
    });
});
