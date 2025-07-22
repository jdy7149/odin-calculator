const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operand1 = [];
let operator = '';
const operand2 = [];
let isOperated = false;

const display = document.querySelector('#display');

const operate = (operand1, operator, operand2) => {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            if (operand2)
                return divide(operand1, operand2);
            else {
                throw Error('Could not divide by 0');
            }
    }
};

const processOperation = (operandArr1, operator, operandArr2) => {
    const x = parseFloat(operandArr1.join(''));
    const y = parseFloat(operandArr2.join(''));

    const result = operate(x, operator, y);
    const splitResult = result.toString().split('');

    operand1.splice(0, operand1.length, ...splitResult);
    operand2.splice(0, operand2.length);

    return result;
};

const clearDisplay = () => {
    display.textContent = operator = '';
    operand1.length = operand2.length = 0;
};

document.querySelectorAll('button.digit')
.forEach(btn => btn.addEventListener('click', evt => {
    if (isOperated){
        clearDisplay();
        isOperated = false;
    }
    
    const pressedValue = evt.target.textContent;
    const targetOperand = operator ? operand2 : operand1;

    if (pressedValue === '.' && targetOperand.includes('.')) return;

    targetOperand.push(pressedValue);
    display.textContent += pressedValue;
}));

document.querySelectorAll('button.operator')
.forEach(btn => btn.addEventListener('click', evt => {
    if (operator && !operand2) return;
    
    const pressedValue = evt.target.textContent;

    if (!operator) {
        isOperated = false;
        operator = pressedValue;
        display.textContent += ` ${operator} `;
    } else {
        let result;
        try {
            result = processOperation(operand1, operator, operand2);
        } catch (e) {
            window.alert(e.message);
            return;
        }
        operator = pressedValue;
        display.textContent = `${result} ${operator} `;
    }

}));

document.querySelector('#equal').addEventListener('click', () => {
    if (!operand1 || !operator || !operand2) return;

    let result;
    try {
        result = processOperation(operand1, operator, operand2);
    } catch (e) {
        window.alert(e.message);
        return;
    }

    operator = '';
    isOperated = true;
    display.textContent = result;
});

document.querySelector('#clear').addEventListener('click', clearDisplay);