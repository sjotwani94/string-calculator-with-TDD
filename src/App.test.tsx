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

        test('Throw errors in case of preceding commas', () => {
            try {
                add(',1,2,34,22');
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(error.message).toEqual('Invalid Input!');
                }
            }
        });

        test('Throw errors in case of succeeding commas', () => {
            try {
                add('1,2,34,56,');
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(error.message).toEqual('Invalid Input!');
                }
            }
        });

        test('Throw errors in case of multiple commas in between', () => {
            try {
                add('9,8,,24,,5');
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(error.message).toEqual('Invalid Input!');
                }
            }
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

        test('Sending negative numbers should throw an exception with all the negatives listed', () => {
            try {
                add('//$\n-2$32$-28');
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(error.message).toEqual('Negative numbers not allowed -2, -28');
                }
            }

            try {
                add('//^\n1^-2\n34^5\n-6\n-7^8');
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(error.message).toEqual('Negative numbers not allowed -2, -6, -7');
                }
            }
        });

        test('Sending - (minus sign) as delimiter should yield a correct parsed result instead of throwing an error', () => {
            const firstTestCaseResult = add('//-\n2-32-28-11');
            const secondTestCaseResult = add('//-\n1-2\n34-9\n6\n7-8');
            expect(firstTestCaseResult).toEqual(73);
            expect(secondTestCaseResult).toEqual(67);
        });

        test('Sending values greater than 1000 should yield a result excluding those values', () => {
            const firstTestCaseResult = add('//-\n2-1001-28-1921');
            const secondTestCaseResult = add('1\n1113,6\n7,1008');
            expect(firstTestCaseResult).toEqual(30);
            expect(secondTestCaseResult).toEqual(14);
        });
    });
});
