const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operand1 = [];
let operator = '';
const operand2 = [];

const operate = (operand1, operator, operand2) => {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
};


const display = document.querySelector('#display');

document.querySelectorAll('button.digit')
.forEach(btn => btn.addEventListener('click', evt => {
    const pressedValue = evt.target.textContent;
    const targetOperand = operator ? operand2 : operand1;

    if (pressedValue === '.' && targetOperand.includes('.')) return;

    targetOperand.push(pressedValue);
    display.textContent += pressedValue;
}));

document.querySelectorAll('button.operator')
.forEach(btn => btn.addEventListener('click', evt => {
    if (operator) return;

    const pressedValue = evt.target.textContent;

    operator = pressedValue;
    display.textContent += ` ${operator} `;
}));

document.querySelector('#equal').addEventListener('click', () => {
    const x = parseFloat(operand1.join(''));
    const y = parseFloat(operand2.join(''));

    if (y === 0 && operator === '/') {
        window.alert('Could not divide by 0');
        return;
    }

    const result = operate(x, operator, y);
    display.textContent = result;
});