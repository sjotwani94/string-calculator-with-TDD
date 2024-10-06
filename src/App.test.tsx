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

        test('Sending a single number as string should return that number', () => {
            const result = add('2');
            expect(result).toEqual(2);
        });

        test('Sending 2 or more numbers as string of comma-separated values should result in addition of the numbers', () => {
            const resultOf2Numbers = add('1,2');
            const resultOf5Numbers = add('1,2,3,4,5');
            expect(resultOf2Numbers).toEqual(3);
            expect(resultOf5Numbers).toEqual(15);
        });

        test('Handle edge case for accepting preceding or succeeding commas, multiple commas in between', () => {
            const resultOfPrecedingCommas = add(',1,2,34,22');
            const resultOfSucceedingCommas = add('1,2,34,56,');
            const resultOfMultipleCommasInBetween = add('9,8,,24,,5');
            expect(resultOfPrecedingCommas).toEqual(59);
            expect(resultOfSucceedingCommas).toEqual(93);
            expect(resultOfMultipleCommasInBetween).toEqual(46);
        });

        test('While sending new line characters inside input string, they should also be treated as delimiters', () => {
            const firstTestCaseResult = add('1\n2,3');
            const secondTestCaseResult = add('1,2\n34,5\n6\n7,8');
            expect(firstTestCaseResult).toEqual(6);
            expect(secondTestCaseResult).toEqual(63);
        });

        test('Sending new delimiter like this: //[delimiter]\n[numbers…] should yield correct result', () => {
            const firstTestCaseResult = add('//$\n2$32$28');
            const secondTestCaseResult = add('//^\n1^2\n34^5\n6\n7^8');
            expect(firstTestCaseResult).toEqual(62);
            expect(secondTestCaseResult).toEqual(63);
        });
    });
});
